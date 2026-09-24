import { Quotes, Star } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials, type Testimonial } from "@/data/content";
import { cn } from "@/lib/format";

function Rating({ value }: { value: Testimonial["rating"] }) {
  return (
    <div role="img" aria-label={`Rated ${value} out of 5`} className="flex gap-0.5 text-brand-sage">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={16} weight={index < value ? "fill" : "regular"} aria-hidden />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, featured }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between rounded-card p-7 sm:p-8",
        featured ? "bg-brand-forest text-white lg:p-12" : "bg-white",
      )}
    >
      <div>
        {featured ? (
          <Quotes size={36} weight="fill" className="text-brand-sage" aria-hidden />
        ) : (
          <Rating value={testimonial.rating} />
        )}
        <blockquote
          className={cn("mt-5 text-pretty font-serif leading-snug", featured ? "text-2xl lg:text-[2rem]" : "text-xl")}
        >
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
      </div>
      <figcaption className="mt-8 flex items-end justify-between gap-4">
        <span>
          <span className="block text-[15px] font-semibold">{testimonial.name}</span>
          <span className={cn("block text-sm", featured ? "text-white/80" : "text-ink-muted")}>
            {testimonial.detail}
          </span>
        </span>
        {featured && (
          <span className="text-white">
            <Rating value={testimonial.rating} />
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section aria-labelledby="reviews-title" className="bg-brand-cream py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading id="reviews-title" title="In their words" />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <Reveal>
            <TestimonialCard testimonial={featured} featured />
          </Reveal>
          <div className="grid gap-4">
            {rest.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={(index + 1) * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
