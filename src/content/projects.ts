import type { DemoProject } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * HONESTY CONSTRAINT — read before editing this file.
 *
 * [COMPANY NAME] is a new company. There are no customer projects yet, so
 * there are no customer case studies here.
 *
 * Everything in this file is one of two things, and is labelled as such
 * everywhere it is rendered:
 *
 *   "Engineering Demonstration" — something we have actually built, on our own
 *   equipment or a test rig, to demonstrate capability.
 *
 *   "Reference Architecture" — a design we would propose for a described
 *   situation, published so it can be evaluated technically.
 *
 * There are NO invented clients, NO invented results, NO invented metrics.
 * When real customer projects exist, they go in a separate `caseStudies.ts`
 * with the customer's written permission, and the distinction stays visible.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const projects: DemoProject[] = [
  {
    slug: "mixed-vendor-machine-monitoring",
    kind: "Engineering Demonstration",
    name: "Mixed-vendor machine monitoring rig",
    title: "Machine Monitoring Demonstration — Mixed-Vendor Rig",
    description:
      "An engineering demonstration: three controllers from different vendors plus one unmanaged machine, monitored through a single edge gateway into one data model.",
    summary:
      "Three PLC brands and one machine with no controller at all, read through one gateway and normalised into a single tag model — the situation almost every Indian plant is actually in.",
    spine: "monitor",
    context:
      "The most common objection we hear is that a plant's machines are 'too mixed' to monitor. This rig exists to demonstrate that the mix is the normal case rather than the obstacle, and to let us show the data path end to end rather than describe it.",
    challenge: [
      "Three controllers using three different protocols, with different addressing models",
      "One machine with no controller, exposing nothing electrically except a motor",
      "Inconsistent tag naming, scaling and units across the three controllers",
      "A deliberately unreliable network link, to test buffering rather than assume it",
    ],
    approach: [
      { title: "Read each controller natively", body: "Modbus TCP on one, OPC UA on the second, and a Siemens S7 connection on the third — each polled read-only at a rate appropriate to the signal rather than at one global rate." },
      { title: "Instrument the unmanaged machine", body: "A current transformer on the motor feed for run/stop and load, plus a proximity sensor for piece counting. No modification to the machine." },
      { title: "Normalise at the edge", body: "All four sources mapped to one tag model with consistent names, types, scaling and units, timestamped at the edge rather than on arrival." },
      { title: "Derive state, not just values", body: "A state machine on the gateway classifies running, idle, stopped, changeover and fault from raw signals, so downstream systems consume state rather than re-deriving it." },
      { title: "Prove the buffer", body: "The uplink is cut deliberately during operation. Data queues locally and back-fills in order on reconnect, with de-duplication verified." },
    ],
    stack: [
      "Modbus TCP · OPC UA · S7 comms",
      "Current transformer + proximity sensor retrofit",
      "Edge gateway with Node-RED and a local buffer",
      "MQTT with Sparkplug B",
      "TimescaleDB / PostgreSQL",
      "Next.js dashboard with WebSocket live updates",
    ],
    whatItShows: [
      "That mixed-vendor plants can be treated as one system",
      "That a machine with no PLC is still monitorable",
      "That state classification belongs at the edge",
      "That a network outage produces a transmission gap, not a data gap",
      "The complete path from a terminal block to a browser",
    ],
    disclosure:
      "This is our own test rig, not a customer installation. The equipment is real and the data path is real; the 'production' it monitors is a demonstration load. No customer, no customer data, and no production results are represented here.",
    services: ["machine-monitoring", "industrial-iot", "edge-computing"],
  },

  {
    slug: "plc-to-dashboard-retrofit",
    kind: "Reference Architecture",
    name: "PLC to dashboard, without touching the control program",
    title: "Reference Architecture — PLC to Dashboard Retrofit",
    description:
      "A published reference architecture for getting production and downtime data out of an existing PLC into dashboards and alerts, with no change to control logic.",
    summary:
      "The design we would propose for the most common request we get: 'the PLC knows, but nobody upstream can see it.' Published in full so it can be judged technically.",
    spine: "connect",
    context:
      "A plant with existing, working control systems wants visibility without risking the thing that currently runs the factory. The engineering question is not how to read a register — it is how to guarantee that reading it cannot affect production, and how to keep the resulting system maintainable.",
    challenge: [
      "The control system must not be modified, and must not be at risk from the monitoring layer",
      "The OT network cannot be exposed to the business network",
      "Values needed for reporting are not all exposed as tags today",
      "The plant has one short maintenance window per week",
      "The result must be maintainable by the plant's own team afterwards",
    ],
    approach: [
      { title: "Read-only, rate-limited, on a separate interface", body: "The gateway sits dual-homed: one NIC on the OT network reading the PLC, one on a separate network publishing upward, with no routing between them. Poll rates are set per tag and bounded so controller load stays negligible and measurable." },
      { title: "Identify the gap honestly", body: "Some values — reject counts, changeover state — often exist only as internal variables. These are identified during the survey, and where a small, scoped PLC addition is genuinely required, it is quoted and scheduled before commitment rather than discovered afterwards." },
      { title: "Design the tag model first", body: "A naming and unit standard defined before configuration, so machine 7 and machine 12 are described the same way and adding machine 13 is instantiation rather than redesign." },
      { title: "Edge state machine", body: "Run, idle, stop, changeover and fault derived at the edge from PLC signals, with debounce and minimum durations so that micro-stops are captured without generating noise." },
      { title: "One window, reversible", body: "Physical installation is a gateway, a switch and a cable run — one maintenance window, with nothing that cannot be undone by unplugging it." },
    ],
    stack: [
      "Modbus TCP / OPC UA / Ethernet-IP / S7, read-only",
      "Dual-NIC industrial edge gateway",
      "Store-and-forward buffer with ordered back-fill",
      "MQTT Sparkplug B northbound",
      "Time-series storage with per-tag retention policy",
      "Web dashboard plus scheduled shift reporting",
    ],
    whatItShows: [
      "How to add visibility without control-system risk",
      "How the OT/IT boundary is actually segmented in practice",
      "Why the tag model has to be designed before anything is configured",
      "Where the genuine limits of a non-intrusive retrofit are",
      "What a first-phase scope realistically contains",
    ],
    disclosure:
      "This is a reference architecture, not a delivered customer project. It describes the design we would propose for the situation above. No client, installation or result is represented.",
    services: ["industrial-iot", "plc-programming", "edge-computing"],
  },

  {
    slug: "oee-and-downtime-capture",
    kind: "Engineering Demonstration",
    name: "OEE and downtime reason capture",
    title: "Engineering Demonstration — OEE & Downtime Capture",
    description:
      "A working demonstration of automatic downtime detection with operator reason capture, OEE calculation with visible components, and shift reporting.",
    summary:
      "The half of machine monitoring that is usually done badly: capturing why a machine stopped, in under five seconds, in a way operators will actually keep doing.",
    spine: "monitor",
    context:
      "Automatic counting is straightforward. The hard part is the reason code — a step that requires a human, at the worst possible moment, when they are already dealing with the problem. Most implementations fail here, and then the OEE number becomes uninformative.",
    challenge: [
      "Reason entry must take under five seconds or it will be abandoned within a month",
      "The reason list must be short and in the operator's own words, not a taxonomy",
      "Micro-stops must be captured without generating a prompt every ninety seconds",
      "OEE must be defensible — every assumption visible and documented",
      "Unclassified downtime must be visible as unclassified, not silently dropped",
    ],
    approach: [
      { title: "Detect first, ask second", body: "The stop is detected and timed automatically from machine state. The operator is never asked whether it stopped, only why — which removes both the delay and the argument about duration." },
      { title: "Two taps, twelve options", body: "A tablet or HMI prompt with a single screen of large, plainly worded reasons, arranged by frequency. Sub-reasons only where they genuinely change the action taken." },
      { title: "Threshold and grouping for micro-stops", body: "Stops below a configurable threshold are recorded and counted but do not prompt. Repeated short stops within a window are grouped into one prompt, so the operator is asked once about a pattern rather than fifteen times about instances." },
      { title: "Show OEE as three numbers", body: "Availability, performance and quality displayed separately alongside the combined figure, with the ideal cycle time and planned production time stated on the same screen. A single number with a hidden basis gets argued with; three numbers with a visible basis get acted on." },
      { title: "Make unclassified visible", body: "Downtime with no reason is shown as its own category on every report. Hiding it produces a tidier chart and a useless system." },
    ],
    stack: [
      "PLC state and count reads",
      "Edge state machine with debounce and micro-stop grouping",
      "Tablet / HMI reason capture interface",
      "PostgreSQL + TimescaleDB",
      "Next.js dashboard with live WebSocket updates",
      "Automatic shift-end reporting",
    ],
    whatItShows: [
      "Downtime reason capture designed for the person who has to use it",
      "Micro-stop handling that does not generate prompt fatigue",
      "OEE presented so its basis can be checked",
      "Unclassified time treated as a finding rather than hidden",
      "Shift reporting produced without anyone assembling it",
    ],
    disclosure:
      "Built and demonstrated on our own test rig. The interface, the logic and the calculations are real; the production data driving it is generated by the rig. No customer results are represented.",
    services: ["machine-monitoring", "hmi-development", "industrial-dashboards"],
  },

  {
    slug: "condition-monitoring-rig",
    kind: "Engineering Demonstration",
    name: "Vibration condition monitoring with edge processing",
    title: "Engineering Demonstration — Condition Monitoring at the Edge",
    description:
      "A demonstration of vibration condition monitoring with FFT and feature extraction performed at the edge, with baselining and deviation alerting.",
    summary:
      "High-frequency vibration data processed on the gateway so that only features travel upstream — the difference between a practical system and an unaffordable one.",
    spine: "analyse",
    context:
      "Vibration monitoring is often dismissed as too expensive or too complicated for a mid-size plant. Most of that cost is in transmitting and storing raw waveform data that nobody looks at. Processing at the edge changes the arithmetic substantially.",
    challenge: [
      "Raw vibration data at kHz sample rates cannot be streamed continuously",
      "A useful baseline must cover all normal operating states, not just one",
      "Fixed absolute thresholds produce either false alarms or missed faults",
      "Alerts that are not explainable will be ignored by maintenance teams",
      "The system must survive its own false alarms without losing credibility",
    ],
    approach: [
      { title: "Process on the device", body: "FFT and envelope analysis run on the gateway. Bearing defect frequencies, overall RMS, crest factor and band energies are extracted locally; the raw waveform is retained briefly and discarded unless an event captures it." },
      { title: "Baseline per operating state", body: "The machine's normal states are identified from load and speed, and a separate baseline is established for each — because comparing a loaded machine to an unloaded baseline is where most false alarms originate." },
      { title: "Trend before threshold", body: "Deviation from the machine's own baseline, and the rate of that deviation, are the primary signals. Absolute limits are a backstop, not the mechanism." },
      { title: "Explainable alerts", body: "An alert states which feature moved, by how much, relative to which baseline, and over what period — so a maintenance engineer can agree or disagree with it rather than simply trusting or ignoring it." },
      { title: "Record the outcome", body: "Every alert is closed out as true, false or premature, and that feedback adjusts the thresholds. Without this the system degrades into noise within a year." },
    ],
    stack: [
      "Triaxial MEMS and IEPE vibration sensors",
      "Edge FFT and envelope analysis",
      "Per-state baselining with rate-of-change detection",
      "Time-series storage of features, event-triggered waveform capture",
      "Alerting with acknowledgement and outcome tracking",
    ],
    whatItShows: [
      "Why the signal processing belongs at the edge",
      "How baselining per operating state removes most false alarms",
      "Why trend detection beats fixed thresholds",
      "What an explainable maintenance alert looks like",
      "The feedback loop that keeps the system trustworthy",
    ],
    disclosure:
      "A demonstration rig using our own rotating equipment, with faults introduced deliberately for testing. No customer asset, customer data or claimed prediction result is represented.",
    services: ["predictive-maintenance", "edge-computing", "industrial-iot"],
  },
];

export const projectSlugs = projects.map((p) => p.slug);

export function getProject(slug: string): DemoProject | undefined {
  return projects.find((p) => p.slug === slug);
}
