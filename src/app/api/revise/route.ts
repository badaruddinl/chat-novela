import { NextResponse } from "next/server";
import {
  getConversationContext,
  getMessageById,
  insertVersion,
  listMessages,
  updateMessageActiveVersion,
} from "@/lib/db";
import { generateCompletion } from "@/lib/ai";
import { buildRevisionPrompt } from "@/lib/prompt";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    messageId?: number;
    instruction?: string;
    mode?: "partial" | "regenerate" | "switch";
    versionId?: number;
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
    return NextResponse.json({ messages: listMessages() });
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
  const context = getConversationContext();

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

  return NextResponse.json({ messages: listMessages() });
}
