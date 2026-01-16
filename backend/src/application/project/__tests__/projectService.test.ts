import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { ProjectService } from "../projectService";
import type { LlmClient } from "../../ports/llmClient";
import fs from "fs";
import path from "path";

const TEST_CONTENT_ROOT = path.resolve(__dirname, "test-contents");

const createLlmClient = (response: string): LlmClient => ({
  generate: vi.fn(async () => response),
});

describe("ProjectService", () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_CONTENT_ROOT)) {
      fs.rmSync(TEST_CONTENT_ROOT, { recursive: true, force: true });
    }
    fs.mkdirSync(TEST_CONTENT_ROOT, { recursive: true });
    process.env.CONTENT_ROOT = TEST_CONTENT_ROOT;
  });

  afterEach(() => {
    if (fs.existsSync(TEST_CONTENT_ROOT)) {
      fs.rmSync(TEST_CONTENT_ROOT, { recursive: true, force: true });
    }
    delete process.env.CONTENT_ROOT;
  });

  it("analyzes document mock", async () => {
    const service = new ProjectService();
    const result = await service.analyzeDocument({
      filename: "test.docx",
      content: Buffer.from("test"),
    });

    expect(result).toEqual({
      genre: "Sci-Fi / Cyberpunk",
      characters: "5 Main, 12 Support",
      tone: "Dark, Gritty, First-Person Perspective",
      tonePercent: 85,
    });
  });

  it("chat uses llm client and updates bible", async () => {
    const mockResponse = `That's great!
<UPDATE_BIBLE>
{
  "project": "New Project",
  "characters": [{ "id": "1", "name": "Hero", "age": 20, "role": "Protagonist", "hobby": "None", "first_app": "Ch1", "relationships": {} }]
}
</UPDATE_BIBLE>`;
    const llmClient = createLlmClient(mockResponse);
    const service = new ProjectService(llmClient);

    const reply = await service.chat("My hero is named Hero");

    expect(reply).toBe("That's great!");
    expect(llmClient.generate).toHaveBeenCalled();

    const { bible } = await service.getProject();
    expect(bible).not.toBeNull();
    expect(bible?.project).toBe("New Project");
    expect(bible?.characters[0].name).toBe("Hero");
  });

  it("chat persists history", async () => {
     const llmClient = createLlmClient("Response");
     const service = new ProjectService(llmClient);

     await service.chat("Message 1");
     await service.chat("Message 2");

     const historyPath = path.join(TEST_CONTENT_ROOT, "chat_history.json");
     const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));

     // History should have: User1, AI1, User2, AI2
     expect(history).toHaveLength(4);
     expect(history[0].content).toBe("Message 1");
     expect(history[2].content).toBe("Message 2");
  });
});
