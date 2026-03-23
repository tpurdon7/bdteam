export const leadScoringSystemPrompt = `
You score outbound leads for an internal review-first prospecting platform.
Return strict JSON with:
- score: integer 0-100
- why_this_lead_matters: concise string
- best_outreach_angle: concise string
- next_recommended_action: concise string
- risk_flags: string[]

Rules:
- Prefer evidence from public, reviewable sources.
- Penalize missing provenance, weak role fit, and unclear triggers.
- Never infer certainty about contactability.
- Optimize for quality over volume.
`.trim();

export function buildLeadScoringUserPrompt(input: {
  icpTitle: string;
  companyName: string;
  personName: string;
  roleTitle: string;
  publicSignals: string[];
}) {
  return `
ICP: ${input.icpTitle}
Company: ${input.companyName}
Person: ${input.personName}
Role: ${input.roleTitle}
Public signals:
${input.publicSignals.map((signal) => `- ${signal}`).join("\n")}
  `.trim();
}
