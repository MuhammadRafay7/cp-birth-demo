import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { emergencyNote, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Medical disclaimer",
  description: "The information on the CP Birth Center website is general information, not medical advice.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimerPage() {
  return (
    <LegalPage
      id="disclaimer-title"
      title="Medical disclaimer"
      sections={[
        {
          heading: "General information only",
          body: (
            <p>
              Everything on this website is general information. It isn&rsquo;t medical advice, and it can&rsquo;t
              replace a visit with a qualified provider who knows your health history.
            </p>
          ),
        },
        {
          heading: "Symptoms",
          body: (
            <p>
              The symptom lists on the hormone therapy page describe what&rsquo;s common. Symptoms can have many
              causes, and the lists aren&rsquo;t a diagnosis.
            </p>
          ),
        },
        {
          heading: "Hormone therapy",
          body: (
            <p>
              Hormone therapy isn&rsquo;t right for everyone. Joanne prescribes it only after a consultation, once
              she has talked through your symptoms, your health history, and the benefits and risks with you.
            </p>
          ),
        },
        {
          heading: "Emergencies",
          body: (
            <p>
              {emergencyNote} For everything else, call or text {siteConfig.coordinator.split(" ")[0]} at{" "}
              <a href={siteConfig.phone.tel} className="font-semibold text-brand-forest underline underline-offset-4">
                {siteConfig.phone.display}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
