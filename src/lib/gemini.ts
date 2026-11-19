import { GoogleGenAI } from "@google/genai";

const GEMINI_TIMEOUT_MS = 90_000;

export async function askGemini(question: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar GEMINI_API_KEY en el archivo .env.local.");
  }

  const client = new GoogleGenAI({ apiKey });
  const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: question,
  }, {
    timeout_ms: GEMINI_TIMEOUT_MS,
    retries: { strategy: "none" },
  });

  const answer = interaction.steps
    .flatMap((step) =>
      step.type === "model_output"
        ? step.content?.flatMap((output) => (output.type === "text" ? [output.text] : [])) ?? []
        : [],
    )
    .join("\n")
    .trim();
  if (!answer) {
    throw new Error("Gemini no devolvió una respuesta de texto.");
  }

  return answer;
}
