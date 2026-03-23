export const openAiModelConfig = {
  leadScoring: process.env.OPENAI_MODEL_LEAD_SCORING ?? "gpt-5-mini",
  personalization: process.env.OPENAI_MODEL_PERSONALIZATION ?? "gpt-5-mini",
  drafting: process.env.OPENAI_MODEL_DRAFTING ?? "gpt-5"
};

export const openAiLoggingEnabled = process.env.OPENAI_LOG_PROMPTS === "true";
