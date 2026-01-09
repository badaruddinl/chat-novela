import type { ConversationRepository } from "../../domain/chat/repositories";
import type { ApiConversation } from "./types";

export class ConversationService {
  constructor(private readonly conversationRepo: ConversationRepository) {}

  async listConversations(): Promise<ApiConversation[]> {
    const conversations = await this.conversationRepo.listConversations();
    return conversations.map((conversation) => ({
      id: conversation.id,
      title: conversation.title,
      created_at: conversation.createdAt.toISOString(),
      updated_at: conversation.updatedAt.toISOString(),
      pinned: conversation.pinned,
      last_message_role: conversation.lastMessageRole,
      last_message_content: conversation.lastMessageContent,
      last_message_created_at: conversation.lastMessageCreatedAt
        ? conversation.lastMessageCreatedAt.toISOString()
        : null,
    }));
  }

  async createConversation(title: string): Promise<string> {
    return this.conversationRepo.createConversation(title);
  }

  async getDefaultConversationId(): Promise<string> {
    return this.conversationRepo.getDefaultConversationId();
  }

  async setPinned(params: {
    conversationId: string;
    pinned: boolean;
  }): Promise<void> {
    await this.conversationRepo.setPinned(params.conversationId, params.pinned);
  }

  async deleteConversation(conversationId: string): Promise<void> {
    await this.conversationRepo.deleteConversation(conversationId);
  }
}
