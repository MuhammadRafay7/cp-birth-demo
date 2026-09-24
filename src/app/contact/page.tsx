import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChatCircleText,
  Compass,
  Flask,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { ExternalButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig, tenant } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a protocol or an order? Find the fastest way to reach the CP Birth Center team.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | CP Birth Center", url: "/contact" },
};

type HelpTopic = {
  icon: Icon;
  title: string;
  body: string;
  action: string;
  href: string;
  external?: boolean;
};

const topics: HelpTopic[] = [
  {
    icon: Compass,
    title: "Choosing a protocol",
    body: "Compare all eight protocols by focus, routine, and price to find the right starting point.",
    action: "Browse protocols",
    href: "/protocols",
  },
  {
    icon: Flask,
    title: "Ingredients and safety",
    body: "Learn what sets each tier apart, and what to know if you are pregnant or breastfeeding.",
    action: "Read the FAQ",
    href: "/faq#protocols",
  },
  {
    icon: Package,
    title: "Orders, shipping, and returns",
    body: "Our shop team can look up your order and help with delivery, returns, or recurring orders.",
    action: "Contact the shop",
    href: tenant.contactUrl,
    external: true,
  },
  {
    icon: ChatCircleText,
    title: "Something else",
    body: "For any other question, send our team a message and we will point you in the right direction.",
    action: "Send a message",
    href: tenant.contactUrl,
    external: true,
  },
];

function TopicCard({ topic }: { topic: HelpTopic }) {
  const { icon: TopicIcon, title, body, action, href, external } = topic;
  const ActionIcon = external ? ArrowUpRight : ArrowRight;
  const className =
    "group flex h-full flex-col rounded-card border border-line bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-brand-sage hover:shadow-soft sm:p-8";
  const content = (
    <>
      <span className="grid size-12 place-items-center rounded-full bg-brand-sage-soft text-brand-forest">
        <TopicIcon size={24} weight="light" aria-hidden />
      </span>
      <h2 className="mt-6 font-serif text-2xl leading-tight">{title}</h2>
      <p className="mt-2 flex-1 leading-relaxed text-ink-muted">{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-brand-forest">
        {action}
        <ActionIcon
          size={16}
          weight="bold"
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="bg-brand-cream">
        <div className="container-page py-14 lg:py-20">
          <SectionHeading
            as="h1"
            id="contact-title"
            title="How can we help?"
            description="Pick the topic closest to your question and we'll take you straight to the right place."
          />
        </div>
      </section>

      <section aria-label="Help topics" className="container-page py-16 lg:py-24">
        <ul className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic, index) => (
            <Reveal as="li" key={topic.title} delay={index * 0.06}>
              <TopicCard topic={topic} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4">
          <div className="flex flex-col gap-6 rounded-card bg-brand-forest p-7 text-white sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl leading-tight">Talk with our care team</h2>
              <p className="mt-3 leading-relaxed text-white/85">
                {siteConfig.name} welcomes families in {siteConfig.region}. Reach us any time through our
                shop&rsquo;s contact page and a member of our team will get back to you.
              </p>
            </div>
            <ExternalButton href={tenant.contactUrl} variant="inverse" size="lg" className="self-start md:self-auto">
              Contact our team
            </ExternalButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
