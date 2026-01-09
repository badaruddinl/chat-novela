import type {
  Conversation,
  ConversationSummary,
  Message,
  Version,
  ChatRole,
} from "./entities";

export type ConversationRepository = {
  listConversations(): Promise<ConversationSummary[]>;
  createConversation(title: string): Promise<string>;
  touchConversation(conversationId: string): Promise<void>;
  updateConversationTitle(conversationId: string, title: string): Promise<void>;
  getConversationById(conversationId: string): Promise<Conversation | null>;
  getDefaultConversationId(): Promise<string>;
};

export type MessageRepository = {
  insertMessage(params: {
    conversationId: string;
    role: ChatRole;
    content: string;
  }): Promise<string>;
  insertVersion(messageId: string, content: string): Promise<Version>;
  updateMessageActiveVersion(messageId: string, versionId: string): Promise<void>;
  lockMessageVersion(messageId: string, versionId: string): Promise<void>;
  setMessageHidden(messageId: string, hidden: boolean): Promise<void>;
  deleteMessage(messageId: string): Promise<void>;
  countVersions(messageId: string): Promise<number>;
  getMessageById(messageId: string): Promise<Message | null>;
  listMessages(conversationId: string): Promise<{
    messages: Message[];
    versions: Version[];
  }>;
  getConversationContext(
    conversationId: string,
    limit: number
  ): Promise<Array<{ role: ChatRole; content: string }>>;
  countMessages(conversationId: string): Promise<number>;
};
