import { openAiModelConfig } from "@/lib/openai/config";
import { requestStructuredCompletion } from "@/lib/openai/client";
import { logPromptExchange } from "@/lib/openai/logging";
import {
  buildDraftGenerationUserPrompt,
  draftGenerationSystemPrompt
} from "@/prompts/draft-generation";

export async function generateDrafts(input: Parameters<typeof buildDraftGenerationUserPrompt>[0]) {
  const messages = [
    { role: "system" as const, content: draftGenerationSystemPrompt },
    { role: "user" as const, content: buildDraftGenerationUserPrompt(input) }
  ];

  logPromptExchange("draft-generation:request", { model: openAiModelConfig.drafting, messages });
  const response = await requestStructuredCompletion({
    model: openAiModelConfig.drafting,
    messages
  });
  logPromptExchange("draft-generation:response", response);

  return response;
}
