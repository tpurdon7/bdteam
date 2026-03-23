import { NextRequest, NextResponse } from "next/server";

import {
  buildDedupeKey,
  buildWebhookAck,
  draftReadyWebhookSchema,
  verifySharedSecret
} from "@/lib/workflows";

export async function POST(request: NextRequest) {
  try {
    verifySharedSecret(request.headers.get("x-bd-team-secret"));
    const payload = draftReadyWebhookSchema.parse(await request.json());
    const dedupeKey = buildDedupeKey("draft_ready", payload);

    return NextResponse.json(buildWebhookAck("draft_ready", dedupeKey, payload), { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
