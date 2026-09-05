"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { industries } from "@/content/industries";
import { Button } from "@/components/ui/Button";
import { ChoiceCard, Field, Honeypot, Select, TextArea, TextInput } from "./fields";
import { track } from "@/lib/analytics";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Five-step progressive qualification (docs/02 §9.3).
 *
 * The ordering is the whole design: step 1 costs one click and starts the
 * commitment; contact details are asked last, once the visitor is invested.
 * A flat eleven-field form collects the same data and converts far worse.
 *
 * Budget is optional and banded — a mandatory budget field kills B2B forms.
 */

const OBJECTIVES = [
  { id: "monitor", title: "See what my machines are doing", note: "Production, downtime, OEE" },
  { id: "downtime", title: "Reduce downtime", note: "Find and fix the losses" },
  { id: "automate", title: "Automate a process", note: "PLC, SCADA, control system" },
  { id: "integrate", title: "Connect the plant to our ERP/MES", note: "Stop re-keying numbers" },
  { id: "software", title: "Build custom software", note: "Replace a spreadsheet or a paper process" },
  { id: "unsure", title: "Not sure yet", note: "We will help work it out" },
];

const MACHINE_BANDS = ["1–5", "6–15", "16–40", "41–100", "100+"];
const PLC_BRANDS = [
  "Siemens", "Allen-Bradley / Rockwell", "Mitsubishi", "Delta", "Schneider",
  "Omron", "Other / mixed", "No PLCs — machines are unmanaged", "Not sure",
];
const EXISTING = [
  "Existing SCADA system",
  "HMIs on the machines",
  "Some monitoring already in place",
  "Energy meters installed",
  "Shop-floor network available",
  "None of the above",
];
const SCOPE = [
  "Machine / production monitoring",
  "Downtime and OEE tracking",
  "PLC programming or migration",
  "SCADA development or upgrade",
  "HMI development",
  "Predictive / condition monitoring",
  "Dashboards and reporting",
  "Mobile application",
  "ERP / MES integration",
  "Custom software",
];
const TIMELINES = ["As soon as possible", "Within 3 months", "3–6 months", "Later / budgeting now"];
const BUDGETS = [
  "Not decided yet",
  "Under ₹5 lakh",
  "₹5–15 lakh",
  "₹15–50 lakh",
  "Over ₹50 lakh",
];

type Data = {
  objective: string;
  industry: string;
  machines: string;
  location: string;
  plcBrands: string[];
  existing: string[];
  scope: string[];
  timeline: string;
  budget: string;
  notes: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  preferred: string;
};

const EMPTY: Data = {
  objective: "", industry: "", machines: "", location: "", plcBrands: [], existing: [],
  scope: [], timeline: "", budget: "", notes: "", name: "", role: "", company: "",
  phone: "", email: "", preferred: "WhatsApp",
};

const STEPS = ["Objective", "Your plant", "Existing systems", "Scope & timing", "Contact"];

export function EstimateWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    track("estimate_step_view", { step: step + 1 });
  }, [step]);

  const set = <K extends keyof Data>(key: K, value: Data[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggle = (key: "plcBrands" | "existing" | "scope", value: string) =>
    setData((d) => ({
      ...d,
      [key]: d[key].includes(value) ? d[key].filter((v) => v !== value) : [...d[key], value],
    }));

  const stepValid = useMemo(() => {
    switch (step) {
      case 0: return data.objective !== "";
      case 1: return data.industry !== "" && data.machines !== "";
      case 2: return data.plcBrands.length > 0;
      case 3: return data.scope.length > 0 && data.timeline !== "";
      case 4:
        return (
          data.name.trim().length > 1 &&
          data.company.trim().length > 1 &&
          data.phone.replace(/\D/g, "").length >= 8 &&
          /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(data.email)
        );
      default: return false;
    }
  }, [step, data]);

  const next = () => {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  };

  async function submit() {
    if (!stepValid) {
      setShowErrors(true);
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch(site.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "estimate", ...data }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      track("estimate_submit", {
        objective: data.objective,
        industry: data.industry,
        machines_band: data.machines,
        budget_band: data.budget,
      });
      track("generate_lead", { source: "estimate", value_band: data.budget });
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 border border-border bg-surface p-8 lg:p-10">
        <CheckCircle2 className="size-8 text-run" aria-hidden />
        <h2 className="t-h2">Received — an engineer will read this today</h2>
        <p className="max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-2">
          You gave us enough to be useful, so the first reply will contain something concrete: what
          is readable from the equipment you described, what would need instrumentation, and a
          realistic first-phase shape. Not a brochure.
        </p>
        <p className="max-w-[58ch] leading-relaxed text-ink-3">
          If you would rather talk it through now, calling or messaging on WhatsApp reaches the same
          person.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Honeypot />

      {/* ── Progress ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4">
          <p className="t-label text-ink-2">
            Step {step + 1} of {STEPS.length} · {STEPS[step]}
          </p>
          <p className="t-label text-ink-3">About two minutes</p>
        </div>
        <div className="mt-3 flex gap-1" aria-hidden>
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={cn(
                "h-0.5 flex-1 transition-colors duration-300",
                i <= step ? "bg-accent" : "bg-border",
              )}
            />
          ))}
        </div>
      </div>

      <div className="border border-border bg-surface p-6 lg:p-9">
        {/* ── Step 1 · Objective ──────────────────────────────────────────── */}
        {step === 0 && (
          <StepShell
            title="What are you trying to achieve?"
            note="One click. We will get specific later."
          >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OBJECTIVES.map((option) => (
                <ChoiceCard
                  key={option.id}
                  title={option.title}
                  note={option.note}
                  selected={data.objective === option.id}
                  onSelect={() => set("objective", option.id)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* ── Step 2 · Plant ──────────────────────────────────────────────── */}
        {step === 1 && (
          <StepShell title="Tell us about the plant" note="Rough numbers are fine.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Industry" htmlFor="industry" required>
                <Select
                  id="industry"
                  value={data.industry}
                  onChange={(e) => set("industry", e.target.value)}
                >
                  <option value="">Select an industry</option>
                  {industries.map((i) => (
                    <option key={i.slug} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Select>
              </Field>

              <Field label="Location" htmlFor="location" hint="City or industrial area.">
                <TextInput
                  id="location"
                  value={data.location}
                  onChange={(e) => set("location", e.target.value)}
                  placeholder="e.g. Chakan, Pune"
                />
              </Field>
            </div>

            <div className="mt-6">
              <p className="t-label mb-3 text-ink-2">
                How many machines are in scope?
                <span className="ml-1 text-accent" aria-hidden>*</span>
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {MACHINE_BANDS.map((band) => (
                  <ChoiceCard
                    key={band}
                    title={band}
                    selected={data.machines === band}
                    onSelect={() => set("machines", band)}
                  />
                ))}
              </div>
            </div>
          </StepShell>
        )}

        {/* ── Step 3 · Existing systems ───────────────────────────────────── */}
        {step === 2 && (
          <StepShell
            title="What is already installed?"
            note="This is the single most useful thing you can tell us — it determines what is possible without touching your machines."
          >
            <p className="t-label mb-3 text-ink-2">
              Controllers on the floor
              <span className="ml-1 text-accent" aria-hidden>*</span>
              <span className="ml-2 normal-case tracking-normal text-ink-3">select all that apply</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {PLC_BRANDS.map((brand) => (
                <ChoiceCard
                  key={brand}
                  multi
                  title={brand}
                  selected={data.plcBrands.includes(brand)}
                  onSelect={() => toggle("plcBrands", brand)}
                />
              ))}
            </div>

            <p className="t-label mb-3 mt-8 text-ink-2">Anything else already in place?</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {EXISTING.map((item) => (
                <ChoiceCard
                  key={item}
                  multi
                  title={item}
                  selected={data.existing.includes(item)}
                  onSelect={() => toggle("existing", item)}
                />
              ))}
            </div>
          </StepShell>
        )}

        {/* ── Step 4 · Scope and timing ───────────────────────────────────── */}
        {step === 3 && (
          <StepShell title="Scope and timing" note="Pick everything that is genuinely in scope.">
            <p className="t-label mb-3 text-ink-2">
              What do you need?
              <span className="ml-1 text-accent" aria-hidden>*</span>
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SCOPE.map((item) => (
                <ChoiceCard
                  key={item}
                  multi
                  title={item}
                  selected={data.scope.includes(item)}
                  onSelect={() => toggle("scope", item)}
                />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="t-label mb-3 text-ink-2">
                  Timeline
                  <span className="ml-1 text-accent" aria-hidden>*</span>
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {TIMELINES.map((t) => (
                    <ChoiceCard
                      key={t}
                      title={t}
                      selected={data.timeline === t}
                      onSelect={() => set("timeline", t)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="t-label mb-3 text-ink-2">
                  Budget range
                  <span className="ml-2 normal-case tracking-normal text-ink-3">optional</span>
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {BUDGETS.map((b) => (
                    <ChoiceCard
                      key={b}
                      title={b}
                      selected={data.budget === b}
                      onSelect={() => set("budget", b)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </StepShell>
        )}

        {/* ── Step 5 · Contact ────────────────────────────────────────────── */}
        {step === 4 && (
          <StepShell
            title="Where should we send it?"
            note="An engineer replies with something concrete, not a brochure."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="est-name" required>
                <TextInput
                  id="est-name"
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field label="Role" htmlFor="est-role">
                <TextInput
                  id="est-role"
                  value={data.role}
                  onChange={(e) => set("role", e.target.value)}
                  placeholder="e.g. Plant Manager"
                />
              </Field>
              <Field label="Company" htmlFor="est-company" required>
                <TextInput
                  id="est-company"
                  autoComplete="organization"
                  value={data.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </Field>
              <Field label="Phone" htmlFor="est-phone" required hint="WhatsApp is fine.">
                <TextInput
                  id="est-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={data.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+91"
                />
              </Field>
              <Field label="Email" htmlFor="est-email" required className="sm:col-span-2">
                <TextInput
                  id="est-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
            </div>

            <Field
              label="Anything else we should know?"
              htmlFor="est-notes"
              className="mt-5"
              hint="Machine makes and models, constraints, shutdown windows, what has been tried before."
            >
              <TextArea
                id="est-notes"
                value={data.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </Field>

            <div className="mt-5">
              <p className="t-label mb-3 text-ink-2">Preferred way to reach you</p>
              <div className="grid grid-cols-3 gap-3">
                {["WhatsApp", "Phone", "Email"].map((channel) => (
                  <ChoiceCard
                    key={channel}
                    title={channel}
                    selected={data.preferred === channel}
                    onSelect={() => set("preferred", channel)}
                  />
                ))}
              </div>
            </div>
          </StepShell>
        )}

        {showErrors && !stepValid && (
          <p role="alert" className="mt-6 text-[0.9375rem] text-fault">
            Please complete the required fields on this step before continuing.
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="mt-6 border border-fault/40 bg-fault/10 px-4 py-3 text-[0.9375rem] text-fault">
            Something went wrong sending that. Please call or message us on WhatsApp instead.
          </p>
        )}

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <div className="mt-9 flex items-center justify-between gap-4 border-t border-border pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button size="lg" onClick={next} withArrow>
              Continue
            </Button>
          ) : (
            <Button size="lg" onClick={submit} disabled={status === "sending"} withArrow>
              {status === "sending" ? "Sending…" : "Send my requirement"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepShell({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="t-h3">{title}</h2>
      {note && <p className="mt-2.5 max-w-[62ch] leading-relaxed text-ink-2">{note}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
}
