export default function Navbar() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <a href="#inicio" className="flex items-center gap-2.5" aria-label="InsightDesk, inicio">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path d="M12 3.5v3M12 17.5v3M3.5 12h3m11 0h3M6 6l2.1 2.1m7.8 7.8L18 18m0-12-2.1 2.1m-7.8 7.8L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <span className="text-base font-semibold tracking-tight text-ink">InsightDesk</span>
      </a>

      <a
        href="#pregunta"
        className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition hover:border-forest hover:bg-white"
      >
        Hacer una pregunta <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
