import { NextRequest, NextResponse } from "next/server";

import {
  buildDedupeKey,
  buildWebhookAck,
  icpRunWebhookSchema,
  verifySharedSecret
} from "@/lib/workflows";

export async function POST(request: NextRequest) {
  try {
    verifySharedSecret(request.headers.get("x-bd-team-secret"));
    const payload = icpRunWebhookSchema.parse(await request.json());
    const dedupeKey = buildDedupeKey("icp_run", payload);

    return NextResponse.json(buildWebhookAck("icp_run", dedupeKey, payload), { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
