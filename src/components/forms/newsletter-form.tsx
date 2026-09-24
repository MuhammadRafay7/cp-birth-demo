"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle, Info, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { emailPattern, forms } from "@/lib/forms";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent" }
  | { status: "invalid"; message: string }
  | { status: "unavailable"; message: string };

export function NewsletterForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const inputId = useId();
  const messageId = useId();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    if (!emailPattern.test(email)) {
      setState({ status: "invalid", message: "Please enter a valid email address." });
      return;
    }
    setState({ status: "submitting" });
    setState(await forms.subscribe(email));
  };

  if (state.status === "sent") {
    return (
      <p role="status" className="flex items-start gap-3 text-lg leading-relaxed">
        <CheckCircle size={26} weight="light" className="mt-0.5 shrink-0" aria-hidden />
        You&rsquo;re on the list. Look for your first letter at the start of next month.
      </p>
    );
  }

  const invalid = state.status === "invalid";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor={inputId} className="text-[15px] font-medium">
        Email address
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          aria-invalid={invalid}
          aria-describedby={messageId}
          className="h-12 w-full min-w-0 flex-1 rounded-full border-2 border-transparent bg-white px-5 text-base text-ink placeholder:text-ink-muted focus:outline-2 focus:outline-offset-2 focus:outline-white aria-[invalid=true]:border-brand-cream"
        />
        <Button type="submit" variant="inverse" size="lg" className="h-12" disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Subscribing" : "Subscribe"}
        </Button>
      </div>
      <p id={messageId} aria-live="polite" className="mt-3 flex min-h-6 items-start gap-2 text-sm text-white/85">
        {state.status === "invalid" || state.status === "unavailable" ? (
          <>
            {invalid ? (
              <WarningCircle size={18} weight="fill" className="mt-px shrink-0 text-white" aria-hidden />
            ) : (
              <Info size={18} weight="fill" className="mt-px shrink-0 text-white" aria-hidden />
            )}
            <span className="font-medium text-white">{state.message}</span>
          </>
        ) : (
          "One thoughtful email a month. Unsubscribe anytime."
        )}
      </p>
    </form>
  );
}
