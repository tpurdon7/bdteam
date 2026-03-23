"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const icpSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  geography: z.string().min(1),
  sectors: z.string().min(1),
  companyTypes: z.string().min(1),
  roleTargets: z.string().min(1),
  keywords: z.string().min(1),
  exclusions: z.string(),
  priorityScore: z.coerce.number().min(0).max(100)
});

export async function upsertIcpAction(formData: FormData) {
  const parsed = icpSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    geography: formData.get("geography"),
    sectors: formData.get("sectors"),
    companyTypes: formData.get("companyTypes"),
    roleTargets: formData.get("roleTargets"),
    keywords: formData.get("keywords"),
    exclusions: formData.get("exclusions"),
    priorityScore: formData.get("priorityScore")
  });

  revalidatePath("/icps");

  return {
    ok: true,
    message: "ICP payload validated for persistence.",
    payload: parsed
  };
}

export async function archiveIcpAction(id: string) {
  if (!id) {
    throw new Error("ICP id is required.");
  }

  revalidatePath("/icps");

  return { ok: true, id };
}

export async function triggerIcpRunAction(id: string) {
  if (!id) {
    throw new Error("ICP id is required.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/icps");

  return {
    ok: true,
    id,
    status: "queued"
  };
}
