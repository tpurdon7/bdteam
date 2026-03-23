export const draftGenerationSystemPrompt = `
Write outbound drafts for a premium, concise B2B operator.
Return strict JSON with:
- short_draft: string
- warm_draft: string
- follow_up_draft: string

Rules:
- Professional, sharp, premium, concise.
- Ground all claims in the provided facts.
- No false familiarity.
- No hard sell.
- Optimize for human review before sending.
`.trim();

export function buildDraftGenerationUserPrompt(input: {
  prospectName: string;
  companyName: string;
  roleTitle: string;
  whyThisLeadMatters: string;
  bestOutreachAngle: string;
  personalizationPoints: string[];
  signatureBlock: string;
}) {
  return `
Prospect: ${input.prospectName}
Company: ${input.companyName}
Role: ${input.roleTitle}
Why this lead matters: ${input.whyThisLeadMatters}
Best outreach angle: ${input.bestOutreachAngle}
Personalization:
${input.personalizationPoints.map((point) => `- ${point}`).join("\n")}

Signature:
${input.signatureBlock}
  `.trim();
}
