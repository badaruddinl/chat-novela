import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

type Params = { messageId: string };

export async function POST(
  _request: Request,
  context: { params: Params }
) {
  const response = await proxyBackend(
    `/messages/${context.params.messageId}/unhide`,
    { method: "POST" }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
