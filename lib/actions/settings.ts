"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const settingsSchema = z.object({
  brandTone: z.string().min(5),
  writingPreferences: z.string().min(1),
  signatureBlock: z.string().min(5),
  outreachRules: z.string().min(1),
  cooldownDays: z.coerce.number().min(1).max(90),
  approvalDefault: z.enum(["draft", "review", "send"])
});

export async function updateSettingsAction(formData: FormData) {
  const parsed = settingsSchema.parse({
    brandTone: formData.get("brandTone"),
    writingPreferences: formData.get("writingPreferences"),
    signatureBlock: formData.get("signatureBlock"),
    outreachRules: formData.get("outreachRules"),
    cooldownDays: formData.get("cooldownDays"),
    approvalDefault: formData.get("approvalDefault")
  });

  revalidatePath("/settings");

  return { ok: true, payload: parsed };
}
