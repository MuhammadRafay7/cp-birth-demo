import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How CP Birth Center handles information on this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      id="privacy-title"
      title="Privacy"
      sections={[
        {
          heading: "Tracking",
          body: <p>We don&rsquo;t use advertising trackers or social media pixels on this website.</p>,
        },
        {
          heading: "Messages you send",
          body: (
            <p>
              This website has no forms and doesn&rsquo;t collect your details. Call and text links open your own
              phone so you can reach {siteConfig.coordinator} directly.
            </p>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              Call or text {siteConfig.coordinator.split(" ")[0]} at{" "}
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
