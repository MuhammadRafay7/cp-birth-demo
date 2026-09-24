import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Buildings, Heartbeat, HandHeart } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { FaqList } from "@/components/faq/faq-list";
import { ConsultCta } from "@/components/layout/consult-cta";
import { PageHeader } from "@/components/pages/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";
import { ctaLabel, siteConfig } from "@/lib/site";
import birthRoom from "../../../public/images/birth-room.jpg";
import postpartum from "../../../public/images/postpartum.jpg";

export const metadata: Metadata = {
  title: "Birth Center",
  description:
    "A stand-alone, family-centered birth center in Southern Utah. Prenatal care, a midwife-attended birth, and postpartum care, with hospital backup at St. George Regional Hospital.",
  alternates: { canonical: "/birth-center" },
  openGraph: { title: "Birth Center | CP Birth Center", url: "/birth-center" },
};

const journey: { icon: Icon; title: string; body: string }[] = [
  { icon: Heartbeat, title: "Prenatal care", body: "Regular visits with Joanne through your pregnancy." },
  {
    icon: HandHeart,
    title: "Labor & birth",
    body: "A midwife-attended birth at the center, surrounded by the people you choose.",
  },
  { icon: Baby, title: "Postpartum care", body: "Support for you and your baby in the weeks after birth." },
];

const birthQuestions = [
  "Can my partner and family be there?",
  "What happens if something changes during labor?",
  "Is birth at the center right for me?",
];

export default function BirthCenterPage() {
  const questions = birthQuestions.flatMap((question) => faqs.find((faq) => faq.question === question) ?? []);

  return (
    <>
      <PageHeader
        id="birth-title"
        eyebrow="Birth"
        title="A quiet place to have your baby."
        description="CP Birth Center is a stand-alone birthing center. Our guiding principle is a woman’s right to choose a high-quality, low-risk birth outside the hospital, with minimal medical intervention."
        image={{
          src: birthRoom,
          alt: "A pregnant woman leaning forward on a birthing ball beside a low bed while her partner rests a hand on her back",
        }}
      >
        <ButtonLink href="/contact" size="lg">
          {ctaLabel}
        </ButtonLink>
      </PageHeader>

      <section aria-labelledby="family-title" className="container-page py-20 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading id="family-title" title="Family-centered, from the first visit." />
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-xl leading-relaxed text-ink-muted">
              It&rsquo;s a birthing experience that guides women to trust their bodies through labor and birth.
              You, your partner, and your support people are cared for together, in a quiet, peaceful
              environment.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="border-y border-line bg-brand-cream py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="journey-title" title="Care from pregnancy to postpartum." />
          </Reveal>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {journey.map(({ icon: StepIcon, title, body }, index) => (
              <Reveal as="li" key={title} delay={index * 0.08} className="border-t-2 border-brand-sage/70 pt-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full bg-white text-brand-forest">
                    <StepIcon size={24} weight="light" aria-hidden />
                  </span>
                  <span aria-hidden className="font-serif text-4xl text-brand-sage">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-2xl">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="backup-title" className="container-page py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Image
              src={postpartum}
              alt="A mother resting in bed holding her swaddled newborn while her partner leans in close"
              placeholder="blur"
              sizes="(min-width: 64rem) 45vw, 100vw"
              className="aspect-[4/5] w-full rounded-card object-cover"
            />
          </Reveal>
          <div className="space-y-12">
            <Reveal>
              <span className="grid size-12 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                <Buildings size={24} weight="light" aria-hidden />
              </span>
              <h2 id="backup-title" className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">
                A hospital team behind you.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                We&rsquo;re affiliated with the OB/GYN providers at {siteConfig.hospital}, so if a labor or birth
                becomes high-risk, you move to hospital care without losing time.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                Made for healthy, low-risk pregnancies.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Birth centers are designed for healthy, low-risk pregnancies. At your first consultation, Joanne
                will talk through your health history and whether birth at the center is a good fit for you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="birth-faq-title" className="border-t border-line bg-brand-cream py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading id="birth-faq-title" title="Common questions about birth at the center" />
          </Reveal>
          <Reveal delay={0.08}>
            <FaqList items={questions} name="birth-faq" openFirst />
          </Reveal>
        </div>
      </section>

      <ConsultCta />
    </>
  );
}
