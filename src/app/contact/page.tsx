import type { Metadata } from "next";
import Image from "next/image";
import {
  Baby,
  ChatCircleText,
  Clock,
  FlowerLotus,
  MapPin,
  Phone,
  Sun,
  Warning,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { AnchorButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { emergencyNote, siteConfig } from "@/lib/site";
import contactPhoto from "../../../public/images/contact.jpg";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation for birth care or hormone therapy. Call or text Katherine Naylor at 435-212-3206.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | CP Birth Center", url: "/contact" },
};

const topics: { icon: Icon; title: string; body: string; message: string }[] = [
  {
    icon: Baby,
    title: "Birth care",
    body: "Prenatal visits, birth at the center, and care after your baby arrives.",
    message: "Hi Katherine, I'd like to book a consultation about birth care. My name is ",
  },
  {
    icon: Sun,
    title: "Hormone therapy",
    body: "Perimenopause, menopause, and bHRT for women and men.",
    message: "Hi Katherine, I'd like to book a consultation about hormone therapy. My name is ",
  },
  {
    icon: FlowerLotus,
    title: "Women’s health",
    body: "Urinary, menstrual, and gynecologic concerns at any age.",
    message: "Hi Katherine, I'd like to book a consultation about a women's health concern. My name is ",
  },
];

const steps = [
  {
    title: "Call or text Katherine",
    body: "She'll answer your first questions and set up your consultation.",
  },
  {
    title: "Meet with Joanne",
    body: "Talk through your health history, your questions, and what you're hoping for.",
  },
  {
    title: "Leave with a plan",
    body: "Whether that's birth at the center or hormone therapy, you'll know your next steps.",
  },
];

export default function ContactPage() {
  const coordinatorFirstName = siteConfig.coordinator.split(" ")[0];

  return (
    <>
      <section aria-labelledby="contact-title" className="bg-brand-cream">
        <div className="container-page grid items-center gap-12 py-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-20">
          <div>
            <SectionHeading
              as="h1"
              id="contact-title"
              eyebrow="Contact"
              title="Book a consultation."
              description={`${siteConfig.coordinator} handles all consultations, for birth care and hormone therapy. Call or text and she’ll get back to you.`}
            />
            <a
              href={siteConfig.phone.tel}
              className="mt-8 inline-block font-serif text-4xl text-brand-forest transition-colors hover:text-brand-forest-deep sm:text-5xl"
            >
              {siteConfig.phone.display}
            </a>
            <div className="mt-7 flex flex-wrap gap-3">
              <AnchorButton href={siteConfig.phone.tel} size="lg">
                <Phone size={18} weight="bold" aria-hidden />
                Call {coordinatorFirstName}
              </AnchorButton>
              <AnchorButton href={siteConfig.phone.sms} size="lg" variant="secondary">
                <ChatCircleText size={18} weight="bold" aria-hidden />
                Text {coordinatorFirstName}
              </AnchorButton>
            </div>
          </div>
          <Image
            src={contactPhoto}
            alt="A woman in an armchair by a sunny window, talking on the phone with a mug in her hand"
            preload
            placeholder="blur"
            sizes="(min-width: 64rem) 35vw, 100vw"
            className="aspect-[4/5] w-full rounded-card object-cover max-lg:max-h-[28rem]"
          />
        </div>
      </section>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr] lg:gap-16 lg:py-24">
        <Reveal>
          <section aria-labelledby="topics-title">
            <h2 id="topics-title" className="font-serif text-3xl tracking-tight sm:text-4xl">
              What would you like to talk about?
            </h2>
            <p className="mt-3 max-w-prose leading-relaxed text-ink-muted">
              Pick a topic and your text to {coordinatorFirstName} starts itself. Just add your name and send.
            </p>
            <ul className="mt-8 grid gap-4">
              {topics.map(({ icon: TopicIcon, title, body, message }) => (
                <li
                  key={title}
                  className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-7"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
                    <TopicIcon size={24} weight="light" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-muted">{body}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <AnchorButton
                      href={`${siteConfig.phone.sms}?&body=${encodeURIComponent(message)}`}
                      size="sm"
                      aria-label={`Text ${coordinatorFirstName} about ${title.toLowerCase()}`}
                    >
                      <ChatCircleText size={16} weight="bold" aria-hidden />
                      Text
                    </AnchorButton>
                    <AnchorButton
                      href={siteConfig.phone.tel}
                      size="sm"
                      variant="secondary"
                      aria-label={`Call ${coordinatorFirstName} about ${title.toLowerCase()}`}
                    >
                      <Phone size={16} weight="bold" aria-hidden />
                      Call
                    </AnchorButton>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <aside aria-labelledby="visit-title" className="flex flex-col gap-4">
            <div className="rounded-card border border-line bg-white p-7 sm:p-8">
              <h2 id="visit-title" className="font-serif text-2xl">
                Visiting details
              </h2>
              <dl className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <Phone size={22} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
                  <div>
                    <dt className="text-sm text-ink-muted">Phone and text</dt>
                    <dd className="font-semibold">
                      <a href={siteConfig.phone.tel} className="text-brand-forest hover:underline">
                        {siteConfig.phone.display}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={22} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
                  <div>
                    <dt className="text-sm text-ink-muted">Location</dt>
                    <dd className="font-semibold">{siteConfig.region}</dd>
                    <dd className="text-[15px] text-ink-muted">Ask {coordinatorFirstName} for directions.</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock size={22} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
                  <div>
                    <dt className="text-sm text-ink-muted">Office hours</dt>
                    <dd className="font-semibold">Call or text for current hours</dd>
                    <dd className="text-[15px] text-ink-muted">{coordinatorFirstName} will set up a time that works.</dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="flex gap-4 rounded-card bg-brand-cream p-7 sm:p-8">
              <Warning size={24} weight="fill" className="shrink-0 text-brand-forest" aria-hidden />
              <p className="leading-relaxed text-ink">
                <span className="font-semibold">In an emergency:</span> {emergencyNote.replace("If", "if")}
              </p>
            </div>
          </aside>
        </Reveal>
      </div>

      <section aria-labelledby="steps-title" className="border-t border-line bg-brand-cream py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <SectionHeading id="steps-title" title="How booking works" />
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.08} className="border-t-2 border-brand-sage/70 pt-6">
                <span aria-hidden className="font-serif text-5xl text-brand-forest">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-wrap gap-3">
            <AnchorButton href={siteConfig.phone.tel} size="lg">
              <Phone size={18} weight="bold" aria-hidden />
              Call {coordinatorFirstName}
            </AnchorButton>
            <AnchorButton href={siteConfig.phone.sms} size="lg" variant="secondary">
              <ChatCircleText size={18} weight="bold" aria-hidden />
              Text {coordinatorFirstName}
            </AnchorButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
