import { Phone } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button";
import { ctaLabel, siteConfig } from "@/lib/site";

const assurances = [
  {
    figure: "33 years",
    text: "in obstetric and gynecologic care, from prenatal visits to postpartum.",
  },
  {
    figure: "Hospital backup",
    text: `through the OB/GYN providers at ${siteConfig.hospital}, if a birth becomes high-risk.`,
  },
  {
    figure: "Family-centered",
    text: `care for mothers and families across ${siteConfig.region}.`,
  },
];

function Underline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      className="absolute -bottom-[0.08em] left-0 h-[0.16em] w-full text-brand-sage"
    >
      <path
        d="M2 6.2c32-3.1 64-3.9 98-2.6 32.5 1.3 65 2.4 98 .9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-brand-cream">
      <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-24">
        <div className="lg:col-span-8">
          <p className="text-sm font-medium text-brand-forest motion-safe:animate-fade-up">
            {siteConfig.name} &middot; Midwifery care in {siteConfig.region}
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-ink motion-safe:animate-fade-up motion-safe:[animation-delay:80ms] sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
          >
            You&rsquo;re in{" "}
            <span className="relative inline-block whitespace-nowrap">
              safe hands
              <Underline />
            </span>
            .
            <span className="mt-3 block font-light tracking-[-0.035em] text-brand-forest sm:mt-2">
              Before birth, during it, and every day after.
            </span>
          </h1>

          <p className="mt-9 max-w-[34rem] text-lg leading-relaxed text-ink/75 motion-safe:animate-fade-up motion-safe:[animation-delay:160ms]">
            A stand-alone birth center where a certified nurse-midwife stays beside you from your first prenatal
            visit to the weeks after your baby arrives, with a hospital team behind you if you ever need one.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 motion-safe:animate-fade-up motion-safe:[animation-delay:240ms]">
            <ButtonLink href="/contact" size="lg">
              {ctaLabel}
            </ButtonLink>
            <a
              href={siteConfig.phone.tel}
              className="group inline-flex items-center gap-2.5 text-base font-medium text-ink/75"
            >
              <span className="grid size-9 place-items-center rounded-full bg-white text-brand-forest transition-colors group-hover:bg-brand-forest group-hover:text-white">
                <Phone size={16} weight="bold" aria-hidden />
              </span>
              <span>
                or call{" "}
                <span className="font-semibold text-brand-forest underline decoration-brand-sage/50 underline-offset-[6px] group-hover:decoration-brand-forest">
                  {siteConfig.phone.display}
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white/70 p-6 motion-safe:animate-fade-up motion-safe:[animation-delay:320ms] sm:p-8 lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Why families choose us</p>
          <ul
            aria-label="Why families choose us"
            className="mt-5 grid gap-6 sm:grid-cols-3 sm:gap-5 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-line"
          >
            {assurances.map((item) => (
              <li key={item.figure} className="flex gap-4 lg:py-5 lg:first:pt-0 lg:last:pb-0">
                <span aria-hidden className="mt-2 size-2 shrink-0 rounded-full bg-brand-sage" />
                <div>
                  <p className="text-lg font-semibold tracking-[-0.02em] text-brand-forest">{item.figure}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/70">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
