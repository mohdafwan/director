import { services, spineOrder, spineLabels } from "@/content/services";
import { industries } from "@/content/industries";

export const capabilityColumns = spineOrder.map((stage) => ({
  stage,
  label: spineLabels[stage].label,
  blurb: spineLabels[stage].blurb,
  items: services
    .filter((s) => s.spine === stage)
    .map((s) => ({ name: s.name, href: `/${s.slug}`, summary: s.summary })),
}));

export const industryLinks = industries.map((i) => ({
  name: i.name,
  href: `/industries/${i.slug}`,
  short: i.short,
}));

export const companyLinks = [
  { name: "About", href: "/about", short: "Why the company exists" },
  { name: "How we work", href: "/how-we-work", short: "Our eight-stage process" },
  { name: "Technology", href: "/technology", short: "Protocols, platforms and security" },
  { name: "Insights", href: "/insights", short: "Engineering notes" },
  { name: "Contact", href: "/contact", short: "Talk to an engineer" },
];

export const primaryNav = [
  { name: "Capabilities", href: "/what-we-do", menu: "capabilities" as const },
  { name: "Industries", href: "/industries", menu: "industries" as const },
  { name: "Architecture", href: "/#architecture", menu: null },
  { name: "Projects", href: "/projects", menu: null },
  { name: "Company", href: "/about", menu: "company" as const },
];
