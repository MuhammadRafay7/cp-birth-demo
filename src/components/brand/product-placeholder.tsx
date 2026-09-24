import { CategoryIcon } from "@/components/brand/category-icon";
import { categories, type Product } from "@/data/products";
import { cn } from "@/lib/format";

export function ProductPlaceholder({ product, className }: { product: Product; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${product.name} illustration`}
      className={cn(
        "absolute inset-0 flex flex-col justify-between bg-[radial-gradient(120%_90%_at_85%_10%,var(--brand-sage-soft)_0%,var(--brand-cream)_55%,var(--brand-cream-deep)_100%)] p-6",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full bg-white/70 text-brand-forest">
        <CategoryIcon category={product.category} size={24} />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-forest">
          {categories[product.category].label}
        </p>
        <p className="mt-2 max-w-[14ch] text-balance font-serif text-2xl leading-tight text-ink">
          {product.tier} Protocol
        </p>
      </div>
    </div>
  );
}
