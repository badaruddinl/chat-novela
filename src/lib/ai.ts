import { buildSystemPrompt } from "./prompt";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const API_URL = "https://api.openai.com/v1/chat/completions";

export async function generateCompletion(messages: ChatMessage[]) {
  const apiKey = process.env.CODEX_API_KEY;
  if (!apiKey) {
    throw new Error("Missing CODEX_API_KEY environment variable.");
  }

  const model = process.env.CODEX_MODEL ?? "gpt-4.1-mini";
  const systemPrompt = buildSystemPrompt();

  const payload = {
    model,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    temperature: 0.8,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Codex API error: ${errorText}`);
  }

  const data = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  return data.choices[0]?.message?.content?.trim() ?? "";
}
