import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await proxyBackend("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
