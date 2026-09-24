export type NavLink = { label: string; href: string };

const tenantUrl = "https://cpbirth.pharmabuilt.com";

export const tenant = {
  url: tenantUrl,
  shopUrl: `${tenantUrl}/shop`,
  contactUrl: `${tenantUrl}/contact`,
  legal: [
    { label: "Privacy Policy", href: `${tenantUrl}/privacy-policy` },
    { label: "Terms of Use", href: `${tenantUrl}/terms-of-use` },
    { label: "Cookie Policy", href: `${tenantUrl}/cookie-policy` },
  ] satisfies NavLink[],
} as const;

export const siteConfig = {
  name: "CP Birth Center",
  tagline: "Natural · Family-centered · Peaceful",
  title: "CP Birth Center | Practitioner-Formulated Daily Wellness Protocols",
  description:
    "Daily supplement protocols from the midwifery care team at CP Birth Center. Women's health, gut health, mood, energy, and immunity support in 30-day supplies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  region: "Southern Utah",
  nav: [
    { label: "Home", href: "/" },
    { label: "Protocols", href: "/protocols" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "Pinterest", href: "https://www.pinterest.com/" },
  ],
} as const;

export const fdaDisclaimer =
  "These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.";
