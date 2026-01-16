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

const createProjectService = () => ({
  getProject: vi.fn(async () => ({
    bible: {
      project: "Test Project",
      world_state: { magic: "Hard", factions: ["One"] },
      emotional_tone: ["Dark"],
      pacing: "Fast",
      generation_settings: { min_word_count: 100 },
      characters: [
        {
          id: "c1",
          name: "Hero",
          age: 20,
          role: "Protag",
          hobby: "none",
          first_app: "ch1",
          status: "Active",
          relationships: {},
        },
      ],
    },
    outline: null,
    summary: "A summary.",
  })),
  chat: vi.fn(),
  generateStorySegment: vi.fn(),
  analyzeDocument: vi.fn(),
  initializeProject: vi.fn(),
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

  it("includes project context in system prompt when projectService is provided", async () => {
    const conversationRepo = createConversationRepo();
    const messageRepo = createMessageRepo();
    const llmClient = createLlmClient();
    const projectService = createProjectService();

    const service = new ChatService(
      conversationRepo,
      messageRepo,
      llmClient,
      projectService as any
    );
    await service.sendMessage({ content: "test" });

    expect(llmClient.generate).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("STORY CONTEXT")
    );
    expect(llmClient.generate).toHaveBeenCalledWith(
      expect.anything(),
      expect.stringContaining("SUMMARY:\nA summary.")
    );
  });
});
