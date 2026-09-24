import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  PinterestLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Logo } from "@/components/layout/logo";
import { ExternalButton } from "@/components/ui/button";
import { categories, categoryOrder } from "@/data/products";
import { fdaDisclaimer, siteConfig, tenant } from "@/lib/site";

const socialIcons: Record<string, Icon> = {
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
  Pinterest: PinterestLogo,
};

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

  return (
    <footer className="border-t border-line bg-white">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo imageClassName="sm:h-16 h-14" />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-muted">
              A family-centered birth center in {siteConfig.region}, now sharing the daily wellness
              protocols our practitioners recommend.
            </p>
            <ul className="mt-7 flex gap-2" aria-label="Social media">
              {siteConfig.social.map(({ label, href }) => {
                const SocialIcon = socialIcons[label];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${siteConfig.name} on ${label} (opens in a new tab)`}
                      className="grid size-10 place-items-center rounded-full border border-line-strong text-brand-forest transition-colors duration-200 hover:border-brand-forest hover:bg-brand-cream"
                    >
                      <SocialIcon size={18} aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <FooterColumn title="Protocols">
            {categoryOrder.map((key) => (
              <li key={key}>
                <Link href={`/protocols?category=${key}`} className={linkClass}>
                  {categories[key].label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Explore">
            {siteConfig.nav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <div>
            <h2 className="text-sm font-semibold text-ink">Shop &amp; contact</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">
              Every protocol is available in our online shop, with secure checkout.
            </p>
            <ExternalButton href={tenant.shopUrl} size="sm" className="mt-5">
              Shop Protocols
            </ExternalButton>
            <p className="mt-6 text-[15px]">
              <a
                href={tenant.contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-brand-forest ${linkClass}`}
              >
                Contact our care team
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>

        <p className="mt-14 rounded-card bg-brand-cream p-5 text-sm leading-relaxed text-ink-muted">
          <span className="font-semibold text-ink">*</span> {fdaDisclaimer}
        </p>

        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {tenant.legal.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
