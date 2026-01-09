import { NextResponse } from "next/server";
import { createConversation, listConversations } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ conversations: listConversations() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { title?: string };
  const title = body.title?.trim() || "Percakapan Baru";
  const conversation = createConversation(title);
  return NextResponse.json({ conversationId: conversation.id });
}
