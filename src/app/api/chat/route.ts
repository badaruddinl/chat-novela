import { NextResponse } from "next/server";
import {
  getConversationContext,
  insertAssistantMessage,
  insertUserMessage,
  listMessages,
} from "@/lib/db";
import { generateCompletion } from "@/lib/ai";

export async function POST(request: Request) {
  const body = (await request.json()) as { content?: string };
  const content = body.content?.trim();

  if (!content) {
    return NextResponse.json(
      { error: "Content is required." },
      { status: 400 }
    );
  }

  insertUserMessage(content);
  const context = getConversationContext();

  let assistantContent = "";
  try {
    assistantContent = await generateCompletion(
      context.map((message) => ({
        role: message.role,
        content: message.content,
      }))
    );
  } catch (error) {
    assistantContent =
      error instanceof Error
        ? `⚠️ ${error.message}`
        : "⚠️ Terjadi kesalahan saat memanggil layanan AI.";
  }

  insertAssistantMessage(assistantContent);

  return NextResponse.json({ messages: listMessages() });
}
