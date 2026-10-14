import type { Metadata } from "next";
import { SupplementQuiz } from "@/components/supplements/supplement-quiz";

export const metadata: Metadata = {
  title: "Supplement Quiz",
  description:
    "Answer a few questions about how you feel and get matched with the PharmaBuilt supplement protocols that fit you best.",
  alternates: { canonical: "/supplements" },
  openGraph: { title: "Supplement Quiz | CP Birth Center", url: "/supplements" },
};

export default function SupplementsPage() {
  return (
    <section aria-labelledby="supplements-title" className="relative overflow-hidden bg-brand-cream">
      <h1 id="supplements-title" className="sr-only">
        Supplement quiz
      </h1>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-brand-sage/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-24 size-[30rem] rounded-full bg-brand-clay/10 blur-3xl"
      />
      <div className="container-page relative flex min-h-[calc(100svh-4.5rem)] items-start py-10 sm:py-16">
        <SupplementQuiz />
      </div>
    </section>
  );
}
