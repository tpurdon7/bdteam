import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { demoLeads } from "@/lib/domain/mock-data";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export interface ResearchMemoryItem {
  company_name: string;
  person_name: string;
  person_role: string;
  lead_type: string;
  region: string;
  source_url: string;
  status: string;
  created_at: string;
}

export interface AutomationLeadRecord {
  company_name: string;
  company_url: string;
  person_name: string;
  person_role: string;
  geography: string;
  sector: string;
  why_this_lead_matters: string;
  best_outreach_angle: string;
  contact_method: string;
  contact_detail: string;
  contact_confidence_high_medium_low: "high" | "medium" | "low";
  fallback_contact_path: string;
  personalization_points: string[];
  message_draft_short: string;
  message_draft_warm: string;
  message_draft_followup: string;
  source_links: string[];
  status: string;
  next_recommended_action: string;
  score: number;
  created_at: string;
}

export interface AutomationQueueSummary {
  generated_at: string;
  total_leads_reviewed: number;
  total_strong_leads_found: number;
  total_draft_ready: number;
  total_needing_manual_review: number;
  top_5_highest_priority_opportunities: string[];
  key_blockers_or_missing_data: string[];
}

export interface AutomationQueueFile {
  generated_at: string;
  assumptions: string[];
  summary: AutomationQueueSummary;
  leads: AutomationLeadRecord[];
}

export type LeadIntakePayload = Omit<ResearchMemoryItem, "created_at"> & {
  score: number;
  why_this_lead_matters: string;
  best_outreach_angle: string;
  preferred_channel: string;
  contact_detail: string;
  contact_confidence: string;
  fallback_contact_path: string;
  email_draft: string;
  linkedin_draft: string;
  followup_draft: string;
  created_at?: string;
};

const AUTOMATION_QUEUE_PATH = path.join(process.cwd(), "data/automation/bd-team/review-queue.json");

const demoIntakeStore: Array<LeadIntakePayload & { id: string }> = demoLeads.map((lead) => ({
  id: lead.id,
  company_name: lead.companyName,
  person_name: lead.personName,
  person_role: lead.roleTitle,
  lead_type: lead.sector,
  region: lead.geography,
  source_url: lead.sourceLinks[0] ?? "",
  status: lead.status,
  created_at: lead.updatedAt,
  score: lead.score,
  why_this_lead_matters: lead.whyThisLeadMatters,
  best_outreach_angle: lead.bestOutreachAngle,
  preferred_channel: lead.bestContactPath?.type ?? "email",
  contact_detail: lead.bestContactPath?.value ?? "",
  contact_confidence: String(lead.contactConfidence),
  fallback_contact_path: lead.fallbackContactPath?.value ?? "",
  email_draft: lead.draftWarm ?? "",
  linkedin_draft: lead.draftShort ?? "",
  followup_draft: lead.draftFollowUp ?? ""
}));

async function readAutomationQueueFile(): Promise<AutomationQueueFile | null> {
  try {
    const content = await readFile(AUTOMATION_QUEUE_PATH, "utf8");
    return JSON.parse(content) as AutomationQueueFile;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function writeAutomationQueueFile(queue: AutomationQueueFile) {
  await mkdir(path.dirname(AUTOMATION_QUEUE_PATH), { recursive: true });
  await writeFile(AUTOMATION_QUEUE_PATH, `${JSON.stringify(queue, null, 2)}\n`, "utf8");
}

function toResearchMemoryItem(lead: AutomationLeadRecord): ResearchMemoryItem {
  return {
    company_name: lead.company_name,
    person_name: lead.person_name,
    person_role: lead.person_role,
    lead_type: lead.sector,
    region: lead.geography,
    source_url: lead.source_links[0] ?? lead.company_url,
    status: lead.status,
    created_at: lead.created_at
  };
}

function toAutomationLeadRecordFromIntake(payload: LeadIntakePayload): AutomationLeadRecord {
  const normalizedConfidence =
    payload.contact_confidence.toLowerCase() === "high" ||
    payload.contact_confidence.toLowerCase() === "medium" ||
    payload.contact_confidence.toLowerCase() === "low"
      ? (payload.contact_confidence.toLowerCase() as "high" | "medium" | "low")
      : "low";

  return {
    company_name: payload.company_name,
    company_url: payload.source_url,
    person_name: payload.person_name,
    person_role: payload.person_role,
    geography: payload.region,
    sector: payload.lead_type,
    why_this_lead_matters: payload.why_this_lead_matters,
    best_outreach_angle: payload.best_outreach_angle,
    contact_method: payload.preferred_channel,
    contact_detail: payload.contact_detail,
    contact_confidence_high_medium_low: normalizedConfidence,
    fallback_contact_path: payload.fallback_contact_path,
    personalization_points: [],
    message_draft_short: payload.linkedin_draft,
    message_draft_warm: payload.email_draft,
    message_draft_followup: payload.followup_draft,
    source_links: payload.source_url ? [payload.source_url] : [],
    status: payload.status || "needs_review",
    next_recommended_action: "Review sourced lead and decide whether to approve draft work.",
    score: payload.score,
    created_at: payload.created_at ?? new Date().toISOString()
  };
}

function leadKey(companyName: string, personName: string) {
  return `${companyName.trim().toLowerCase()}::${personName.trim().toLowerCase()}`;
}

export async function getAutomationQueue(): Promise<AutomationQueueFile | null> {
  return readAutomationQueueFile();
}

export async function saveAutomationQueue(queue: AutomationQueueFile) {
  await writeAutomationQueueFile(queue);
}

export async function getRecentResearchMemory(limit = 300): Promise<ResearchMemoryItem[]> {
  if (!hasSupabaseEnv()) {
    const queue = await readAutomationQueueFile();
    const localItems = (queue?.leads ?? []).map(toResearchMemoryItem);
    const demoItems: ResearchMemoryItem[] = demoIntakeStore.map((item) => ({
      company_name: item.company_name,
      person_name: item.person_name,
      person_role: item.person_role,
      lead_type: item.lead_type,
      region: item.region,
      source_url: item.source_url,
      status: item.status,
      created_at: item.created_at ?? new Date(0).toISOString()
    }));

    return [...localItems, ...demoItems]
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
      .slice(0, limit)
      .map(({ company_name, person_name, person_role, lead_type, region, source_url, status, created_at }) => ({
        company_name,
        person_name,
        person_role,
        lead_type,
        region,
        source_url,
        status,
        created_at
      }));
  }

  const supabase = createSupabaseAdminClient() as any;
  const { data, error } = await supabase
    .from("leads")
    .select("company_name, person_name, person_role, lead_type, region, source_url, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createLeadIntake(payload: LeadIntakePayload) {
  const status = payload.status || "needs_review";

  if (!hasSupabaseEnv()) {
    const record = {
      id: randomUUID(),
      ...payload,
      status,
      created_at: new Date().toISOString()
    };

    demoIntakeStore.unshift(record);
    const queue = (await readAutomationQueueFile()) ?? {
      generated_at: new Date().toISOString(),
      assumptions: ["Queue initialized from local fallback storage."],
      summary: {
        generated_at: new Date().toISOString(),
        total_leads_reviewed: 0,
        total_strong_leads_found: 0,
        total_draft_ready: 0,
        total_needing_manual_review: 0,
        top_5_highest_priority_opportunities: [],
        key_blockers_or_missing_data: []
      },
      leads: []
    };
    const automationLead = toAutomationLeadRecordFromIntake({
      ...payload,
      status,
      created_at: record.created_at
    });
    const nextLeads = queue.leads.filter(
      (lead) => leadKey(lead.company_name, lead.person_name) !== leadKey(automationLead.company_name, automationLead.person_name)
    );

    nextLeads.unshift(automationLead);

    await writeAutomationQueueFile({
      ...queue,
      generated_at: new Date().toISOString(),
      leads: nextLeads
    });

    return record;
  }

  const supabase = createSupabaseAdminClient() as any;
  const insertPayload = {
    company_name: payload.company_name,
    person_name: payload.person_name,
    person_role: payload.person_role,
    lead_type: payload.lead_type,
    region: payload.region,
    source_url: payload.source_url,
    score: payload.score,
    why_this_lead_matters: payload.why_this_lead_matters,
    best_outreach_angle: payload.best_outreach_angle,
    preferred_channel: payload.preferred_channel,
    contact_detail: payload.contact_detail,
    contact_confidence: payload.contact_confidence,
    fallback_contact_path: payload.fallback_contact_path,
    email_draft: payload.email_draft,
    linkedin_draft: payload.linkedin_draft,
    followup_draft: payload.followup_draft,
    status,
    source_links: payload.source_url ? [payload.source_url] : []
  };

  const { data, error } = await supabase.from("leads").insert(insertPayload).select("*").single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
