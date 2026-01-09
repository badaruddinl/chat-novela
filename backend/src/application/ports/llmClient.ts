export type LlmMessage = {
  role: "user" | "assistant";
  content: string;
};

export type LlmClient = {
  generate(messages: LlmMessage[]): Promise<string>;
};
