/**
 * The ten-stage data path. Drives the scroll-animated architecture section and
 * the hero schematic. Ordered strictly by physical data flow — the animation
 * direction always follows this order (docs/03 §7.1, principle 3).
 */

export type ArchStage = {
  id: string;
  index: string;
  label: string;
  /** Short label for the compact hero schematic */
  shortLabel: string;
  title: string;
  body: string;
  detail: string[];
  /** Which service page this stage links to */
  href: string;
};

export const archStages: ArchStage[] = [
  {
    id: "machine",
    index: "01",
    label: "Machine & sensors",
    shortLabel: "Machine",
    title: "The machine and what it can tell you",
    body: "Every machine exposes something. A controller with readable tags, a drive with a Modbus port, or — at minimum — a motor drawing current and an output you can count.",
    detail: [
      "Existing PLC tags read without modifying control logic",
      "Retrofitted sensors where the machine exposes nothing",
      "Current transformers for run, stop and load",
      "Proximity and photoelectric counting",
    ],
    href: "/industrial-iot",
  },
  {
    id: "plc",
    index: "02",
    label: "PLC & control",
    shortLabel: "PLC",
    title: "The control layer",
    body: "The PLC already holds cycle counts, states, fault codes and setpoints. We read them; we do not disturb them.",
    detail: [
      "Read-only polling at a rate set per tag",
      "Siemens, Allen-Bradley, Mitsubishi, Delta, Schneider, Omron",
      "Controller load kept negligible and measured",
      "Control program unchanged",
    ],
    href: "/plc-programming",
  },
  {
    id: "protocol",
    index: "03",
    label: "Industrial protocol",
    shortLabel: "Protocol",
    title: "Speaking the machine's language",
    body: "Whatever the machine supports — not whatever is fashionable. Protocol choice is driven by the installed base and by what can be read safely.",
    detail: [
      "Modbus TCP / RTU · OPC UA · Ethernet/IP",
      "Profinet · S7 comms · serial via converter",
      "Dry contacts and pulse inputs as a last resort",
      "Read-only paths preferred throughout",
    ],
    href: "/edge-computing",
  },
  {
    id: "gateway",
    index: "04",
    label: "Edge gateway",
    shortLabel: "Gateway",
    title: "The boundary device",
    body: "Dual-homed: one interface on the OT network, one on the business side, with no routing between them. This is where the OT/IT boundary physically exists.",
    detail: [
      "DIN-rail industrial hardware, no moving parts",
      "Two network interfaces, deliberately not bridged",
      "Timestamping at source",
      "Remote managed, version controlled",
    ],
    href: "/edge-computing",
  },
  {
    id: "edge",
    index: "05",
    label: "Edge processing",
    shortLabel: "Edge",
    title: "Where raw data becomes meaningful",
    body: "Normalisation, deadbanding, state classification and local alarm logic. This is what makes the volume manageable and the latency low.",
    detail: [
      "Registers mapped to a named, typed, unit-consistent model",
      "Run / idle / stop / changeover / fault derived here",
      "Deadbands and report-by-exception cut volume by orders of magnitude",
      "Alarms evaluated locally, so latency does not depend on the uplink",
    ],
    href: "/edge-computing",
  },
  {
    id: "transport",
    index: "06",
    label: "Buffered transport",
    shortLabel: "Transport",
    title: "Getting it out, without losing it",
    body: "Published over MQTT or HTTPS with local persistence. A network outage becomes a transmission gap, never a data gap.",
    detail: [
      "MQTT with Sparkplug B, or HTTPS",
      "TLS with per-device client certificates",
      "Store-and-forward with ordered back-fill",
      "De-duplication on reconnect",
    ],
    href: "/industrial-iot",
  },
  {
    id: "storage",
    index: "07",
    label: "Storage & context",
    shortLabel: "Storage",
    title: "Values with context, not just values",
    body: "A time-series store alongside asset context — which machine, which line, which shift, which product, which order. Values without context cannot be analysed.",
    detail: [
      "TimescaleDB / PostgreSQL, or your existing historian",
      "Retention and downsampling designed per tag",
      "Asset model that scales by instantiation, not redesign",
      "On-premises or your cloud account — your choice",
    ],
    href: "/custom-industrial-software",
  },
  {
    id: "analytics",
    index: "08",
    label: "Analysis",
    shortLabel: "Analysis",
    title: "Turning history into findings",
    body: "OEE, Pareto analysis of stop causes, energy per unit, condition trends. Explainable methods first; model-based detection only where the history supports it.",
    detail: [
      "OEE with components shown separately and assumptions documented",
      "Downtime Pareto by cause, machine, shift and product",
      "Condition trending against per-state baselines",
      "Anomaly detection where there is enough history to justify it",
    ],
    href: "/predictive-maintenance",
  },
  {
    id: "interface",
    index: "09",
    label: "Dashboards & apps",
    shortLabel: "Dashboard",
    title: "Shown to the person who can act",
    body: "A floor display, a supervisor view and a phone summary are three different designs of the same data. One dashboard for all three serves none of them.",
    detail: [
      "Large-format shop-floor displays, readable at distance",
      "Supervisor views with drill-down",
      "Mobile-first management summaries",
      "Alerts routed with escalation and acknowledgement",
    ],
    href: "/industrial-dashboards",
  },
  {
    id: "decision",
    index: "10",
    label: "Business decision",
    shortLabel: "Decision",
    title: "The only stage that pays for the rest",
    body: "A shift that recovers before it ends. A bearing replaced during a planned stop. A constraint addressed because it was measured rather than assumed. If no decision changes, the system has failed regardless of how good the dashboard looks.",
    detail: [
      "Posted to ERP and MES through documented interfaces",
      "Work orders raised from condition, not from a calendar",
      "Reporting produced without anyone assembling it",
      "Evidence available for audits and customers on demand",
    ],
    href: "/system-integration",
  },
];
