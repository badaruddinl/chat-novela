import { NextResponse } from "next/server";
import { listMessages } from "@/lib/db";

export async function GET() {
  return NextResponse.json({ messages: listMessages() });
}
