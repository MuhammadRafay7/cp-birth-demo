import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import birthPath from "../../../public/images/home-birth-path.jpg";
import hormonesPath from "../../../public/images/home-hormones-path.jpg";
import newborn from "../../../public/images/newborn-detail.jpg";

const paths = [
  {
    kicker: "Birth",
    title: "Birth, on your terms",
    body: "Prenatal visits, labor and birth, and postpartum care in a quiet, family-centered setting, with minimal medical intervention.",
    href: "/birth-center",
    link: "How birth at the center works",
    image: birthPath,
    alt: "A pregnant woman sitting on a bed by a window, one hand resting on her belly",
  },
  {
    kicker: "Hormones",
    title: "Feel like yourself again",
    body: "Bio-identical hormone therapy for the changes of perimenopause and menopause, prescribed by Joanne after a one-on-one consultation.",
    href: "/hormone-therapy",
    link: "See symptoms and options",
    image: hormonesPath,
    alt: "A woman in her fifties laughing at an outdoor table, holding a mug",
  },
  {
    kicker: "Women’s health",
    title: "Care for every stage",
    body: "Help with urinary, menstrual, and gynecologic concerns across a woman’s life, not only during pregnancy.",
    href: "/services#womens-health",
    link: "Women’s health care",
    image: newborn,
    alt: "A sleeping newborn wrapped in a sage-green swaddle",
  },
];

export function ServicesPreview() {
  return (
    <section aria-labelledby="services-title" className="container-page py-20 lg:py-28">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="services-title"
          eyebrow="Our care"
          title="Care from pregnancy through every stage after"
        />
        <ButtonLink href="/services" variant="secondary" className="self-start md:self-auto">
          All services
        </ButtonLink>
      </Reveal>

      <ul className="mt-12 grid gap-6 md:grid-cols-3">
        {paths.map((path, index) => (
          <Reveal as="li" key={path.title} delay={index * 0.08} className={index === 1 ? "md:mt-12" : undefined}>
            <Link href={path.href} className="group block">
              <div className="overflow-hidden rounded-card bg-brand-cream-deep">
                <Image
                  src={path.image}
                  alt={path.alt}
                  placeholder="blur"
                  sizes="(min-width: 48rem) 30vw, 100vw"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">{path.kicker}</p>
              <h3 className="mt-2 font-serif text-3xl leading-tight">{path.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{path.body}</p>
              <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-forest">
                <span className="underline decoration-brand-sage/50 underline-offset-[6px] group-hover:decoration-brand-forest">
                  {path.link}
                </span>
                <ArrowRight size={16} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
