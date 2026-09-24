import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { services } from "@/data/services";
import { ctaLabel, emergencyNote, siteConfig } from "@/lib/site";

const linkClass = "transition-colors duration-200 hover:text-brand-forest-deep hover:underline underline-offset-4";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-ink">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px] text-brand-forest">{children}</ul>
    </div>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const coordinatorFirstName = siteConfig.coordinator.split(" ")[0];

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo imageClassName="h-14 sm:h-16" />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              A stand-alone, family-centered birth center in {siteConfig.region}. Natural, family-centered, and
              peaceful care from pregnancy to postpartum and beyond.
            </p>
          </div>

          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Explore">
            {siteConfig.footerNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <div>
            <h2 className="text-sm font-semibold text-ink">Contact</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              {siteConfig.coordinator} handles all consultations, for birth care and hormone therapy.
            </p>
            <p className="mt-4">
              <a href={siteConfig.phone.tel} className={`text-lg font-semibold text-brand-forest ${linkClass}`}>
                {siteConfig.phone.display}
              </a>
            </p>
            <p className="mt-2 flex gap-5 text-[15px] text-brand-forest">
              <a href={siteConfig.phone.tel} className={linkClass}>
                Call {coordinatorFirstName}
              </a>
              <a href={siteConfig.phone.sms} className={linkClass}>
                Text {coordinatorFirstName}
              </a>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              Office hours and directions: call or text {coordinatorFirstName}.
            </p>
            <ButtonLink href="/contact" size="sm" className="mt-5">
              {ctaLabel}
            </ButtonLink>
          </div>
        </div>

        <p className="mt-14 rounded-card bg-brand-cream p-5 text-sm leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">{emergencyNote}</span> Everything on this website is general
          information, not medical advice.
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. {siteConfig.tagline}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {siteConfig.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
