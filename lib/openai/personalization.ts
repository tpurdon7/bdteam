import { openAiModelConfig } from "@/lib/openai/config";
import { requestStructuredCompletion } from "@/lib/openai/client";
import { logPromptExchange } from "@/lib/openai/logging";
import {
  buildPersonalizationUserPrompt,
  personalizationSystemPrompt
} from "@/prompts/personalization";

export async function extractPersonalization(input: Parameters<typeof buildPersonalizationUserPrompt>[0]) {
  const messages = [
    { role: "system" as const, content: personalizationSystemPrompt },
    { role: "user" as const, content: buildPersonalizationUserPrompt(input) }
  ];

  logPromptExchange("personalization:request", { model: openAiModelConfig.personalization, messages });
  const response = await requestStructuredCompletion({
    model: openAiModelConfig.personalization,
    messages
  });
  logPromptExchange("personalization:response", response);

  return response;
}
