import Link from "next/link";
import { CategoryIcon } from "@/components/brand/category-icon";
import { ProductVisual } from "@/components/brand/product-visual";
import { ButtonLink, ExternalButton } from "@/components/ui/button";
import { categories, getProductBySlug, products, type Product } from "@/data/products";
import { cn, formatPrice } from "@/lib/format";
import { tenant } from "@/lib/site";

function pick(slug: string): Product {
  const product = getProductBySlug(slug);
  if (!product) throw new Error(`Unknown product: ${slug}`);
  return product;
}

function MiniCard({ product, className }: { product: Product; className?: string }) {
  return (
    <Link
      href={`/protocols/${product.slug}`}
      className={cn(
        "absolute flex w-[13.5rem] items-center gap-3 rounded-2xl bg-white/95 p-3.5 pr-4 shadow-lift ring-1 ring-black/5 backdrop-blur transition-transform duration-300 hover:-translate-y-1 sm:w-60",
        className,
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
        <CategoryIcon category={product.category} size={22} />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-forest">
          {categories[product.category].label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-ink">{product.tier} Protocol</span>
        <span className="block text-sm tabular-nums text-ink-muted">{formatPrice(product.priceCents)}</span>
      </span>
    </Link>
  );
}

export function Hero() {
  const lead = pick("foundations-womens-health-protocol");
  const gut = pick("foundations-gut-health-protocol");
  const mood = pick("foundations-mood-health-protocol");

  return (
    <section aria-labelledby="hero-title" className="overflow-hidden bg-brand-cream">
      <div className="container-page grid items-center gap-14 pb-16 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <div className="max-w-xl lg:pb-6">
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-brand-forest motion-safe:animate-fade-up">
            From birth care to daily wellness
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-balance pb-1 font-serif text-[2.75rem] leading-[1.08] tracking-tight text-ink motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-6xl lg:text-[4.25rem]"
          >
            Daily wellness, rooted in <em className="text-brand-forest">midwifery</em> care.
          </h1>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-muted motion-safe:animate-fade-up motion-safe:[animation-delay:160ms] lg:ml-10">
            Practitioner-formulated protocols for hormones, gut, mood, energy, and immunity, from the
            team families trust with their births.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms] lg:ml-10">
            <ButtonLink href="/protocols" size="lg">
              Explore Protocols
            </ButtonLink>
            <ExternalButton href={tenant.shopUrl} size="lg" variant="secondary">
              Visit Shop
            </ExternalButton>
          </div>
        </div>

        <div
          aria-label="Featured protocols"
          role="group"
          className="relative mx-auto h-[27rem] w-full max-w-[34rem] sm:h-[33rem]"
        >
          <div
            aria-hidden
            className="absolute inset-x-[9%] bottom-0 top-[4%] rounded-t-full bg-brand-sage motion-safe:animate-fade-up"
          />
          <div
            aria-hidden
            className="absolute inset-x-[15%] bottom-0 top-[11%] rounded-t-full border border-white/35"
          />

          <Link
            href={`/protocols/${lead.slug}`}
            className="absolute left-1/2 top-[20%] w-[74%] -translate-x-1/2 sm:top-[18%] sm:w-[62%] overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]"
          >
            <ProductVisual
              product={lead}
              preload
              decorative
              sizes="(min-width: 64rem) 22rem, 62vw"
              className="aspect-[16/10] w-full"
            />
            <span className="block p-4 sm:p-5">
              <span className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-forest">
                {categories[lead.category].label}
                {lead.bestSeller && (
                  <span className="rounded-full bg-brand-sage-soft px-2 py-0.5 normal-case tracking-normal">
                    Best Seller
                  </span>
                )}
              </span>
              <span className="mt-2 block font-serif text-lg leading-snug text-ink sm:text-xl">{lead.name}</span>
              <span className="mt-1 block text-sm tabular-nums text-ink-muted">
                {formatPrice(lead.priceCents)} / {lead.supplyDays}-day supply
              </span>
            </span>
          </Link>

          <MiniCard
            product={gut}
            className="left-0 top-[8%] -rotate-3 max-sm:hidden motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] sm:-left-4"
          />
          <MiniCard
            product={mood}
            className="bottom-[6%] right-0 rotate-2 max-sm:hidden motion-safe:animate-fade-up motion-safe:[animation-delay:420ms] sm:-right-4"
          />

          <div className="absolute right-0 top-0 rounded-2xl bg-brand-forest px-4 py-3 text-white shadow-lift motion-safe:animate-fade-up motion-safe:[animation-delay:520ms] sm:right-[4%] sm:top-[4%]">
            <p className="font-serif text-3xl leading-none">{products.length}</p>
            <p className="mt-1 text-xs font-medium leading-snug text-white/85">
              targeted protocols
              <br />
              30-day supplies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
