import type { ChatRole } from "../../domain/chat/entities";

export type ApiConversation = {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  last_message_role: ChatRole | null;
  last_message_content: string | null;
  last_message_created_at: string | null;
};

export type ApiMessageVersion = {
  id: string;
  message_id: string;
  content: string;
  version_number: number;
  created_at: string;
};

export type ApiMessage = {
  id: string;
  role: ChatRole;
  content: string;
  created_at: string;
  active_version_id: string | null;
  hidden: boolean;
  versions: ApiMessageVersion[];
};
