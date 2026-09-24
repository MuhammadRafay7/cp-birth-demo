import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqList } from "@/components/faq/faq-list";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/content";

const teaserQuestions = [
  "Where do I place an order?",
  "What is the difference between Foundations, Essentials+, and Ultimate?",
  "Can I take a protocol while pregnant or breastfeeding?",
];

export function FaqNewsletter() {
  const teaser = faqs.filter((faq) => teaserQuestions.includes(faq.question));

  return (
    <section aria-labelledby="faq-teaser-title" className="container-page py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <Reveal>
          <SectionHeading id="faq-teaser-title" title="Questions, answered" />
          <div className="mt-8">
            <FaqList items={teaser} name="faq-teaser" />
          </div>
          <ButtonLink href="/faq" variant="ghost" className="mt-6">
            See all questions
            <ArrowRight size={16} weight="bold" aria-hidden />
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col justify-center rounded-card bg-brand-forest px-6 py-10 text-white sm:px-10 lg:py-14">
            <SectionHeading
              id="newsletter-title"
              tone="inverse"
              title="Notes from our practitioners"
              description="Seasonal guidance, nutrition know-how, and first word on new protocols, once a month."
            />
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
