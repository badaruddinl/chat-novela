import { NextRequest, NextResponse } from "next/server";
import { proxyBackend } from "@/lib/backend";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = "/" + params.slug.join("/");
  try {
    const response = await proxyBackend(`/project${path}`);
    if (!response.ok) {
        return NextResponse.json({ error: "Backend error" }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = "/" + params.slug.join("/");
  try {
    const body = await request.json();
    const response = await proxyBackend(`/project${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
         // Try to read error text if json fails
         const text = await response.text();
         try {
             const json = JSON.parse(text);
             return NextResponse.json(json, { status: response.status });
         } catch {
             return NextResponse.json({ error: text }, { status: response.status });
         }
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
