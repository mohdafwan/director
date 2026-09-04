import { NextResponse } from "next/server";
import { site } from "@/config/site";

/**
 * Lead intake.
 *
 * Handles both the short contact form and the five-step estimate wizard.
 *
 * What is implemented here: schema validation, honeypot rejection, field
 * length caps, and a simple in-memory rate limit. What is NOT implemented is
 * delivery — see the DELIVERY section at the bottom. That is deliberate: it
 * needs a real inbox, CRM or webhook, and wiring one to a placeholder address
 * would silently drop enquiries.
 *
 * Only after this route returns 200 does the client fire `generate_lead`, so
 * the Google Ads conversion is bound to a validated submission rather than to
 * any bot that finds the form.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { short: 2_000, long: 8_000 };

type LeadPayload = Record<string, unknown>;

/* ── Rate limiting ─────────────────────────────────────────────────────────
   In-memory, per-instance. Adequate for a single-instance deployment and for
   blunt abuse. Move to Redis / Upstash if the site is deployed across multiple
   regions or serverless instances.                                          */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5_000) hits.clear(); // crude ceiling on memory growth
  return recent.length > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/* ── Validation ────────────────────────────────────────────────────────── */

const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

function str(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function list(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string").slice(0, 20) : [];
}

function validate(body: LeadPayload): { ok: true; lead: Record<string, unknown> } | { ok: false; reason: string } {
  // Honeypot: a real person never sees this field.
  if (str(body.company_website)) return { ok: false, reason: "rejected" };

  const kind = str(body.kind, 20);
  if (kind !== "short" && kind !== "estimate") return { ok: false, reason: "unknown form" };

  const name = str(body.name, 120);
  const company = str(body.company, 160);
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);

  if (name.length < 2) return { ok: false, reason: "name" };
  if (company.length < 2) return { ok: false, reason: "company" };
  if (phone.replace(/\D/g, "").length < 8) return { ok: false, reason: "phone" };
  if (!EMAIL.test(email)) return { ok: false, reason: "email" };

  const base = {
    kind,
    name,
    company,
    phone,
    email,
    receivedAt: new Date().toISOString(),
  };

  if (kind === "short") {
    const requirement = str(body.requirement, MAX.short);
    if (requirement.length < 10) return { ok: false, reason: "requirement" };
    return { ok: true, lead: { ...base, context: str(body.context, 80), requirement } };
  }

  return {
    ok: true,
    lead: {
      ...base,
      role: str(body.role, 120),
      objective: str(body.objective, 40),
      industry: str(body.industry, 80),
      machines: str(body.machines, 20),
      location: str(body.location, 120),
      plcBrands: list(body.plcBrands),
      existing: list(body.existing),
      scope: list(body.scope),
      timeline: str(body.timeline, 60),
      budget: str(body.budget, 60),
      preferred: str(body.preferred, 20),
      notes: str(body.notes, MAX.long),
    },
  };
}

/* ── Handler ───────────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const result = validate(body);

  // A honeypot hit gets a 200 so the bot believes it succeeded and does not
  // retry with a different strategy. Nothing is delivered.
  if (!result.ok) {
    if (result.reason === "rejected") return NextResponse.json({ ok: true });
    return NextResponse.json({ error: `Invalid field: ${result.reason}` }, { status: 400 });
  }

  await deliver(result.lead);

  return NextResponse.json({ ok: true });
}

/* ── DELIVERY — connect this before going live ─────────────────────────────
   Pick one and implement it here:

   1. Transactional email (simplest)
        Resend / Postmark / SES → site.contact.leadInbox
        Send to the team AND an acknowledgement to the enquirer.

   2. CRM webhook
        POST the lead object to HubSpot / Zoho / Pipedrive.

   3. WhatsApp Business API
        Notify the on-call engineer immediately — for this market that is
        usually the fastest route to a first response, and speed of first
        response is the strongest predictor of winning an industrial enquiry.

   Whichever is chosen: never swallow the delivery error silently. If delivery
   fails, log it and return a non-200 so the visitor is told to call instead of
   believing their enquiry was received.
   ──────────────────────────────────────────────────────────────────────── */

async function deliver(lead: Record<string, unknown>): Promise<void> {
  // Server-side log so nothing is lost before delivery is wired up.
  console.info(
    `[lead] ${lead.kind} · ${lead.company} · ${lead.email} · → ${site.contact.leadInbox}`,
    lead,
  );
}
