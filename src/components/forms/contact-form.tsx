"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Info } from "@phosphor-icons/react/dist/ssr";
import { Field, TextArea, TextInput } from "@/components/forms/field";
import { Button } from "@/components/ui/button";
import { emailPattern, forms } from "@/lib/forms";
import { tenant } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "sent" }
  | { status: "unavailable"; message: string };

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!emailPattern.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 10) errors.message = "Please share a little more detail so we can help.";
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<FormState>({ status: "idle" });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState({ status: "submitting" });
    setState(await forms.sendMessage(values));
  };

  if (state.status === "sent") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-card bg-brand-sage-soft p-6 text-ink">
        <CheckCircle size={26} weight="light" className="mt-0.5 shrink-0 text-brand-forest" aria-hidden />
        <p className="leading-relaxed">
          Thank you. Your message is on its way, and a member of our team will reply by email.
        </p>
      </div>
    );
  }

  const describedBy = (field: keyof Errors) => (errors[field] ? `contact-${field}-message` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name}>
          <TextInput
            id="contact-name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <TextInput
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
        </Field>
      </div>
      <Field id="contact-message" label="How can we help?" error={errors.message}>
        <TextArea
          id="contact-message"
          name="message"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
        />
      </Field>

      {state.status === "unavailable" && (
        <p role="status" className="flex items-start gap-3 rounded-card bg-brand-cream p-4 text-sm leading-relaxed text-ink">
          <Info size={20} weight="fill" className="mt-px shrink-0 text-brand-forest" aria-hidden />
          <span>
            {state.message}{" "}
            <a
              href={tenant.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-forest underline underline-offset-4"
            >
              Open the contact page
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        </p>
      )}

      <Button type="submit" size="lg" className="justify-self-start" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
