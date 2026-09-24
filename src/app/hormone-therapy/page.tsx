import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { ConsultCta } from "@/components/layout/consult-cta";
import { PageHeader } from "@/components/pages/page-header";
import { SymptomExplorer } from "@/components/pages/symptom-explorer";
import { AnchorButton, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ctaLabel, siteConfig } from "@/lib/site";
import hormoneHeader from "../../../public/images/hormone-header.jpg";
import menHormones from "../../../public/images/men-hormones.jpg";

export const metadata: Metadata = {
  title: "Hormone Therapy",
  description:
    "Bio-identical hormone replacement therapy (bHRT) for perimenopause and menopause, and for men with low testosterone, prescribed by Joanne T. Yarrish, CNM, FNP after a consultation.",
  alternates: { canonical: "/hormone-therapy" },
  openGraph: { title: "Hormone Therapy | CP Birth Center", url: "/hormone-therapy" },
};

const steps = [
  { title: `Call ${siteConfig.coordinator.split(" ")[0]}`, body: "She'll book your consultation and answer first questions." },
  { title: "Meet with Joanne", body: "Talk through your symptoms and health history." },
  { title: "Leave with a plan", body: "If bHRT is a good fit, Joanne prescribes it and follows up with you." },
];

export default function HormoneTherapyPage() {
  return (
    <>
      <PageHeader
        id="hormone-title"
        eyebrow="Hormone therapy · bHRT"
        title="Feel like yourself again."
        description="Joanne Yarrish, CNM, FNP, prescribes bio-identical hormone replacement therapy (bHRT). It can ease many of the symptoms that come with perimenopause and menopause."
        image={{
          src: hormoneHeader,
          alt: "A woman with short silver hair wrapped in a blanket on a porch step, face turned toward the morning sun",
        }}
      >
        <dl className="mb-8 grid max-w-xl gap-4 text-[15px] sm:grid-cols-2">
          <div className="border-l-2 border-brand-sage/70 pl-4">
            <dt className="font-semibold">Perimenopause</dt>
            <dd className="mt-1 leading-relaxed text-ink-muted">
              The years leading up to menopause, often starting in your 40s, when hormone levels begin to shift.
            </dd>
          </div>
          <div className="border-l-2 border-brand-sage/70 pl-4">
            <dt className="font-semibold">Menopause</dt>
            <dd className="mt-1 leading-relaxed text-ink-muted">Reached after 12 months in a row without a period.</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" size="lg">
            {ctaLabel}
          </ButtonLink>
          <ButtonLink href="#symptoms" size="lg" variant="secondary">
            Check your symptoms
          </ButtonLink>
        </div>
      </PageHeader>

      <section id="symptoms" aria-labelledby="symptoms-title" className="container-page scroll-mt-24 py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            id="symptoms-title"
            title="What you might be noticing."
            description="Many symptoms trace back to changes in three hormones. Choose your stage to see what’s common."
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <SymptomExplorer />
        </Reveal>
        <Reveal className="mt-12">
          <div className="flex flex-col gap-6 rounded-card bg-brand-sage-soft p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-serif text-3xl leading-tight">Recognize a few of these?</p>
              <p className="mt-2 text-lg text-ink-muted">That&rsquo;s a good reason to talk with Joanne.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg">
                {ctaLabel}
              </ButtonLink>
              <AnchorButton href={siteConfig.phone.tel} size="lg" variant="secondary">
                <Phone size={18} weight="bold" aria-hidden />
                Call {siteConfig.phone.display}
              </AnchorButton>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Symptoms can have many causes. This list is for general information only and isn&rsquo;t a diagnosis.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="bhrt-title" className="border-y border-line bg-brand-cream py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading id="bhrt-title" eyebrow="About bHRT" title="Plant-derived, and matched to your body." />
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg leading-relaxed text-ink-muted">
            <p>
              Bio-identical hormones are made from plant sources, mainly soy and wild yam, and are designed to have
              the same structure as the hormones your body makes. That&rsquo;s why they&rsquo;re often called
              &ldquo;natural&rdquo; hormones. They&rsquo;re different from the synthetic hormones used in birth
              control and in some traditional hormone therapy.
            </p>
            <p>
              Hormone therapy isn&rsquo;t right for everyone. Joanne will talk through your symptoms, your health
              history, and the benefits and risks, so you can decide together whether bHRT fits you.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="start-title" className="container-page py-20 lg:py-28">
        <Reveal>
          <SectionHeading id="start-title" title="How it starts" />
        </Reveal>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.title} delay={index * 0.08} className="border-t-2 border-brand-sage/70 pt-6">
              <span aria-hidden className="font-serif text-5xl text-brand-forest">
                {index + 1}
              </span>
              <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="men" aria-labelledby="men-title" className="container-page scroll-mt-24 pb-4">
        <Reveal>
          <div className="grid items-center overflow-hidden rounded-card border border-line bg-white/70 sm:grid-cols-[0.8fr_1.2fr]">
            <Image
              src={menHormones}
              alt="A man with a greying beard pausing on a hiking trail in red rock country"
              placeholder="blur"
              sizes="(min-width: 40rem) 35vw, 100vw"
              className="aspect-square size-full object-cover"
            />
            <div className="p-7 sm:p-10">
              <h2 id="men-title" className="font-serif text-3xl leading-tight sm:text-4xl">
                Hormone therapy for men.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Joanne also prescribes bHRT for men with symptoms of low testosterone, such as fatigue, low libido,
                loss of muscle, and low mood.
              </p>
              <ButtonLink href="/contact" variant="secondary" size="lg" className="mt-7">
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
        <p className="mt-6 text-sm text-ink-muted">
          This page is general information, not medical advice. See our{" "}
          <Link href="/medical-disclaimer" className="text-brand-forest underline underline-offset-4">
            medical disclaimer
          </Link>
          .
        </p>
      </section>

      <ConsultCta />
    </>
  );
}
