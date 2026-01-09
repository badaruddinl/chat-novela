import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

type Params = { messageId: string };

export async function POST(
  request: Request,
  context: { params: Params }
) {
  const body = await request.json();
  const response = await proxyBackend(
    `/messages/${context.params.messageId}/lock-version`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
