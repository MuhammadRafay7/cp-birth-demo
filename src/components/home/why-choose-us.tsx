import Image from "next/image";
import { Buildings, HandHeart, House, Users } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site";
import landscape from "../../../public/images/utah-landscape.jpg";

const reasons: { icon: Icon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Family-centered",
    body: "You, your partner, and your support people are cared for together, in a quiet, peaceful environment.",
  },
  {
    icon: HandHeart,
    title: "Minimal intervention",
    body: "Women are guided to trust their bodies through labor and birth, with a midwife beside them.",
  },
  {
    icon: Buildings,
    title: "A hospital team behind you",
    body: `If a labor or birth becomes high-risk, you move to the OB/GYN providers at ${siteConfig.hospital} without losing time.`,
  },
  {
    icon: House,
    title: "Closer to home",
    body: "The birth center model offers birth at a significantly lower price, right here in Southern Utah.",
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="container-page py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <SectionHeading
              id="why-title"
              eyebrow="Why a birth center"
              title="Good care shouldn’t depend on how close the hospital is."
              description="In the US, many rural hospitals are closing their maternity units because obstetric care has become so expensive. CP Birth Center brings the birth center model to Southern Utah families, offering real choices and honoring the wishes of each mom-to-be and her family."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <Image
              src={landscape}
              alt="Red sandstone cliffs at sunrise"
              placeholder="blur"
              sizes="(min-width: 64rem) 45vw, 100vw"
              className="aspect-[3/2] w-full rounded-card object-cover"
            />
          </Reveal>
        </div>

        <ul className="grid content-center gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {reasons.map(({ icon: ReasonIcon, title, body }, index) => (
            <Reveal as="li" key={title} delay={index * 0.06}>
              <div className="h-full rounded-card border border-line bg-white/60 p-6 sm:p-7">
                <span className="grid size-11 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                  <ReasonIcon size={22} weight="light" aria-hidden />
                </span>
                <h3 className="mt-5 font-serif text-2xl leading-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
