import { NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

export async function GET() {
  const response = await proxyBackend("/conversations");
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const response = await proxyBackend("/conversations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
