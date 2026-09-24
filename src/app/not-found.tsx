import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60dvh] flex-col items-start justify-center py-24">
      <h1 className="font-serif text-5xl tracking-tight">We couldn&rsquo;t find that page</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
        It may have moved, or the link may be out of date. Our protocols are just a click away.
      </p>
      <ButtonLink href="/protocols" size="lg" className="mt-8">
        Explore Protocols
      </ButtonLink>
    </section>
  );
}
