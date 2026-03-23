interface OpenAiMessage {
  role: "system" | "user";
  content: string;
}

interface OpenAiJsonResponse<T> {
  output_text?: string;
  data?: T;
}

export async function requestStructuredCompletion<T>({
  model,
  messages
}: {
  model: string;
  messages: OpenAiMessage[];
}): Promise<OpenAiJsonResponse<T>> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      input: messages.map((message) => ({
        role: message.role,
        content: [{ type: "input_text", text: message.content }]
      })),
      text: {
        format: {
          type: "json_object"
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  return response.json();
}
