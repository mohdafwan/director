export const techGroups = [
  {
    group: "Industrial protocols",
    note: "What we speak on the plant side. Chosen per installed base, not per preference.",
    items: [
      "Modbus TCP", "Modbus RTU", "OPC UA", "OPC DA", "MQTT", "Sparkplug B",
      "Ethernet/IP (CIP)", "Profinet", "Profibus", "Siemens S7 comms",
      "EtherCAT", "IO-Link", "BACnet", "IEC 61850", "DNP3", "Serial RS-232/485",
    ],
  },
  {
    group: "Controllers & panels",
    note: "Platforms we program, migrate and integrate.",
    items: [
      "Siemens S7-1200 / 1500", "Siemens S7-300 / 400", "TIA Portal", "STEP 7",
      "Allen-Bradley CompactLogix / ControlLogix", "Studio 5000", "MicroLogix / SLC",
      "Mitsubishi FX / Q / iQ-R", "GX Works", "Delta", "Schneider M221 / M241 / M580",
      "Omron CP / CJ / NX", "Fatek", "Wecon",
    ],
  },
  {
    group: "HMI & SCADA",
    note: "Supervisory and operator interface platforms.",
    items: [
      "Siemens WinCC", "WinCC Unified", "AVEVA / Wonderware InTouch",
      "AVEVA System Platform", "Ignition", "FactoryTalk View SE / ME",
      "GE iFIX", "Weintek", "Delta HMI", "Mitsubishi GOT", "Web-based HMI",
    ],
  },
  {
    group: "Edge & gateways",
    note: "Where protocol conversion, buffering and local logic happen.",
    items: [
      "Industrial DIN-rail gateways", "Fanless industrial PCs", "Node-RED",
      "Custom edge services", "Store-and-forward buffering", "Local dashboards",
      "Remote fleet management", "Dual-NIC network segregation",
    ],
  },
  {
    group: "Instrumentation",
    note: "What we fit when a machine exposes nothing.",
    items: [
      "Current transformers", "Energy meters", "Triaxial vibration (MEMS / IEPE)",
      "RTD / thermocouple", "Proximity & photoelectric", "Pressure & flow transmitters",
      "Level sensors", "Temperature & humidity", "Ultrasonic leak detection",
      "Barcode / QR / DMC / RFID",
    ],
  },
  {
    group: "Data & platform",
    note: "Where the data lands and how it is served.",
    items: [
      "PostgreSQL", "TimescaleDB", "InfluxDB", "SQL Server", "Redis",
      "MQTT brokers", "Kafka / AMQP", "Docker", "On-premises deployment",
      "AWS / Azure / GCP", "Grafana", "REST / OpenAPI", "WebSockets",
    ],
  },
  {
    group: "Software engineering",
    note: "What the applications are built with.",
    items: [
      "TypeScript", "Next.js", "React", "Node.js", "Python", "React Native",
      "Progressive Web Apps", "OpenAPI contracts", "Role-based access control",
      "Audit logging", "CI/CD", "Automated testing",
    ],
  },
  {
    group: "Business systems",
    note: "What we integrate with, through supported interfaces.",
    items: [
      "SAP (IDoc / BAPI / OData)", "Oracle", "Microsoft Dynamics", "Tally",
      "Indian mid-market ERPs", "MES platforms", "CMMS / EAM",
      "LIMS & quality systems", "Power BI", "Weighbridge & third-party systems",
    ],
  },
];

export const securityPrinciples = [
  {
    title: "The control network is never exposed",
    body: "Monitoring and integration devices are dual-homed with no routing between the OT and business networks. Connections are initiated outward only. This follows the Purdue model and is normally what your IT and safety functions require anyway.",
  },
  {
    title: "Read-only by default",
    body: "Data collection is read-only unless writing is an explicit, agreed part of the scope. Where a write path exists, it is separately authenticated, rate-limited and logged.",
  },
  {
    title: "Encrypted transport, authenticated devices",
    body: "TLS on all northbound transport, with client certificates for device identity rather than shared credentials. Certificates are rotatable without a site visit.",
  },
  {
    title: "Least privilege and audit",
    body: "Role-based access with segregation of duties, and an immutable audit log recording who changed what, when, and what the previous value was.",
  },
  {
    title: "Your infrastructure, your credentials",
    body: "Systems run in your cloud account or on your servers. You hold the credentials. We do not retain standing access after handover unless a support arrangement specifically provides for it, and that access is logged.",
  },
  {
    title: "Failure is designed for",
    body: "Buffering on link loss, idempotent writes so retries are safe, dead-letter handling, and alerting when a data flow stops. A silent integration failure is worse than no integration.",
  },
];

export const aiLayer = {
  eyebrow: "What comes next",
  title: "From connected machines to intelligent decisions",
  lead: "AI is not our identity and it is not a starting point. It is a layer that becomes useful once there is enough clean, contextualised industrial data underneath it — which is exactly what the rest of this work produces. Applied before that, it produces confident output from bad inputs.",
  applications: [
    { title: "Anomaly detection", body: "Detecting behaviour that deviates from a machine's own learned normal, across many signals at once — useful once there is a year of history including real failures." },
    { title: "Predictive maintenance models", body: "Moving from threshold and trend detection to model-based remaining-life estimation, on assets where the failure history supports it." },
    { title: "Production forecasting", body: "Short-horizon output prediction from current state, order mix and historical performance, to support scheduling decisions during the shift rather than after it." },
    { title: "Energy optimisation", body: "Identifying consumption patterns and load-shifting opportunities from measured per-asset data and tariff structure." },
    { title: "Natural-language plant queries", body: "Asking a question of your plant data in plain language instead of building a report — genuinely useful, and only trustworthy when the underlying data model is sound." },
    { title: "AI-assisted troubleshooting", body: "Surfacing similar past events, their causes and their resolutions when a fault occurs, from your own maintenance history." },
  ],
  caution:
    "We will tell you when a problem does not need machine learning. Most of the value in a plant's first two years of digitalisation comes from measuring things accurately and showing them to the right person quickly. That is unglamorous and it is where the return is.",
};
