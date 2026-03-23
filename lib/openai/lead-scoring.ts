import { openAiModelConfig } from "@/lib/openai/config";
import { requestStructuredCompletion } from "@/lib/openai/client";
import { logPromptExchange } from "@/lib/openai/logging";
import { buildLeadScoringUserPrompt, leadScoringSystemPrompt } from "@/prompts/lead-scoring";

export async function scoreLead(input: Parameters<typeof buildLeadScoringUserPrompt>[0]) {
  const messages = [
    { role: "system" as const, content: leadScoringSystemPrompt },
    { role: "user" as const, content: buildLeadScoringUserPrompt(input) }
  ];

  logPromptExchange("lead-scoring:request", { model: openAiModelConfig.leadScoring, messages });
  const response = await requestStructuredCompletion({
    model: openAiModelConfig.leadScoring,
    messages
  });
  logPromptExchange("lead-scoring:response", response);

  return response;
}
