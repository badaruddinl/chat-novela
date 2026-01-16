export type LlmMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type LlmClient = {
  generate(messages: LlmMessage[], systemPrompt?: string): Promise<string>;
};
