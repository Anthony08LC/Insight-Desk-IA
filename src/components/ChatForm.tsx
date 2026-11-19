"use client";

import { useState, type FormEvent } from "react";

type ChatResponse = {
  answer?: string;
  error?: string;
};

export default function ChatForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    setIsLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const data = (await response.json()) as ChatResponse;
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo obtener una respuesta.");
      }

      setAnswer(data.answer ?? "Gemini no devolvió una respuesta. Intenta de nuevo.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Ocurrió un error inesperado. Intenta de nuevo.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      id="pregunta"
      className="scroll-mt-8 rounded-[28px] border border-ink/10 bg-white p-3 shadow-card sm:p-5"
      aria-label="Consulta a Gemini"
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="question" className="sr-only">
          Escribe tu pregunta
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="¿Qué te gustaría entender hoy?"
          rows={4}
          maxLength={4000}
          required
          className="min-h-32 w-full resize-y border-0 bg-transparent px-3 py-3 text-base leading-7 text-ink outline-none placeholder:text-ink/35 focus:ring-0 sm:px-4 sm:text-lg"
        />
        <div className="flex flex-col items-stretch justify-between gap-3 border-t border-ink/10 px-2 pt-3 sm:flex-row sm:items-center sm:px-3">
          <span className="text-xs text-ink/45">
            Escribe tu pregunta con el detalle que quieras · {question.length}/4000
          </span>
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest px-5 text-sm font-medium text-white transition hover:bg-forest/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
                Consultando...
              </>
            ) : (
              <>
                Consultar <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <p
          role="alert"
          className="mx-2 mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800 sm:mx-3"
        >
          {error}
        </p>
      )}

      {answer && (
        <div
          aria-live="polite"
          aria-label="Respuesta de Gemini"
          className="mx-2 mt-5 border-t border-ink/10 px-1 pt-5 sm:mx-3 sm:pt-6"
        >
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-forest">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-mint" aria-hidden="true">
              ✦
            </span>
            InsightDesk responde
          </h2>
          <p className="whitespace-pre-wrap text-sm leading-7 text-ink/80 sm:text-base">{answer}</p>
        </div>
      )}
    </section>
  );
}
