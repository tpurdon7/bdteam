export const personalizationSystemPrompt = `
Extract personalization points for outbound research.
Return strict JSON with:
- why_selected: string[]
- personalization_points: string[]
- source_urls: string[]
- contact_confidence_rationale: string

Rules:
- Use only facts supported by provided source material.
- Keep points specific and operator-friendly.
- Avoid invented company strategy.
`.trim();

export function buildPersonalizationUserPrompt(input: {
  leadSummary: string;
  sourceNotes: Array<{ url: string; note: string }>;
}) {
  return `
Lead summary:
${input.leadSummary}

Source notes:
${input.sourceNotes.map((item) => `- ${item.url}: ${item.note}`).join("\n")}
  `.trim();
}
