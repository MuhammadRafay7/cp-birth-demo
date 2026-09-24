import type { Faq } from "@/data/faqs";
import { siteConfig } from "@/lib/site";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL("/brand/logo.svg", siteConfig.url).toString(),
    telephone: "+1-435-212-3206",
    areaServed: siteConfig.region,
    medicalSpecialty: ["Obstetric", "Gynecologic"],
    employee: {
      "@type": "Person",
      name: siteConfig.midwife.name,
      jobTitle: "Certified Nurse-Midwife, Family Nurse Practitioner",
    },
  };
}

export function faqJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
