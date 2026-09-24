import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/products/product-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedProtocols() {
  const featured = getFeaturedProducts();

  return (
    <section aria-labelledby="featured-title" className="border-t border-line bg-white py-20 lg:py-28">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="featured-title"
            eyebrow="Featured protocols"
            title="Where most women begin"
          />
          <ButtonLink href="/protocols" variant="secondary" className="self-start md:self-auto">
            View all protocols
            <ArrowRight size={16} weight="bold" aria-hidden />
          </ButtonLink>
        </Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal as="li" key={product.slug} delay={index * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
