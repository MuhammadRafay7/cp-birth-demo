import { BrandMarquee } from "@/components/home/brand-marquee";
import { BrandValues } from "@/components/home/brand-values";
import { CategoryCards } from "@/components/home/category-cards";
import { FaqNewsletter } from "@/components/home/faq-newsletter";
import { FeaturedProtocols } from "@/components/home/featured-protocols";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { JsonLd, organizationJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <BrandMarquee />
      <CategoryCards />
      <FeaturedProtocols />
      <HowItWorks />
      <BrandValues />
      <Testimonials />
      <FaqNewsletter />
    </>
  );
}
