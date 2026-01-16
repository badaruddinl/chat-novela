import { describe, expect, it } from "vitest";
import { ProjectService } from "../projectService";

describe("ProjectService", () => {
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
});
