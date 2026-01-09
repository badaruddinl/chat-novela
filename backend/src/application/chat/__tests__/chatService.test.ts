import { describe, expect, it, vi } from "vitest";
import { ChatService } from "../chatService";
import type {
  ConversationRepository,
  MessageRepository,
} from "../../../domain/chat/repositories";
import type { LlmClient } from "../../ports/llmClient";

const createConversationRepo = (): ConversationRepository => ({
  listConversations: vi.fn(async () => []),
  createConversation: vi.fn(async () => "conv-1"),
  touchConversation: vi.fn(async () => {}),
  updateConversationTitle: vi.fn(async () => {}),
  setPinned: vi.fn(async () => {}),
  deleteConversation: vi.fn(async () => {}),
  getConversationById: vi.fn(async () => ({
    id: "conv-1",
    title: "Percakapan Baru",
    createdAt: new Date(),
    updatedAt: new Date(),
    pinned: false,
  })),
  getDefaultConversationId: vi.fn(async () => "conv-1"),
});

const createMessageRepo = (): MessageRepository => ({
  insertMessage: vi.fn(async () => "msg-1"),
  insertVersion: vi.fn(async () => ({
    id: "ver-1",
    messageId: "msg-2",
    content: "assistant response",
    versionNumber: 1,
    createdAt: new Date(),
  })),
  updateMessageActiveVersion: vi.fn(async () => {}),
  lockMessageVersion: vi.fn(async () => {}),
  setMessageHidden: vi.fn(async () => {}),
  deleteMessage: vi.fn(async () => {}),
  deleteVersion: vi.fn(async () => {}),
  countVersions: vi.fn(async () => 1),
  getMessageById: vi.fn(async () => null),
  listMessages: vi.fn(async () => ({
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        role: "user",
        content: "hello",
        activeVersionId: null,
        hidden: false,
        createdAt: new Date(),
      },
    ],
    versions: [],
  })),
  getConversationContext: vi.fn(async () => [
    { role: "user", content: "hello" },
  ]),
  countMessages: vi.fn(async () => 0),
});

const createLlmClient = (): LlmClient => ({
  generate: vi.fn(async () => "assistant response"),
});

describe("ChatService", () => {
  it("creates assistant response and updates conversation title on first message", async () => {
    const conversationRepo = createConversationRepo();
    const messageRepo = createMessageRepo();
    const llmClient = createLlmClient();

    const service = new ChatService(conversationRepo, messageRepo, llmClient);
    const result = await service.sendMessage({
      content: "Judul cerita\nDetail tambahan",
    });

    expect(result.messages).toHaveLength(1);
    expect(conversationRepo.updateConversationTitle).toHaveBeenCalledWith(
      "conv-1",
      "Judul cerita"
    );
    expect(messageRepo.insertMessage).toHaveBeenCalled();
    expect(messageRepo.insertVersion).toHaveBeenCalled();
    expect(messageRepo.updateMessageActiveVersion).toHaveBeenCalled();
  });
});
