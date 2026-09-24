import Image from "next/image";
import { CalendarCheck, Flask, SealCheck, Stethoscope } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import birthCenter from "../../../public/brand/birth-center.jpg";

const values: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Stethoscope,
    title: "Practitioner formulated",
    body: "Shaped by more than three decades of midwifery and women’s health care.",
  },
  {
    icon: Flask,
    title: "Full-spectrum blends",
    body: "Complementary ingredients in signature blends like Elanivra™ and Digessura™.",
  },
  {
    icon: CalendarCheck,
    title: "30-day supplies",
    body: "A full month of pre-portioned packets in every protocol.",
  },
  {
    icon: SealCheck,
    title: "Premium quality",
    body: "Well-absorbed nutrient forms, from methylated B vitamins to magnesium bis-glycinate.",
  },
];

export function BrandValues() {
  return (
    <section aria-labelledby="values-title" className="container-page py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-t-full rounded-b-card bg-brand-cream">
            <Image
              src={birthCenter}
              alt="An expecting couple sitting together in a calm, sunlit room at CP Birth Center"
              sizes="(min-width: 64rem) 40vw, 100vw"
              placeholder="blur"
              className="aspect-[4/5] w-full object-cover object-[78%_center]"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              id="values-title"
              eyebrow="Why CP Birth Center"
              title="The same care, carried into every day"
              description="Our protocols grew out of the conversations we have with women before, during, and long after birth."
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {values.map(({ icon: ValueIcon, title, body }, index) => (
              <Reveal as="li" key={title} delay={index * 0.06}>
                <span className="grid size-12 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                  <ValueIcon size={24} weight="light" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
