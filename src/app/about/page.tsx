import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CategoryIcon } from "@/components/brand/category-icon";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, categoryOrder } from "@/data/products";
import { siteConfig, tenant } from "@/lib/site";
import birthCenter from "../../../public/brand/birth-center.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "CP Birth Center is a family-centered birthing center in Southern Utah. Our practitioners now share the daily wellness protocols they recommend to women at every stage of life.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | CP Birth Center", url: "/about" },
};

const roots = [
  "CP Birth Center is a stand-alone birthing center. Our guiding principle is a belief in a woman’s right to choose a high-quality, low-risk birth outside of the hospital, with minimal medical intervention.",
  "It is a family-centered experience that guides women to trust their bodies through labor and birth. A woman, her partner, and her support people can feel cared for in a quiet, peaceful environment, and we are affiliated with the OB/GYN providers at St. George Regional Hospital should a labor or birth become high risk.",
  "Across the US, many rural hospitals are closing their obstetric units as the cost of care climbs. The birth center model answers many of those problems, offering a significantly lower price for birth while honoring the wishes of a mom-to-be and her family.",
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="about-title" className="overflow-hidden bg-brand-cream">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-20">
          <SectionHeading
            as="h1"
            id="about-title"
            eyebrow="Our story"
            title={
              <>
                From the birthing room to your <em className="text-brand-forest">daily</em> routine
              </>
            }
            description={`CP Birth Center began as a peaceful, family-centered place to give birth in ${siteConfig.region}. Our protocols carry that same care into the everyday.`}
          />
          <div className="overflow-hidden rounded-card rounded-tl-[9rem] bg-white shadow-soft">
            <Image
              src={birthCenter}
              alt="An expecting couple sitting together in a calm, sunlit room at CP Birth Center"
              preload
              placeholder="blur"
              sizes="(min-width: 64rem) 50vw, 100vw"
              className="aspect-[16/10] w-full object-cover object-[70%_center]"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="roots-title" className="container-page py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <h2 id="roots-title" className="font-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:sticky lg:top-28">
              A peaceful, family-centered place to give birth
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-relaxed text-ink-muted">
            {roots.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="practitioner-title" className="bg-brand-forest py-20 text-white lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/80">Meet our midwife</p>
            <h2 id="practitioner-title" className="mt-4 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Joanne T. Yarrish, CNM, FNP
            </h2>
            <p className="mt-4 text-white/85">Certified Nurse-Midwife and Family Nurse Practitioner</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/20 pt-8">
              <div>
                <dt className="text-sm text-white/75">Years in women&rsquo;s care</dt>
                <dd className="mt-1 font-serif text-4xl">33</dd>
              </div>
              <div>
                <dt className="text-sm text-white/75">Focus</dt>
                <dd className="mt-1 font-medium leading-snug">OB, GYN, and whole-life women&rsquo;s health</dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-relaxed text-white/90">
            <p>
              Joanne was educated at the University of Utah in Salt Lake City and the University of Texas
              Medical Branch in Galveston. For 33 years she has specialized in obstetric and gynecologic
              care, providing comprehensive prenatal care, labor and delivery, and postpartum care.
            </p>
            <p>
              She also cares for women across their entire lifespan, helping with urinary, menstrual, and
              gynecologic concerns, and in recent years has offered bio-identical hormone replacement therapy
              as a natural approach to hormone support.
            </p>
            <p>
              Above all, she loves partnering with people to create their best lives. That is the heart of
              every protocol we offer.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="protocols-story-title" className="container-page py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            id="protocols-story-title"
            title="Why we created our protocols"
            description="In the exam room, the same questions come up again and again: hormones that feel out of rhythm, digestion that changed after a baby, stress, low energy, and a body that needs more support through the seasons. Our protocols bring the answers our practitioners trust into one simple daily routine."
          />
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categoryOrder.map((key, index) => (
            <Reveal as="li" key={key} delay={index * 0.05}>
              <div className="flex h-full flex-col gap-4 rounded-card border border-line p-6">
                <span className="grid size-11 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                  <CategoryIcon category={key} size={22} />
                </span>
                <div>
                  <h3 className="font-semibold">{categories[key].label}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-muted">{categories[key].blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/protocols" size="lg">
            Explore Protocols
            <ArrowRight size={16} weight="bold" aria-hidden />
          </ButtonLink>
          <ExternalButton href={tenant.shopUrl} size="lg" variant="secondary">
            Visit Shop
          </ExternalButton>
        </div>
      </section>
    </>
  );
}
