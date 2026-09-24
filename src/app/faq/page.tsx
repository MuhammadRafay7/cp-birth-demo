import type { Metadata } from "next";
import { FaqList } from "@/components/faq/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqGroups, faqs } from "@/data/faqs";
import { ctaLabel } from "@/lib/site";
import { faqJsonLd, JsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about birth at CP Birth Center, hormone therapy, and booking your first consultation.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | CP Birth Center", url: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section aria-labelledby="faq-title" className="bg-brand-cream">
        <div className="container-page py-14 lg:py-20">
          <SectionHeading
            as="h1"
            id="faq-title"
            title="Frequently asked questions"
            description="Answers to the questions families ask most about birth at the center, hormone therapy, and getting started."
          />
        </div>
      </section>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[14rem_1fr] lg:gap-20 lg:py-24">
        <nav aria-label="FAQ topics" className="hidden lg:block">
          <ul className="sticky top-28 space-y-3 text-[15px]">
            {faqGroups.map((group) => (
              <li key={group}>
                <a href={`#${slugify(group)}`} className="text-brand-forest hover:underline">
                  {group}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {faqGroups.map((group) => (
            <section key={group} id={slugify(group)} aria-labelledby={`${slugify(group)}-title`}>
              <h2 id={`${slugify(group)}-title`} className="mb-4 font-serif text-2xl sm:text-3xl">
                {group}
              </h2>
              <FaqList items={faqs.filter((faq) => faq.group === group)} name={slugify(group)} />
            </section>
          ))}

          <div className="rounded-card bg-brand-sage-soft p-7 sm:p-8">
            <h2 className="font-serif text-2xl">Still have a question?</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink-muted">
              Katherine is happy to answer your questions and set up your first visit.
            </p>
            <ButtonLink href="/contact" className="mt-6">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-");
}
