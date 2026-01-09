import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

type Params = { conversationId: string };

export async function POST(
  _request: Request,
  context: { params: Params }
) {
  const response = await proxyBackend(
    `/conversations/${context.params.conversationId}/pin`,
    { method: "POST" }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
