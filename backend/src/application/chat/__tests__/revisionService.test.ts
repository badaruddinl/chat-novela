import { describe, expect, it, vi } from "vitest";
import { RevisionService } from "../revisionService";
import type {
  ConversationRepository,
  MessageRepository,
} from "../../../domain/chat/repositories";
import type { LlmClient } from "../../ports/llmClient";
import type { PromptBuilder } from "../../ports/promptBuilder";

const createConversationRepo = (): ConversationRepository => ({
  listConversations: vi.fn(async () => []),
  createConversation: vi.fn(async () => "conv-1"),
  touchConversation: vi.fn(async () => {}),
  updateConversationTitle: vi.fn(async () => {}),
  setPinned: vi.fn(async () => {}),
  deleteConversation: vi.fn(async () => {}),
  getConversationById: vi.fn(async () => null),
  getDefaultConversationId: vi.fn(async () => "conv-1"),
});

const createMessageRepo = (): MessageRepository => ({
  insertMessage: vi.fn(async () => "msg-1"),
  insertVersion: vi.fn(async () => ({
    id: "ver-2",
    messageId: "msg-1",
    content: "revised",
    versionNumber: 2,
    createdAt: new Date(),
  })),
  updateMessageActiveVersion: vi.fn(async () => {}),
  lockMessageVersion: vi.fn(async () => {}),
  setMessageHidden: vi.fn(async () => {}),
  deleteMessage: vi.fn(async () => {}),
  deleteVersion: vi.fn(async () => {}),
  countVersions: vi.fn(async () => 1),
  getMessageById: vi.fn(async (messageId: string) => ({
    id: messageId,
    conversationId: "conv-1",
    role: "assistant",
    content: "original",
    activeVersionId: "ver-1",
    hidden: false,
    createdAt: new Date(),
  })),
  listMessages: vi.fn(async () => ({
    messages: [
      {
        id: "msg-1",
        conversationId: "conv-1",
        role: "assistant",
        content: "original",
        activeVersionId: "ver-1",
        hidden: false,
        createdAt: new Date(),
      },
    ],
    versions: [],
  })),
  getConversationContext: vi.fn(async () => [
    { role: "user", content: "context" },
  ]),
  countMessages: vi.fn(async () => 1),
});

const createLlmClient = (): LlmClient => ({
  generate: vi.fn(async () => "revised"),
});

const createPromptBuilder = (): PromptBuilder => ({
  buildRevisionPrompt: vi.fn(() => "prompt"),
});

describe("RevisionService", () => {
  it("creates a new version and updates active version", async () => {
    const conversationRepo = createConversationRepo();
    const messageRepo = createMessageRepo();
    const llmClient = createLlmClient();
    const promptBuilder = createPromptBuilder();

    const service = new RevisionService(
      conversationRepo,
      messageRepo,
      llmClient,
      promptBuilder
    );
    const messages = await service.revise({
      messageId: "msg-1",
      mode: "regenerate",
      instruction: "perbaiki",
    });

    expect(messages).toHaveLength(1);
    expect(messageRepo.insertVersion).toHaveBeenCalled();
    expect(messageRepo.updateMessageActiveVersion).toHaveBeenCalledWith(
      "msg-1",
      "ver-2"
    );
    expect(conversationRepo.touchConversation).toHaveBeenCalledWith("conv-1");
  });
});
