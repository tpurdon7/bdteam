import {
  demoActivities,
  demoDrafts,
  demoIcps,
  demoLeads,
  demoSearchRuns,
  demoSettings,
  demoUser,
  demoWorkflowRuns
} from "@/lib/domain/mock-data";
import { getAutomationQueue, type AutomationLeadRecord } from "@/lib/repositories/research-memory";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ActivityRecord,
  ContactPath,
  DraftRecord,
  IcpRecord,
  LeadRecord,
  SettingsRecord,
  WorkflowRunRecord
} from "@/types/domain";
import type { SearchRunRecord } from "@/types/database";

export interface DashboardStats {
  totalLeads: number;
  strongLeads: number;
  draftReadyLeads: number;
  awaitingReview: number;
  sentThisWeek: number;
  followUpsDue: number;
}

function toContactConfidence(confidence: AutomationLeadRecord["contact_confidence_high_medium_low"]) {
  if (confidence === "high") {
    return 90;
  }

  if (confidence === "medium") {
    return 70;
  }

  return 45;
}

function toLeadRecord(lead: AutomationLeadRecord): LeadRecord {
  return {
    id: `auto_${lead.company_name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}_${lead.person_name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "_")}`,
    icpId: "icp_automation",
    companyName: lead.company_name,
    companyDomain: lead.company_url.replace(/^https?:\/\//, "").replace(/\/.*$/, ""),
    personName: lead.person_name,
    roleTitle: lead.person_role,
    geography: lead.geography,
    sector: lead.sector,
    score: lead.score,
    contactConfidence: toContactConfidence(lead.contact_confidence_high_medium_low),
    whyThisLeadMatters: lead.why_this_lead_matters,
    bestOutreachAngle: lead.best_outreach_angle,
    sourceLinks: lead.source_links,
    ownerName: "BD Team Automation",
    status: lead.status as LeadRecord["status"],
    updatedAt: lead.created_at,
    bestContactPath: {
      type: lead.contact_method as ContactPath["type"],
      value: lead.contact_detail,
      confidence: toContactConfidence(lead.contact_confidence_high_medium_low) / 100,
      sourceUrl: lead.source_links[0] ?? lead.company_url
    },
    fallbackContactPath: lead.fallback_contact_path
      ? {
          type: "generic",
          value: lead.fallback_contact_path,
          confidence: 0.5,
          sourceUrl: lead.source_links[0] ?? lead.company_url
        }
      : null,
    nextRecommendedAction: lead.next_recommended_action,
    draftShort: lead.message_draft_short,
    draftWarm: lead.message_draft_warm,
    draftFollowUp: lead.message_draft_followup
  };
}

function toDraftRecord(lead: AutomationLeadRecord): DraftRecord | null {
  if (!lead.message_draft_short && !lead.message_draft_warm && !lead.message_draft_followup) {
    return null;
  }

  return {
    id: `draft_${lead.company_name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}_${lead.person_name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "_")}`,
    leadId: `auto_${lead.company_name.toLowerCase().replaceAll(/[^a-z0-9]+/g, "_")}_${lead.person_name
      .toLowerCase()
      .replaceAll(/[^a-z0-9]+/g, "_")}`,
    status: "draft_ready",
    personalizationPoints: lead.personalization_points,
    whySelected: [lead.why_this_lead_matters, `Contact confidence: ${lead.contact_confidence_high_medium_low}`],
    shortDraft: lead.message_draft_short,
    warmDraft: lead.message_draft_warm,
    followUpDraft: lead.message_draft_followup,
    updatedAt: lead.created_at
  };
}

async function getLocalAutomationLeads() {
  const queue = await getAutomationQueue();

  return (queue?.leads ?? []).map(toLeadRecord);
}

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return demoUser;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return demoUser;
  }

  return {
    id: user.id,
    email: user.email ?? "unknown@example.com",
    fullName: user.user_metadata.full_name ?? "Unknown User",
    role: "admin" as const
  };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const leads = await getLeads();

  return {
    totalLeads: leads.length,
    strongLeads: leads.filter((lead) => lead.score >= 85).length,
    draftReadyLeads: leads.filter((lead) => lead.status === "draft_ready").length,
    awaitingReview: leads.filter((lead) => lead.status === "needs_review").length,
    sentThisWeek: leads.filter((lead) => lead.status === "sent").length,
    followUpsDue: leads.filter((lead) => lead.status === "followup_due").length
  };
}

export async function getIcps(): Promise<IcpRecord[]> {
  return demoIcps;
}

export async function getSearchRuns(): Promise<SearchRunRecord[]> {
  return demoSearchRuns;
}

export async function getLeads(): Promise<LeadRecord[]> {
  if (!hasSupabaseEnv()) {
    const automationLeads = await getLocalAutomationLeads();

    return [...automationLeads, ...demoLeads].sort((a, b) => b.score - a.score);
  }

  return demoLeads;
}

export async function getLeadById(id: string): Promise<LeadRecord | undefined> {
  return demoLeads.find((lead) => lead.id === id);
}

export async function getDraftQueue(): Promise<DraftRecord[]> {
  if (!hasSupabaseEnv()) {
    const queue = await getAutomationQueue();
    const automationDrafts = (queue?.leads ?? []).map(toDraftRecord).filter((draft): draft is DraftRecord => Boolean(draft));

    return [...automationDrafts, ...demoDrafts].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
  }

  return demoDrafts;
}

export async function getActivities(): Promise<ActivityRecord[]> {
  return demoActivities;
}

export async function getWorkflowRuns(): Promise<WorkflowRunRecord[]> {
  return demoWorkflowRuns;
}

export async function getSettings(): Promise<SettingsRecord> {
  return demoSettings;
}

export async function getTopOpportunities() {
  return (await getLeads())
    .filter((lead) => lead.score >= 85)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
