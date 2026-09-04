import type { Faq } from "./types";

/**
 * PHASE 10 — Homepage copy.
 *
 * Voice test (docs/01 §1.5): if a sentence could appear on a competitor's site
 * with the name swapped, it does not belong here.
 */

export const hero = {
  /**
   * Headline directions considered:
   *  A. "Your machines already know. We make them tell you."   ← chosen
   *  B. "From the plant floor to the boardroom, one engineering team."
   *  C. "We connect the machines you already have."
   *  D. "Industrial systems, engineered to be measurable."
   *
   * A wins because it states the value proposition as a fact about the
   * visitor's own plant rather than a claim about us — and because it is
   * true of literally every factory that will read it. Category comprehension
   * is carried by the eyebrow above it, so SEO and clarity are not sacrificed
   * to make the headline memorable.
   */
  eyebrow: "IIoT · Automation · PLC & SCADA · Software",
  headline: ["Your machines", "already know.", "We make them tell you."],
  /** Screen-reader / SEO version of the split headline. */
  headlinePlain: "Your machines already know. We make them tell you.",
  sub: "We connect existing PLCs, sensors and machines to real-time monitoring, automation and software — engineered by one team from the sensor terminal block to the number on your phone. No rip-and-replace.",
  primaryCta: { label: "Talk to an engineer", href: "/contact" },
  secondaryCta: { label: "See how the data flows", href: "/#architecture" },
  trust: [
    "Works with your existing machines",
    "OT and IT engineering in one team",
    "You own the data and the code",
  ],
};

export const capabilities = [
  {
    stage: "Connect",
    title: "Get data off the machine",
    body: "Existing PLCs, retrofitted sensors, gateways, protocols and edge processing.",
    href: "/industrial-iot",
  },
  {
    stage: "Automate",
    title: "Make the machine act on it",
    body: "PLC programming, SCADA, HMI, control system design and line integration.",
    href: "/industrial-automation",
  },
  {
    stage: "Monitor",
    title: "See it as it happens",
    body: "Machine monitoring, downtime capture, OEE and dashboards that get opened.",
    href: "/machine-monitoring",
  },
  {
    stage: "Analyse",
    title: "Understand why it happened",
    body: "Condition monitoring, predictive maintenance and industrial data analysis.",
    href: "/predictive-maintenance",
  },
  {
    stage: "Build",
    title: "Software the plant actually uses",
    body: "Web applications, mobile apps, APIs and integration with ERP and MES.",
    href: "/custom-industrial-software",
  },
];

export const problem = {
  eyebrow: "The problem",
  title: "Your plant is fully instrumented and completely invisible",
  lead: "Every machine on your floor already produces data. The PLC knows the cycle count. The drive knows the current draw. The controller knows the temperature deviation. Almost all of it is overwritten on the next scan and never reaches anyone who could act on it.",
  symptoms: [
    {
      code: "01",
      title: "Nobody can say why line 2 stopped",
      body: "Forty minutes lost on the night shift. The stop is known. The cause is a guess made three days later by someone who was not there.",
    },
    {
      code: "02",
      title: "Production is counted on paper",
      body: "Written on a sheet, typed into a spreadsheet the next morning, reconciled at month end. Every number in the business is at least a shift old.",
    },
    {
      code: "03",
      title: "Energy is one bill for the whole plant",
      body: "You know what the plant costs to run. You do not know which machine, which shift or which product is responsible for it.",
    },
    {
      code: "04",
      title: "Micro-stops are invisible",
      body: "The four-minute stoppages nobody records. On most lines they add up to more lost time than the breakdowns everyone talks about.",
    },
  ],
  close:
    "None of this is a data problem. The data exists. It is a connectivity problem, and it is solvable without changing a single machine on your floor.",
};

export const brownfield = {
  eyebrow: "Brownfield first",
  title: "We do not ask you to replace your machines",
  lead: "Almost every plant we look at runs equipment from three or four decades and five or six vendors. That is normal, and it is workable. We connect to what exists — in read-only mode wherever possible — and add instrumentation only where a machine genuinely exposes nothing.",
  points: [
    {
      title: "Your control logic is not modified",
      body: "Reading a PLC over Modbus TCP, OPC UA or Ethernet/IP is non-intrusive. We poll registers and tags that already exist. Where a value is only held internally and must be exposed, we identify it during the survey and tell you before quoting.",
    },
    {
      title: "Machines with no PLC are not excluded",
      body: "A current transformer around the motor feed gives you run, stop and load. A proximity sensor on the output gives you a count. A thermocouple gives you condition. No modification to the machine, installable in a maintenance window.",
    },
    {
      title: "Work happens in your windows",
      body: "Installation is planned around your shutdowns. Nothing goes onto a running line without an agreed method statement, and every migration has a defined way back.",
    },
    {
      title: "Start with one line, not the whole plant",
      body: "The first engagement is deliberately small — a few machines, a few weeks, real data. Prove it, then scale it. That sequencing is better for you and it is better for us.",
    },
  ],
  worksWith: [
    "Siemens S7-200/300/400/1200/1500",
    "Allen-Bradley MicroLogix / CompactLogix / ControlLogix",
    "Mitsubishi FX / Q / iQ-R",
    "Delta · Schneider · Omron · Fatek · Wecon",
    "VFDs from ABB, Danfoss, Yaskawa, Delta",
    "Machines with no controller at all",
  ],
};

export const whyUs = {
  eyebrow: "Why us",
  title: "One team on both sides of a line most companies never cross",
  lead: "There is a boundary in every industrial project where the automation ends and the software begins. It is where projects fail, and it is where two vendors point at each other.",
  columns: [
    {
      label: "Automation companies",
      body: "Know the panel, the protocol and the plant. Deliver control systems that work. Then hand you a closed box that reports nothing, because software was never the discipline.",
      limit: "Stops at the panel",
    },
    {
      label: "Software companies",
      body: "Build good applications and clean dashboards. Have never opened a control panel, do not know what Profinet is, and cannot tell you why reading that tag is a bad idea on a running line.",
      limit: "Never reaches the machine",
    },
  ],
  intersection: {
    title: "We work in the overlap",
    body: "The same team that writes the PLC logic designs the tag model, builds the API and ships the mobile app. There is no handoff, so there is no interface to blame. That is not a slogan — it is the specific reason we can quote a project from sensor to dashboard and be accountable for all of it.",
  },
  points: [
    { title: "Engineering-first", body: "We publish architectures, protocols and constraints rather than adjectives. If you are technical, judge us on the depth of the service pages." },
    { title: "You own everything", body: "Source code, schema, credentials, documentation, on infrastructure you control. Built with mainstream technology so anyone competent could take it over." },
    { title: "Honest about scope", body: "Where something is outside our competence — functional safety certification, for instance — we say so before contracting, not during commissioning." },
    { title: "Small first, then scale", body: "We would rather prove one line than sell a transformation programme. Every proposal is phased so each stage is independently useful." },
  ],
};

export const commercials = {
  eyebrow: "Commercials",
  title: "What it costs depends on things we can only know after looking",
  lead: "We do not publish a price list for industrial projects, because a number without a scope is worthless to you and dishonest from us. What we will do is tell you exactly what drives the cost, so you can size it yourself before you talk to anyone.",
  drivers: [
    { title: "How many machines", body: "The single biggest factor. Design effort is largely fixed; per-machine cost falls sharply with count." },
    { title: "What the machines expose", body: "A modern PLC with OPC UA is a configuration task. A 1990s machine with no controller needs instrumentation, wiring and a panel." },
    { title: "How many protocols", body: "One protocol across the plant is straightforward. Six vendors across four decades is real integration work." },
    { title: "Network readiness", body: "If the shop floor has no network, that is a separate piece of work — and it is often the largest surprise in a first project." },
    { title: "What happens to the data", body: "A dashboard is one thing. OEE with reason codes, ERP integration and a mobile app is another." },
    { title: "Automation complexity", body: "Reading data is non-intrusive. Changing what a machine does involves control design, testing, commissioning and risk." },
    { title: "On-premises or cloud", body: "Local deployment avoids recurring cost and satisfies data policies. Cloud is easier to scale across sites." },
    { title: "Support expectations", body: "Business-hours response and 24/7 coverage are different commitments with different costs." },
  ],
  note: "A monitoring pilot on one line is a small, defined project with a fixed price. A multi-plant programme is not, and we would scope it in phases rather than quote it as one number.",
  cta: { label: "Get a project estimate", href: "/estimate" },
};

export const homeFaq: Faq[] = [
  {
    q: "We are a small factory. Is this only for large plants?",
    a: "No — small and mid-size plants are the majority of the work, and they often get more from it because there is less existing instrumentation and more that is currently invisible. A first project on one line is deliberately small in scope and cost. The approach does not require a transformation budget to begin.",
  },
  {
    q: "Do we have to replace our machines or PLCs?",
    a: "Almost never. We read from the controllers you already have, in read-only mode, without changing the control program. Where a machine has no controller at all, we add external instrumentation — a current transformer, a counting sensor — which does not modify the machine. Replacement only comes up when a controller is obsolete and unsupportable, and even then it is a migration rather than a line rebuild.",
  },
  {
    q: "How long does a first project take?",
    a: "A monitoring pilot covering a handful of machines is typically a few weeks from site survey to live dashboard, depending on site access, network readiness and how much instrumentation must be added. Automation projects take longer because they involve design, testing and commissioning windows. We give a phase-by-phase timeline with the proposal rather than a single date.",
  },
  {
    q: "Does this need internet on the shop floor?",
    a: "Not necessarily. The whole system can run on-premises with dashboards served on your own network. Cloud is an option, not a requirement. Where cloud is used, only the gateway needs outbound connectivity, normally on a separate, segmented network — the control network is never exposed.",
  },
  {
    q: "Who owns the data and the software?",
    a: "You do. Systems are built on infrastructure you control, and you receive the source code, database schema, credentials and documentation. We use mainstream technologies specifically so another competent team could take the work over. We would rather you stay because the work is good than because leaving is hard.",
  },
  {
    q: "You are a new company. Why should we trust you with our plant?",
    a: "That is a fair question and we will not answer it with invented credentials. What we offer instead is verifiable: read the service pages and judge whether they demonstrate real engineering understanding, look at the architectures and demonstration builds we publish, and start with a small, bounded first project where the risk to you is limited and the work either proves itself or does not. Every claim on this site is one you can test.",
  },
  {
    q: "Can you work alongside our existing automation vendor?",
    a: "Yes, and it is common. We are frequently engaged for the data and software layer above a control system somebody else built and maintains. We do not need ownership of the whole stack to be useful, and we will not create a situation where your existing vendor cannot support their own system.",
  },
  {
    q: "What do you need from us to give an estimate?",
    a: "The makes and models of the machines involved, whether they have controllers and which ones, roughly how many machines and lines, what you want to be able to see or control, and what network exists on the floor. That is usually enough for a realistic range. For anything substantial we would visit before quoting a fixed price.",
  },
];

export const finalCta = {
  title: "Have a machine, a line or a plant you want to make visible?",
  body: "Tell us what is on your floor and what you cannot currently answer. We will tell you what is readable today, what needs instrumentation, and what a sensible first phase looks like — before any commitment.",
  primary: { label: "Talk to an engineer", href: "/contact" },
  secondary: { label: "Get a project estimate", href: "/estimate" },
};
