import { NextResponse } from "next/server";
import { createProject } from "@/lib/db";

export async function POST(request: Request) {
  const { name, data } = await request.json();
  const project = createProject(name, data);
  return NextResponse.json({ project });
}
