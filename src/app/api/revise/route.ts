import { NextResponse } from "next/server";
import {
  getConversationContext,
  getMessageById,
  insertVersion,
  listMessages,
  touchConversation,
  updateMessageActiveVersion,
} from "@/lib/db";
import { generateCompletion } from "@/lib/ai";
import { buildRevisionPrompt } from "@/lib/prompt";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    messageId?: string;
    instruction?: string;
    mode?: "partial" | "regenerate" | "switch";
    versionId?: string;
    conversationId?: string;
  };

  if (!body.messageId) {
    return NextResponse.json(
      { error: "messageId is required" },
      { status: 400 }
    );
  }

  if (body.mode === "switch") {
    if (!body.versionId) {
      return NextResponse.json(
        { error: "versionId is required" },
        { status: 400 }
      );
    }
    updateMessageActiveVersion(body.messageId, body.versionId);
    const message = getMessageById(body.messageId);
    const conversationId = message?.conversation_id ?? body.conversationId;
    if (!conversationId) {
      return NextResponse.json({ messages: [] });
    }
    touchConversation(conversationId);
    return NextResponse.json({ messages: listMessages(conversationId) });
  }

  const message = getMessageById(body.messageId);
  if (!message || message.role !== "assistant") {
    return NextResponse.json(
      { error: "messageId must reference an assistant message" },
      { status: 400 }
    );
  }

  const mode = body.mode ?? "regenerate";
  const prompt = buildRevisionPrompt(
    message.content,
    body.instruction ?? null,
    mode
  );
  const context = getConversationContext(message.conversation_id);

  let assistantContent = "";
  try {
    assistantContent = await generateCompletion([
      ...context.map((item) => ({ role: item.role, content: item.content })),
      { role: "user", content: prompt },
    ]);
  } catch (error) {
    assistantContent =
      error instanceof Error
        ? `⚠️ ${error.message}`
        : "⚠️ Terjadi kesalahan saat memanggil layanan AI.";
  }

  const version = insertVersion(message.id, assistantContent);
  updateMessageActiveVersion(message.id, version.id);
  touchConversation(message.conversation_id);

  return NextResponse.json({
    messages: listMessages(message.conversation_id),
  });
}
