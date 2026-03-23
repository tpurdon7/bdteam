"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { assertLeadStatus, requireLeadTransition } from "@/lib/domain/lead-status";

const reviewActionSchema = z.object({
  leadId: z.string().min(1),
  currentStatus: z.string().min(1),
  nextStatus: z.string().min(1),
  mode: z.enum(["draft", "send", "reject", "archive"])
});

export async function transitionLeadAction(formData: FormData) {
  const parsed = reviewActionSchema.parse({
    leadId: formData.get("leadId"),
    currentStatus: formData.get("currentStatus"),
    nextStatus: formData.get("nextStatus"),
    mode: formData.get("mode")
  });

  const current = assertLeadStatus(parsed.currentStatus);
  const next = assertLeadStatus(parsed.nextStatus);

  requireLeadTransition(current, next);

  revalidatePath("/review");
  revalidatePath("/leads");
  revalidatePath("/pipeline");

  return {
    ok: true,
    leadId: parsed.leadId,
    nextStatus: next,
    mode: parsed.mode
  };
}
