import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const conversationIdParam = url.searchParams.get("conversationId");
  const query = conversationIdParam
    ? `?conversationId=${encodeURIComponent(conversationIdParam)}`
    : "";
  const response = await proxyBackend(`/messages${query}`);
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
