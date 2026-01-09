export type ChatRole = "user" | "assistant";

export type Conversation = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
};

export type Message = {
  id: string;
  conversationId: string;
  role: ChatRole;
  content: string;
  activeVersionId: string | null;
  hidden: boolean;
  createdAt: Date;
};

export type Version = {
  id: string;
  messageId: string;
  content: string;
  versionNumber: number;
  createdAt: Date;
};

export type ConversationSummary = {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  pinned: boolean;
  lastMessageRole: ChatRole | null;
  lastMessageContent: string | null;
  lastMessageCreatedAt: Date | null;
};
