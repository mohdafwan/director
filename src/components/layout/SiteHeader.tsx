"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, MessageCircle } from "lucide-react";
import { site, telHref, whatsappHref } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/lib/hooks";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";
import { capabilityColumns, companyLinks, industryLinks, primaryNav } from "./nav-data";

type MenuKey = "capabilities" | "industries" | "company" | null;

export function SiteHeader() {
  const scrolled = useScrolledPast(24);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Route change closes everything. Adjusted during render rather than in an
  // effect — React's documented pattern for resetting state when a prop
  // changes, and it avoids a frame where the old menu is still open.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  // Escape closes; body scroll locks while the mobile overlay is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openWithDelay = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(key);
  };
  const closeWithDelay = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[height,background-color,border-color] duration-[240ms] ease-out",
          scrolled
            ? "h-16 border-b border-border bg-bg/85 backdrop-blur-xl"
            : "h-18 border-b border-transparent bg-transparent",
        )}
        onMouseLeave={closeWithDelay}
      >
        {/* From lg up: a three-column grid rather than flex + justify-between.
            With a mark on the left and a phone number + CTA on the right,
            "space between" centres the *gap*, not the nav, pushing the links
            left of the page axis. Equal minmax(0,1fr) side columns put the
            middle column on the true centre line at every width.

            Below lg the grid must NOT apply. The nav is `hidden` there, and a
            display:none element is not a grid item at all — so the right-hand
            cluster auto-placed into column 2 (hamburger stranded mid-header,
            column 3 empty) and column 1 collapsed narrow enough that
            preflight's img{max-width:100%} squashed the logo out of aspect.
            Two items want flex, so use flex until the third one exists. */}
        <div className="container-site flex h-full items-center justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
          <Link
            href="/"
            className="shrink-0 justify-self-start"
            aria-label={`${site.name} — home`}
            onFocus={() => setOpenMenu(null)}
          >
            <Wordmark priority />
          </Link>

          {/* ── Desktop nav ─────────────────────────────────────────────── */}
          <nav aria-label="Main" className="hidden justify-self-center lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = openMenu === item.menu && item.menu !== null;
                return (
                  <li key={item.name}>
                    {item.menu ? (
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-1.5 rounded-md px-3 py-2 text-[0.9375rem] transition-colors duration-150",
                          active ? "text-ink" : "text-ink-2 hover:text-ink",
                        )}
                        aria-expanded={active}
                        aria-haspopup="true"
                        onMouseEnter={() => openWithDelay(item.menu)}
                        onFocus={() => openWithDelay(item.menu)}
                        onClick={() => setOpenMenu(active ? null : item.menu)}
                      >
                        {item.name}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-3.5 transition-transform duration-200",
                            active && "rotate-180",
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-[0.9375rem] text-ink-2 transition-colors duration-150 hover:text-ink"
                        onMouseEnter={() => openWithDelay(null)}
                        onFocus={() => setOpenMenu(null)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center justify-self-end gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={telHref}
                className="text-shimmer rounded-md px-3 py-2 font-mono text-[0.8125rem] transition-colors hover:text-ink"
                data-analytics="contact_call_click"
              >
                {site.contact.phoneDisplay}
              </a>
              <Button href="/contact" size="md" withArrow>
                Talk to an engineer
              </Button>
            </div>

            {/* ── Mobile trigger ────────────────────────────────────────── */}
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* ── Mega panels ───────────────────────────────────────────────── */}
        {openMenu && (
          <div
            className="absolute inset-x-0 top-full hidden border-y border-border bg-bg-elevated shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] lg:block"
            onMouseEnter={() => openWithDelay(openMenu)}
            onMouseLeave={closeWithDelay}
          >
            <div className="container-site py-10">
              {openMenu === "capabilities" && <CapabilitiesPanel />}
              {openMenu === "industries" && <IndustriesPanel />}
              {openMenu === "company" && <CompanyPanel />}
            </div>
          </div>
        )}
      </header>

      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Capabilities panel — organised by the five-verb spine, so the taxonomy
   teaches the brand narrative every time it opens (docs/02 §4.4).
   ═══════════════════════════════════════════════════════════════════════════ */

function CapabilitiesPanel() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-9 grid grid-cols-5 gap-6">
        {capabilityColumns.map((col, i) => (
          <div key={col.stage} className="flex flex-col gap-3">
            <div className="flex items-baseline gap-2 border-b border-border pb-2">
              <span className="font-mono text-[0.6875rem] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-label text-ink">{col.label}</span>
            </div>
            <p className="min-h-8 font-mono text-[0.6875rem] leading-relaxed text-ink-3">{col.blurb}</p>
            <ul className="flex flex-col gap-1">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-sm py-1.5 text-[0.875rem] leading-snug text-ink-2 transition-colors duration-150 hover:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="col-span-3 border-l border-border pl-8">
        <p className="t-label text-ink-3">Not sure where to start?</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          Most plants start at <span className="text-ink">Connect</span> — one line, a few
          machines, a few weeks. Prove the data, then scale it.
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <Button href="/contact" size="md" withArrow>
            Talk to an engineer
          </Button>
          <Button href="/what-we-do" variant="secondary" size="md">
            All capabilities
          </Button>
        </div>
      </div>
    </div>
  );
}

function IndustriesPanel() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <ul className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-1">
        {industryLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group block rounded-md px-3 py-2.5 transition-colors duration-150 hover:bg-surface"
            >
              <span className="block text-[0.9375rem] text-ink transition-colors group-hover:text-accent">
                {item.name}
              </span>
              <span className="block text-[0.8125rem] text-ink-3">{item.short}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="col-span-3 border-l border-border pl-8">
        <p className="t-label text-ink-3">Your sector not listed?</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          The engineering is largely the same across sectors — what changes is the process
          knowledge. Tell us what you make.
        </p>
        <Button href="/contact" size="md" className="mt-5" withArrow>
          Talk to an engineer
        </Button>
      </div>
    </div>
  );
}

function CompanyPanel() {
  return (
    <ul className="grid grid-cols-5 gap-4">
      {companyLinks.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group block rounded-md border border-transparent px-3 py-3 transition-colors duration-150 hover:border-border hover:bg-surface"
          >
            <span className="block text-[0.9375rem] text-ink transition-colors group-hover:text-accent">
              {item.name}
            </span>
            <span className="mt-0.5 block text-[0.8125rem] text-ink-3">{item.short}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Mobile — full-screen overlay, spine-grouped, with call/WhatsApp pinned.
   Not a collapsed desktop menu (docs/03 §6.6).
   ═══════════════════════════════════════════════════════════════════════════ */

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-bg lg:hidden">
      <div className="flex h-18 shrink-0 items-center justify-between border-b border-border px-6">
        <Wordmark />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex size-11 items-center justify-center rounded-md text-ink"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-6 py-8">
        {capabilityColumns.map((col, ci) => (
          <div key={col.stage} className="mb-8">
            <div className="mb-3 flex items-baseline gap-2 border-b border-border pb-2">
              <span className="font-mono text-[0.6875rem] text-accent">
                {String(ci + 1).padStart(2, "0")}
              </span>
              <span className="t-label text-ink">{col.label}</span>
              <span className="ml-auto font-mono text-[0.6875rem] text-ink-3">{col.blurb}</span>
            </div>
            <ul>
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 text-lg text-ink-2 active:text-accent"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mb-8">
          <p className="t-label mb-3 border-b border-border pb-2 text-ink">Industries</p>
          <ul className="grid grid-cols-2 gap-x-4">
            {industryLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 text-[0.9375rem] text-ink-2 active:text-accent"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="t-label mb-3 border-b border-border pb-2 text-ink">Company</p>
          <ul>
            {[{ name: "Projects", href: "/projects", short: "" }, ...companyLinks].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3 text-lg text-ink-2 active:text-accent"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="shrink-0 border-t border-border bg-bg-elevated p-4">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={telHref}
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-border-strong text-[0.9375rem] text-ink"
            data-analytics="contact_call_click"
          >
            <Phone className="size-4" aria-hidden /> Call
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-md border border-border-strong text-[0.9375rem] text-ink"
            data-analytics="contact_whatsapp_click"
          >
            <MessageCircle className="size-4" aria-hidden /> WhatsApp
          </a>
        </div>
        <Button href="/contact" size="lg" className="mt-3 w-full" withArrow>
          Talk to an engineer
        </Button>
      </div>
    </div>
  );
}
