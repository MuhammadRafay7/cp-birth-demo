import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CategoryIcon } from "@/components/brand/category-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories, categoryOrder, products, type ProductCategory } from "@/data/products";
import { cn } from "@/lib/format";

const tones: Record<ProductCategory, { card: string; icon: string; muted: string; span: string }> = {
  "womens-health": {
    card: "bg-brand-forest text-white",
    icon: "bg-white/15 text-white",
    muted: "text-white/80",
    span: "lg:col-span-3 lg:row-span-2 lg:min-h-[22rem]",
  },
  "gut-health": {
    card: "bg-brand-sage-soft text-ink",
    icon: "bg-white text-brand-forest",
    muted: "text-ink-muted",
    span: "lg:col-span-3",
  },
  mood: {
    card: "bg-brand-cream text-ink",
    icon: "bg-white text-brand-forest",
    muted: "text-ink-muted",
    span: "lg:col-span-1",
  },
  energy: {
    card: "bg-brand-cream text-ink",
    icon: "bg-white text-brand-forest",
    muted: "text-ink-muted",
    span: "lg:col-span-1",
  },
  immunity: {
    card: "border border-line bg-white text-ink",
    icon: "bg-brand-sage-soft text-brand-forest",
    muted: "text-ink-muted",
    span: "lg:col-span-1",
  },
};

export function CategoryCards() {
  return (
    <section aria-labelledby="categories-title" className="container-page py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          id="categories-title"
          title="Find the support your body is asking for"
          description="Five focused areas of care, each with a protocol built around how women actually feel day to day."
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {categoryOrder.map((key, index) => {
          const tone = tones[key];
          const matching = products.filter((product) => product.category === key);
          const count = matching.length;
          return (
            <Reveal
              as="li"
              key={key}
              delay={index * 0.06}
              className={cn(key === "womens-health" && "sm:col-span-2", tone.span)}
            >
              <Link
                href={`/protocols?category=${key}`}
                className={cn(
                  "group flex h-full min-h-[13rem] flex-col justify-between gap-8 rounded-card p-6 transition-shadow duration-300 hover:shadow-soft sm:p-7",
                  tone.card,
                )}
              >
                <span className={cn("grid size-12 place-items-center rounded-full", tone.icon)}>
                  <CategoryIcon category={key} size={24} />
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-serif leading-tight",
                      key === "womens-health" ? "text-3xl sm:text-4xl" : "text-2xl",
                    )}
                  >
                    {categories[key].label}
                  </span>
                  <span className={cn("mt-2 block text-[15px] leading-relaxed", tone.muted)}>
                    {categories[key].blurb}
                  </span>
                  {key === "womens-health" && (
                    <span className="mt-6 hidden flex-wrap gap-2 sm:flex">
                      {matching.map((product) => (
                        <span
                          key={product.slug}
                          className="rounded-full border border-white/30 px-3 py-1 text-sm text-white/90"
                        >
                          {product.tier}
                        </span>
                      ))}
                    </span>
                  )}
                  <span className="mt-5 flex items-center gap-2 text-sm font-semibold">
                    {count} {count === 1 ? "protocol" : "protocols"}
                    <ArrowRight
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
