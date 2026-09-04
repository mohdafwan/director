import type { Service } from "./types";

/**
 * The twelve money pages.
 *
 * Rule: one primary keyword per page (docs/04-SEO.md §8.2). Sub-intents become
 * anchored sections here, never separate URLs.
 */

export const services: Service[] = [
  /* ══════════════════════════════════════════════════════════════════════════
     CONNECT
     ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "industrial-iot",
    name: "Industrial IoT",
    spine: "connect",
    summary: "Get data off your machines — existing PLCs, new sensors, or both.",

    primaryKeyword: "industrial iot solutions",
    title: "Industrial IoT Solutions & IIoT Systems",
    description:
      "Industrial IoT solutions that connect existing PLCs, sensors and machines to real-time dashboards. Retrofit-first IIoT engineering for Indian plants.",
    serviceType: "Industrial IoT Engineering",

    eyebrow: "Connect",
    h1: "Industrial IoT solutions that start with the machines you already own",
    lead: "Most plants do not need new machines to become measurable. They need the data that already exists inside the PLC, the drive and the energy meter to leave the shop floor. We build the connectivity layer that makes that happen — sensors, gateways, protocols, edge processing and a place for the data to land.",

    problem: {
      title: "The data already exists. It just never leaves the machine.",
      body: "Your PLC knows the cycle count. Your VFD knows the current draw. Your temperature controller knows the setpoint deviation. All of it is overwritten every scan and none of it reaches anyone who could act on it. The result is a plant that is fully instrumented and completely invisible.",
      symptoms: [
        "Production numbers are collected on paper and typed into Excel the next morning",
        "Nobody can say why line 2 stopped for 40 minutes on the night shift",
        "Energy bills are one number per plant, not one number per machine",
        "Every report is at least a shift old, so every decision is reactive",
        "Machine data exists but sits inside four different vendor systems that do not talk",
      ],
    },

    deliverables: [
      {
        title: "Machine connectivity survey",
        body: "A tag-level audit of what each machine can already expose — PLC make and model, available protocols, spare I/O, drive parameters, existing meters — and what needs sensors added.",
      },
      {
        title: "Sensor and instrumentation design",
        body: "Where a machine exposes nothing, we specify and install the instrumentation: energy meters and CTs, vibration and temperature sensors, proximity and photoelectric counters, flow and pressure transmitters.",
      },
      {
        title: "Industrial gateway layer",
        body: "DIN-rail edge gateways that speak the machine's protocol on one side and MQTT or HTTPS on the other, with store-and-forward buffering so nothing is lost when the link drops.",
      },
      {
        title: "Protocol normalisation and a tag model",
        body: "A single, consistent naming and unit model across mixed-vendor equipment, so machine 7's 'RPM_ACT' and machine 12's 'speed_fb' become the same field.",
      },
      {
        title: "Edge processing rules",
        body: "Aggregation, deadbanding, rate limiting and local alarm logic at the plant, so you send meaningful data instead of raw noise.",
      },
      {
        title: "Data platform and dashboards",
        body: "A time-series store, retention policy, and the dashboards and APIs that make the data usable by people and by your other systems.",
      },
    ],

    howItWorks: [
      {
        step: "01",
        title: "Read the machine",
        body: "We connect to the existing controller over its native protocol — Modbus TCP/RTU, OPC UA, Ethernet/IP, Profinet, S7 or a serial link — in read-only mode. Where there is no controller, we add instrumentation.",
      },
      {
        step: "02",
        title: "Normalise at the edge",
        body: "A gateway maps raw registers to named, typed, unit-consistent tags, applies deadbands and sample rates per tag, and timestamps everything at source.",
      },
      {
        step: "03",
        title: "Buffer and transmit",
        body: "Data is queued locally and published over MQTT (usually Sparkplug B) or HTTPS. If the network drops, the buffer holds and back-fills on reconnect.",
      },
      {
        step: "04",
        title: "Store and contextualise",
        body: "Values land in a time-series database alongside asset context — which machine, which line, which shift, which product — because raw values without context cannot be analysed.",
      },
      {
        step: "05",
        title: "Serve it back",
        body: "Dashboards, alerts, scheduled reports and an API. The API matters: it is what stops this becoming another silo.",
      },
    ],

    protocols: [
      { name: "Modbus TCP / RTU", use: "Legacy PLCs, energy meters, drives, temperature controllers", note: "The workhorse of Indian retrofits. Simple, universal, read-only safe." },
      { name: "OPC UA", use: "Modern PLCs and SCADA, structured tag models", note: "Preferred where available — typed, secure, self-describing, no register maps to maintain." },
      { name: "MQTT / Sparkplug B", use: "Gateway to cloud or broker", note: "Report-by-exception with birth/death certificates, so you know when a device goes silent." },
      { name: "Ethernet/IP", use: "Allen-Bradley / Rockwell environments", note: "Read via CIP; tag-based addressing on ControlLogix and CompactLogix." },
      { name: "Profinet", use: "Siemens environments", note: "Usually read via an OPC UA server or an S7 connection rather than tapping the fieldbus." },
      { name: "S7 comms", use: "Siemens S7-300/400/1200/1500", note: "Direct DB reads where OPC UA is not licensed on the controller." },
      { name: "Modbus over serial + converter", use: "Very old equipment", note: "RS-485/RS-232 to Ethernet converters where the machine predates any network port." },
      { name: "Dry contacts / pulse", use: "Machines with no controller at all", note: "Counters, run signals and energy pulses wired into a remote I/O module. Crude, effective, cheap." },
      { name: "REST / HTTPS", use: "Cloud ingestion and integration", note: "For low-frequency data and for integrating with ERP, MES and third-party platforms." },
    ],

    retrofit: {
      title: "We do not ask you to replace your machines",
      body: "Almost every plant we look at has equipment from three or four decades and five or six vendors. That is normal and it is workable. We connect to what exists, in read-only mode wherever possible, and we add instrumentation only where the machine genuinely exposes nothing. Your control logic is not modified, your line does not get re-engineered, and the work is scheduled around your shutdown windows.",
      worksWith: [
        "Siemens S7-200 / 300 / 400 / 1200 / 1500",
        "Allen-Bradley MicroLogix / CompactLogix / ControlLogix",
        "Mitsubishi FX / Q / iQ-R",
        "Delta, Schneider, Omron, Fatek, Wecon",
        "VFDs from ABB, Danfoss, Yaskawa, Delta, Schneider",
        "Machines with no PLC — retrofitted with sensors and remote I/O",
      ],
    },

    useCases: [
      { title: "Production counting without operator entry", situation: "Output is recorded by hand and reconciled at end of shift.", outcome: "Counts stream from the PLC or a retrofitted sensor; the dashboard and the shift report agree, automatically." },
      { title: "Per-machine energy visibility", situation: "One electricity bill for the whole plant, no idea which asset drives it.", outcome: "Energy meters per machine or per feeder, with consumption attributed to machine, shift and product." },
      { title: "Downtime capture with reasons", situation: "Stoppages are known, causes are not.", outcome: "Stops are detected automatically; the operator confirms a reason code on an HMI or tablet in a few seconds." },
      { title: "Multi-plant consolidation", situation: "Two or three plants, each with its own systems and its own numbers.", outcome: "One normalised data model and one view across sites, with drill-down to the individual machine." },
      { title: "Condition data for maintenance", situation: "Maintenance is calendar-based or breakdown-driven.", outcome: "Vibration, temperature and current trends per asset, with thresholds and trend alerts." },
      { title: "Cold-chain and environment monitoring", situation: "Temperature excursions found after the fact, if at all.", outcome: "Continuous logging with alerting and an audit trail suitable for compliance review." },
    ],

    industries: ["manufacturing", "automotive", "food-and-beverage", "pharmaceutical", "textile", "packaging"],

    faq: [
      { q: "Can you connect a PLC without changing the program?", a: "In most cases, yes. Modbus TCP, OPC UA and Ethernet/IP reads are non-intrusive — we poll existing registers or tags without modifying the control logic. Occasionally a small addition is needed to expose a value that is only held internally; when that is the case we say so up front, scope it, and schedule it in a planned window." },
      { q: "What if a machine has no PLC?", a: "We instrument it externally. A current transformer on the motor feed tells you run/stop and load. A proximity or photoelectric sensor on the output gives you a count. A thermocouple or vibration sensor gives you condition. These go into a remote I/O module or a small edge controller — no change to the machine itself." },
      { q: "Does this require internet on the shop floor?", a: "Not necessarily. The system can run entirely on-premises, with dashboards served on your local network. Cloud is an option, not a requirement — and where it is used, only the gateway needs outbound connectivity, typically over a separate, segmented network." },
      { q: "How much data will this generate?", a: "Far less than people expect, because we apply deadbands and report-by-exception at the edge. A machine sampled at one second with sensible deadbands typically produces a few megabytes per month, not gigabytes. High-frequency data, such as vibration waveforms, is processed at the edge and only features are transmitted." },
      { q: "Who owns the data?", a: "You do. We build on infrastructure you control — your cloud account or your on-premises server — and we hand over the schema, the credentials and the documentation. There is no arrangement in which your production data lives somewhere you cannot reach it." },
      { q: "How long does a first project take?", a: "A pilot covering a handful of machines is typically a few weeks from survey to live dashboard, depending on site access, network readiness and how much instrumentation has to be added. We deliberately structure the first engagement small so it can be proven before it is scaled." },
      { q: "Will this interfere with production?", a: "Reading from a controller adds negligible load and is done in read-only mode. Physical installation — sensors, meters, gateway, cabling — is planned around your shutdown or maintenance windows. Nothing is installed on a running line without an agreed method statement." },
    ],

    related: ["edge-computing", "machine-monitoring", "industrial-dashboards", "system-integration"],

    cta: {
      title: "Tell us what your machines are",
      body: "Send us the makes and models on your floor. We will tell you what can be read today, what needs instrumentation, and what a first phase would involve.",
      label: "Talk to an engineer",
    },
  },

  {
    slug: "edge-computing",
    name: "Edge Computing & Gateways",
    spine: "connect",
    summary: "Industrial gateways, protocol conversion and processing at the plant.",

    primaryKeyword: "industrial edge computing",
    title: "Industrial Edge Computing & IoT Gateways",
    description:
      "Industrial edge computing and IoT gateway integration — protocol conversion, Modbus to MQTT, OPC UA gateways, local buffering and edge analytics for factories.",
    serviceType: "Industrial Edge Computing",

    eyebrow: "Connect",
    h1: "Industrial edge computing and gateway integration",
    lead: "The edge is where industrial data becomes usable: where a register map becomes a named tag, where a thousand samples become one meaningful value, and where a dropped network link stops being data loss. We design, build and deploy the layer that sits between your machines and everything above them.",

    problem: {
      title: "Sending everything to the cloud is the wrong default",
      body: "Raw industrial data is high-volume, noisy and mostly uninteresting. Shipping all of it upstream costs bandwidth, costs storage, adds latency to anything that needs to react, and creates a hard dependency on a link that will eventually fail. The decisions that need to be fast — an alarm, an interlock, a local display — should not depend on a round trip to a data centre.",
      symptoms: [
        "The dashboard goes blank whenever the plant's internet connection drops",
        "Data gaps every time there is a power event or an ISP outage",
        "Cloud costs scaling with sample rate rather than with value",
        "Alarms arriving late because they are evaluated upstream",
        "Every new machine brand requires a new point-to-point integration",
      ],
    },

    deliverables: [
      { title: "Gateway architecture and hardware selection", body: "DIN-rail industrial gateways or edge PCs specified for the environment — temperature range, DIN mounting, redundant power, watchdog, no moving parts." },
      { title: "Protocol conversion", body: "Modbus RTU/TCP, OPC UA, Ethernet/IP, S7 and serial devices on the field side; MQTT, Sparkplug B, HTTPS or a database write on the north side." },
      { title: "Store-and-forward buffering", body: "Local persistence sized to your worst realistic outage, with ordered back-fill and de-duplication on reconnect." },
      { title: "Edge processing and rules", body: "Aggregation windows, deadbands, unit conversion, derived tags, state machines for run/idle/fault detection, and local alarm evaluation." },
      { title: "Local dashboards and HMI", body: "Where operators need a screen that works with or without a network, we serve it from the edge device itself." },
      { title: "Remote management", body: "Secure remote access, configuration versioning, over-the-air updates and health monitoring for the gateway fleet." },
    ],

    howItWorks: [
      { step: "01", title: "Field side", body: "The gateway polls or subscribes to machines over their native protocols, on the OT network, in read-only mode." },
      { step: "02", title: "Normalise", body: "Registers and tags are mapped to a consistent model: named, typed, scaled, unit-tagged, and timestamped at the edge rather than on arrival." },
      { step: "03", title: "Reduce", body: "Deadbands, sample-rate policy per tag and aggregation windows cut volume by one to two orders of magnitude without losing anything anyone looks at." },
      { step: "04", title: "Decide locally", body: "State detection and alarm logic run on the device, so a fault is recognised in milliseconds regardless of upstream availability." },
      { step: "05", title: "Publish and buffer", body: "Data is published north over MQTT or HTTPS. On failure it queues to local storage and back-fills in order when the link returns." },
    ],

    protocols: [
      { name: "MQTT 3.1.1 / 5", use: "Primary north-bound transport", note: "QoS 1 with persistent sessions; TLS with client certificates." },
      { name: "Sparkplug B", use: "Structured MQTT payloads", note: "Birth/death certificates give you positive knowledge that a device is alive, not just an absence of data." },
      { name: "OPC UA (client + server)", use: "Both consuming and republishing", note: "The gateway can act as an OPC UA server to expose a unified model to SCADA/MES." },
      { name: "Modbus TCP / RTU master", use: "Field-side polling", note: "Configurable poll groups per device so a slow device cannot stall a fast one." },
      { name: "S7 / Ethernet-IP / Profinet", use: "Vendor-native reads", note: "Chosen per site based on what the installed base actually supports." },
      { name: "REST / webhooks", use: "Integration with business systems", note: "For low-frequency, transactional data such as work orders and batch records." },
      { name: "Node-RED / custom runtime", use: "Edge logic", note: "Node-RED where the customer's team will maintain it; a compiled service where determinism matters." },
    ],

    retrofit: {
      title: "One gateway, many machine generations",
      body: "The gateway exists precisely so that mixed-vendor, mixed-vintage plants can be treated as one system. A single edge device routinely handles a 1990s Modbus RTU serial link, a mid-2000s Ethernet PLC and a current-generation OPC UA controller simultaneously, and presents them upstream as one consistent model.",
      worksWith: [
        "Serial RS-232 / RS-485 devices via converters",
        "Any Modbus TCP or RTU capable device",
        "Siemens, Rockwell, Mitsubishi, Delta, Schneider, Omron controllers",
        "Energy meters from Schneider, Selec, L&T, Secure, Elmeasure",
        "Existing SCADA historians as a data source",
      ],
    },

    useCases: [
      { title: "Unreliable plant connectivity", situation: "Rural or industrial-estate sites with frequent link loss.", outcome: "Local buffering means outages become a gap in transmission, not a gap in data." },
      { title: "High-frequency condition monitoring", situation: "Vibration data at kHz rates that cannot be streamed.", outcome: "FFT and feature extraction at the edge; only the features go upstream." },
      { title: "Latency-sensitive alarms", situation: "A condition that needs a response in under a second.", outcome: "Rules evaluated on the gateway, with the notification sent locally and logged upstream." },
      { title: "Protocol islands", situation: "Six machine brands, six incompatible integration paths.", outcome: "One gateway model, one tag standard, one upstream interface." },
      { title: "Air-gapped or restricted networks", situation: "Security policy forbids OT devices reaching the internet.", outcome: "Edge collects and serves locally; a controlled, one-way path publishes a filtered subset if needed." },
    ],

    industries: ["manufacturing", "chemical", "energy-and-utilities", "water-and-wastewater", "pharmaceutical"],

    faq: [
      { q: "What hardware do you use for edge gateways?", a: "It depends on the environment and the workload. For straightforward protocol conversion, a DIN-rail industrial gateway is sufficient. Where edge analytics, local dashboards or higher-frequency processing are needed, we specify a fanless industrial PC with adequate storage. We select for temperature range, DIN mounting, power tolerance and long-term availability rather than for cost alone." },
      { q: "Can the gateway sit on the OT network safely?", a: "Yes, with proper segmentation. The standard arrangement is dual-NIC: one interface on the OT network for read-only machine access, one on a separate network for northbound publishing, with no routing between them. This follows the Purdue model and is normally the arrangement your IT and safety teams will require." },
      { q: "What happens during a power failure?", a: "The buffer is persisted to non-volatile storage, so a power cut does not lose queued data. The gateway restarts unattended and resumes. Where the site has frequent power events, we specify a small UPS or a device with a supercapacitor-backed shutdown." },
      { q: "Do you use Node-RED?", a: "Where it fits. It is excellent when the customer's own engineers will maintain and extend the flows, and it shortens delivery significantly. Where determinism, performance or long-term maintainability matter more, we write a compiled service instead. We tell you which we are proposing and why." },
      { q: "How do you update gateways once they are deployed?", a: "Configuration is version-controlled and deployed remotely; firmware and application updates are staged and rolled out per site with rollback. Each gateway reports its own health, version and connection status, so a fleet of twenty is manageable by one person." },
    ],

    related: ["industrial-iot", "machine-monitoring", "scada-development", "system-integration"],

    cta: {
      title: "Bring us your protocol problem",
      body: "Mixed vendors, serial equipment, an unreliable link, or a security policy that complicates everything. Describe the constraint and we will propose an edge design.",
      label: "Discuss an edge architecture",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     AUTOMATE
     ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "industrial-automation",
    name: "Industrial Automation",
    spine: "automate",
    summary: "Control system design, panel engineering, machine and line automation.",

    primaryKeyword: "industrial automation services",
    title: "Industrial Automation Services & System Integration",
    description:
      "Industrial automation services — control system design, PLC and SCADA engineering, panel building, machine integration and line automation for Indian manufacturers.",
    serviceType: "Industrial Automation",

    eyebrow: "Automate",
    h1: "Industrial automation, engineered to be measurable from day one",
    lead: "We design and commission control systems for machines, lines and utilities — and because we also build the software layer above them, the automation we deliver is instrumented, connected and reportable from the moment it goes live rather than years later as a retrofit.",

    problem: {
      title: "Automation that cannot be measured is automation you cannot improve",
      body: "A great deal of industrial automation is delivered as a closed box: it runs, it produces, and it tells nobody anything. Six months later someone asks for OEE, or traceability, or an energy breakdown, and the whole thing has to be opened up again by a different vendor who was not there when it was designed.",
      symptoms: [
        "The control system works but produces no usable data",
        "Adding a report means paying for a second integration project",
        "Documentation is a folder of unlabelled drawings and a program nobody can read",
        "Every change requires the original contractor, who may or may not still be reachable",
        "Manual steps remain in the middle of an otherwise automated process",
      ],
    },

    deliverables: [
      { title: "Control philosophy and functional design", body: "A written description of what the system does, in what sequence, under what conditions, and what happens when each thing fails — agreed before any code is written." },
      { title: "Control panel design and build", body: "Schematics, panel layout, component selection, wiring, testing and documentation, coordinated with a panel partner or built to your standard." },
      { title: "PLC and drive engineering", body: "Structured, commented, maintainable control code with consistent naming and a clear state model. See our PLC programming page for detail." },
      { title: "Machine and line integration", body: "Interlocking, handshaking and sequencing between machines from different vendors, including safety coordination with your safety engineer." },
      { title: "HMI and operator interface", body: "Screens designed for the operator's real task, not for the demo — alarms that are actionable and hierarchy that matches the process." },
      { title: "Commissioning, FAT/SAT and handover", body: "Documented test plans, witnessed acceptance, as-built drawings, source code, and training for your maintenance team." },
    ],

    howItWorks: [
      { step: "01", title: "Understand the process", body: "We walk the line, talk to operators and maintenance, and write down the process as it actually runs — including the workarounds." },
      { step: "02", title: "Define control philosophy", body: "Sequences, interlocks, permissives, alarm hierarchy, failure behaviour and manual override. Agreed on paper first." },
      { step: "03", title: "Design", body: "Electrical schematics, I/O schedule, network architecture, panel layout, and the data model for everything the system will later need to report." },
      { step: "04", title: "Build and test", body: "Panel build, code development, simulation and factory acceptance testing before anything reaches your floor." },
      { step: "05", title: "Install and commission", body: "Installation in your window, loop checks, dry runs, wet commissioning, and operator training." },
      { step: "06", title: "Support and optimise", body: "A defined support arrangement, and — because it is instrumented — the data to see where the process is actually losing time." },
    ],

    protocols: [
      { name: "Profinet / Profibus", use: "Siemens-based machine and line control", note: "Standard for Siemens architectures; Profibus still common on installed base." },
      { name: "Ethernet/IP", use: "Rockwell-based architectures", note: "Common in automotive-tier and export-oriented plants." },
      { name: "Modbus TCP / RTU", use: "Third-party devices, meters, drives", note: "Practically universal; the fallback when nothing else is common." },
      { name: "IO-Link", use: "Smart sensors and actuators", note: "Gives you diagnostics and parameterisation from the sensor level upward." },
      { name: "OPC UA", use: "Supervisory and IT integration", note: "The clean boundary between control and everything above it." },
      { name: "EtherCAT", use: "High-speed motion control", note: "Where cycle times demand it." },
      { name: "Safety buses", use: "Profisafe, CIP Safety", note: "Engineered with a qualified safety engineer; we do not sign off safety functions ourselves unless the scope explicitly includes that competence." },
    ],

    retrofit: {
      title: "Upgrades without a full line replacement",
      body: "Most of our automation work is on lines that already exist. That means phased migration, keeping the plant producing, working in shutdown windows, and — frequently — running old and new in parallel until the new system is proven. We plan for reversibility: at every stage there is a defined way back.",
      worksWith: [
        "Existing panels and field wiring where they are sound",
        "Mixed-vendor lines with equipment from different decades",
        "Obsolete controllers requiring migration to current platforms",
        "Existing safety systems, coordinated rather than replaced",
        "Plants that cannot afford more than a short planned shutdown",
      ],
    },

    useCases: [
      { title: "Manual process automation", situation: "A step that is still done by hand because nobody automated it.", outcome: "Sequenced, interlocked, repeatable — and logged, so its cycle time becomes visible." },
      { title: "Line integration across vendors", situation: "Machines that work individually but do not coordinate.", outcome: "Handshaking and sequencing so the line runs as a line, with a single view of state." },
      { title: "Obsolete controller migration", situation: "A PLC that is out of support with no spares available.", outcome: "Migrated to a supported platform with documented, readable code and no loss of function." },
      { title: "Utility and plant automation", situation: "Compressors, chillers, boilers, ETP and pumping run independently.", outcome: "Coordinated control with monitoring and energy attribution." },
      { title: "Batch and recipe control", situation: "Recipes managed on paper, with operator-dependent results.", outcome: "Recipe-driven control with parameter enforcement and a complete batch record." },
    ],

    industries: ["manufacturing", "automotive", "food-and-beverage", "chemical", "packaging", "water-and-wastewater"],

    faq: [
      { q: "Do you build control panels?", a: "We do the design, engineering, programming and commissioning. Panel fabrication is done either by a panel partner working to our schematics, or by your preferred panel builder, or in your own workshop — whichever suits. We take responsibility for the design and for the system working; we are explicit about who is building the enclosure." },
      { q: "Can you work with our existing automation vendor?", a: "Yes, and it is common. We are frequently brought in for the data and software layer above an existing control system, working alongside the incumbent. We do not require ownership of the whole stack to be useful." },
      { q: "How do you handle functional safety?", a: "Safety functions are engineered by a qualified safety engineer and validated according to the applicable standard. We coordinate with that person and design the control system around the safety requirements. We are explicit about scope: where safety sign-off is required and is outside our engagement, we say so before contracting rather than after." },
      { q: "What do we get at handover?", a: "As-built electrical drawings, I/O schedules, the commented PLC and HMI source code, the network architecture, a functional description, test records, and training for your maintenance team. You should be able to hire anyone competent to maintain what we built. That is deliberate." },
      { q: "Can automation be delivered in phases?", a: "Usually, and we prefer it. A phased approach lets you validate the first stage in production before committing to the rest, and it keeps the plant running. We design the phase boundaries so each one is independently useful." },
    ],

    related: ["plc-programming", "scada-development", "hmi-development", "system-integration"],

    cta: {
      title: "Describe the process",
      body: "What runs today, what is manual, and what a good outcome looks like. We will come back with a control approach and a realistic phasing.",
      label: "Discuss an automation project",
    },
  },

  {
    slug: "plc-programming",
    name: "PLC Programming",
    spine: "automate",
    summary: "PLC development, migration, integration and troubleshooting.",

    primaryKeyword: "plc programming services",
    title: "PLC Programming Services & Integration",
    description:
      "PLC programming services for Siemens, Allen-Bradley, Mitsubishi, Delta and Schneider — new development, migration, integration, troubleshooting and remote monitoring.",
    serviceType: "PLC Programming",

    eyebrow: "Automate",
    h1: "PLC programming services — new systems, migrations and rescues",
    lead: "We write PLC code that the next engineer can read. Structured, commented, consistently named, with a clear state model and documented I/O — because the cost of a control system is not what it takes to write it, it is what it takes to change it three years later at two in the morning.",

    problem: {
      title: "Most plants are one retirement away from a control system nobody understands",
      body: "Undocumented ladder logic with tags called M0.3, no version control, no as-built drawings, and one person who knows how it works. It runs perfectly right up until it does not, and then a stoppage that should take an hour takes three days.",
      symptoms: [
        "Nobody can explain what a section of the program does",
        "There is no source code, or several versions and no way to tell which is running",
        "A controller is obsolete and spares are only available on the used market",
        "Changing anything is avoided because the consequences are unpredictable",
        "The machine is a black box that reports nothing to anyone",
      ],
    },

    deliverables: [
      { title: "New PLC development", body: "Full control programs written to a documented standard — structured text, ladder or function block as appropriate — with simulation before commissioning." },
      { title: "PLC migration and modernisation", body: "Moving obsolete controllers to supported platforms with functional equivalence proven, phased cut-over and a defined rollback." },
      { title: "PLC integration", body: "Connecting controllers to HMIs, SCADA, drives, robots, vision systems, weighing systems, printers and upstream software." },
      { title: "Troubleshooting and rescue", body: "Reverse-engineering, documenting and stabilising systems that were inherited without documentation, often mid-crisis." },
      { title: "Code documentation and standardisation", body: "Turning an undocumented program into a maintainable one: naming, comments, structure, drawings and a functional description." },
      { title: "Remote monitoring of PLC data", body: "The layer most PLC vendors do not deliver — getting the controller's data out to dashboards, alerts and reports securely." },
    ],

    howItWorks: [
      { step: "01", title: "Establish the truth", body: "Read the installed program, verify the I/O against the field, and write down what the system actually does — which is often not what the drawings say." },
      { step: "02", title: "Functional specification", body: "Sequences, interlocks, alarms, modes, and failure behaviour, written down and signed off before code changes." },
      { step: "03", title: "Develop and simulate", body: "Code written to a naming and structure standard, tested in simulation or against a test rig, and reviewed before it reaches the plant." },
      { step: "04", title: "Commission", body: "Loop checks, dry run, staged cut-over inside your window, with the previous program retained and restorable." },
      { step: "05", title: "Document and hand over", body: "Commented source, as-built I/O schedule, functional description, and a walkthrough with your maintenance team." },
    ],

    protocols: [
      { name: "Siemens S7-1200 / 1500", use: "TIA Portal", note: "Current mainstream platform for new work in India." },
      { name: "Siemens S7-300 / 400", use: "STEP 7 / TIA migration", note: "Very large installed base; common migration source." },
      { name: "Allen-Bradley CompactLogix / ControlLogix", use: "Studio 5000", note: "Common in automotive-tier and multinational plants." },
      { name: "Allen-Bradley MicroLogix / SLC", use: "Migration source", note: "Obsolete; migration to CompactLogix is a frequent request." },
      { name: "Mitsubishi FX / Q / iQ-R", use: "GX Works", note: "Widespread in machine-builder equipment." },
      { name: "Delta / Fatek / Wecon", use: "Cost-sensitive machine control", note: "Very common in Indian SME machine builds." },
      { name: "Schneider M221 / M241 / M580", use: "EcoStruxure / Unity", note: "Common in process and utility applications." },
      { name: "Omron CP / CJ / NX", use: "Sysmac / CX-Programmer", note: "Frequent in packaging and material handling." },
      { name: "Modbus / OPC UA / Ethernet-IP / Profinet", use: "Controller-to-system communication", note: "How the PLC talks to HMI, SCADA, drives and the data layer." },
    ],

    retrofit: {
      title: "Migration without a shutdown you cannot afford",
      body: "An obsolete PLC does not have to mean a plant-wide stoppage. We build the new program, prove functional equivalence in simulation, pre-wire and pre-test the new panel, and cut over inside a planned window — with the original controller kept intact and restorable until the new one has run a full production cycle.",
      worksWith: [
        "Obsolete Siemens S5 and S7-300/400 systems",
        "Allen-Bradley SLC 500 and MicroLogix",
        "Mitsubishi FX legacy series",
        "Undocumented programs with no available source",
        "Machines whose original builder is no longer in business",
      ],
    },

    useCases: [
      { title: "Obsolete controller replacement", situation: "Spares are unavailable and a failure means an extended stoppage.", outcome: "Migrated to a supported platform, functionally verified, fully documented." },
      { title: "Inherited undocumented machine", situation: "A second-hand machine arrived with no program listing and no drawings.", outcome: "Program read, documented, I/O verified, functional description written." },
      { title: "PLC to dashboard", situation: "The controller has the data; nobody upstream can see it.", outcome: "Read-only data path from PLC to dashboards and alerts, with no change to control logic." },
      { title: "PLC–SCADA integration", situation: "A new SCADA system needs tags the PLC does not currently expose.", outcome: "Tag structure designed, exposed via OPC UA, and mapped consistently across controllers." },
      { title: "Recipe and parameter management", situation: "Changeovers depend on an operator entering the right numbers.", outcome: "Recipe handling in the controller, driven from HMI or from a higher-level system, with change logging." },
      { title: "Intermittent fault diagnosis", situation: "A fault that appears once a week and never when anyone is watching.", outcome: "High-resolution logging around the event so the cause becomes visible rather than theorised." },
    ],

    industries: ["manufacturing", "automotive", "packaging", "food-and-beverage", "textile", "oem-and-machine-builders"],

    faq: [
      { q: "Which PLC brands do you program?", a: "Siemens (S7-1200/1500, S7-300/400, TIA Portal and STEP 7), Allen-Bradley (CompactLogix, ControlLogix, MicroLogix, Studio 5000 and RSLogix), Mitsubishi (FX, Q, iQ-R), Delta, Schneider, Omron, Fatek and Wecon. Where a platform is outside our direct experience we say so rather than learning it at your expense." },
      { q: "Can you work on a machine when we have no source code?", a: "Usually yes. Most controllers allow the running program to be uploaded, which gives us the logic even without comments. From there we verify I/O in the field and reconstruct a functional description. It takes longer than working from documented source, and we scope it as investigation work with a checkpoint before committing to changes." },
      { q: "How do you handle a migration safely?", a: "The new program is built and proven in simulation first. The new hardware is pre-wired and pre-tested off-line where possible. Cut-over happens in an agreed window with the original controller kept intact, so reverting is a physical swap rather than a rebuild. We do not cut over on a Friday evening." },
      { q: "Do you follow a coding standard?", a: "Yes — consistent naming, structured program organisation, meaningful comments in English, clear separation between sequence, alarms and I/O mapping, and a documented state model. If you already have a corporate standard, we work to yours instead." },
      { q: "Can you get PLC data into a dashboard without touching the control logic?", a: "In most cases, yes. Reading existing registers or tags over Modbus TCP, OPC UA or Ethernet/IP is non-intrusive. Where a value is only held in an internal variable and not exposed, a small, carefully scoped addition may be needed — we identify that during the survey and tell you before quoting, not after." },
      { q: "Do you provide support after commissioning?", a: "Yes, under a defined arrangement — response times, scope and remote access conditions agreed in writing. We also hand over full documentation and source code specifically so you are not dependent on us. Both things are true at once, and deliberately so." },
    ],

    related: ["industrial-automation", "scada-development", "hmi-development", "industrial-iot"],

    cta: {
      title: "Send us the controller details",
      body: "Make, model, what it runs, and whether you have the source. We will tell you what is realistic and what it involves.",
      label: "Talk to a PLC engineer",
    },
  },

  {
    slug: "scada-development",
    name: "SCADA Development",
    spine: "automate",
    summary: "SCADA design, implementation, migration and integration.",

    primaryKeyword: "scada development services",
    title: "SCADA Development & System Integration Services",
    description:
      "SCADA development services — new SCADA systems, upgrades and migrations, alarm rationalisation, historian design and integration with PLCs, MES and ERP.",
    serviceType: "SCADA Development",

    eyebrow: "Automate",
    h1: "SCADA development and system integration",
    lead: "A SCADA system is a plant's memory and its early warning system. We design and build supervisory systems that operators actually trust — with an alarm philosophy that reduces noise instead of adding to it, a historian designed for the questions you will ask later, and clean integration paths to everything above.",

    problem: {
      title: "A SCADA screen nobody looks at is worse than no SCADA at all",
      body: "Hundreds of alarms a shift, most of them meaningless. Screens laid out like a P&ID rather than around what the operator is doing. A historian recording everything at one-second resolution that nobody can query. The system becomes wallpaper, and then a real alarm arrives and nobody reacts to it.",
      symptoms: [
        "Alarm floods during a trip — dozens of alarms from one root cause",
        "Operators acknowledge alarms reflexively without reading them",
        "Historical data exists but answering a simple question takes a specialist",
        "The SCADA runs on an unsupported operating system nobody wants to touch",
        "Reports are exported to Excel and reworked by hand every month",
      ],
    },

    deliverables: [
      { title: "SCADA architecture and design", body: "Server topology, redundancy, network segmentation, client strategy, licensing plan, and a tag and asset model that will still make sense at three times the current size." },
      { title: "Screen and graphics development", body: "Hierarchical screens — plant overview, area, unit, detail — built around operator tasks. High-performance graphics conventions: grey process, colour reserved for abnormal conditions." },
      { title: "Alarm rationalisation", body: "Every alarm justified: what it means, who acts, how urgently, and what happens if it is ignored. Alarms that fail those questions are removed or demoted." },
      { title: "Historian and reporting", body: "Retention and resolution designed around the questions you will actually ask, plus scheduled and on-demand reports that do not require an Excel step." },
      { title: "SCADA migration and upgrades", body: "Moving off unsupported platforms and operating systems with graphics, tags, history and alarm configuration carried across, in phases." },
      { title: "Integration upward", body: "OPC UA, SQL and REST paths from SCADA into MES, ERP, cloud analytics and mobile dashboards — the step that is usually missing." },
    ],

    howItWorks: [
      { step: "01", title: "Operational review", body: "We sit with operators during a shift. What they watch, what they ignore, what they write on paper, and what they wish the screen told them." },
      { step: "02", title: "Model the plant", body: "An asset and tag model with consistent naming, so a new line can be added later by instantiating a template instead of rebuilding screens." },
      { step: "03", title: "Alarm philosophy", body: "Priorities defined by consequence and response time, deadbands and delays set to eliminate chatter, and a documented rationalisation record per alarm." },
      { step: "04", title: "Build and test", body: "Screens, scripts, history configuration and reports built and tested against a simulated or offline PLC before touching production." },
      { step: "05", title: "Cut over and train", body: "Phased commissioning, parallel running where practical, operator training, and a review after the first full production cycle." },
    ],

    protocols: [
      { name: "OPC UA", use: "Primary SCADA-to-controller interface", note: "Typed, secure, self-describing. Preferred wherever the controller supports it." },
      { name: "OPC DA / classic", use: "Legacy systems", note: "Still widespread; usually tunnelled rather than exposed across networks." },
      { name: "Modbus TCP / RTU", use: "Third-party devices and meters", note: "The universal fallback for equipment without a native driver." },
      { name: "Ethernet/IP, Profinet, S7", use: "Native controller drivers", note: "Chosen per installed base for performance and diagnostics." },
      { name: "SQL Server / PostgreSQL / time-series DB", use: "Historian and reporting", note: "Relational for transactional and batch records; time-series for process history." },
      { name: "MQTT / Sparkplug B", use: "Publishing to cloud and mobile", note: "How SCADA data reaches dashboards outside the plant without exposing the SCADA itself." },
      { name: "REST / OData", use: "MES and ERP integration", note: "The clean, documented boundary between plant and business systems." },
    ],

    retrofit: {
      title: "Upgrading a live SCADA without losing history",
      body: "SCADA migrations fail when they are treated as a big-bang replacement. We run the new system in parallel with the old, migrate history rather than abandoning it, cut over area by area, and keep the previous system available until operators have confirmed the new one through a full production cycle including a shutdown and a start-up.",
      worksWith: [
        "Siemens WinCC and WinCC OA",
        "AVEVA / Wonderware InTouch and System Platform",
        "Ignition by Inductive Automation",
        "Rockwell FactoryTalk View",
        "GE iFIX and CIMPLICITY",
        "Open-source stacks where licensing is a genuine constraint",
      ],
    },

    useCases: [
      { title: "Unsupported operating system", situation: "SCADA running on an OS that no longer receives security updates.", outcome: "Migrated to a supported platform with graphics, tags and history preserved." },
      { title: "Alarm flooding", situation: "A single trip generates sixty alarms and the operator learns to ignore all of them.", outcome: "Rationalised alarm set where every alarm has a defined action and a justified priority." },
      { title: "Multi-site supervision", situation: "Three plants, three SCADA systems, no consolidated view.", outcome: "A common tag model and a supervisory layer above all three, without replacing any of them." },
      { title: "Compliance reporting", situation: "Batch or environmental reports assembled manually each month.", outcome: "Automated report generation from the historian with an auditable trail." },
      { title: "SCADA to ERP", situation: "Production numbers re-keyed from SCADA into the business system.", outcome: "A documented, monitored integration that removes the manual step and the errors that come with it." },
    ],

    industries: ["manufacturing", "chemical", "pharmaceutical", "water-and-wastewater", "energy-and-utilities", "food-and-beverage"],

    faq: [
      { q: "Which SCADA platforms do you work with?", a: "Siemens WinCC, AVEVA/Wonderware InTouch and System Platform, Ignition, Rockwell FactoryTalk View, and GE iFIX. We also build supervisory systems on open stacks where licensing cost is a genuine constraint and the application allows it — we are explicit about the trade-offs of each route." },
      { q: "Should we buy a SCADA platform or build a custom dashboard?", a: "It depends on the job. If you need alarm management, operator control, redundancy and regulatory-grade history, buy a SCADA platform — rebuilding that is expensive and pointless. If you need visibility, analysis and reporting for management rather than operator control, a purpose-built application is usually cheaper, better fitted and easier to extend. Many plants end up with both, and the interesting engineering is the boundary between them." },
      { q: "Can you upgrade our SCADA without stopping production?", a: "In most cases. The new system runs in parallel against the same data sources, and cut-over happens area by area during planned windows. History is migrated rather than abandoned. The old system stays available until the new one has been through a full production cycle." },
      { q: "What is alarm rationalisation and do we need it?", a: "It is the process of justifying every alarm: what condition it indicates, what the operator should do, how urgent it is, and what happens if it is missed. Alarms that cannot answer those questions are removed or demoted to events. If your operators acknowledge alarms without reading them, you need it — and it is usually the single highest-value thing that can be done to an existing SCADA system." },
      { q: "How do you get SCADA data out to management or to the cloud?", a: "Through a controlled boundary, never by exposing the SCADA itself. Typically an OPC UA or database read into an edge service, which publishes northbound over MQTT or HTTPS. The SCADA network stays segmented and the outbound path is one-directional and auditable." },
    ],

    related: ["plc-programming", "hmi-development", "industrial-dashboards", "system-integration"],

    cta: {
      title: "Tell us about your supervisory system",
      body: "Platform, age, number of tags, and what is not working. We will tell you whether it needs upgrading, rationalising, or just connecting upward.",
      label: "Discuss a SCADA project",
    },
  },

  {
    slug: "hmi-development",
    name: "HMI Development",
    spine: "automate",
    summary: "Operator interfaces designed around the operator's actual task.",

    primaryKeyword: "hmi development services",
    title: "HMI Development & Operator Interface Design",
    description:
      "HMI development services — operator interface design, HMI programming, screen development and migration for Siemens, Allen-Bradley, Delta and Weintek panels.",
    serviceType: "HMI Development",

    eyebrow: "Automate",
    h1: "HMI development for people who are wearing gloves",
    lead: "An HMI is used by someone standing up, under time pressure, often in poor light, sometimes in gloves, and occasionally during a fault when it matters most. We design operator interfaces for that reality — clear state, obvious next action, alarms that say what to do, and nothing decorative competing for attention.",

    problem: {
      title: "Most HMI screens are designed for the buyer, not the operator",
      body: "Photorealistic tanks, animated pipes, gradients everywhere, and a dozen values in the same size and colour so nothing stands out. It demos well and it fails in a fault, when the operator has thirty seconds and needs to know one thing.",
      symptoms: [
        "Operators keep a paper crib sheet next to the panel",
        "Important values are the same size and colour as unimportant ones",
        "Alarm text is a code that requires a manual to interpret",
        "Navigation takes four taps to reach the screen used most often",
        "The panel is obsolete and no replacement runs the original project file",
      ],
    },

    deliverables: [
      { title: "Operator task analysis", body: "What the operator does in a normal shift, in a changeover and in a fault — the three cases the screens must serve, in that order of frequency and that reverse order of stakes." },
      { title: "Screen hierarchy and navigation", body: "Overview, area and detail levels with the most-used screen reachable in one action, and consistent placement so muscle memory works." },
      { title: "High-performance graphics", body: "Neutral background, grey process elements, colour reserved for abnormal state, and value hierarchy driven by importance rather than by layout convenience." },
      { title: "Alarm presentation", body: "Plain-language alarm text stating condition and required action, priority indicated by more than colour, and a filterable history." },
      { title: "Recipe and changeover screens", body: "Parameter sets, guided changeover sequences and confirmation steps that reduce operator-dependent variation." },
      { title: "HMI migration", body: "Moving obsolete panels to current hardware, rebuilding screens to a modern standard rather than transcribing the old layout." },
    ],

    howItWorks: [
      { step: "01", title: "Watch a shift", body: "We observe the panel in use. The paper crib sheet taped to the machine tells you more about the current HMI than any specification." },
      { step: "02", title: "Define the hierarchy", body: "Which screens exist, what each one is for, and how the operator moves between them under time pressure." },
      { step: "03", title: "Design to a standard", body: "A consistent template: fixed header with machine state, fixed alarm banner, consistent control placement, and a defined colour meaning." },
      { step: "04", title: "Build and review", body: "Screens built, reviewed with actual operators before commissioning, and revised. This review is where most of the value is created." },
      { step: "05", title: "Commission and train", body: "Deployed with a short training session and a follow-up after operators have lived with it for a couple of weeks." },
    ],

    protocols: [
      { name: "Siemens Comfort / Basic Panels", use: "TIA Portal WinCC", note: "The default in Siemens-based lines." },
      { name: "Allen-Bradley PanelView", use: "FactoryTalk View ME", note: "Standard in Rockwell architectures." },
      { name: "Weintek / Delta / Mitsubishi GOT", use: "Cost-sensitive machine panels", note: "Very common on Indian machine builds and retrofits." },
      { name: "Web-based HMI", use: "Tablet and browser interfaces", note: "Where a fixed panel is not required and mobility helps; served from an edge device so it works without internet." },
      { name: "Modbus / OPC UA / native driver", use: "HMI to controller", note: "Chosen for diagnostics quality as well as speed." },
    ],

    retrofit: {
      title: "Replacing an obsolete panel",
      body: "When a panel fails and its project file will not open in any current software, the machine is effectively down. We rebuild the interface on current hardware — usually improving it substantially in the process, because a rebuild is the one chance to fix a screen layout that everyone has been working around for a decade.",
      worksWith: [
        "Obsolete panels with no available replacement",
        "Projects whose source file is lost",
        "Mixed panel brands across one plant, standardised to one convention",
        "Machines where the original builder is unreachable",
        "Adding a tablet interface alongside an existing fixed panel",
      ],
    },

    useCases: [
      { title: "Fault response time", situation: "Operators take too long to identify what stopped the machine.", outcome: "A fault screen that names the condition, the location and the required action in plain language." },
      { title: "Changeover consistency", situation: "Changeover time varies by two hours depending on who does it.", outcome: "A guided changeover sequence with parameters enforced and steps confirmed." },
      { title: "Panel obsolescence", situation: "The HMI has failed and no equivalent hardware is available.", outcome: "Rebuilt on current hardware to a modern standard, with the layout improved rather than copied." },
      { title: "Downtime reason capture", situation: "Stop reasons are guessed later from memory.", outcome: "A two-tap reason prompt on the HMI at the moment of the stop, feeding the monitoring system directly." },
      { title: "Standardising across a plant", situation: "Every machine's interface works differently.", outcome: "One convention across all panels, so an operator moving between machines is not relearning." },
    ],

    industries: ["manufacturing", "packaging", "food-and-beverage", "pharmaceutical", "textile", "oem-and-machine-builders"],

    faq: [
      { q: "What is 'high-performance HMI' and why does it look so plain?", a: "It is a design approach where the screen is deliberately low-contrast and grey during normal operation, so that any colour or movement means something abnormal. It looks unimpressive in a demo and performs far better in a fault, because the eye is drawn to the one thing that changed instead of competing with animated pipes. If a stakeholder wants the photorealistic version, we will show both and let the operators decide." },
      { q: "Can we use tablets instead of fixed panels?", a: "Often yes, for supervisory and monitoring use. For direct machine control, a fixed panel is usually still correct — for safety, reliability and because a tablet's battery dies. A common arrangement is a fixed panel for control plus a browser-based view on a tablet for supervision and reason-code entry." },
      { q: "Our HMI project file is lost. Can it be recovered?", a: "Sometimes the running project can be uploaded from the panel; sometimes it cannot, depending on the hardware and how it was downloaded. Where recovery is impossible, we rebuild from observation of the running machine and from the PLC program. We establish which situation you are in during the survey, before quoting." },
      { q: "Do you support Indian language interfaces?", a: "Yes. Most modern HMI platforms support multi-language projects with runtime switching. The practical constraints are font availability on the panel hardware and screen space for longer strings — both of which we account for in the layout rather than discovering at commissioning." },
      { q: "How do you decide what goes on the main screen?", a: "By watching a shift. The values an operator checks most often go in the most prominent position, the controls they use most often go where their hand naturally rests, and everything else goes one level down. The paper note taped to the machine is usually a precise specification of what the current screen is missing." },
    ],

    related: ["plc-programming", "scada-development", "industrial-automation", "machine-monitoring"],

    cta: {
      title: "Show us the panel",
      body: "A photo of the current screen and the crib sheet next to it tells us most of what we need to know.",
      label: "Discuss an HMI project",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     MONITOR
     ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "machine-monitoring",
    name: "Machine Monitoring",
    spine: "monitor",
    summary: "Real-time machine, production and downtime monitoring with OEE.",

    primaryKeyword: "machine monitoring system",
    title: "Machine Monitoring & Factory Monitoring Systems",
    description:
      "Machine monitoring systems for factories — real-time production monitoring, automatic downtime capture, OEE tracking and shift reporting on your existing machines.",
    serviceType: "Machine Monitoring",

    eyebrow: "Monitor",
    h1: "Machine monitoring systems that tell you why, not just how much",
    lead: "Counting output is the easy half. The value is in knowing what the machine was doing during the hours it was not producing — and having that answer while the shift is still running, rather than in a report three days later that nobody can act on.",

    problem: {
      title: "Everyone knows the plant loses time. Nobody can say where.",
      body: "Ask for last month's downtime by cause and you get an estimate. Ask which machine is the real constraint and you get an opinion. The data to answer both exists on the shop floor and is thrown away every shift, because capturing it is currently somebody's manual job on top of their real one.",
      symptoms: [
        "Downtime is logged on paper, if at all, and only for long stops",
        "Micro-stops are invisible even though they add up to more than the big ones",
        "OEE is calculated monthly in a spreadsheet from numbers nobody fully trusts",
        "Different departments quote different production figures for the same day",
        "By the time a problem shows up in a report, the shift that caused it is long gone",
      ],
    },

    deliverables: [
      { title: "Automatic production counting", body: "Counts taken from the PLC or from retrofitted sensors, attributed to machine, shift, operator and product — with no manual entry step." },
      { title: "Automatic downtime detection", body: "Stops detected from machine state in real time, classified as planned, unplanned or micro-stop, with duration measured rather than estimated." },
      { title: "Operator reason-code capture", body: "A short prompt on an HMI or tablet at the moment of the stop. Two taps, under five seconds — because anything longer will not be used consistently." },
      { title: "OEE with visible components", body: "Availability, performance and quality shown separately as well as combined, with the calculation documented so the number can be defended." },
      { title: "Real-time floor displays and alerts", body: "A shop-floor screen showing current state against target, plus escalation alerts when a stop exceeds a threshold." },
      { title: "Shift, daily and management reporting", body: "Automatic reports at shift end, Pareto analysis of stop causes, and trend views by machine, line, product and shift." },
    ],

    howItWorks: [
      { step: "01", title: "Detect state", body: "Machine state — running, idle, stopped, faulted, changeover — is derived continuously from PLC signals, motor current or a retrofitted sensor." },
      { step: "02", title: "Count and classify", body: "Good and rejected counts are attributed to the current product and shift; every state change is timestamped at the edge." },
      { step: "03", title: "Capture the reason", body: "When a stop passes a threshold, the operator is prompted for a reason from a short, plant-specific list. Unclassified stops are flagged, not silently ignored." },
      { step: "04", title: "Calculate honestly", body: "OEE is computed from measured values with the assumptions written down — ideal cycle time, planned production time, what counts as planned downtime." },
      { step: "05", title: "Show it while it matters", body: "Live on the floor, live on a phone, and summarised in shift and daily reports that arrive without anyone assembling them." },
    ],

    protocols: [
      { name: "PLC tag read", use: "Cycle counts, machine state, fault codes", note: "The cleanest source when a controller exists." },
      { name: "Motor current / CT", use: "Run/stop and load on machines with no controller", note: "Surprisingly accurate for state detection and requires no machine modification." },
      { name: "Proximity / photoelectric sensor", use: "Physical piece counting", note: "The retrofit standard where no electronic count is available." },
      { name: "Energy meter (Modbus)", use: "Consumption per machine and per unit produced", note: "Also a reliable secondary indicator of machine state." },
      { name: "HMI / tablet input", use: "Reason codes, changeover, quality events", note: "The only part that needs a human; designed to take under five seconds." },
      { name: "MQTT / time-series database", use: "Transport and storage", note: "Report-by-exception keeps volume low and history long." },
      { name: "REST API", use: "Feeding ERP, MES and BI tools", note: "So the monitoring system does not become another island." },
    ],

    retrofit: {
      title: "Monitoring is the easiest thing to retrofit",
      body: "Machine monitoring is usually the first project we do with a plant, because it is non-intrusive, quick to prove and immediately useful. Reading state from an existing PLC changes nothing. Where there is no PLC, a current transformer clamped around the motor feed and a sensor on the output are enough to get real state and real counts — installable in a short window, on almost any machine, at almost any age.",
      worksWith: [
        "Machines with a PLC of any brand or vintage",
        "Machines with no controller at all",
        "Mixed lines where each machine is a different make",
        "Plants with no shop-floor network — we can add one",
        "Existing SCADA systems, used as a data source rather than replaced",
      ],
    },

    useCases: [
      { title: "Finding the real constraint", situation: "The assumed bottleneck is based on opinion.", outcome: "Measured state across every machine shows where time is actually lost, which is frequently not where people expected." },
      { title: "Micro-stop visibility", situation: "Short stops are never recorded, but there are hundreds a shift.", outcome: "Every stop measured, with the cumulative effect of short stops made visible for the first time." },
      { title: "Shift comparison", situation: "One shift consistently produces less and nobody can say why.", outcome: "Like-for-like comparison by shift, product and machine, with stop causes attached." },
      { title: "Changeover reduction", situation: "Changeover duration is unknown and highly variable.", outcome: "Changeovers timed automatically, with variation and its causes made visible." },
      { title: "Customer and audit evidence", situation: "A customer asks for production and quality evidence.", outcome: "An automatically maintained record rather than a reconstruction from memory." },
      { title: "Energy per unit produced", situation: "Energy is a fixed cost that nobody attributes.", outcome: "Consumption per machine, per shift and per unit — which usually surfaces at least one machine running when it should not be." },
    ],

    industries: ["manufacturing", "automotive", "textile", "packaging", "food-and-beverage", "pharmaceutical"],

    faq: [
      { q: "Do we need to add sensors to every machine?", a: "Only where the machine cannot tell you anything itself. If there is a PLC, we usually read what it already knows. Where there is no controller, one current transformer and one counting sensor per machine is typically enough for real state and real counts." },
      { q: "Will operators actually enter downtime reasons?", a: "They will if it takes under five seconds and the list is short and written in their words. They will not if it is a thirty-item dropdown on a laptop in the supervisor's office. We design the reason list with the people who will use it, keep it under about a dozen top-level options, and review it after a month because the first list is never quite right." },
      { q: "How accurate is OEE from this system?", a: "The measured components — availability and performance — are accurate to the resolution of the machine signals, typically well under a second. Quality depends on where reject data comes from; if that is still manual, we say so and show it separately rather than burying it in a single number. We also document every assumption, because an OEE figure whose basis is unclear will be argued with rather than acted on." },
      { q: "Can it work without internet at the plant?", a: "Yes. The whole system can run on-premises with floor displays and dashboards served locally. Internet is only needed if you want access from outside the plant, and even then only the gateway requires outbound connectivity." },
      { q: "How long before we see something useful?", a: "A pilot on a few machines typically produces usable data within the first full week of running. The first month is usually spent discovering that some assumptions about the process were wrong, which is itself the most valuable early output." },
      { q: "Can this integrate with our ERP?", a: "Yes. Production counts, downtime and OEE are exposed through an API and can be pushed into ERP or MES on a schedule or on events. We treat that integration as part of the design rather than as a later add-on, because retrofitting it afterwards is what creates the silos in the first place." },
    ],

    related: ["industrial-iot", "predictive-maintenance", "industrial-dashboards", "system-integration"],

    cta: {
      title: "Start with one line",
      body: "Pick your most problematic line. We will scope a monitoring pilot for it and tell you honestly what it will and will not reveal.",
      label: "Scope a monitoring pilot",
    },
  },

  {
    slug: "industrial-dashboards",
    name: "Industrial Dashboards",
    spine: "monitor",
    summary: "Real-time plant dashboards for the floor, the office and the phone.",

    primaryKeyword: "industrial dashboard development",
    title: "Industrial Dashboard Development & Plant Visibility",
    description:
      "Industrial dashboard development — real-time production dashboards, plant KPI displays and management reporting built on your live machine and process data.",
    serviceType: "Industrial Dashboard Development",

    eyebrow: "Monitor",
    h1: "Industrial dashboards built for three different audiences",
    lead: "An operator, a plant head and a director need completely different views of the same data, and a single dashboard that tries to serve all three serves none of them. We design a set: the floor display that changes behaviour in the moment, the supervisor view that supports the shift, and the summary that answers the question a director actually asks.",

    problem: {
      title: "The dashboard everyone stopped opening",
      body: "It exists. It was expensive. It has forty-two tiles. Nobody has looked at it since the second week, because it answers questions nobody was asking and does not answer the one they were.",
      symptoms: [
        "A dashboard exists but decisions are still made from a spreadsheet",
        "Numbers on the dashboard disagree with numbers in the monthly report",
        "It is unusable on a phone, which is where most people would actually check it",
        "It shows what is happening but gives no indication of whether that is good or bad",
        "Nobody can say what any given tile is supposed to prompt someone to do",
      ],
    },

    deliverables: [
      { title: "Audience-specific views", body: "Separate designs for the shop floor, the supervisor, the plant head and the group level — each showing only what that audience can act on." },
      { title: "Shop-floor displays", body: "Large-format screens readable from a distance, showing current rate against target and current state, designed to change behaviour within the shift." },
      { title: "Mobile-first management views", body: "Because the plant head checks production from a phone at 7am, not from a desktop." },
      { title: "Data model and semantics", body: "One agreed definition per metric, documented, so the dashboard and the monthly report cannot disagree." },
      { title: "Alerting and escalation", body: "Threshold and trend-based alerts delivered by the channel people actually read, with escalation when nobody responds." },
      { title: "Reports and exports", body: "Scheduled shift and daily reports, plus exports and an API for whoever wants the raw numbers." },
    ],

    howItWorks: [
      { step: "01", title: "Establish the questions", body: "We interview each audience for the questions they currently answer by asking someone. Those questions become the dashboard specification." },
      { step: "02", title: "Agree the definitions", body: "What counts as downtime, what counts as good output, when a shift starts. Ambiguity here is the single largest cause of dashboards being distrusted." },
      { step: "03", title: "Design for the context", body: "Distance and glance for the floor; density and drill-down for the supervisor; a handful of numbers with trend for management." },
      { step: "04", title: "Build on live data", body: "Wired to the actual data path — no manual imports, no nightly spreadsheet step anywhere in the chain." },
      { step: "05", title: "Review after a month", body: "We look at what is actually being opened. Tiles nobody uses get removed. This step is where a dashboard stops being decoration." },
    ],

    protocols: [
      { name: "Time-series database", use: "Process and machine history", note: "Designed with retention and downsampling policies rather than keeping everything at full resolution forever." },
      { name: "PostgreSQL / SQL Server", use: "Transactional, batch and master data", note: "Where relational structure and joins matter more than write throughput." },
      { name: "MQTT subscribe", use: "Live values", note: "Sub-second updates without polling the database." },
      { name: "REST / GraphQL API", use: "Serving the dashboard and third parties", note: "The same API serves your BI tool, so there is one version of the truth." },
      { name: "WebSockets / SSE", use: "Live browser updates", note: "Push rather than poll; the difference is visible on a floor display." },
      { name: "Grafana / custom application", use: "Presentation layer", note: "Grafana where it fits and your team will maintain it; a custom application where the interaction model matters." },
    ],

    retrofit: {
      title: "Dashboards on top of what you already have",
      body: "A dashboard does not require replacing your systems. We routinely build on an existing SCADA historian, an existing PLC network, an existing ERP, or all three at once — reading from them through a controlled boundary rather than migrating anything.",
      worksWith: [
        "Existing SCADA historians as a data source",
        "Existing ERP and MES databases",
        "Machines connected through our own IIoT layer",
        "Manually entered data where automation is not yet justified",
        "A mix of all of the above, which is the usual case",
      ],
    },

    useCases: [
      { title: "Live shop-floor target display", situation: "Operators find out they are behind at the end of the shift.", outcome: "Rate against target visible continuously, so the shift can respond while it can still recover." },
      { title: "Morning production summary", situation: "The plant head chases three people for numbers every morning.", outcome: "A summary that arrives before they wake up, on their phone." },
      { title: "Multi-plant comparison", situation: "Sites report in different formats on different days.", outcome: "One normalised view with a common definition set and drill-down to machine level." },
      { title: "Energy dashboard", situation: "Energy is managed from a monthly bill.", outcome: "Consumption by machine, shift and unit produced, with anomalies flagged as they happen." },
      { title: "Quality and traceability view", situation: "Tracing a batch means opening several systems.", outcome: "One view assembling process, quality and genealogy for a given batch or serial number." },
    ],

    industries: ["manufacturing", "food-and-beverage", "pharmaceutical", "automotive", "energy-and-utilities", "logistics-and-warehousing"],

    faq: [
      { q: "Grafana or a custom application?", a: "Grafana is excellent for time-series exploration and for teams who will build their own panels — it is fast to deploy and free to start. A custom application is the right answer when the interaction model matters: guided drill-downs, reason-code entry, role-specific views, approvals, or anything a viewer does rather than just looks at. We often deliver both, with Grafana for engineering and a purpose-built app for operations." },
      { q: "Why not just use Power BI?", a: "Power BI is strong for periodic business analysis and weak for live plant data — it is not designed for sub-minute refresh or for shop-floor display. A common arrangement is a real-time layer for operations and Power BI reading the same API for business reporting, which keeps one definition of every metric." },
      { q: "Can it work on a phone?", a: "It has to. In our experience management checks production on a phone far more often than on a desktop, so the mobile view is designed first and the desktop view is the expansion of it, not the other way round." },
      { q: "How do we stop it becoming shelfware?", a: "By designing from the questions people already ask rather than from the data that happens to be available, by keeping each view small, and by reviewing usage after a month and deleting what nobody opens. A dashboard with six tiles that are checked daily is worth more than one with forty that are not." },
      { q: "Who hosts it?", a: "Your infrastructure — on-premises, your cloud account, or a hybrid where live data stays on site and summaries go to the cloud. We hand over the credentials, the schema and the deployment documentation." },
    ],

    related: ["machine-monitoring", "industrial-iot", "custom-industrial-software", "industrial-mobile-apps"],

    cta: {
      title: "What question can nobody answer today?",
      body: "Tell us the question your team asks each other every morning. That is usually the first tile.",
      label: "Discuss a dashboard",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     ANALYSE
     ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "predictive-maintenance",
    name: "Predictive Maintenance",
    spine: "analyse",
    summary: "Condition monitoring and early warning on critical assets.",

    primaryKeyword: "predictive maintenance solutions",
    title: "Predictive Maintenance & Condition Monitoring",
    description:
      "Predictive maintenance solutions — vibration and temperature condition monitoring, early fault detection and maintenance analytics for critical industrial assets.",
    serviceType: "Predictive Maintenance",

    eyebrow: "Analyse",
    h1: "Predictive maintenance, starting from what actually breaks",
    lead: "Predictive maintenance works when it is applied to the small number of assets whose failure genuinely hurts, using condition data that genuinely leads the failure. Applied to everything at once with a general-purpose algorithm, it produces alerts nobody trusts. We start from your failure history, not from a platform.",

    problem: {
      title: "Maintenance is either too early or too late, and both are expensive",
      body: "Calendar-based maintenance replaces healthy components on a schedule and still misses the failures that do not follow a calendar. Breakdown maintenance is cheaper right up to the unplanned stoppage that costs a week of production. Neither knows the actual condition of the machine.",
      symptoms: [
        "Critical assets fail without warning, repeatedly",
        "Components are replaced on schedule while still in good condition",
        "The same failure mode recurs and nobody has established the root cause",
        "Spares are ordered reactively at premium cost and lead time",
        "Maintenance history lives in a notebook or in one person's memory",
      ],
    },

    deliverables: [
      { title: "Criticality and failure-mode review", body: "Which assets matter, how they actually fail, how a failure develops, and what measurable parameter changes first. This determines everything else." },
      { title: "Condition monitoring instrumentation", body: "Vibration, temperature, current signature, acoustic, pressure and flow sensing, specified per failure mode rather than fitted uniformly." },
      { title: "Edge signal processing", body: "FFT, envelope analysis and feature extraction on the device, so high-frequency data is used without being transmitted." },
      { title: "Baselines and thresholds", body: "Per-asset baselines established from a healthy period, with alerting on deviation and trend rather than on fixed absolute limits." },
      { title: "Anomaly detection where it is justified", body: "Statistical and model-based detection applied to assets with enough history to support it — and not applied where it would only generate noise." },
      { title: "Maintenance workflow integration", body: "Alerts that become work orders in your CMMS or ERP, with feedback captured so the model and thresholds improve." },
    ],

    howItWorks: [
      { step: "01", title: "Start from failure history", body: "We review what has actually broken, how often, and what it cost. Assets with no consequential failure history do not need this." },
      { step: "02", title: "Identify the leading indicator", body: "For each failure mode, what changes first — bearing frequencies in vibration, winding temperature, current imbalance, pressure differential." },
      { step: "03", title: "Instrument and baseline", body: "Sensors fitted and a healthy baseline established over a representative operating period, including all normal load states." },
      { step: "04", title: "Detect deviation", body: "Trend and threshold detection first, because it is explainable and it works. Model-based detection added only where the data supports it." },
      { step: "05", title: "Close the loop", body: "Every alert is followed up and the outcome recorded — true, false, or too early. Without this feedback the system degrades into noise within months." },
    ],

    protocols: [
      { name: "Triaxial vibration sensors (IEPE / MEMS)", use: "Rotating equipment", note: "MEMS is adequate for trend detection and far cheaper; IEPE where diagnostic detail is needed." },
      { name: "FFT / envelope analysis at the edge", use: "Bearing and gear defect frequencies", note: "Raw waveform processed locally; only features transmitted." },
      { name: "RTD / thermocouple / thermal", use: "Winding, bearing and process temperature", note: "The simplest and often the most reliable leading indicator." },
      { name: "Motor current signature analysis", use: "Motor and driven-load faults", note: "Non-invasive; the sensor goes in the panel, not on the machine." },
      { name: "Ultrasonic / acoustic", use: "Leaks, early bearing wear, steam traps", note: "Very effective on compressed air, which is usually a large uncosted loss." },
      { name: "Oil condition sensing", use: "Gearboxes and hydraulics", note: "Where the asset justifies it." },
      { name: "CMMS / ERP integration", use: "Work order creation", note: "An alert that does not become a task is not maintenance, it is a notification." },
    ],

    retrofit: {
      title: "Fitted to running machines, without modification",
      body: "Condition monitoring sensors mount externally — magnetically or by stud on a bearing housing, clamped around a cable in the panel, or fitted to an existing tapping point. Most installations happen during a routine maintenance window without any change to the machine or its control system.",
      worksWith: [
        "Motors, pumps, fans, blowers and compressors",
        "Gearboxes, spindles and conveyors",
        "Chillers, air compressors and utility plant",
        "Machines already connected through our IIoT layer",
        "Assets with existing vibration route-based monitoring, made continuous",
      ],
    },

    useCases: [
      { title: "Critical motor protection", situation: "A single motor failure stops the whole plant.", outcome: "Continuous vibration and temperature trending with early deviation alerts and time to plan the intervention." },
      { title: "Compressed air leak detection", situation: "Compressors run longer than the demand justifies.", outcome: "Ultrasonic survey plus consumption trending, which typically identifies a substantial recoverable loss." },
      { title: "Gearbox condition", situation: "Gearbox failures are catastrophic and have long lead times for replacement.", outcome: "Defect-frequency trending giving enough warning to order and schedule rather than react." },
      { title: "Pump cavitation", situation: "Pumps degrade and efficiency falls unnoticed.", outcome: "Vibration and pressure signatures identify cavitation and wear before failure." },
      { title: "Spare parts planning", situation: "Spares held for everything, or for nothing.", outcome: "Condition-driven ordering, with stock levels informed by measured asset condition rather than by anxiety." },
    ],

    industries: ["manufacturing", "chemical", "energy-and-utilities", "water-and-wastewater", "food-and-beverage", "textile"],

    faq: [
      { q: "Do we need AI for predictive maintenance?", a: "Usually not at the start. Trend and threshold detection on the right parameter catches the large majority of developing faults and — crucially — is explainable, so maintenance teams act on it. Model-based anomaly detection adds value once there is enough history including actual failures, which typically means a year or more. Anyone leading with AI before establishing that has the order backwards." },
      { q: "How long before it predicts anything?", a: "A baseline needs a representative healthy period across all normal operating states — typically a few weeks to a couple of months. Deviation detection works from the end of baselining. Anything claiming useful prediction in the first week is detecting something other than machine condition." },
      { q: "Which assets should we start with?", a: "The ones where a failure has actually cost you significantly, and where the failure mode develops gradually enough to be detected. A motor that fails progressively is a good candidate; an electronic board that fails instantly is not. We work through your failure history to build that list rather than instrumenting everything." },
      { q: "Do sensors need wiring to each machine?", a: "Not always. Wireless condition sensors are practical for periodic and trend monitoring and avoid cable runs, at the cost of battery management and lower sample rates. Wired is better for continuous high-resolution monitoring on genuinely critical assets. We usually mix both within one plant." },
      { q: "What happens when it raises a false alarm?", a: "It gets recorded as a false alarm and the threshold or feature is reviewed. This feedback loop is the part most implementations skip, and it is why so many condition monitoring systems are ignored within a year. We build the follow-up step into the workflow from the start." },
    ],

    related: ["machine-monitoring", "industrial-iot", "edge-computing", "industrial-dashboards"],

    cta: {
      title: "Which asset keeps failing?",
      body: "Tell us what has broken in the last two years and what it cost. That list is the right starting point, not a sensor catalogue.",
      label: "Discuss condition monitoring",
    },
  },

  /* ══════════════════════════════════════════════════════════════════════════
     BUILD
     ══════════════════════════════════════════════════════════════════════════ */
  {
    slug: "custom-industrial-software",
    name: "Custom Industrial Software",
    spine: "build",
    summary: "Web applications, backends and APIs built for plant operations.",

    primaryKeyword: "custom industrial software development",
    title: "Custom Industrial Software Development",
    description:
      "Custom industrial software development — production, quality, maintenance and traceability applications built around plant data and integrated with existing systems.",
    serviceType: "Custom Industrial Software Development",

    eyebrow: "Build",
    h1: "Custom industrial software, written by people who have been in the panel",
    lead: "Plant operations are full of processes that run on spreadsheets, WhatsApp groups and paper because no off-the-shelf product fits them. We build the software that does — production tracking, quality, traceability, maintenance, energy — connected directly to machine data rather than to a manual entry step.",

    problem: {
      title: "The spreadsheet that runs the plant",
      body: "There is always one. It has forty tabs, three people can edit it, one person understands it, and the entire production planning process depends on it. It is fragile, it has no audit trail, and replacing it with an ERP module was quoted at a number that ended the conversation.",
      symptoms: [
        "Critical processes run on a spreadsheet nobody wants to touch",
        "The same data is entered into three different systems by hand",
        "The ERP does not fit how the plant actually operates, so it is worked around",
        "There is no record of who changed what, or when",
        "Reports are assembled manually and are already out of date when they arrive",
      ],
    },

    deliverables: [
      { title: "Production and order tracking", body: "Work orders, schedules, actual versus plan, and progress driven by real machine data instead of by someone updating a status." },
      { title: "Quality and inspection", body: "Inspection plans, in-process checks, non-conformance handling, SPC charts, and quality data linked to the process conditions that produced it." },
      { title: "Traceability and genealogy", body: "Batch and serial-level traceability linking raw material, process parameters, operator, machine and finished output — with the recall query answerable in minutes." },
      { title: "Maintenance management", body: "Asset register, preventive schedules, work orders, spares and history, fed by condition data rather than by calendar alone." },
      { title: "Energy and utilities management", body: "Consumption by asset, shift and product, with cost attribution and anomaly detection." },
      { title: "APIs and integration services", body: "Documented, versioned APIs so this system is a component of your landscape rather than another island in it." },
    ],

    howItWorks: [
      { step: "01", title: "Map the real process", body: "Including the workarounds. The workarounds are where the requirements are; the official process description usually is not." },
      { step: "02", title: "Design around the data that exists", body: "Wherever a value can come from a machine, it comes from the machine. Manual entry is a last resort, not a default." },
      { step: "03", title: "Build in slices", body: "One usable slice at a time, in production, used by real people, reviewed. Not a twelve-month specification followed by a launch." },
      { step: "04", title: "Integrate", body: "ERP, SCADA, monitoring and third-party systems connected through documented interfaces with proper error handling and monitoring." },
      { step: "05", title: "Hand over properly", body: "Source code, deployment documentation, architecture notes and runbooks. You should be able to have someone else maintain it." },
    ],

    protocols: [
      { name: "Next.js / React / TypeScript", use: "Web applications", note: "Server-rendered where it matters for speed on a shop-floor tablet over patchy Wi-Fi." },
      { name: "Node.js / Python", use: "Backend services", note: "Python where the work is analytical or involves signal processing; Node where it is transactional." },
      { name: "PostgreSQL / TimescaleDB", use: "Relational and time-series storage", note: "One database engine covering both reduces operational burden significantly." },
      { name: "REST / OpenAPI", use: "Documented external interfaces", note: "Versioned, with a published contract, because integrations outlive the teams that built them." },
      { name: "MQTT / message queue", use: "Event-driven ingestion", note: "Decouples plant data flow from application availability." },
      { name: "Docker / on-prem or cloud", use: "Deployment", note: "The same build runs on a plant server or in your cloud account; you choose, and you can change your mind later." },
      { name: "Role-based access + audit log", use: "Governance", note: "Who did what, when, and what the value was before — non-negotiable for quality and compliance use." },
    ],

    retrofit: {
      title: "Alongside your ERP, not instead of it",
      body: "We are rarely replacing an ERP and almost never recommending that you do. The usual, correct pattern is a focused application that handles what the plant actually does, integrated with the ERP for the transactions the ERP owns — material, orders, costing. Each system does what it is good at.",
      worksWith: [
        "SAP, Oracle, Microsoft Dynamics, Tally and Indian mid-market ERPs",
        "Existing SCADA and historian systems",
        "Existing quality and laboratory systems",
        "Spreadsheets, as a data source during migration",
        "Machine data from our own IIoT layer or from yours",
      ],
    },

    useCases: [
      { title: "Replacing the critical spreadsheet", situation: "Planning depends on a fragile shared file.", outcome: "A proper application with roles, validation, history and an audit trail — built around the same mental model people already have." },
      { title: "Recall readiness", situation: "Tracing affected batches would take days.", outcome: "Genealogy queries answered in minutes, with the process conditions attached." },
      { title: "Paperless quality records", situation: "Inspection records on paper, filed in a cupboard.", outcome: "Digital records with pictures, signatures, timestamps and searchable history." },
      { title: "Shop-floor data entry", situation: "Operators fill forms that get typed up later.", outcome: "Tablet entry at the point of work, validated, with machine data filled in automatically." },
      { title: "Customer portal", situation: "Customers call to ask about order status.", outcome: "A portal showing live order progress derived from actual production data." },
    ],

    industries: ["manufacturing", "pharmaceutical", "food-and-beverage", "automotive", "packaging", "chemical"],

    faq: [
      { q: "Why build custom software instead of buying a product?", a: "Buy where a product genuinely fits — ERP, CAD, accounting and most CMMS products are not worth rebuilding. Build where your process is either a competitive advantage or simply does not match any product, and where the alternative is a spreadsheet. The honest test is whether you would be changing your process to fit the product, and whether that change is an improvement or just a concession." },
      { q: "Will we be locked in to you?", a: "You get the source code, the schema, the deployment documentation and the architecture notes, on infrastructure you own. We use mainstream technologies specifically so that another competent team could take it over. We would rather you stay because the work is good than because leaving is difficult." },
      { q: "How do you price software projects?", a: "Fixed price for well-defined scopes, time and materials for exploratory work, and a monthly retainer for continuous development. For anything substantial we usually propose a paid discovery phase first — a few weeks producing a specification, architecture and realistic estimate — so the main quote is based on understanding rather than on guessing." },
      { q: "Can you integrate with SAP?", a: "Yes, through the interfaces your SAP team supports — IDoc, BAPI, OData or an intermediate database, depending on your landscape and your basis team's preferences. In practice the integration design is agreed with whoever governs your SAP environment, and we work to their standards rather than around them." },
      { q: "Do you work on-premises or in the cloud?", a: "Both. Many plants require production data to stay on site, and that is entirely workable — the same application deploys to a plant server. A common arrangement is on-premises for operational data with summaries replicated to the cloud for multi-site visibility." },
    ],

    related: ["industrial-dashboards", "industrial-mobile-apps", "system-integration", "machine-monitoring"],

    cta: {
      title: "Which spreadsheet is the problem?",
      body: "Send us the one everybody is afraid of. It is usually a precise specification of what needs building.",
      label: "Discuss a software project",
    },
  },

  {
    slug: "industrial-mobile-apps",
    name: "Mobile Applications",
    spine: "build",
    summary: "Plant apps for operators, maintenance teams and management.",

    primaryKeyword: "industrial mobile app development",
    title: "Industrial Mobile App Development for Plants",
    description:
      "Industrial mobile app development — plant monitoring apps, maintenance and inspection apps, and operator tools that work offline on the shop floor.",
    serviceType: "Industrial Mobile App Development",

    eyebrow: "Build",
    h1: "Mobile applications for people who are not at a desk",
    lead: "Maintenance technicians, operators, quality inspectors and plant heads all spend their day away from a computer. We build apps for that: offline-capable, usable one-handed, readable in a bright shed, and connected to live plant data rather than to a form that gets typed up later.",

    problem: {
      title: "The work happens on the floor; the software is in the office",
      body: "An inspection is done on the line, written on paper, carried to a desk and typed into a system hours later — losing the timestamp, the photo, the context and usually some of the detail. Meanwhile the plant head checks production by calling someone.",
      symptoms: [
        "Data is captured on paper and entered later, if at all",
        "No photographs attached to defect or breakdown records",
        "Maintenance history exists only in a technician's notebook",
        "Management checks production by phoning the supervisor",
        "Any app that exists stops working where the Wi-Fi does not reach",
      ],
    },

    deliverables: [
      { title: "Plant monitoring app", body: "Live production, machine state, downtime and alerts, designed mobile-first for a plant head checking from anywhere." },
      { title: "Maintenance and work-order app", body: "Assigned jobs, asset history, checklists, spares, photos and sign-off, fully functional without a network connection." },
      { title: "Inspection and quality capture", body: "Guided inspection plans with photo and measurement capture, validation at the point of entry, and immediate non-conformance routing." },
      { title: "Operator tools", body: "Shift handover, downtime reason entry, changeover checklists and job confirmation, designed for gloves and glare." },
      { title: "Offline-first synchronisation", body: "Local storage with queued sync and conflict handling, because shop-floor coverage is never as good as the network diagram claims." },
      { title: "Push alerting", body: "Machine alarms, threshold breaches and escalations delivered to the right person's phone with acknowledgement tracking." },
    ],

    howItWorks: [
      { step: "01", title: "Follow the user", body: "We shadow the technician or operator for a shift. Where they stand, what they carry, whether they have gloves, and where the signal drops." },
      { step: "02", title: "Design for the environment", body: "High contrast for glare, large targets for gloves, one-handed reach, minimal typing, and camera-first capture." },
      { step: "03", title: "Build offline-first", body: "The app works with no connectivity by default and syncs when it can. Not the reverse." },
      { step: "04", title: "Connect to live data", body: "Wired to the same data path as the dashboards, so the app and the reports cannot disagree." },
      { step: "05", title: "Pilot and iterate", body: "A small group uses it for a few weeks before wider rollout, because the first version is never quite right and finding that out early is cheap." },
    ],

    protocols: [
      { name: "React Native / Expo", use: "Cross-platform native apps", note: "One codebase for Android and iOS. In Indian plants the fleet is overwhelmingly Android, often mid-range." },
      { name: "Progressive Web App", use: "Where installation is a barrier", note: "No app store, no MDM enrolment, works on any device. Often the right first step." },
      { name: "SQLite / local persistence", use: "Offline storage", note: "The whole working set held locally so the app is fully usable with no connection." },
      { name: "Sync with conflict resolution", use: "Reconnection", note: "Queued writes with server-side ordering; conflicts surfaced rather than silently resolved." },
      { name: "Push notifications (FCM / APNs)", use: "Alerts and escalation", note: "With acknowledgement tracking, so an unread critical alert escalates." },
      { name: "Camera / barcode / QR / NFC", use: "Asset identification and evidence", note: "Scanning an asset tag is faster and more accurate than selecting from a list of four hundred." },
    ],

    retrofit: {
      title: "Works on the devices your team already has",
      body: "We build for mid-range Android devices on patchy Wi-Fi, because that is what plants actually have. Where phones are not permitted on the floor, we design for shared rugged tablets with per-user login and fast switching.",
      worksWith: [
        "Mid-range Android devices, including older versions",
        "Shared rugged tablets with multi-user sign-in",
        "Existing barcode and QR asset tagging schemes",
        "Areas with no network coverage at all",
        "Plants where personal phones are restricted on the floor",
      ],
    },

    useCases: [
      { title: "Production on a phone", situation: "The plant head phones the supervisor every morning.", outcome: "Live and previous-shift production in an app, before the first call of the day." },
      { title: "Digital maintenance rounds", situation: "Rounds are recorded on a clipboard.", outcome: "Guided rounds with NFC or QR asset confirmation, readings, photos and a timestamped record." },
      { title: "Breakdown response", situation: "Breakdown notification is a phone call, and response time is unrecorded.", outcome: "Push alert with escalation, acknowledgement and measured response time." },
      { title: "Quality capture at the line", situation: "Inspection results are transcribed hours later.", outcome: "Captured at the point of inspection with photographs, validated on entry." },
      { title: "Shift handover", situation: "Handover is verbal and inconsistent.", outcome: "A structured handover record with outstanding issues carried forward automatically." },
    ],

    industries: ["manufacturing", "automotive", "food-and-beverage", "logistics-and-warehousing", "energy-and-utilities", "pharmaceutical"],

    faq: [
      { q: "Native app or web app?", a: "A progressive web app is usually the right first step: no app store, no device management, works on anything, and updates instantly. Go native when you need reliable background push, deep camera or scanner integration, or genuinely robust offline behaviour over long periods. We will recommend the simpler option when it is sufficient." },
      { q: "Will it work where there is no signal?", a: "Yes — that is a design requirement, not an option. The working data set is stored on the device, all capture works offline, and writes are queued and synchronised when connectivity returns, with conflicts surfaced rather than silently overwritten." },
      { q: "Do we need to buy devices?", a: "Usually not. Most plants start with existing Android phones or a few shared tablets. Rugged devices are worth it in wet, dusty or hot areas, and for shared use where drops are certain — but that is a decision to make after a pilot, not before." },
      { q: "How do you handle multiple users on a shared tablet?", a: "Fast user switching with a PIN or a scanned badge, so identity is captured on every record without a slow login. Every entry is attributed, which matters for quality records and for accountability." },
      { q: "Can it work in Hindi or a regional language?", a: "Yes. Interface language is switchable per user and we design layouts to tolerate longer strings. For operator-facing screens this often materially improves data quality, because people enter more accurate information in the language they think in." },
    ],

    related: ["custom-industrial-software", "industrial-dashboards", "machine-monitoring", "predictive-maintenance"],

    cta: {
      title: "What is still on paper?",
      body: "Rounds, inspections, handovers, breakdown records. Tell us which one hurts most and we will scope an app for it.",
      label: "Discuss a mobile app",
    },
  },

  {
    slug: "system-integration",
    name: "System Integration",
    spine: "build",
    summary: "Connecting plant systems to ERP, MES and the rest of the business.",

    primaryKeyword: "industrial system integration",
    title: "Industrial System Integration — ERP, MES & Plant",
    description:
      "Industrial system integration services — connecting PLC, SCADA and machine data to ERP, MES and cloud systems, including legacy system integration.",
    serviceType: "Industrial System Integration",

    eyebrow: "Build",
    h1: "Industrial system integration — making the plant and the business agree",
    lead: "Most plants do not have a data problem. They have a boundary problem: the PLC knows, the SCADA knows, the ERP does not, and a person in the middle re-types numbers from one into the other every day. We design and build those boundaries properly, with error handling, monitoring and documentation.",

    problem: {
      title: "The integration that is actually a person",
      body: "Between every two systems in most plants there is someone with a spreadsheet reconciling them. It works, in the sense that the business functions. It also means every number is a day old, every discrepancy is discovered late, and the whole arrangement depends on one person not taking leave.",
      symptoms: [
        "Production figures re-keyed from SCADA into the ERP",
        "Plant and finance quote different output numbers for the same period",
        "Material consumption is booked from a standard rather than from actual usage",
        "An integration exists but fails silently and nobody notices for days",
        "Every new system means another point-to-point connection to maintain",
      ],
    },

    deliverables: [
      { title: "Integration architecture", body: "A designed landscape rather than accumulated point-to-point links — with a defined data flow, ownership per data object, and a single path per direction." },
      { title: "OT/IT boundary design", body: "Network segmentation, a controlled data path out of the control network, and an interface that does not require exposing plant systems." },
      { title: "ERP integration", body: "Production confirmations, material consumption, quality results and downtime posted into SAP, Oracle, Dynamics or your mid-market ERP through supported interfaces." },
      { title: "MES and quality system integration", body: "Two-way flow of orders, recipes, results and genealogy between plant execution and business systems." },
      { title: "Legacy system integration", body: "Getting data out of systems with no API — via database reads, file drops, screen data or protocol adapters — safely and reversibly." },
      { title: "Monitoring and error handling", body: "Every interface monitored, with retries, dead-letter handling, and alerts when a flow stops. A silent integration failure is worse than no integration." },
    ],

    howItWorks: [
      { step: "01", title: "Map what exists", body: "Every system, every current data flow including the manual ones, and who owns each data object. The manual flows are the requirement." },
      { step: "02", title: "Define the contracts", body: "For each interface: the data, the direction, the trigger, the frequency, the format, the error behaviour and the owner. Written down and agreed." },
      { step: "03", title: "Design the boundary", body: "Segmentation, authentication, direction of initiation, and audit. Plant systems are never exposed directly to business networks." },
      { step: "04", title: "Build and test with real failure", body: "Tested with the target system down, with malformed data, with duplicates, and with a network partition — because all of those will happen." },
      { step: "05", title: "Monitor from day one", body: "Dashboards for flow health, alerting on stoppage or backlog, and a documented runbook for each interface." },
    ],

    protocols: [
      { name: "OPC UA", use: "The clean OT-to-IT boundary", note: "Typed, secure, and the right answer where both sides support it." },
      { name: "REST / OpenAPI", use: "Modern system-to-system", note: "Versioned contracts, idempotent writes, proper status semantics." },
      { name: "SAP IDoc / BAPI / OData", use: "SAP integration", note: "Chosen with your basis team; we work to their standards rather than inventing a path around them." },
      { name: "Message queue (MQTT / AMQP / Kafka)", use: "Decoupling and buffering", note: "So a downstream outage becomes a backlog rather than data loss." },
      { name: "Database views / staging tables", use: "Legacy systems with no API", note: "Read-only views wherever possible; never writing directly into another system's tables without its owner's agreement." },
      { name: "File-based (CSV / XML) exchange", use: "Older systems and third parties", note: "Still common, still workable, with checksums, ordering and idempotency handled properly." },
      { name: "SFTP / secure transfer", use: "Inter-organisation exchange", note: "With monitoring, because file-drop integrations fail quietly by nature." },
    ],

    retrofit: {
      title: "Integrating systems that were never designed to be integrated",
      body: "Much of this work involves systems with no API, no documentation and no vendor support. There is almost always a safe path — a read-only database view, an export the system already produces, a protocol adapter, or a screen-level interface — and part of our job is finding the one that does not put the source system at risk.",
      worksWith: [
        "SAP, Oracle, Dynamics, Tally and Indian mid-market ERPs",
        "SCADA historians of any vintage",
        "Legacy applications with no documented interface",
        "Third-party laboratory, weighbridge and quality systems",
        "Customer and supplier portals requiring scheduled exchange",
      ],
    },

    useCases: [
      { title: "Automatic production confirmation", situation: "Production is confirmed in the ERP by hand from a printed sheet.", outcome: "Confirmations posted from measured machine data, with exceptions flagged for review rather than everything requiring it." },
      { title: "Actual material consumption", situation: "Consumption is backflushed from a standard that is known to be wrong.", outcome: "Actual usage captured at the line and posted, revealing real yield." },
      { title: "Order status to customers", situation: "Customers call to ask where their order is.", outcome: "Live status derived from production data, exposed through a portal or an API." },
      { title: "Consolidating multi-plant reporting", situation: "Each site reports differently on a different day.", outcome: "One data model, automated collection, and a group view that reconciles to each site." },
      { title: "Rescuing a failed integration", situation: "An existing interface breaks regularly and silently.", outcome: "Rebuilt with idempotency, retries, monitoring and alerting, plus a runbook for when it does fail." },
    ],

    industries: ["manufacturing", "automotive", "pharmaceutical", "food-and-beverage", "chemical", "logistics-and-warehousing"],

    faq: [
      { q: "Is it safe to connect plant systems to the business network?", a: "Not directly, and we do not do it that way. The standard arrangement is a segmented boundary: an edge or integration service sits between the two, initiates connections outward only, and exposes a defined interface. The control network is never directly reachable from IT, and the flow is auditable. This follows the Purdue model and is normally what your IT and safety functions will require anyway." },
      { q: "Our ERP vendor says integration is not possible.", a: "That usually means it is not possible in the way it was asked for, or not within their support scope. There is nearly always a route — a supported interface, a read-only database view, a scheduled export. We work with the ERP partner rather than around them, because an unsupported integration that voids your support contract is not a solution." },
      { q: "How do you handle an integration failing at 2am?", a: "By designing for it. Messages are queued rather than dropped, writes are idempotent so retries are safe, failures go to a dead-letter queue and raise an alert, and each interface has a runbook describing how to recover. The goal is that a failure becomes a backlog that clears itself, and a person is only involved when it does not." },
      { q: "Should we buy an integration platform?", a: "Only if you have enough interfaces to justify it. For a handful of flows, a well-built service with proper monitoring is simpler, cheaper and easier to reason about. Once you are past roughly a dozen interfaces across multiple systems, a platform starts earning its licence cost. We will tell you which side of that line you are on." },
      { q: "Can you integrate without disturbing the existing systems?", a: "In most cases, yes. We read rather than write wherever possible, use interfaces the vendor supports, and test against a copy before touching production. Where a write into a third-party system is genuinely required, we get that system's owner involved before doing it — never after." },
    ],

    related: ["custom-industrial-software", "scada-development", "edge-computing", "industrial-dashboards"],

    cta: {
      title: "Where is the person in the middle?",
      body: "Show us the spreadsheet that reconciles two systems. That is where the integration belongs.",
      label: "Discuss an integration",
    },
  },
];

/* ── Lookups ─────────────────────────────────────────────────────────────── */

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const spineLabels: Record<string, { label: string; blurb: string }> = {
  connect: { label: "Connect", blurb: "Get data off the machine" },
  automate: { label: "Automate", blurb: "Make the machine act on it" },
  monitor: { label: "Monitor", blurb: "See it as it happens" },
  analyse: { label: "Analyse", blurb: "Understand why it happened" },
  build: { label: "Build", blurb: "Software the plant actually uses" },
};

export const spineOrder = ["connect", "automate", "monitor", "analyse", "build"] as const;

export function servicesBySpine(stage: string) {
  return services.filter((s) => s.spine === stage);
}
