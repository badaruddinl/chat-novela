import { NextResponse } from "next/server";
import { getDefaultConversationId, listMessages } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const conversationIdParam = url.searchParams.get("conversationId");
  const conversationId =
    conversationIdParam && conversationIdParam.trim().length > 0
      ? conversationIdParam
      : getDefaultConversationId();

  return NextResponse.json({ messages: listMessages(conversationId) });
}
