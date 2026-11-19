import ChatForm from "@/components/ChatForm";
import Navbar from "@/components/Navbar";

const benefits = [
  {
    number: "01",
    title: "Pregunta con libertad",
    description: "Desde una idea rápida hasta algo que llevas tiempo queriendo entender.",
  },
  {
    number: "02",
    title: "Piensa con claridad",
    description: "Recibe una respuesta directa, en un espacio sencillo y sin distracciones.",
  },
  {
    number: "03",
    title: "Sigue explorando",
    description: "Cada respuesta puede ser el comienzo de una nueva pregunta.",
  },
];

export default function Home() {
  return (
    <main id="inicio" className="min-h-screen overflow-hidden">
      <Navbar />

      <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-8 h-96 w-96 rounded-full bg-mint/60 blur-3xl"
        />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white/70 px-3.5 py-2 text-xs font-medium tracking-wide text-forest shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            TU ESPACIO PARA PENSAR MEJOR
          </div>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.055em] text-ink sm:text-7xl lg:text-[84px]">
            Las buenas ideas
            <br />
            <span className="font-serif font-normal italic text-forest">empiezan con</span> una pregunta.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-ink/65 sm:text-lg">
            Un espacio tranquilo para explorar lo que te da curiosidad. Pregunta, descubre y convierte tus ideas en algo más claro.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <ChatForm />
          <p className="mt-4 text-center text-xs text-ink/45">
            Impulsado por Gemini · Tus preguntas son el comienzo
          </p>
        </div>
      </section>

      <section aria-label="Cómo funciona InsightDesk" className="border-t border-ink/10 bg-white/50">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8 sm:py-16">
          {benefits.map((benefit) => (
            <article key={benefit.number} className="flex gap-4">
              <span className="pt-1 font-mono text-xs text-forest/50">{benefit.number}</span>
              <div>
                <h2 className="text-sm font-semibold text-ink">{benefit.title}</h2>
                <p className="mt-2 max-w-xs text-sm leading-6 text-ink/60">{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-7 text-xs text-ink/45 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} InsightDesk</span>
        <span>Una pregunta a la vez.</span>
      </footer>
    </main>
  );
}
