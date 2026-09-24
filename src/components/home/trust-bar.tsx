import { Reveal } from "@/components/ui/reveal";

const facts = [
  { title: "CNM · FNP", body: "Certified Nurse-Midwife and Family Nurse Practitioner" },
  { title: "Prenatal to postpartum", body: "Care from your first visit to the weeks after birth" },
  { title: "Minimal intervention", body: "A high-quality, low-risk birth outside the hospital" },
  { title: "Women and men", body: "Bio-identical hormone therapy after a consultation" },
];

export function TrustBar() {
  return (
    <section aria-label="CP Birth Center at a glance" className="border-y border-line bg-white">
      <ul className="container-page grid gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:py-12">
        {facts.map((fact, index) => (
          <Reveal
            as="li"
            key={fact.title}
            delay={index * 0.05}
            className="lg:border-l lg:border-line lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="font-serif text-2xl leading-tight text-brand-forest">{fact.title}</p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{fact.body}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
