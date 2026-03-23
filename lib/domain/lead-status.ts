import { LEAD_STATUSES, type LeadStatus } from "@/types/domain";

const allowedTransitions: Record<LeadStatus, LeadStatus[]> = {
  discovered: ["qualified", "archived"],
  qualified: ["contact_path_found", "archived"],
  contact_path_found: ["draft_ready", "archived"],
  draft_ready: ["needs_review", "archived"],
  needs_review: ["draft_created", "draft_ready", "archived"],
  draft_created: ["sent", "needs_review", "archived"],
  sent: ["replied", "followup_due", "archived"],
  replied: ["archived"],
  followup_due: ["sent", "archived"],
  archived: []
};

export function assertLeadStatus(value: string): LeadStatus {
  if ((LEAD_STATUSES as readonly string[]).includes(value)) {
    return value as LeadStatus;
  }

  throw new Error(`Invalid lead status: ${value}`);
}

export function canTransitionLeadStatus(current: LeadStatus, next: LeadStatus) {
  return allowedTransitions[current].includes(next);
}

export function requireLeadTransition(current: LeadStatus, next: LeadStatus) {
  if (!canTransitionLeadStatus(current, next)) {
    throw new Error(`Lead transition not allowed: ${current} -> ${next}`);
  }
}
