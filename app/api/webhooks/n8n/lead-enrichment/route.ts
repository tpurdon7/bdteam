import { NextRequest, NextResponse } from "next/server";

import {
  buildDedupeKey,
  buildWebhookAck,
  leadEnrichmentWebhookSchema,
  verifySharedSecret
} from "@/lib/workflows";

export async function POST(request: NextRequest) {
  try {
    verifySharedSecret(request.headers.get("x-bd-team-secret"));
    const payload = leadEnrichmentWebhookSchema.parse(await request.json());
    const dedupeKey = buildDedupeKey("lead_enrichment", payload);

    return NextResponse.json(buildWebhookAck("lead_enrichment", dedupeKey, payload), { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
