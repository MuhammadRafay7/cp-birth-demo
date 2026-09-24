import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    title: "Choose your protocol",
    body: "Pick the focus that fits this season of life, from a single Foundations formula to a complete morning and evening routine.",
  },
  {
    title: "Take your daily packets",
    body: "Each serving arrives pre-portioned. Open your packet with breakfast, and for Essentials+ and Ultimate, another in the evening.",
  },
  {
    title: "Feel the difference",
    body: "A steady 30-day supply gives your body consistent support, so the routine becomes as natural as your morning coffee.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-brand-cream py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="how-title"
            align="center"
            title="Simple by design"
            description="No shelf of bottles, no guessing at doses. Just a routine that fits your day."
          />
        </Reveal>

        <ol className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-7 hidden h-px bg-brand-sage/60 md:block"
          />
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.1} className="relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full border border-brand-sage bg-white font-serif text-2xl text-brand-forest">
                {index + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
