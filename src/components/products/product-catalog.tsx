"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CategoryIcon } from "@/components/brand/category-icon";
import { ProductCard } from "@/components/products/product-card";
import {
  categories,
  categoryOrder,
  isProductCategory,
  products,
  type ProductCategory,
} from "@/data/products";
import { cn } from "@/lib/format";

type Filter = ProductCategory | "all";

export function ProductCatalog() {
  const searchParams = useSearchParams();
  const param = searchParams.get("category");
  const active: Filter = isProductCategory(param) ? param : "all";

  const select = (value: Filter) => {
    const url = value === "all" ? "/protocols" : `/protocols?category=${value}`;
    window.history.replaceState(null, "", url);
  };

  return <CatalogView active={active} onSelect={select} />;
}

export function CatalogView({ active, onSelect }: { active: Filter; onSelect?: (value: Filter) => void }) {
  const reduceMotion = useReducedMotion();
  const visible = active === "all" ? products : products.filter((p) => p.category === active);
  const options: { value: Filter; label: string }[] = [
    { value: "all", label: "All protocols" },
    ...categoryOrder.map((value) => ({ value, label: categories[value].short })),
  ];

  return (
    <>
      <div
        role="group"
        aria-label="Filter protocols by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {options.map((option) => {
          const selected = option.value === active;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect?.(option.value)}
              className={cn(
                "inline-flex h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                selected
                  ? "border-brand-forest bg-brand-forest text-white"
                  : "border-line-strong bg-white text-brand-forest hover:border-brand-forest",
              )}
            >
              {option.value !== "all" && <CategoryIcon category={option.value} size={16} />}
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-muted" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "protocol" : "protocols"}
        {active !== "all" && ` for ${categories[active].label}`}
      </p>

      <motion.ul layout={!reduceMotion} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.li
              key={product.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
