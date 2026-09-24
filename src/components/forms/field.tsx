import type { ComponentProps } from "react";
import { cn } from "@/lib/format";

export const inputClass =
  "w-full rounded-xl border border-line-strong bg-white px-4 text-base text-ink placeholder:text-ink-muted/70 transition-colors focus:border-brand-forest focus:outline-2 focus:outline-offset-2 focus:outline-brand-forest aria-[invalid=true]:border-red-700";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-message`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-message`} className="text-sm text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(inputClass, "h-12", className)} {...props} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(inputClass, "min-h-36 py-3", className)} {...props} />;
}
