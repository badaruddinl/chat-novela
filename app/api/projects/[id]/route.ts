import { NextResponse } from "next/server";
import { getProjectById } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = getProjectById(parseInt(params.id, 10));
  return NextResponse.json({ project });
}
