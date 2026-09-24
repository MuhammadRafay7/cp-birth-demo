import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/format";

type PageHeaderProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: { src: StaticImageData; alt: string; caption?: string };
  children?: ReactNode;
};

export function PageHeader({ id, eyebrow, title, description, image, children }: PageHeaderProps) {
  return (
    <section aria-labelledby={id} className="border-b border-line bg-brand-cream">
      <div
        className={cn(
          "container-page grid items-center gap-12 py-14 lg:py-20",
          image && "lg:grid-cols-[1.1fr_1fr] lg:gap-16",
        )}
      >
        <div>
          <SectionHeading as="h1" id={id} eyebrow={eyebrow} title={title} description={description} />
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <figure>
            <Image
              src={image.src}
              alt={image.alt}
              preload
              placeholder="blur"
              sizes="(min-width: 64rem) 45vw, 100vw"
              className="aspect-[4/3] w-full rounded-card object-cover"
            />
            {image.caption && (
              <figcaption className="mt-3 font-serif text-[15px] italic text-ink-muted">{image.caption}</figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  );
}
