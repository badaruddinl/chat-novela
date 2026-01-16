import fs from "fs";
import path from "path";
import type { LlmClient, LlmMessage } from "../ports/llmClient";
import { STORY_WRITER_SYSTEM, STATE_ANALYZER_SYSTEM } from "./prompts";

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
    status?: "Active" | "Deceased" | "Unknown"; // Added Status
    relationships: Record<string, string>;
  }>;
};

export class ProjectService {
  private baseContentRoot: string;
  private llmClient?: LlmClient;

  constructor(llmClient?: LlmClient) {
    this.llmClient = llmClient;
    this.baseContentRoot =
      process.env.CONTENT_ROOT ??
      path.resolve(process.cwd(), "..", "frontend", "src", "contents");
  }

  private getProjectRoot(projectId: string = "default"): string {
    return path.join(this.baseContentRoot, projectId);
  }

  // --- Chat Interview Logic (Existing) ---
  async chat(message: string, projectId: string = "default"): Promise<string> {
    if (!this.llmClient) {
        // Fallback mock logic if no LLM client
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return "I am a mock AI. Please connect a real LLM for story generation.";
    }

    // Check if user is asking to generate story
    if (message.toLowerCase().startsWith("write") || message.toLowerCase().startsWith("generate")) {
        return this.generateStorySegment(message, projectId);
    }

    const projectRoot = this.getProjectRoot(projectId);
    if (!fs.existsSync(projectRoot)) {
        fs.mkdirSync(projectRoot, { recursive: true });
    }

    // 1. Load history
    const historyPath = path.join(projectRoot, "chat_history.json");
    let history: LlmMessage[] = [];
    if (fs.existsSync(historyPath)) {
        try {
            history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
        } catch (e) {
            console.error("Failed to load chat history", e);
        }
    }

    // 2. Load current Bible for context
    const biblePath = path.join(projectRoot, "story_bible.json");
    let currentBible = "No story bible yet.";
    if (fs.existsSync(biblePath)) {
        currentBible = fs.readFileSync(biblePath, "utf-8");
    }

    // 3. Prepare Prompt
    const systemPrompt = `You are a Senior Novelist AI interviewing an author to build a Story Bible.
Your goal is to ask insightful questions to flesh out the world, characters, and plot.
Current Story Bible:
${currentBible}

If the user's answer provides new information that should be in the Story Bible, include a JSON update block at the end of your response like this:
<UPDATE_BIBLE>
{
  "project": "...",
  "characters": [ ... ]
}
</UPDATE_BIBLE>
Only include fields that need updating. Merge arrays if possible or replace if it's a single value.
Keep your response conversational and encouraging.
`;

    // 4. Call LLM
    const newHistory = [...history, { role: "user" as const, content: message }];
    const response = await this.llmClient.generate(newHistory, systemPrompt);

    // 5. Parse Response for Updates
    const updateBlockRegex = /<UPDATE_BIBLE>([\s\S]*?)<\/UPDATE_BIBLE>/;
    const match = response.match(updateBlockRegex);
    let chatResponse = response;

    if (match) {
        const jsonStr = match[1];
        try {
            const updates = JSON.parse(jsonStr);
            this.mergeBibleUpdates(updates, biblePath);
            chatResponse = response.replace(match[0], "").trim();
        } catch (e) {
            console.error("Failed to parse bible updates", e);
        }
    }

    // 6. Save History
    newHistory.push({ role: "assistant", content: chatResponse });
    fs.writeFileSync(historyPath, JSON.stringify(newHistory, null, 2));

    return chatResponse;
  }

  // --- Story Generation Logic (New - Powerful Context) ---
  async generateStorySegment(instruction: string, projectId: string = "default"): Promise<string> {
      if (!this.llmClient) return "LLM Client not available.";

      const projectRoot = this.getProjectRoot(projectId);
      // 1. Load Context
      const biblePath = path.join(projectRoot, "story_bible.json");
      const summaryPath = path.join(projectRoot, "story_summary.md");

      let bibleStr = "{}";
      if (fs.existsSync(biblePath)) bibleStr = fs.readFileSync(biblePath, "utf-8");

      let summaryStr = "No summary yet.";
      if (fs.existsSync(summaryPath)) summaryStr = fs.readFileSync(summaryPath, "utf-8");

      // 2. Build Generation Prompt (Summary + Bible + Instruction)
      const prompt = `
Context:
- Story Summary: ${summaryStr}
- Story Bible: ${bibleStr}

User Instruction: ${instruction}
      `;

      // 3. Generate
      const response = await this.llmClient.generate(
          [{ role: "user", content: prompt }],
          STORY_WRITER_SYSTEM
      );

      // 4. Update State (Async/Background)
      await this.analyzeStateAndSummarize(response, biblePath, summaryPath);

      return response;
  }

  private async analyzeStateAndSummarize(newText: string, biblePath: string, summaryPath: string) {
      if (!this.llmClient) return;

      // 1. Load current state again to be safe
      let bibleStr = fs.readFileSync(biblePath, "utf-8");
      let summaryStr = "";
      if (fs.existsSync(summaryPath)) summaryStr = fs.readFileSync(summaryPath, "utf-8");

      // 2. Build Analysis Prompt
      const prompt = `
Current Bible: ${bibleStr}
Current Summary: ${summaryStr}
New Text: ${newText}
      `;

      try {
          const analysisJson = await this.llmClient.generate(
              [{ role: "user", content: prompt }],
              STATE_ANALYZER_SYSTEM
          );

          // Expecting JSON
          const analysis = JSON.parse(analysisJson);

          // 3. Apply Updates
          // A. Summary
          if (analysis.summary_update) {
              const newSummary = (summaryStr + "\n" + analysis.summary_update).trim();
              fs.writeFileSync(summaryPath, newSummary);
          }

          // B. Bible (Characters)
          if (analysis.characters_update && Array.isArray(analysis.characters_update)) {
              const bible = JSON.parse(bibleStr) as StoryBible;

              analysis.characters_update.forEach((update: any) => {
                  const charIndex = bible.characters.findIndex(c => c.name === update.name);
                  if (charIndex >= 0) {
                      // Update existing
                      if (update.status) bible.characters[charIndex].status = update.status;
                      // Merge other updates (simplified)
                      if (update.updates) {
                          // e.g. update location or emotion
                      }
                  } else {
                      // Add new character (simplified)
                      bible.characters.push({
                          id: `char_${Date.now()}`,
                          name: update.name,
                          age: 0, // unknown
                          role: "New Character",
                          hobby: "Unknown",
                          first_app: "Generated Segment",
                          status: update.status || "Active",
                          relationships: {}
                      });
                  }
              });

              fs.writeFileSync(biblePath, JSON.stringify(bible, null, 2));
          }

      } catch (e) {
          console.error("Failed to analyze state:", e);
      }
  }


  private mergeBibleUpdates(updates: any, biblePath: string) {
      let bible: any = {};
      if (fs.existsSync(biblePath)) {
          try {
              bible = JSON.parse(fs.readFileSync(biblePath, "utf-8"));
          } catch {}
      }

      if (updates.project) bible.project = updates.project;
      if (updates.characters) {
          // Improve merge to check ID or Name
           const existingChars = bible.characters || [];
           updates.characters.forEach((newChar: any) => {
               const idx = existingChars.findIndex((c: any) => c.name === newChar.name);
               if (idx >= 0) {
                   existingChars[idx] = { ...existingChars[idx], ...newChar };
               } else {
                   existingChars.push(newChar);
               }
           });
           bible.characters = existingChars;
      }
      if (updates.world_state) {
          bible.world_state = { ...bible.world_state, ...updates.world_state };
      }

      // Ensure basic structure exists
      if (!bible.characters) bible.characters = [];
      if (!bible.world_state) bible.world_state = { magic: "", factions: [] };
      if (!bible.emotional_tone) bible.emotional_tone = [];

      fs.writeFileSync(biblePath, JSON.stringify(bible, null, 2));
  }

  async getProject(projectId: string = "default"): Promise<{ bible: StoryBible | null; outline: string | null; summary: string | null }> {
    const projectRoot = this.getProjectRoot(projectId);
    const biblePath = path.join(projectRoot, "story_bible.json");
    const outlinePath = path.join(projectRoot, "outline.md");
    const summaryPath = path.join(projectRoot, "story_summary.md");

    let bible: StoryBible | null = null;
    let outline: string | null = null;
    let summary: string | null = null;

    if (fs.existsSync(biblePath)) {
      try {
        const content = fs.readFileSync(biblePath, "utf-8");
        bible = JSON.parse(content);
        console.log("Loaded bible:", bible?.project);
      } catch (e) {
        console.error("Failed to read story_bible.json", e);
      }
    } else {
        console.log("No story_bible.json found at", biblePath);
    }

    if (fs.existsSync(outlinePath)) {
      outline = fs.readFileSync(outlinePath, "utf-8");
    }

    if (fs.existsSync(summaryPath)) {
        summary = fs.readFileSync(summaryPath, "utf-8");
    }

    return { bible, outline, summary };
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

  async initializeProject(data: AnalysisResult | StoryBible, projectId: string = "default"): Promise<void> {
    console.log("Initializing project with data:", JSON.stringify(data, null, 2));
    const projectRoot = this.getProjectRoot(projectId);
    // Ensure directory exists
    if (!fs.existsSync(projectRoot)) {
      fs.mkdirSync(projectRoot, { recursive: true });
    }

    if ("world_state" in data) {
       // It's a StoryBible
       const bible = data as StoryBible;
       console.log("Writing story_bible.json to", path.join(projectRoot, "story_bible.json"));
       fs.writeFileSync(path.join(projectRoot, "story_bible.json"), JSON.stringify(bible, null, 2));

       const outline = `# ${bible.project}

**Pacing:** ${bible.pacing}
**Tone:** ${bible.emotional_tone.join(", ")}

## World State
- Magic: ${bible.world_state.magic}
- Factions: ${bible.world_state.factions.join(", ")}

## Characters
${bible.characters.map(c => `- **${c.name}** (${c.age}): ${c.role}`).join("\n")}
`;
       fs.writeFileSync(path.join(projectRoot, "outline.md"), outline);

       // Initialize empty summary
       fs.writeFileSync(path.join(projectRoot, "story_summary.md"), "Story initialized.");

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
    fs.writeFileSync(path.join(projectRoot, "outline.md"), outline);
    fs.writeFileSync(path.join(projectRoot, "rules.md"), rules);
    }
  }
}
