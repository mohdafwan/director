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
    status: "published",
    publishedAt: "2026-09-05",
    body: [
      "The question comes up on almost every retrofit, and it is usually asked as if the three protocols compete. They do not. They sit at different points on the path from the machine to wherever the data is going, and a typical brownfield plant ends up using at least two of them together.",
      "Modbus is the oldest of the three and the reason it survives is that it asks almost nothing of a device. A register map, a slave address, and a poll. There is no type system, no discovery, no security, and no concept of a device announcing itself — a Modbus register is sixteen bits and whether that means degrees Celsius, tenths of a bar, or a bitfield of alarm flags is something you find out from a PDF, or by experiment. That sounds like a weakness, and it is, but it is also why practically every energy meter, VFD, temperature controller and twenty-year-old PLC in your plant will speak it. On a retrofit, Modbus TCP is very often the only thing a given machine can do, and it is almost always safe: you are reading registers the controller already maintains, at a rate you choose, without touching the control program.",
      "OPC UA is what you use when the equipment is modern enough to offer it. It solves precisely the things Modbus does not: tags are named and typed, units and engineering ranges travel with the value, the server describes its own address space so you can browse it instead of guessing, and the transport is authenticated and encrypted. The practical consequence is maintainability. A Modbus integration is a spreadsheet of register offsets that becomes wrong the moment somebody changes the PLC program; an OPC UA integration refers to tags by name and mostly survives that. Where a controller supports OPC UA and the licence is already paid for, use it.",
      "MQTT is not a machine protocol at all, and this is the part that most often gets muddled. It is a lightweight publish-and-subscribe transport designed for unreliable networks. It has no idea what a PLC is. You do not connect MQTT to a machine; you connect something to the machine — Modbus, OPC UA, a native driver — and then use MQTT to move the resulting data somewhere else. Its value is in the direction of connection and in its behaviour when the link fails. The gateway connects outward to a broker, so no inbound firewall port is needed into the plant. Messages are published only when a value actually changes, so bandwidth tracks meaningful events rather than sample rate. And when the connection drops, a properly configured client queues locally and back-fills on reconnect.",
      "Plain MQTT, though, gives you a transport and no conventions. There is no agreed payload format, no way to discover what a device publishes, and — the one that bites hardest — no way to distinguish “nothing has changed” from “this device is dead”. Both look identical: silence. Sparkplug B is a specification layered on top of MQTT that fixes this. It defines the payload encoding, requires a device to publish a birth certificate describing every metric it will send, and registers a death certificate with the broker in advance so that an unexpected disconnection is announced rather than inferred. If you intend to alarm on machine data, that distinction is not a nicety. A monitoring system that treats a dead gateway as a healthy machine producing no faults is worse than no monitoring system.",
      "So the architecture that falls out of this for most plants looks like one shape. On the field side, read each machine over whatever it actually supports — OPC UA where it exists, Modbus TCP or RTU where it does not, a native driver where the diagnostics justify it. Normalise all of it at the edge into one tag model with consistent names and units, so that machine 7 and machine 12 describe the same quantity the same way. Then publish north over MQTT with Sparkplug B, with local buffering behind it.",
      "That leaves the two decisions that actually matter, neither of which is a protocol choice. The first is your tag model: agreeing what things are called and in what units, before anything is configured, is what determines whether adding the thirteenth machine is a morning’s work or a redesign. The second is your poll and deadband policy per tag, which is what separates a system that produces a few megabytes a month from one that produces gigabytes nobody queries. Protocols are the easy part. Getting those two right is the engineering.",
    ],
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
