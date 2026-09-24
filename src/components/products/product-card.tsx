import Link from "next/link";
import { ProductVisual } from "@/components/brand/product-visual";
import { ExternalButton, buttonStyles } from "@/components/ui/button";
import { categories, type Product } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const href = `/protocols/${product.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-shadow duration-300 hover:shadow-soft">
      <Link href={href} tabIndex={-1} aria-hidden className="block overflow-hidden">
        <ProductVisual
          product={product}
          decorative
          sizes="(min-width: 80rem) 300px, (min-width: 64rem) 30vw, (min-width: 40rem) 50vw, 100vw"
          className="aspect-[4/3] w-full"
          imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex min-h-7 items-center justify-between gap-3 text-[13px]">
          <span className="font-medium text-brand-forest">{categories[product.category].label}</span>
          {product.bestSeller && (
            <span className="rounded-full bg-brand-sage-soft px-2.5 py-1 font-semibold text-brand-forest">
              Best Seller
            </span>
          )}
        </div>

        <h3 className="mt-3 font-serif text-[1.4rem] leading-tight">
          <Link href={href} className="transition-colors duration-200 hover:text-brand-forest">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{product.tagline}</p>

        <div className="mt-auto pt-6">
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-semibold tabular-nums">{formatPrice(product.priceCents)}</span>
            <span className="text-sm text-ink-muted">/ {product.supplyDays}-day supply</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ExternalButton href={product.shopUrl} size="sm" aria-label={`Buy ${product.name} in our shop`}>
              Buy Now
            </ExternalButton>
            <Link href={href} className={buttonStyles({ variant: "ghost", className: "text-sm" })}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
