/**
 * Editorial plan for /insights.
 *
 * These are the first twelve articles from docs/04-SEO.md §8.8 — each targets
 * one long-tail question, is genuinely useful to an engineer, and links to a
 * money page. `status: "planned"` articles render as a visible pipeline rather
 * than as fake published posts: no article is listed as available until it has
 * actually been written.
 *
 * To publish one: write the body, set `status: "published"` and add
 * `publishedAt`. The route and sitemap pick it up automatically.
 */

export type Insight = {
  slug: string;
  title: string;
  description: string;
  targetKeyword: string;
  relatedService: string;
  status: "planned" | "published";
  publishedAt?: string;
  /** Markdown-ish paragraphs. Only used when status is "published". */
  body?: string[];
};

export const insights: Insight[] = [
  {
    slug: "connect-existing-plc-to-cloud-dashboard",
    title: "How to connect an existing PLC to a cloud dashboard without changing the control program",
    description:
      "The non-intrusive path from an installed PLC to a live dashboard: which protocols to read, how to size poll rates, and where the genuine limits are.",
    targetKeyword: "connect plc to cloud dashboard",
    relatedService: "industrial-iot",
    status: "planned",
  },
  {
    slug: "opc-ua-vs-modbus-vs-mqtt",
    title: "OPC UA vs Modbus TCP vs MQTT — choosing a protocol for a retrofit",
    description:
      "The three protocols solve different problems and are usually used together. A practical decision guide for brownfield plants.",
    targetKeyword: "opc ua vs modbus vs mqtt",
    relatedService: "edge-computing",
    status: "planned",
  },
  {
    slug: "what-oee-actually-measures",
    title: "What OEE actually measures, and why most factory OEE numbers are wrong",
    description:
      "Availability, performance and quality — where the assumptions hide, and how to produce an OEE figure that survives a review meeting.",
    targetKeyword: "oee calculation manufacturing",
    relatedService: "machine-monitoring",
    status: "planned",
  },
  {
    slug: "monitoring-machines-with-no-plc",
    title: "Retrofitting machine monitoring onto equipment with no PLC",
    description:
      "Current transformers, proximity counters and remote I/O: getting real state and real counts from machines that expose nothing.",
    targetKeyword: "machine monitoring without plc",
    relatedService: "machine-monitoring",
    status: "planned",
  },
  {
    slug: "mqtt-sparkplug-b-explained",
    title: "MQTT Sparkplug B explained for automation engineers",
    description:
      "Why plain MQTT is not enough, what birth and death certificates give you, and how state awareness changes alarm design.",
    targetKeyword: "mqtt sparkplug b explained",
    relatedService: "edge-computing",
    status: "planned",
  },
  {
    slug: "edge-vs-cloud-industrial",
    title: "Edge vs cloud: what should be computed at the plant",
    description:
      "A decision framework based on latency, bandwidth, availability and cost — with worked examples from vibration and OEE.",
    targetKeyword: "industrial edge vs cloud computing",
    relatedService: "edge-computing",
    status: "planned",
  },
  {
    slug: "architecture-for-monitoring-twenty-machines",
    title: "A realistic architecture for monitoring 20 machines across two plants",
    description:
      "A full worked architecture: gateways, protocols, tag model, storage, retention and what it costs to run.",
    targetKeyword: "factory monitoring system architecture",
    relatedService: "industrial-iot",
    status: "planned",
  },
  {
    slug: "why-scada-data-never-reaches-erp",
    title: "Why your SCADA data never reaches your ERP",
    description:
      "The boundary problem, the person in the middle with a spreadsheet, and how to design the interface properly.",
    targetKeyword: "scada erp integration",
    relatedService: "system-integration",
    status: "planned",
  },
  {
    slug: "energy-per-machine-without-rewiring",
    title: "Reading energy consumption per machine without rewiring the panel",
    description:
      "Clamp-on CTs, meter selection, where to install, and how to attribute consumption to machine, shift and product.",
    targetKeyword: "machine level energy monitoring",
    relatedService: "industrial-iot",
    status: "planned",
  },
  {
    slug: "downtime-reason-codes-that-work",
    title: "Downtime reason codes: designing a system operators will actually use",
    description:
      "Why most reason-code systems are abandoned within a month, and the design constraints that prevent it.",
    targetKeyword: "downtime reason code system",
    relatedService: "machine-monitoring",
    status: "planned",
  },
  {
    slug: "migrating-legacy-plc-without-shutdown",
    title: "Migrating a legacy PLC without a full line shutdown",
    description:
      "Proving functional equivalence, pre-testing off-line, staged cut-over, and keeping a real way back.",
    targetKeyword: "plc migration without shutdown",
    relatedService: "plc-programming",
    status: "planned",
  },
  {
    slug: "industrial-network-segmentation-basics",
    title: "Industrial network segmentation basics — the Purdue model in practice",
    description:
      "What the levels mean on a real shop floor, where the boundary device sits, and what your IT team will ask for.",
    targetKeyword: "industrial network segmentation purdue model",
    relatedService: "system-integration",
    status: "planned",
  },
];

export const publishedInsights = insights.filter((i) => i.status === "published");

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
