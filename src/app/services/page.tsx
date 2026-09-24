import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { ConsultCta } from "@/components/layout/consult-cta";
import { PageHeader } from "@/components/pages/page-header";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/data/services";
import { cn } from "@/lib/format";
import { ctaLabel } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Birth at the center, prenatal and postpartum care, bio-identical hormone therapy for women and men, and women's health care at every stage.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | CP Birth Center", url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        id="services-title"
        eyebrow="Services"
        title="Care for every stage, not only pregnancy."
        description="From a peaceful, midwife-attended birth to hormone support in perimenopause and beyond, every service starts with a conversation with Joanne."
      >
        <ButtonLink href="/contact" size="lg">
          {ctaLabel}
        </ButtonLink>
      </PageHeader>

      <div className="container-page space-y-6 py-16 lg:space-y-10 lg:py-24">
        {services.map((service, index) => (
          <Reveal key={service.slug}>
            <article
              id={service.slug}
              aria-labelledby={`${service.slug}-title`}
              className="grid scroll-mt-28 overflow-hidden rounded-card border border-line bg-white/70 md:grid-cols-[0.9fr_1.1fr]"
            >
              <div className={cn("relative min-h-64 md:min-h-full", index % 2 === 1 && "md:order-last")}>
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 48rem) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">{service.kicker}</p>
                <h2
                  id={`${service.slug}-title`}
                  className="mt-3 font-serif text-3xl leading-tight tracking-[-0.01em] sm:text-4xl"
                >
                  {service.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-ink">{service.summary}</p>
                <div className="mt-4 space-y-3 leading-relaxed text-ink-muted">
                  {service.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <ul className="mt-7 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                        <Check size={12} weight="bold" aria-hidden />
                      </span>
                      <span>
                        <span className="block font-semibold">{item.title}</span>
                        <span className="block text-[15px] leading-relaxed text-ink-muted">{item.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="group mt-8 inline-flex items-center gap-2 font-semibold text-brand-forest"
                >
                  <span className="underline decoration-brand-sage/50 underline-offset-[6px] group-hover:decoration-brand-forest">
                    {service.linkLabel}
                  </span>
                  <ArrowRight size={16} weight="bold" aria-hidden />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <ConsultCta />
    </>
  );
}
