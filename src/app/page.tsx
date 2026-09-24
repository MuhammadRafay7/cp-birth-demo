import { ConsultCta } from "@/components/layout/consult-cta";
import { AboutPreview } from "@/components/home/about-preview";
import { FaqTeaser } from "@/components/home/faq-teaser";
import { Hero } from "@/components/home/hero";
import { ServicesPreview } from "@/components/home/services-preview";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { JsonLd, organizationJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <TrustBar />
      <ServicesPreview />
      <AboutPreview />
      <WhyChooseUs />
      <FaqTeaser />
      <ConsultCta />
    </>
  );
}
