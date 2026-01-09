import { NextResponse } from "next/server";
import {
  getConversationContext,
  getDefaultConversationId,
  insertAssistantMessage,
  insertUserMessage,
  listMessages,
} from "@/lib/db";
import { generateCompletion } from "@/lib/ai";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    content?: string;
    conversationId?: string;
  };
  const content = body.content?.trim();
  const conversationId =
    typeof body.conversationId === "string" && body.conversationId.length > 0
      ? body.conversationId
      : getDefaultConversationId();

  if (!content) {
    return NextResponse.json(
      { error: "Content is required." },
      { status: 400 }
    );
  }

  insertUserMessage(content, conversationId);
  const context = getConversationContext(conversationId);

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

  insertAssistantMessage(assistantContent, conversationId);

  return NextResponse.json({ messages: listMessages(conversationId) });
}
