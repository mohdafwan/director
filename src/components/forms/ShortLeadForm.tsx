"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field, Honeypot, TextArea, TextInput } from "./fields";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";

/**
 * The short path. Five fields, nothing more.
 *
 * The impatient, high-intent buyer converts here or not at all — every extra
 * field costs completions. Qualification happens in /estimate for the visitor
 * who is willing to spend two minutes (docs/02 §9.2).
 */

type Errors = Partial<Record<"name" | "company" | "phone" | "email" | "requirement", string>>;

export function ShortLeadForm({ context }: { context?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [started, setStarted] = useState(false);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const requirement = String(data.get("requirement") ?? "").trim();

    if (name.length < 2) next.name = "Please enter your name.";
    if (company.length < 2) next.company = "Please enter your company name.";
    // Deliberately permissive: Indian numbers get written many ways, and a
    // strict pattern rejects real leads far more often than it blocks spam.
    if (phone.replace(/\D/g, "").length < 8) next.phone = "Please enter a reachable phone number.";
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (requirement.length < 10) next.requirement = "A sentence or two is enough — what do you want to solve?";
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(site.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "short",
          context: context ?? "contact",
          name: data.get("name"),
          company: data.get("company"),
          phone: data.get("phone"),
          email: data.get("email"),
          requirement: data.get("requirement"),
          company_website: data.get("company_website"), // honeypot
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      track("generate_lead", { source: "short_form", context: context ?? "contact" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 border border-border bg-surface p-8">
        <CheckCircle2 className="size-7 text-run" aria-hidden />
        <h3 className="t-h3">Received. We will come back to you.</h3>
        <p className="max-w-[52ch] leading-relaxed text-ink-2">
          An engineer will read this — not a sales inbox. If it is urgent, calling or messaging on
          WhatsApp is faster and gets you the same person.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={() => {
        if (!started) {
          setStarted(true);
          track("form_start", { form_id: "short_lead" });
        }
      }}
      noValidate
      className="relative flex flex-col gap-5"
    >
      <Honeypot />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Your name"
          />
        </Field>
        <Field label="Company" htmlFor="company" required error={errors.company}>
          <TextInput
            id="company"
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            placeholder="Company name"
          />
        </Field>
        <Field label="Phone" htmlFor="phone" required error={errors.phone} hint="WhatsApp is fine.">
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            placeholder="+91"
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field
        label="What do you want to solve?"
        htmlFor="requirement"
        required
        error={errors.requirement}
        hint="Machines involved, what you cannot currently see, or just the problem in your own words."
      >
        <TextArea
          id="requirement"
          name="requirement"
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? "requirement-error" : undefined}
          placeholder="We have 14 machines across two lines, mostly Delta and Mitsubishi PLCs. We cannot tell how much time we lose to short stoppages…"
        />
      </Field>

      {status === "error" && (
        <p role="alert" className="border border-fault/40 bg-fault/10 px-4 py-3 text-[0.9375rem] text-fault">
          Something went wrong sending that. Please call or message us on WhatsApp instead — the
          numbers are in the footer.
        </p>
      )}

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button size="lg" type="submit" disabled={status === "sending"} withArrow>
          {status === "sending" ? "Sending…" : "Send to an engineer"}
        </Button>
        <p className="text-[0.8125rem] leading-relaxed text-ink-3">
          We reply to every enquiry. No mailing list, no follow-up sequence.
        </p>
      </div>
    </form>
  );
}
