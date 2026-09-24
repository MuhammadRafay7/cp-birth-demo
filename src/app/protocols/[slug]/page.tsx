import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck, Check, Package } from "@phosphor-icons/react/dist/ssr";
import { CategoryIcon } from "@/components/brand/category-icon";
import { ProductVisual } from "@/components/brand/product-visual";
import { ProductCard } from "@/components/products/product-card";
import { ExternalButton } from "@/components/ui/button";
import { categories, getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { fdaDisclaimer } from "@/lib/site";
import { JsonLd, productJsonLd } from "@/lib/structured-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/protocols/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.summary} ${formatPrice(product.priceCents)} for a ${product.supplyDays}-day supply.`,
    alternates: { canonical: `/protocols/${product.slug}` },
    openGraph: {
      title: `${product.name} | CP Birth Center`,
      description: product.tagline,
      url: `/protocols/${product.slug}`,
      images: product.image ? [{ url: product.image.src, alt: product.image.alt }] : undefined,
    },
  };
}

export default async function ProductPage(props: PageProps<"/protocols/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={productJsonLd(product)} />
      <section className="bg-brand-cream">
        <div className="container-page pb-16 pt-8 lg:pb-24 lg:pt-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              <li>
                <Link href="/protocols" className="inline-flex items-center gap-1.5 text-brand-forest hover:underline">
                  <ArrowLeft size={14} aria-hidden />
                  Protocols
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/protocols?category=${product.category}`} className="text-brand-forest hover:underline">
                  {categories[product.category].label}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ProductVisual
                product={product}
                preload
                sizes="(min-width: 64rem) 50vw, 100vw"
                className="aspect-[4/3] w-full rounded-card bg-white shadow-soft"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 font-medium text-brand-forest">
                  <CategoryIcon category={product.category} size={18} />
                  {categories[product.category].label}
                </span>
                <span className="rounded-full border border-line-strong bg-white px-2.5 py-1 text-ink-muted">
                  {product.tier}
                </span>
                {product.bestSeller && (
                  <span className="rounded-full bg-brand-forest px-2.5 py-1 font-semibold text-white">
                    Best Seller
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-balance pb-1 font-serif text-4xl leading-[1.1] tracking-tight sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">{product.summary}</p>

              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-3xl font-semibold tabular-nums">{formatPrice(product.priceCents)}</span>
                <span className="text-ink-muted">/ {product.supplyDays}-day supply</span>
              </p>

              <ExternalButton
                href={product.shopUrl}
                size="lg"
                className="mt-6 w-full sm:w-auto sm:min-w-64"
                aria-label={`Buy ${product.name} in our shop`}
              >
                Buy Now
              </ExternalButton>
              <p className="mt-3 text-sm text-ink-muted">Secure checkout in the CP Birth Center shop.</p>

              <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <Package size={22} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
                  <div>
                    <dt className="text-sm text-ink-muted">Routine</dt>
                    <dd className="font-medium">{product.routine}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl bg-white p-4">
                  <CalendarCheck size={22} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
                  <div>
                    <dt className="text-sm text-ink-muted">Supply</dt>
                    <dd className="font-medium">{product.supplyDays} days</dd>
                  </div>
                </div>
              </dl>

              <div className="mt-10">
                <h2 className="text-lg font-semibold">Key benefits</h2>
                <ul className="mt-4 grid gap-3">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                        <Check size={14} weight="bold" aria-hidden />
                      </span>
                      <span>
                        {benefit}
                        <span aria-hidden>*</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-semibold">Signature blends</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {product.blends.map((blend) => (
                    <li key={blend} className="rounded-full border border-brand-sage/60 bg-white px-3.5 py-1.5 text-sm text-brand-forest">
                      {blend}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="details-title" className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 id="details-title" className="font-serif text-3xl tracking-tight sm:text-4xl">
            About this protocol
          </h2>
          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink-muted">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 rounded-card bg-brand-cream p-5 text-sm leading-relaxed text-ink-muted">
            <span aria-hidden>* </span>
            {fdaDisclaimer} Please talk with your provider before starting a new supplement, especially if you
            are pregnant, nursing, or taking medication.
          </p>
        </div>
      </section>

      <section aria-labelledby="related-title" className="border-t border-line py-16 lg:py-24">
        <div className="container-page">
          <h2 id="related-title" className="font-serif text-3xl tracking-tight sm:text-4xl">
            You may also like
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
