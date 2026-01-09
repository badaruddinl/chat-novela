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
}
