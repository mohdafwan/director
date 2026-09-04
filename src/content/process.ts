import type { ProcessStage } from "./types";

export const process: ProcessStage[] = [
  {
    index: "01",
    name: "Discover",
    duration: "1–2 conversations",
    body: "We start with the business problem, not the technology. What can you not answer today, what does it cost you, and what would you do differently if you could see it. If the honest answer is that a monitoring system would not change any decision, we will say so.",
    outputs: ["Problem statement in your words", "Rough scope and phasing", "Go / no-go before anyone spends money"],
  },
  {
    index: "02",
    name: "Audit",
    duration: "1–3 days on site",
    body: "A physical survey of the plant. Every machine in scope: make, model, controller, available protocols, spare I/O, panel condition, existing meters. Plus the network, the shop-floor environment and the shutdown windows we will have to work in.",
    outputs: ["Machine and tag inventory", "Network and infrastructure assessment", "Instrumentation requirements per machine", "Constraints and risks"],
  },
  {
    index: "03",
    name: "Design",
    duration: "1–2 weeks",
    body: "The technical architecture: what is read from where, over which protocol, at what rate, through which gateway, into what data model, presented how. Written down and reviewed with your team before anything is built, because a disagreement on paper costs nothing.",
    outputs: ["Architecture document", "Tag and data model", "Interface definitions", "Phased implementation plan with fixed-price phase one"],
  },
  {
    index: "04",
    name: "Engineer",
    duration: "2–8 weeks per phase",
    body: "Build. PLC and HMI code, gateway configuration, edge logic, backend services, dashboards and applications — developed against simulated or offline equipment wherever possible so your production line is not the test rig.",
    outputs: ["Configured and tested hardware", "Commented source code", "Application and dashboards", "Test records"],
  },
  {
    index: "05",
    name: "Integrate",
    duration: "1–2 weeks",
    body: "Connect the parts and prove they talk: machine to gateway, gateway to platform, platform to your ERP or MES. Tested with real failure — target system down, malformed data, duplicates, network partition — because all of those will happen eventually.",
    outputs: ["Verified end-to-end data path", "Integration interfaces with monitoring", "Failure and recovery test evidence"],
  },
  {
    index: "06",
    name: "Deploy",
    duration: "Your shutdown window",
    body: "Physical installation and commissioning, planned around your production schedule. Loop checks, dry runs, staged cut-over, and — for anything that changes machine behaviour — the previous configuration kept intact and restorable.",
    outputs: ["Commissioned system", "As-built documentation", "Operator and maintenance training", "Defined rollback position"],
  },
  {
    index: "07",
    name: "Monitor",
    duration: "First 4–6 weeks",
    body: "We watch the system in production with you. The first month always surfaces something: an assumption about the process that was wrong, a reason code list that needs changing, a threshold that is too sensitive. Fixing that is part of the project, not a change request.",
    outputs: ["Tuned thresholds and alarms", "Revised reason codes", "Data quality verification", "First real findings"],
  },
  {
    index: "08",
    name: "Optimise",
    duration: "Ongoing, if you want it",
    body: "The system is now producing evidence. Where it points to a further change — a bottleneck to address, an asset to instrument, a process to automate — we scope the next phase from measurement rather than from assumption. Or you take it from here; the documentation is written so you can.",
    outputs: ["Findings and recommendations", "Next-phase scope, if justified", "Support arrangement, if wanted"],
  },
];

export const engagementModels = [
  {
    title: "Fixed-price pilot",
    body: "One line or a defined set of machines, fixed scope, fixed price. The normal way to start. It is small enough that a wrong assumption is cheap and large enough to produce real findings.",
    fit: "First engagement, proving the approach",
  },
  {
    title: "Phased project",
    body: "A larger programme broken into phases, each independently useful and separately priced. You can stop after any phase and still have something working.",
    fit: "Plant-wide or multi-line rollouts",
  },
  {
    title: "Paid discovery",
    body: "Where the scope genuinely is not clear, a short paid engagement producing a survey, architecture and realistic estimate. You own the output whether or not you continue with us.",
    fit: "Complex or ill-defined problems",
  },
  {
    title: "Retained engineering",
    body: "A monthly allocation of engineering capacity for continuous development, support and improvement — appropriate once there is a system in production that keeps evolving.",
    fit: "Ongoing development and support",
  },
];
