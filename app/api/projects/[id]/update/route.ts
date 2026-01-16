import { NextResponse } from "next/server";
import { updateProject } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data } = await request.json();
  updateProject(parseInt(params.id, 10), data);
  return NextResponse.json({ success: true });
}
