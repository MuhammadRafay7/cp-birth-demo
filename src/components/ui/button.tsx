import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "inverse" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-forest text-white hover:bg-brand-forest-deep",
  secondary: "border border-line-strong bg-surface text-brand-forest hover:border-brand-forest",
  inverse: "bg-white text-brand-forest hover:bg-brand-cream",
  ghost: "text-brand-forest underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cn(base, variants[variant], variant === "ghost" ? "text-[15px]" : sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & StyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

type ExternalButtonProps = Omit<ComponentProps<"a">, "target" | "rel"> & StyleProps;

export function ExternalButton({
  variant,
  size,
  className,
  children,
  "aria-label": ariaLabel,
  ...props
}: ExternalButtonProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} (opens in a new tab)` : undefined}
      className={buttonStyles({ variant, size, className })}
      {...props}
    >
      {children}
      <ArrowUpRight size={16} weight="bold" aria-hidden />
      {!ariaLabel && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
