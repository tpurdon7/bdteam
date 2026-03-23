import { createHash } from "node:crypto";

import { z } from "zod";

export const icpRunWebhookSchema = z.object({
  workflowRunId: z.string().min(1),
  icpId: z.string().min(1),
  triggeredByUserId: z.string().min(1),
  source: z.enum(["manual", "scheduled", "api"]).default("manual")
});

export const leadEnrichmentWebhookSchema = z.object({
  workflowRunId: z.string().min(1),
  leadId: z.string().min(1),
  contactConfidence: z.number().min(0).max(100),
  bestContactPath: z.object({
    type: z.string(),
    value: z.string(),
    confidence: z.number().min(0).max(1),
    sourceUrl: z.string().url()
  }),
  fallbackContactPath: z
    .object({
      type: z.string(),
      value: z.string(),
      confidence: z.number().min(0).max(1),
      sourceUrl: z.string().url()
    })
    .nullable()
    .optional()
});

export const draftReadyWebhookSchema = z.object({
  workflowRunId: z.string().min(1),
  leadId: z.string().min(1),
  whySelected: z.array(z.string()),
  personalizationPoints: z.array(z.string()),
  shortDraft: z.string(),
  warmDraft: z.string(),
  followUpDraft: z.string()
});

export const sendStatusWebhookSchema = z.object({
  workflowRunId: z.string().min(1),
  leadId: z.string().min(1),
  gmailDraftId: z.string().optional(),
  gmailMessageId: z.string().optional(),
  status: z.enum(["draft_created", "sent", "failed"]),
  error: z.string().optional()
});

export function verifySharedSecret(requestSecret: string | null) {
  const expected = process.env.N8N_SHARED_SECRET;

  if (!expected || requestSecret !== expected) {
    throw new Error("Unauthorized webhook request.");
  }
}

export function buildDedupeKey(kind: string, payload: unknown) {
  return createHash("sha256")
    .update(`${kind}:${JSON.stringify(payload)}`)
    .digest("hex");
}

export function buildWebhookAck(kind: string, dedupeKey: string, payload: unknown) {
  return {
    ok: true,
    kind,
    dedupeKey,
    persisted: false,
    payload
  };
}
