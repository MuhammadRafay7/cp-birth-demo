import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ctaLabel, siteConfig } from "@/lib/site";
import joanne from "../../../public/images/joanne-4x5.jpg";

const facts = [
  { label: "Experience", value: `${siteConfig.midwife.years} years`, detail: "Obstetric & gynecologic care" },
  { label: "Education", value: "Utah & Texas", detail: "University of Utah · UTMB Galveston" },
  { label: "Also offers", value: "bHRT", detail: "Hormone therapy for women and men" },
];

export function AboutPreview() {
  return (
    <section aria-labelledby="midwife-title" className="overflow-hidden bg-brand-cream py-20 lg:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-[22rem] pb-6 pl-6 sm:max-w-sm lg:mx-0 lg:max-w-[26rem]">
            <div aria-hidden className="absolute inset-0 top-10 right-10 rounded-card bg-brand-sage/25" />
            <Image
              src={joanne}
              alt="Joanne Yarrish, a certified nurse-midwife, smiling outdoors in front of red autumn leaves"
              placeholder="blur"
              sizes="(min-width: 64rem) 26rem, 22rem"
              className="relative aspect-[4/5] w-full rounded-card object-cover shadow-soft"
            />
            <p className="absolute bottom-0 right-0 translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-forest shadow-soft sm:translate-x-6">
              {siteConfig.midwife.credentials}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7 lg:pl-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">Your midwife</p>
          <h2 id="midwife-title" className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.015em] sm:text-5xl">
            Meet Joanne.
          </h2>
          <p className="mt-3 font-medium text-ink/80">
            {siteConfig.midwife.name}, {siteConfig.midwife.title}
          </p>

          <p className="mt-8 border-l-2 border-brand-sage pl-5 font-serif text-2xl leading-snug text-brand-forest sm:text-[1.75rem]">
            Above all, she loves partnering with people to create their best life.
          </p>

          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-muted">
            For {siteConfig.midwife.years} years Joanne has provided prenatal care, labor and delivery, and
            postpartum care, and she cares for women across their lifespan, including urinary, menstrual, and
            gynecologic concerns.
          </p>

          <dl className="mt-9 grid gap-6 border-t border-brand-sage/40 pt-7 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{fact.label}</dt>
                <dd className="mt-2 font-serif text-2xl leading-none text-ink">{fact.value}</dd>
                <dd className="mt-2 text-sm leading-snug text-ink-muted">{fact.detail}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/about" size="lg">
              More about Joanne
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary" size="lg">
              {ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
