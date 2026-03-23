import { openAiLoggingEnabled } from "@/lib/openai/config";

export function logPromptExchange(name: string, payload: unknown) {
  if (!openAiLoggingEnabled) {
    return;
  }

  console.log(`[openai:${name}]`, JSON.stringify(payload, null, 2));
}
