import fs from "fs";
import path from "path";

export type AnalysisResult = {
  genre: string;
  characters: string;
  tone: string;
  tonePercent: number;
};

export type StoryBible = {
  project: string;
  world_state: {
    magic: string;
    factions: string[];
  };
  emotional_tone: string[];
  pacing: string;
  generation_settings: {
    min_word_count: number;
  };
  characters: Array<{
    id: string;
    name: string;
    age: number;
    role: string;
    hobby: string;
    first_app: string;
    relationships: Record<string, string>;
  }>;
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

  async initializeProject(data: AnalysisResult | StoryBible): Promise<void> {
    // Ensure directory exists
    if (!fs.existsSync(this.contentRoot)) {
      fs.mkdirSync(this.contentRoot, { recursive: true });
    }

    if ("world_state" in data) {
       // It's a StoryBible
       const bible = data as StoryBible;
       fs.writeFileSync(path.join(this.contentRoot, "story_bible.json"), JSON.stringify(bible, null, 2));

       const outline = `# ${bible.project}

**Pacing:** ${bible.pacing}
**Tone:** ${bible.emotional_tone.join(", ")}

## World State
- Magic: ${bible.world_state.magic}
- Factions: ${bible.world_state.factions.join(", ")}

## Characters
${bible.characters.map(c => `- **${c.name}** (${c.age}): ${c.role}`).join("\n")}
`;
       fs.writeFileSync(path.join(this.contentRoot, "outline.md"), outline);
    } else {
       // It's an AnalysisResult
       const analysis = data as AnalysisResult;
        const outline = `# Project Outline

**Genre:** ${analysis.genre}
**Tone:** ${analysis.tone}

## Characters
${analysis.characters}

## Analysis
Initialized from context analysis.
`;

    const rules = `# Project Rules

- Maintain the tone: ${analysis.tone}
- Focus on the genre: ${analysis.genre}
`;
    fs.writeFileSync(path.join(this.contentRoot, "outline.md"), outline);
    fs.writeFileSync(path.join(this.contentRoot, "rules.md"), rules);
    }
  }
}
