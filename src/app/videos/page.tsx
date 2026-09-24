import type { Metadata } from "next";
import Image from "next/image";
import { ChatCircleText } from "@phosphor-icons/react/dist/ssr";
import { ConsultCta } from "@/components/layout/consult-cta";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";
import stillLife from "../../../public/images/videos-still-life.jpg";

export const metadata: Metadata = {
  title: "Teaching Videos",
  description:
    "Short lessons on pregnancy, birth, postpartum, and hormone health from Joanne T. Yarrish, CNM, FNP.",
  alternates: { canonical: "/videos" },
  openGraph: { title: "Teaching Videos | CP Birth Center", url: "/videos" },
};

const topics = ["Pregnancy", "Birth", "Postpartum", "Hormone health"];

export default function VideosPage() {
  const coordinatorFirstName = siteConfig.coordinator.split(" ")[0];

  return (
    <>
      <section aria-labelledby="videos-title" className="bg-brand-cream">
        <div className="container-page py-14 lg:py-20">
          <SectionHeading
            as="h1"
            id="videos-title"
            eyebrow="Learn"
            title="Teaching videos from Joanne."
            description={`Short lessons on pregnancy, birth, postpartum, and hormone health, from a midwife with ${siteConfig.midwife.years} years of experience.`}
          />
        </div>
      </section>

      <section aria-labelledby="coming-title" className="container-page py-16 lg:py-24">
        <Reveal>
          <div className="grid overflow-hidden rounded-card border border-line bg-white md:grid-cols-[1.2fr_1fr]">
            <Image
              src={stillLife}
              alt="A wooden table with a notebook, a wooden fetal stethoscope, a cup of tea, and a phone on a small tripod"
              placeholder="blur"
              sizes="(min-width: 48rem) 55vw, 100vw"
              className="aspect-[16/10] size-full object-cover md:aspect-auto"
            />
            <div className="p-7 sm:p-10">
              <h2 id="coming-title" className="font-serif text-3xl leading-tight sm:text-4xl">
                The first lessons are being recorded.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Joanne is filming short teaching videos on pregnancy, birth, postpartum, and hormone health. Want to
                know when they&rsquo;re ready? Ask {coordinatorFirstName} to let you know.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Topics">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-brand-sage/60 bg-brand-sage-soft px-3.5 py-1.5 text-sm text-brand-forest"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              <AnchorButton href={siteConfig.phone.sms} size="lg" className="mt-8">
                <ChatCircleText size={18} weight="bold" aria-hidden />
                Text {coordinatorFirstName}
              </AnchorButton>
            </div>
          </div>
        </Reveal>
      </section>

      <ConsultCta />
    </>
  );
}
