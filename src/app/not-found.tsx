import { ButtonLink } from "@/components/ui/button";
import { ctaLabel } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <h1 className="font-serif text-5xl tracking-tight">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
        It may have moved, or the link may be out of date.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg">
          Back to home
        </ButtonLink>
        <ButtonLink href="/contact" size="lg" variant="secondary">
          {ctaLabel}
        </ButtonLink>
      </div>
    </section>
  );
}
