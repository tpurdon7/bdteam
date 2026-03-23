import type {
  ActivityRecord,
  DraftRecord,
  IcpRecord,
  LeadRecord,
  SettingsRecord,
  WorkflowRunRecord
} from "@/types/domain";

export interface SearchRunRecord {
  id: string;
  icpId: string;
  triggeredByUserId: string;
  status: "queued" | "running" | "completed" | "failed";
  source: "manual" | "scheduled" | "api";
  resultCount: number;
  workflowRunId?: string | null;
  startedAt: string;
  finishedAt?: string | null;
}

export interface CompanyRecord {
  id: string;
  name: string;
  domain: string;
  geography: string;
  sector: string;
  companyType: string;
  sourceLinks: string[];
}

export interface ContactRecord {
  id: string;
  companyId: string;
  fullName: string;
  roleTitle: string;
  geography: string;
  bestContactPath?: LeadRecord["bestContactPath"];
  fallbackContactPath?: LeadRecord["fallbackContactPath"];
  sourceLinks: string[];
}

export interface CampaignRecord {
  id: string;
  title: string;
  status: "active" | "paused" | "archived";
  ownerUserId: string;
  icpIds: string[];
}

export interface Database {
  public: {
    Tables: {
      users: { Row: { id: string; email: string; full_name: string; role: string; avatar_url: string | null } };
      icps: { Row: IcpRecord };
      search_runs: { Row: SearchRunRecord };
      companies: { Row: CompanyRecord };
      contacts: { Row: ContactRecord };
      leads: { Row: LeadRecord };
      drafts: { Row: DraftRecord };
      campaigns: { Row: CampaignRecord };
      activities: { Row: ActivityRecord };
      workflow_runs: { Row: WorkflowRunRecord };
      settings: { Row: SettingsRecord };
    };
  };
}
