import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 95;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "La solicitud no contiene un JSON válido." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null || !("question" in body)) {
    return NextResponse.json(
      { error: "Escribe una pregunta para continuar." },
      { status: 400 },
    );
  }

  const questionValue = body.question;
  if (typeof questionValue !== "string" || !questionValue.trim()) {
    return NextResponse.json(
      { error: "Escribe una pregunta para continuar." },
      { status: 400 },
    );
  }

  const question = questionValue.trim();
  if (question.length > 4000) {
    return NextResponse.json(
      { error: "La pregunta no puede superar los 4000 caracteres." },
      { status: 400 },
    );
  }

  try {
    const answer = await askGemini(question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Gemini request failed:", error);

    if (
      error instanceof Error &&
      (error.name === "TimeoutError" || /timeout|timed out/i.test(error.message))
    ) {
      return NextResponse.json(
        { error: "Gemini tardó más de 90 segundos en responder. Inténtalo de nuevo." },
        { status: 504 },
      );
    }

    if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    return NextResponse.json(
      { error: "No pudimos obtener una respuesta de Gemini. Inténtalo de nuevo." },
      { status: 502 },
    );
  }
}
