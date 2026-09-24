export type NavLink = { label: string; href: string };

export const siteConfig = {
  name: "CP Birth Center",
  tagline: "Natural · Family-centered · Peaceful",
  title: "CP Birth Center | Midwife-led birth and hormone therapy in Southern Utah",
  description:
    "A stand-alone, family-centered birth center in Southern Utah. Midwife-led prenatal care, birth, and postpartum care, plus bio-identical hormone therapy with Joanne T. Yarrish, CNM, FNP.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  region: "Southern Utah",
  hospital: "St. George Regional Hospital",
  midwife: {
    name: "Joanne T. Yarrish",
    credentials: "CNM, FNP",
    title: "Certified Nurse-Midwife · Family Nurse Practitioner",
    years: 33,
  },
  coordinator: "Katherine Naylor",
  phone: {
    display: "435-212-3206",
    tel: "tel:+14352123206",
    sms: "sms:+14352123206",
  },
  nav: [
    { label: "Services", href: "/services" },
    { label: "Birth Center", href: "/birth-center" },
    { label: "Hormone Therapy", href: "/hormone-therapy" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Birth Center", href: "/birth-center" },
    { label: "Hormone Therapy", href: "/hormone-therapy" },
    { label: "Teaching Videos", href: "/videos" },
    { label: "About Joanne", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Medical disclaimer", href: "/medical-disclaimer" },
  ] satisfies NavLink[],
} as const;

export const emergencyNote =
  "If you're in labor or have a medical emergency, call 911 or go to the nearest emergency room.";

export const ctaLabel = "Book a consultation";
