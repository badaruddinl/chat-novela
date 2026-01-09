export type RevisionMode = "partial" | "regenerate";

export type PromptBuilder = {
  buildRevisionPrompt(
    original: string,
    instruction: string | null,
    mode: RevisionMode
  ): string;
};
