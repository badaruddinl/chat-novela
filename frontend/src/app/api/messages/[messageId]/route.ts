import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

type Params = { messageId: string };

export async function DELETE(
  _request: Request,
  context: { params: Params }
) {
  const response = await proxyBackend(
    `/messages/${context.params.messageId}`,
    { method: "DELETE" }
  );
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
