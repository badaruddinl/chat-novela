import type { MessageRepository, ConversationRepository } from "../../domain/chat/repositories";
import type { ApiMessage, ApiMessageVersion } from "./types";
import type { LlmClient } from "../ports/llmClient";

export class ChatService {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly messageRepo: MessageRepository,
    private readonly llmClient: LlmClient
  ) {}

  async sendMessage(params: {
    content: string;
    conversationId?: string;
  }): Promise<ApiMessage[]> {
    const conversationId =
      params.conversationId ?? (await this.conversationRepo.getDefaultConversationId());

    const count = await this.messageRepo.countMessages(conversationId);
    const conversation = await this.conversationRepo.getConversationById(
      conversationId
    );

    await this.messageRepo.insertMessage({
      conversationId,
      role: "user",
      content: params.content,
    });

    if (count === 0 && conversation?.title === "Percakapan Baru") {
      const firstLine = params.content.split("\n")[0]?.trim() ?? "";
      const nextTitle = firstLine.length > 0 ? firstLine.slice(0, 60) : "Percakapan Baru";
      await this.conversationRepo.updateConversationTitle(conversationId, nextTitle);
    } else {
      await this.conversationRepo.touchConversation(conversationId);
    }

    const context = await this.messageRepo.getConversationContext(conversationId, 12);

    let assistantContent = "";
    try {
      assistantContent = await this.llmClient.generate(context);
    } catch (error) {
      assistantContent =
        error instanceof Error
          ? `⚠️ ${error.message}`
          : "⚠️ Terjadi kesalahan saat memanggil layanan AI.";
    }

    const assistantMessageId = await this.messageRepo.insertMessage({
      conversationId,
      role: "assistant",
      content: assistantContent,
    });

    const version = await this.messageRepo.insertVersion(
      assistantMessageId,
      assistantContent
    );
    await this.messageRepo.updateMessageActiveVersion(assistantMessageId, version.id);
    await this.conversationRepo.touchConversation(conversationId);

    return this.listMessages(conversationId);
  }

  async listMessages(conversationId: string): Promise<ApiMessage[]> {
    const { messages, versions } = await this.messageRepo.listMessages(conversationId);
    const versionMap = new Map<string, ApiMessageVersion[]>();
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
