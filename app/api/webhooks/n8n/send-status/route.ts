import { NextRequest, NextResponse } from "next/server";

import {
  buildDedupeKey,
  buildWebhookAck,
  sendStatusWebhookSchema,
  verifySharedSecret
} from "@/lib/workflows";

export async function POST(request: NextRequest) {
  try {
    verifySharedSecret(request.headers.get("x-bd-team-secret"));
    const payload = sendStatusWebhookSchema.parse(await request.json());
    const dedupeKey = buildDedupeKey("send_status", payload);

    return NextResponse.json(buildWebhookAck("send_status", dedupeKey, payload), { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
