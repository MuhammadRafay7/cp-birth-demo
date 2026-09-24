import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, HandHeart, Leaf, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { ConsultCta } from "@/components/layout/consult-cta";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ctaLabel, siteConfig } from "@/lib/site";
import joanne from "../../../public/images/joanne-4x5.jpg";
import newborn from "../../../public/images/newborn-detail.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Joanne T. Yarrish, CNM, FNP, and the story behind CP Birth Center, a stand-alone, family-centered birth center in Southern Utah.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | CP Birth Center", url: "/about" },
};

const values: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Leaf,
    title: "Natural",
    body: "A high-quality, low-risk birth outside the hospital, with minimal medical intervention.",
  },
  {
    icon: UsersThree,
    title: "Family-centered",
    body: "Partners and support people are cared for together, and the wishes of each mom-to-be and her family are honored.",
  },
  {
    icon: HandHeart,
    title: "Peaceful",
    body: "Women are guided to trust their bodies through labor and birth, in a quiet, peaceful environment.",
  },
];

const credentials = [
  {
    term: "CNM",
    detail:
      "A Certified Nurse-Midwife is a registered nurse with graduate training in midwifery, licensed to provide prenatal, birth, and gynecologic care.",
  },
  {
    term: "FNP",
    detail: "A Family Nurse Practitioner provides primary care for patients of all ages.",
  },
];

export default function AboutPage() {
  const coordinatorFirstName = siteConfig.coordinator.split(" ")[0];

  return (
    <>
      <section aria-labelledby="about-title" className="overflow-hidden bg-brand-cream">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          <SectionHeading
            as="h1"
            id="about-title"
            eyebrow="About"
            title={
              <>
                A birth center built on a woman&rsquo;s <em className="text-brand-forest">right to choose</em>
              </>
            }
            description={`CP Birth Center is a stand-alone birthing center in ${siteConfig.region}, led by a certified nurse-midwife with ${siteConfig.midwife.years} years of experience.`}
          />
          <figure>
            <div className="overflow-hidden rounded-card rounded-tl-[9rem] bg-white shadow-soft">
              <Image
                src={joanne}
                alt="Joanne Yarrish, a certified nurse-midwife, smiling outdoors in front of red autumn leaves"
                preload
                placeholder="blur"
                sizes="(min-width: 64rem) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink-muted">
              {siteConfig.midwife.name}, {siteConfig.midwife.credentials}
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="story-title" className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2
              id="story-title"
              className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:sticky lg:top-28"
            >
              Our story
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-relaxed text-ink-muted">
            <p>
              CP Birth Center is a stand-alone birthing center, built on a woman&rsquo;s right to choose a
              high-quality, low-risk birth outside the hospital, with minimal medical intervention.
            </p>
            <p>
              In the US, many rural hospitals are closing their maternity units because obstetric care has become
              so expensive. The birth center model answers many of these problems and offers birth at a
              significantly lower price. CP Birth Center brings that model to {siteConfig.region} families,
              offering real choices and honoring the wishes of each mom-to-be and her family.
            </p>
            <p>
              We&rsquo;re affiliated with the OB/GYN providers at {siteConfig.hospital}, so if a labor or birth
              becomes high-risk, you move to hospital care without losing time.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="mission-title" className="border-y border-line bg-brand-cream py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              id="mission-title"
              eyebrow="Our mission"
              title="Natural, family-centered, peaceful."
              description="Our guiding principle is a woman’s right to choose a high-quality, low-risk birth outside the hospital. Everything we do grows from three simple commitments."
            />
          </Reveal>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {values.map(({ icon: ValueIcon, title, body }, index) => (
              <Reveal as="li" key={title} delay={index * 0.06}>
                <div className="h-full rounded-card bg-white p-7 sm:p-8">
                  <span className="grid size-12 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                    <ValueIcon size={24} weight="light" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="practitioner-title" className="bg-brand-forest py-20 text-white lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80">Meet Joanne</p>
            <h2 id="practitioner-title" className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              {siteConfig.midwife.name}, {siteConfig.midwife.credentials}
            </h2>
            <p className="mt-4 text-white/85">{siteConfig.midwife.title}</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-8">
              <div>
                <dt className="text-sm text-white/75">Years in obstetric &amp; gynecologic care</dt>
                <dd className="mt-1 font-serif text-4xl">{siteConfig.midwife.years}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/75">Educated at</dt>
                <dd className="mt-1 font-medium leading-snug">
                  University of Utah &amp; University of Texas Medical Branch
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-relaxed text-white/90">
            <p>
              Joanne was educated at the University of Utah in Salt Lake City and the University of Texas Medical
              Branch in Galveston.
            </p>
            <p>
              For {siteConfig.midwife.years} years she has specialized in obstetric and gynecologic care:
              comprehensive prenatal care, labor and delivery, and postpartum care. She also cares for women across
              their lifespan and can help with urinary, menstrual, and gynecologic concerns.
            </p>
            <p>
              For the last five years she has offered bio-identical hormone replacement therapy, a natural approach
              to hormone support, for both women and men.
            </p>
            <p>
              Outside the clinic she loves football, gardening, music, and time with her husband and two young
              daughters. Above all, she loves partnering with people to create their best life.
            </p>
            <dl className="grid gap-5 border-t border-white/20 pt-8 text-[15px] sm:grid-cols-2">
              {credentials.map((item) => (
                <div key={item.term}>
                  <dt className="font-serif text-2xl text-white">{item.term}</dt>
                  <dd className="mt-1 leading-relaxed text-white/80">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="team-title" className="container-page py-20 lg:py-28">
        <Reveal>
          <SectionHeading id="team-title" title="The people you’ll meet" />
        </Reveal>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal as="li">
            <article className="flex h-full gap-5 rounded-card border border-line bg-white p-6 sm:p-7">
              <Image
                src={joanne}
                alt=""
                placeholder="blur"
                sizes="96px"
                className="size-20 shrink-0 rounded-full object-cover object-top sm:size-24"
              />
              <div>
                <h3 className="font-serif text-2xl">{siteConfig.midwife.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-forest">
                  {siteConfig.midwife.credentials} &middot; Midwife
                </p>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  Provides prenatal care, attends births at the center, cares for you after birth, and prescribes
                  hormone therapy after a consultation.
                </p>
              </div>
            </article>
          </Reveal>
          <Reveal as="li" delay={0.06}>
            <article className="flex h-full gap-5 rounded-card border border-line bg-white p-6 sm:p-7">
              <span
                aria-hidden
                className="grid size-20 shrink-0 place-items-center rounded-full bg-brand-sage-soft font-serif text-2xl text-brand-forest sm:size-24"
              >
                KN
              </span>
              <div>
                <h3 className="font-serif text-2xl">{siteConfig.coordinator}</h3>
                <p className="mt-1 text-sm font-medium text-brand-forest">Consultations</p>
                <p className="mt-3 leading-relaxed text-ink-muted">
                  {coordinatorFirstName} handles all consultations, for birth care and hormone therapy. She&rsquo;ll
                  answer your questions and set up your first visit.
                </p>
              </div>
            </article>
          </Reveal>
        </ul>

        <Reveal className="mt-16">
          <div className="grid items-center gap-10 overflow-hidden rounded-card bg-brand-cream md:grid-cols-[1fr_1.1fr]">
            <Image
              src={newborn}
              alt="A sleeping newborn wrapped in a sage-green swaddle"
              placeholder="blur"
              sizes="(min-width: 48rem) 45vw, 100vw"
              className="aspect-[4/3] size-full object-cover md:aspect-auto"
            />
            <div className="p-7 pt-0 sm:p-10 md:pl-0">
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">See how birth at the center works</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted">
                From your first prenatal visit to the weeks after your baby arrives.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/birth-center" size="lg">
                  Birth at the center
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/contact" size="lg" variant="secondary">
                  {ctaLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <ConsultCta />
    </>
  );
}
