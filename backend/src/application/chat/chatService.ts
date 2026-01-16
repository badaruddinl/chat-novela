import type { MessageRepository, ConversationRepository } from "../../domain/chat/repositories";
import type { ApiMessage, ApiMessageVersion } from "./types";
import type { LlmClient } from "../ports/llmClient";
import type { ProjectService } from "../project/projectService";

export class ChatService {
  constructor(
    private readonly conversationRepo: ConversationRepository,
    private readonly messageRepo: MessageRepository,
    private readonly llmClient: LlmClient,
    private readonly projectService?: ProjectService
  ) {}

  async sendMessage(params: {
    content: string;
    conversationId?: string;
  }): Promise<{ messages: ApiMessage[]; conversationId: string }> {
    const conversationId =
      params.conversationId ??
      (await this.conversationRepo.createConversation("Percakapan Baru"));

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

    let systemPrompt = "You are a creative writing assistant.";

    if (this.projectService) {
      const { bible, summary } = await this.projectService.getProject();
      let contextStr = "\n=== STORY CONTEXT ===\n";

      if (summary) {
        contextStr += `SUMMARY:\n${summary}\n\n`;
      }

      if (bible) {
        contextStr += `CHARACTERS:\n${bible.characters.map(c => `- ${c.name} (${c.age}): ${c.role}`).join("\n")}\n\n`;
        if (bible.world_state) {
           contextStr += `WORLD:\nMagic: ${bible.world_state.magic}\nFactions: ${bible.world_state.factions.join(", ")}\n\n`;
        }
        contextStr += `TONE: ${bible.emotional_tone.join(", ")}\nPACING: ${bible.pacing}\n`;
      }
      contextStr += "=====================\nUse this context to assist the user.\n";
      systemPrompt += contextStr;
    }

    let assistantContent = "";
    try {
      assistantContent = await this.llmClient.generate(context, systemPrompt);
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

    return { messages: await this.listMessages(conversationId), conversationId };
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
      hidden: message.hidden,
      versions: versionMap.get(message.id) ?? [],
    }));
  }

  async setMessageHidden(params: {
    messageId: string;
    hidden: boolean;
  }): Promise<ApiMessage[]> {
    const message = await this.messageRepo.getMessageById(params.messageId);
    if (!message) {
      return [];
    }
    await this.messageRepo.setMessageHidden(params.messageId, params.hidden);
    await this.conversationRepo.touchConversation(message.conversationId);
    return this.listMessages(message.conversationId);
  }

  async deleteMessage(messageId: string): Promise<ApiMessage[]> {
    const message = await this.messageRepo.getMessageById(messageId);
    if (!message) return [];
    if (message.role !== "assistant") {
      throw new Error("Hanya pesan assistant yang bisa dihapus.");
    }
    const { messages } = await this.messageRepo.listMessages(
      message.conversationId
    );
    const lastAssistant = [...messages]
      .reverse()
      .find((item) => item.role === "assistant");
    if (!lastAssistant || lastAssistant.id !== messageId) {
      throw new Error("Hanya respons terakhir yang bisa dihapus.");
    }
    const targetIndex = messages.findIndex((item) => item.id === messageId);
    const previous = targetIndex > 0 ? messages[targetIndex - 1] : null;
    await this.messageRepo.deleteMessage(messageId);
    if (previous?.role === "user") {
      await this.messageRepo.deleteMessage(previous.id);
    }
    await this.conversationRepo.touchConversation(message.conversationId);
    return this.listMessages(message.conversationId);
  }

  async deleteMessageVersion(params: {
    messageId: string;
    versionId: string;
  }): Promise<ApiMessage[]> {
    const message = await this.messageRepo.getMessageById(params.messageId);
    if (!message) return [];
    if (message.role !== "assistant") {
      throw new Error("Hanya versi respons assistant yang bisa dihapus.");
    }
    const versionCount = await this.messageRepo.countVersions(params.messageId);
    if (versionCount <= 1) {
      throw new Error("Versi tidak cukup untuk dihapus.");
    }
    await this.messageRepo.deleteVersion(params.messageId, params.versionId);
    await this.conversationRepo.touchConversation(message.conversationId);
    return this.listMessages(message.conversationId);
  }

  async lockMessageVersion(params: {
    messageId: string;
    versionId: string;
  }): Promise<ApiMessage[]> {
    const message = await this.messageRepo.getMessageById(params.messageId);
    if (!message) return [];
    const versionCount = await this.messageRepo.countVersions(params.messageId);
    if (versionCount <= 1) {
      throw new Error("Versi belum cukup untuk dikunci.");
    }
    await this.messageRepo.lockMessageVersion(params.messageId, params.versionId);
    await this.conversationRepo.touchConversation(message.conversationId);
    return this.listMessages(message.conversationId);
  }
}
