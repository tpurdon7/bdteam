import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { createLeadIntake } from "@/lib/repositories/research-memory";

const leadIntakeSchema = z.object({
  company_name: z.string().min(1),
  person_name: z.string().min(1),
  person_role: z.string().min(1),
  lead_type: z.string().min(1),
  region: z.string().min(1),
  source_url: z.string().url(),
  score: z.number().min(0).max(100),
  why_this_lead_matters: z.string().min(1),
  best_outreach_angle: z.string().min(1),
  preferred_channel: z.string().min(1),
  contact_detail: z.string().min(1),
  contact_confidence: z.string().min(1),
  fallback_contact_path: z.string().default(""),
  email_draft: z.string().default(""),
  linkedin_draft: z.string().default(""),
  followup_draft: z.string().default(""),
  status: z.string().default("needs_review")
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const payload = leadIntakeSchema.parse({
      ...json,
      status: json.status || "needs_review"
    });
    const record = await createLeadIntake({
      ...payload,
      status: payload.status || "needs_review"
    });

    return NextResponse.json(
      {
        ok: true,
        lead: record
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid lead intake payload."
      },
      { status: 400 }
    );
  }
}
