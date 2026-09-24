import type { Metadata } from "next";
import { Storefront } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/contact-form";
import { ExternalButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, tenant } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a protocol or an order? Get in touch with the CP Birth Center team.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | CP Birth Center", url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="bg-brand-cream">
        <div className="container-page py-14 lg:py-20">
          <SectionHeading
            as="h1"
            id="contact-title"
            title="We’d love to hear from you"
            description="Questions about which protocol fits your needs, or about an order you’ve placed? Send us a note and our team will get back to you."
          />
        </div>
      </section>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-24">
        <section aria-label="Contact form">
          <ContactForm />
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-card bg-brand-forest p-7 text-white sm:p-8">
            <Storefront size={28} weight="light" aria-hidden />
            <h2 className="mt-4 font-serif text-2xl">Questions about an order?</h2>
            <p className="mt-2 leading-relaxed text-white/85">
              Orders, shipping, and returns are handled in our online shop, where our team can see your order
              details.
            </p>
            <ExternalButton href={tenant.contactUrl} variant="inverse" className="mt-6">
              Shop contact page
            </ExternalButton>
          </div>
          <div className="rounded-card border border-line p-7 sm:p-8">
            <h2 className="font-semibold">Visit us</h2>
            <p className="mt-2 leading-relaxed text-ink-muted">
              {siteConfig.name} welcomes families in {siteConfig.region}.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
