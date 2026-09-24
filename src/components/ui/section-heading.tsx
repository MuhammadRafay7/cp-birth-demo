import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type SectionHeadingProps = {
  id: string;
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  as: Heading = "h2",
  align = "left",
  tone = "default",
  className,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[13px] font-semibold uppercase tracking-[0.14em]",
            inverse ? "text-white/80" : "text-brand-forest",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "text-balance pb-1 font-serif leading-[1.1] tracking-tight",
          Heading === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-[60ch] text-pretty text-[17px] leading-relaxed",
            align === "center" && "mx-auto",
            inverse ? "text-white/85" : "text-ink-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
