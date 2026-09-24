import Image from "next/image";
import { ChatCircleText, Phone } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { AnchorButton } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import contactPhoto from "../../../public/images/contact.jpg";

export function ConsultCta() {
  const first = siteConfig.coordinator.split(" ")[0];

  return (
    <section aria-labelledby="consult-title" className="container-page py-20 lg:py-28">
      <Reveal>
        <div className="grid overflow-hidden rounded-card border border-line bg-brand-cream md:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-forest">Book a consultation</p>
            <h2 id="consult-title" className="mt-4 font-serif text-4xl leading-[1.08] tracking-[-0.015em] sm:text-5xl">
              Talk to {first}.
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
              She&rsquo;ll answer your questions and set up your first visit, for birth care or hormone therapy.
            </p>
            <a
              href={siteConfig.phone.tel}
              className="mt-8 font-serif text-4xl text-brand-forest transition-colors hover:text-brand-forest-deep sm:text-5xl"
            >
              {siteConfig.phone.display}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <AnchorButton href={siteConfig.phone.tel} size="lg">
                <Phone size={18} weight="bold" aria-hidden />
                Call {first}
              </AnchorButton>
              <AnchorButton href={siteConfig.phone.sms} size="lg" variant="secondary">
                <ChatCircleText size={18} weight="bold" aria-hidden />
                Text {first}
              </AnchorButton>
            </div>
          </div>
          <div className="relative min-h-72 md:min-h-full">
            <Image
              src={contactPhoto}
              alt="A woman in an armchair by a sunny window, talking on the phone with a mug in her hand"
              fill
              placeholder="blur"
              sizes="(min-width: 48rem) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
