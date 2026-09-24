import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView, ProductCatalog } from "@/components/products/product-catalog";
import { ExternalButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { tenant } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protocols",
  description:
    "Browse all eight CP Birth Center protocols for women's health, gut health, mood, energy, and immunity. Each is a 30-day supply of daily packets.",
  alternates: { canonical: "/protocols" },
  openGraph: { title: "Protocols | CP Birth Center", url: "/protocols" },
};

export default function ProtocolsPage() {
  return (
    <>
      <section aria-labelledby="protocols-title" className="bg-brand-cream">
        <div className="container-page flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between lg:py-20">
          <SectionHeading
            as="h1"
            id="protocols-title"
            title="Our protocols"
            description="Eight practitioner-formulated protocols, each a 30-day supply of pre-portioned daily packets. Start with a focused Foundations formula, or choose a complete morning and evening routine."
          />
          <ExternalButton href={tenant.shopUrl} variant="secondary" className="self-start md:self-auto">
            Visit Shop
          </ExternalButton>
        </div>
      </section>
      <section aria-label="Protocol catalog" className="container-page py-12 lg:py-16">
        <Suspense fallback={<CatalogView active="all" />}>
          <ProductCatalog />
        </Suspense>
      </section>
    </>
  );
}
