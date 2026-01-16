import fs from "fs";
import path from "path";

export type AnalysisResult = {
  genre: string;
  characters: string;
  tone: string;
  tonePercent: number;
};

export class ProjectService {
  private contentRoot: string;

  constructor() {
    this.contentRoot =
      process.env.CONTENT_ROOT ??
      path.resolve(process.cwd(), "..", "frontend", "src", "contents");
  }

  async analyzeDocument(file: { filename: string; content: Buffer }): Promise<AnalysisResult> {
    // Mock analysis based on filename or random
    // In real app, send content to LLM

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      genre: "Sci-Fi / Cyberpunk",
      characters: "5 Main, 12 Support",
      tone: "Dark, Gritty, First-Person Perspective",
      tonePercent: 85,
    };
  }

  async initializeProject(data: AnalysisResult): Promise<void> {
    const outline = `# Project Outline

**Genre:** ${data.genre}
**Tone:** ${data.tone}

## Characters
${data.characters}

## Analysis
Initialized from context analysis.
`;

    const rules = `# Project Rules

- Maintain the tone: ${data.tone}
- Focus on the genre: ${data.genre}
`;

    // Ensure directory exists
    if (!fs.existsSync(this.contentRoot)) {
      fs.mkdirSync(this.contentRoot, { recursive: true });
    }

    fs.writeFileSync(path.join(this.contentRoot, "outline.md"), outline);
    fs.writeFileSync(path.join(this.contentRoot, "rules.md"), rules);
  }
}
