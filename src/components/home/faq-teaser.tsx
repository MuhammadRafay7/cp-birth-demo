import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { FaqList } from "@/components/faq/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/faqs";

const teaserQuestions = [
  "Can my partner and family be there?",
  "What happens if something changes during labor?",
  "Is birth at the center right for me?",
  "How do I book a consultation?",
];

export function FaqTeaser() {
  const teaser = teaserQuestions.flatMap((question) => faqs.find((faq) => faq.question === question) ?? []);

  return (
    <section aria-labelledby="faq-teaser-title" className="border-t border-line bg-brand-cream py-20 lg:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <SectionHeading
            id="faq-teaser-title"
            title="Questions families ask"
            description="The answers to what most families want to know before their first visit."
          />
          <ButtonLink href="/faq" variant="ghost" className="mt-6 font-semibold">
            All questions
            <ArrowRight size={16} weight="bold" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={0.08}>
          <FaqList items={teaser} name="faq-teaser" />
        </Reveal>
      </div>
    </section>
  );
}
