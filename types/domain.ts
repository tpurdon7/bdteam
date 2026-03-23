export const LEAD_STATUSES = [
  "discovered",
  "qualified",
  "contact_path_found",
  "draft_ready",
  "needs_review",
  "draft_created",
  "sent",
  "replied",
  "followup_due",
  "archived"
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export type LeadDraftKind = "short" | "warm" | "follow_up";
export type WorkflowRunStatus = "pending" | "processing" | "completed" | "failed";
export type WorkflowRunKind =
  | "icp_run"
  | "lead_enrichment"
  | "draft_generation"
  | "send_status";

export interface AppUser {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "reviewer" | "operator";
  avatarUrl?: string | null;
}

export interface IcpRecord {
  id: string;
  title: string;
  description: string;
  geography: string[];
  sectors: string[];
  companyTypes: string[];
  roleTargets: string[];
  keywords: string[];
  exclusions: string[];
  priorityScore: number;
  status: "active" | "archived";
  lastRunAt?: string | null;
}

export interface ContactPath {
  type: "email" | "linkedin" | "contact_form" | "generic";
  value: string;
  confidence: number;
  sourceUrl: string;
}

export interface LeadRecord {
  id: string;
  icpId: string;
  companyName: string;
  companyDomain: string;
  personName: string;
  roleTitle: string;
  geography: string;
  sector: string;
  score: number;
  contactConfidence: number;
  whyThisLeadMatters: string;
  bestOutreachAngle: string;
  sourceLinks: string[];
  ownerName: string;
  status: LeadStatus;
  updatedAt: string;
  bestContactPath?: ContactPath | null;
  fallbackContactPath?: ContactPath | null;
  nextRecommendedAction: string;
  draftShort?: string;
  draftWarm?: string;
  draftFollowUp?: string;
}

export interface DraftRecord {
  id: string;
  leadId: string;
  status: "draft_ready" | "approved_to_draft" | "approved_to_send" | "rejected";
  personalizationPoints: string[];
  whySelected: string[];
  shortDraft: string;
  warmDraft: string;
  followUpDraft: string;
  updatedAt: string;
}

export interface ActivityRecord {
  id: string;
  leadId?: string | null;
  workflowRunId?: string | null;
  actorName: string;
  type: string;
  summary: string;
  details?: string | null;
  createdAt: string;
  severity: "info" | "warning" | "error";
}

export interface WorkflowRunRecord {
  id: string;
  externalRunId: string;
  kind: WorkflowRunKind;
  status: WorkflowRunStatus;
  entityId?: string | null;
  entityType?: string | null;
  lastError?: string | null;
  startedAt: string;
  updatedAt: string;
}

export interface SettingsRecord {
  userId: string;
  brandTone: string;
  writingPreferences: string[];
  signatureBlock: string;
  outreachRules: string[];
  cooldownDays: number;
  approvalDefault: "draft" | "review" | "send";
}
