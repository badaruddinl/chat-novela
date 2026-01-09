import type { ConversationRepository, MessageRepository } from "../../domain/chat/repositories";
import type { LlmClient } from "../ports/llmClient";
import type { PromptBuilder, RevisionMode } from "../ports/promptBuilder";
import type { ApiMessage } from "./types";

export class RevisionService {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly messageRepo: MessageRepository,
    private readonly llmClient: LlmClient,
    private readonly promptBuilder: PromptBuilder
  ) {}

  async revise(params: {
    messageId: string;
    mode?: RevisionMode | "switch";
    instruction?: string;
    versionId?: string;
    conversationId?: string;
  }): Promise<ApiMessage[]> {
    if (params.mode === "switch") {
      if (!params.versionId) {
        throw new Error("versionId is required");
      }
      await this.messageRepo.updateMessageActiveVersion(
        params.messageId,
        params.versionId
      );
      const message = await this.messageRepo.getMessageById(params.messageId);
      const conversationId = message?.conversationId ?? params.conversationId;
      if (!conversationId) return [];
      await this.conversationRepo.touchConversation(conversationId);
      return this.listMessages(conversationId);
    }

    const message = await this.messageRepo.getMessageById(params.messageId);
    if (!message || message.role !== "assistant") {
      throw new Error("messageId must reference an assistant message");
    }

    const mode = (params.mode ?? "regenerate") as RevisionMode;
    const prompt = this.promptBuilder.buildRevisionPrompt(
      message.content,
      params.instruction ?? null,
      mode
    );
    const context = await this.messageRepo.getConversationContext(
      message.conversationId,
      12
    );

    let assistantContent = "";
    try {
      assistantContent = await this.llmClient.generate([
        ...context,
        { role: "user", content: prompt },
      ]);
    } catch (error) {
      assistantContent =
        error instanceof Error
          ? `⚠️ ${error.message}`
          : "⚠️ Terjadi kesalahan saat memanggil layanan AI.";
    }

    const version = await this.messageRepo.insertVersion(
      message.id,
      assistantContent
    );
    await this.messageRepo.updateMessageActiveVersion(message.id, version.id);
    await this.conversationRepo.touchConversation(message.conversationId);
    return this.listMessages(message.conversationId);
  }

  private async listMessages(conversationId: string): Promise<ApiMessage[]> {
    const { messages, versions } = await this.messageRepo.listMessages(conversationId);
    const versionMap = new Map<string, ApiMessage["versions"]>();
    for (const version of versions) {
      const entry = versionMap.get(version.messageId) ?? [];
      entry.push({
        id: version.id,
        message_id: version.messageId,
        content: version.content,
        version_number: version.versionNumber,
        created_at: version.createdAt.toISOString(),
      });
      versionMap.set(version.messageId, entry);
    }

    return messages.map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      created_at: message.createdAt.toISOString(),
      active_version_id: message.activeVersionId,
      versions: versionMap.get(message.id) ?? [],
    }));
  }
}
