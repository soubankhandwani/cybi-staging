export const incidentSignals = [
  ["01", "Online or financial fraud", "Transactions, communications or digital activity require structured examination."],
  ["02", "Business Email Compromise", "Email activity or wire-transfer communications may be relevant to understanding the incident."],
  ["03", "Data theft", "File activity, storage devices, email or remote connections may need examination."],
  ["04", "Hacking or intrusion", "A system, account or website may show signs of unauthorized activity."],
  ["05", "Phishing or extortion", "Messages, accounts and related digital traces may be relevant to the matter."],
  ["06", "False digital identities", "Fake profiles or technology-assisted impersonation may require investigation."],
] as const;

export const investigationCapabilities = [
  {
    number: "01",
    title: "Establish the matter",
    description: "Understand the reported incident, the questions that need answering and the digital activity that may be relevant.",
    items: ["Cybercrime and fraud context", "Technology-assisted incidents", "Relevant systems and accounts"],
  },
  {
    number: "02",
    title: "Identify evidence",
    description: "Identify, preserve and collect relevant digital evidence within the agreed scope.",
    items: ["Digital evidence identification", "Evidence preservation", "Evidence collection"],
  },
  {
    number: "03",
    title: "Examine activity",
    description: "Examine available information and digital activity that may help establish findings.",
    items: ["Email and internet activity", "Smartphone-related evidence", "Files, storage and remote activity"],
  },
  {
    number: "04",
    title: "Communicate findings",
    description: "Organize findings and evidence into an investigation report or relevant documentation.",
    items: ["Evidence analysis", "Investigation reporting", "Evidence preparation for legal proceedings"],
  },
] as const;

export const processSteps = [
  ["01", "Initial discussion", "Establish the situation, objective and initial context."],
  ["02", "Scope and assessment", "Determine relevant information, systems and investigation boundaries."],
  ["03", "Specialist work", "Apply appropriate investigation and evidence-examination capabilities."],
  ["04", "Findings", "Analyze the relevant information and establish supported findings."],
  ["05", "Report / next steps", "Communicate appropriate outputs and considerations for the next action."],
] as const;

export const faqItems = [
  {
    question: "What should I provide in an initial enquiry?",
    answer: "Begin with a brief description of the incident, the affected person or organization, and the type of assistance required. Do not send sensitive evidence through a basic public enquiry unless Cyber-I confirms an appropriate process.",
  },
  {
    question: "How long does an investigation take?",
    answer: "The supplied information does not define standard investigation timelines. Duration depends on scope, available evidence, systems involved and the questions to be examined.",
  },
  {
    question: "Can an investigation guarantee recovery, attribution or a legal outcome?",
    answer: "No outcome should be assumed or guaranteed. Investigation findings depend on the available information, accessible evidence and the circumstances of the matter.",
  },
  {
    question: "Does Cyber-I work with individuals as well as organizations?",
    answer: "The legacy material states that investigation and forensic services are offered to corporations, governments, institutes and individuals. Exact scope should be confirmed during the initial discussion.",
  },
] as const;
