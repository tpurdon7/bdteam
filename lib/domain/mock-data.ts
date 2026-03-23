import type {
  ActivityRecord,
  AppUser,
  DraftRecord,
  IcpRecord,
  LeadRecord,
  SettingsRecord,
  WorkflowRunRecord
} from "@/types/domain";
import type { SearchRunRecord } from "@/types/database";

export const demoUser: AppUser = {
  id: "user_1",
  email: "ops@bdteam.local",
  fullName: "Alex Mercer",
  role: "admin"
};

export const demoSettings: SettingsRecord = {
  userId: demoUser.id,
  brandTone: "Professional, sharp, premium, concise.",
  writingPreferences: ["Keep intros tight", "Lead with relevance", "Avoid hype"],
  signatureBlock: "Alex Mercer\nGrowth Lead\nBD Team",
  outreachRules: ["Never autosend by default", "Prefer public source-backed claims", "Escalate weak confidence leads"],
  cooldownDays: 7,
  approvalDefault: "review"
};

export const demoIcps: IcpRecord[] = [
  {
    id: "icp_1",
    title: "B2B AI infrastructure startups hiring GTM leaders",
    description: "Companies showing GTM motion maturity and recent expansion.",
    geography: ["US", "UK"],
    sectors: ["AI Infrastructure", "Developer Tools"],
    companyTypes: ["Series A", "Series B"],
    roleTargets: ["Head of Growth", "VP Sales", "Founder"],
    keywords: ["hiring", "expansion", "new product"],
    exclusions: ["agencies", "stealth"],
    priorityScore: 92,
    status: "active",
    lastRunAt: "2026-03-17T16:00:00.000Z"
  },
  {
    id: "icp_2",
    title: "Vertical SaaS operators with outbound readiness",
    description: "Operationally mature SaaS companies with identifiable buyer pain.",
    geography: ["US", "Europe"],
    sectors: ["Vertical SaaS", "Fintech Operations"],
    companyTypes: ["Bootstrapped", "Private Equity"],
    roleTargets: ["CEO", "Revenue Operations", "Demand Gen"],
    keywords: ["growth", "ops", "pipeline"],
    exclusions: ["consumer", "freelance"],
    priorityScore: 81,
    status: "active",
    lastRunAt: "2026-03-15T13:15:00.000Z"
  }
];

export const demoLeads: LeadRecord[] = [
  {
    id: "lead_1",
    icpId: "icp_1",
    companyName: "Helio Stack",
    companyDomain: "heliostack.dev",
    personName: "Rina Patel",
    roleTitle: "VP Growth",
    geography: "New York, US",
    sector: "AI Infrastructure",
    score: 94,
    contactConfidence: 88,
    whyThisLeadMatters: "Recently launched self-serve pricing and is hiring SDR leadership.",
    bestOutreachAngle: "Help bridge product-led growth signals into founder-caliber outbound.",
    sourceLinks: ["https://heliostack.dev/blog/pricing-update", "https://www.linkedin.com/company/heliostack/jobs/"],
    ownerName: "Alex Mercer",
    status: "needs_review",
    updatedAt: "2026-03-18T07:15:00.000Z",
    bestContactPath: {
      type: "email",
      value: "rina@heliostack.dev",
      confidence: 0.88,
      sourceUrl: "https://hunter.io/verify/heliostack"
    },
    fallbackContactPath: {
      type: "linkedin",
      value: "https://www.linkedin.com/in/rina-patel-growth/",
      confidence: 0.81,
      sourceUrl: "https://www.linkedin.com/in/rina-patel-growth/"
    },
    nextRecommendedAction: "Review warm draft and approve Gmail draft creation.",
    draftShort: "Rina, saw the pricing launch and SDR leadership hiring push. There may be a cleaner way to convert those new intent signals into targeted outbound.",
    draftWarm: "Rina, the pricing update plus hiring motion suggests Helio Stack is formalizing GTM. We help teams turn product and hiring signals into a review-first outbound queue without sacrificing relevance.",
    draftFollowUp: "Following up because the product-led plus outbound motion looks timely. Happy to share a concrete workflow if useful."
  },
  {
    id: "lead_2",
    icpId: "icp_2",
    companyName: "Ledger Lane",
    companyDomain: "ledgerlane.com",
    personName: "Marcus Green",
    roleTitle: "CEO",
    geography: "London, UK",
    sector: "Fintech Operations",
    score: 86,
    contactConfidence: 72,
    whyThisLeadMatters: "Public roadmap hints at expansion into US operations.",
    bestOutreachAngle: "Position outbound ops system as a way to accelerate category education.",
    sourceLinks: ["https://ledgerlane.com/roadmap", "https://www.linkedin.com/company/ledger-lane/"],
    ownerName: "Jules Kim",
    status: "qualified",
    updatedAt: "2026-03-18T06:20:00.000Z",
    bestContactPath: {
      type: "linkedin",
      value: "https://www.linkedin.com/in/marcus-green-ledgerlane/",
      confidence: 0.72,
      sourceUrl: "https://www.linkedin.com/in/marcus-green-ledgerlane/"
    },
    fallbackContactPath: {
      type: "contact_form",
      value: "https://ledgerlane.com/contact",
      confidence: 0.54,
      sourceUrl: "https://ledgerlane.com/contact"
    },
    nextRecommendedAction: "Finish enrichment and confirm best contact path."
  },
  {
    id: "lead_3",
    icpId: "icp_1",
    companyName: "Patchline",
    companyDomain: "patchline.ai",
    personName: "Tess Murphy",
    roleTitle: "Founder",
    geography: "San Francisco, US",
    sector: "Developer Tools",
    score: 91,
    contactConfidence: 90,
    whyThisLeadMatters: "Founder is publicly discussing enterprise expansion and outbound repeatability.",
    bestOutreachAngle: "Tie outbound review rigor to founder-led messaging quality.",
    sourceLinks: ["https://patchline.ai/blog/enterprise-motion", "https://x.com/tessmurphy/status/123"],
    ownerName: "Alex Mercer",
    status: "draft_ready",
    updatedAt: "2026-03-18T05:55:00.000Z",
    bestContactPath: {
      type: "email",
      value: "tess@patchline.ai",
      confidence: 0.9,
      sourceUrl: "https://clearout.io/verify/patchline"
    },
    fallbackContactPath: null,
    nextRecommendedAction: "Promote to review queue and inspect personalization."
  }
];

export const demoDrafts: DraftRecord[] = [
  {
    id: "draft_1",
    leadId: "lead_1",
    status: "draft_ready",
    personalizationPoints: [
      "Pricing change signals monetization focus",
      "Hiring SDR leadership indicates outbound investment",
      "Rina owns the growth motion"
    ],
    whySelected: ["High score", "Strong contact confidence", "Clear trigger event"],
    shortDraft:
      "Rina, the pricing launch plus SDR leadership hiring suggests Helio Stack is at the point where signal-based outbound matters.",
    warmDraft:
      "Rina, noticed the pricing update and hiring motion at Helio Stack. That combination usually creates a gap between inbound interest and the reps' view of who should get attention first.",
    followUpDraft:
      "Circling back because Helio Stack's product-led signals look unusually actionable for a review-first outbound workflow.",
    updatedAt: "2026-03-18T07:15:00.000Z"
  }
];

export const demoActivities: ActivityRecord[] = [
  {
    id: "act_1",
    leadId: "lead_1",
    workflowRunId: "wf_2",
    actorName: "n8n enrichment",
    type: "lead.enriched",
    summary: "Best contact path confirmed for Helio Stack.",
    createdAt: "2026-03-18T07:10:00.000Z",
    severity: "info"
  },
  {
    id: "act_2",
    workflowRunId: "wf_3",
    actorName: "draft workflow",
    type: "draft.failed",
    summary: "Draft generation retry queued after model timeout.",
    details: "OpenAI timeout on warm draft variant.",
    createdAt: "2026-03-18T06:58:00.000Z",
    severity: "warning"
  },
  {
    id: "act_3",
    leadId: "lead_3",
    actorName: "Alex Mercer",
    type: "lead.promoted",
    summary: "Lead promoted into draft-ready state.",
    createdAt: "2026-03-18T05:56:00.000Z",
    severity: "info"
  }
];

export const demoWorkflowRuns: WorkflowRunRecord[] = [
  {
    id: "wf_1",
    externalRunId: "n8n-run-icp-0091",
    kind: "icp_run",
    status: "completed",
    entityId: "icp_1",
    entityType: "icp",
    startedAt: "2026-03-17T15:58:00.000Z",
    updatedAt: "2026-03-17T16:08:00.000Z"
  },
  {
    id: "wf_2",
    externalRunId: "n8n-run-enrich-4312",
    kind: "lead_enrichment",
    status: "completed",
    entityId: "lead_1",
    entityType: "lead",
    startedAt: "2026-03-18T07:02:00.000Z",
    updatedAt: "2026-03-18T07:10:00.000Z"
  },
  {
    id: "wf_3",
    externalRunId: "n8n-run-draft-1288",
    kind: "draft_generation",
    status: "failed",
    entityId: "lead_3",
    entityType: "lead",
    lastError: "OpenAI timeout",
    startedAt: "2026-03-18T06:54:00.000Z",
    updatedAt: "2026-03-18T06:58:00.000Z"
  }
];

export const demoSearchRuns: SearchRunRecord[] = [
  {
    id: "run_1",
    icpId: "icp_1",
    triggeredByUserId: demoUser.id,
    status: "completed",
    source: "manual",
    resultCount: 14,
    workflowRunId: "wf_1",
    startedAt: "2026-03-17T15:58:00.000Z",
    finishedAt: "2026-03-17T16:08:00.000Z"
  }
];
