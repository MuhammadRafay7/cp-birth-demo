import type { ReactNode } from "react";

type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({ id, title, sections }: { id: string; title: string; sections: LegalSection[] }) {
  return (
    <>
      <section aria-labelledby={id} className="bg-brand-cream">
        <div className="container-page py-14 lg:py-20">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">Legal</p>
          <h1 id={id} className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl">
            {title}
          </h1>
        </div>
      </section>
      <div className="container-page max-w-3xl space-y-10 py-16 lg:py-20">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-serif text-2xl sm:text-3xl">{section.heading}</h2>
            <div className="mt-3 text-[17px] leading-relaxed text-ink-muted">{section.body}</div>
          </section>
        ))}
      </div>
    </>
  );
}
