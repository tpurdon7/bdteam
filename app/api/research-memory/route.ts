import { NextResponse } from "next/server";

import { getRecentResearchMemory } from "@/lib/repositories/research-memory";

export async function GET() {
  try {
    const items = await getRecentResearchMemory(300);
    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { items: [], error: error instanceof Error ? error.message : "Unable to load research memory." },
      { status: 500 }
    );
  }
}
