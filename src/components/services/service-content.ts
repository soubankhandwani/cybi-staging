export const serviceNavigation = [
  { number: "01", label: "Cyber Crime Investigation", href: "#cyber-crime-investigation" },
  { number: "02", label: "Digital Forensics", href: "#digital-forensics" },
  { number: "03", label: "Cyber / IT Security", href: "#cyber-it-security" },
  { number: "04", label: "Cyber Law & Digital Evidence", href: "#cyber-law-digital-evidence" },
  { number: "05", label: "Institutional Training", href: "#institutional-training" },
] as const;

export const engagementSteps = [
  { number: "01", title: "Understand", description: "Establish the requirement, incident or objective." },
  { number: "02", title: "Assess", description: "Identify relevant information, scope and considerations." },
  { number: "03", title: "Examine / Advise", description: "Apply the specialist capability appropriate to the matter." },
  { number: "04", title: "Deliver", description: "Communicate findings, evidence, recommendations or next steps as appropriate." },
] as const;

export const differentiators = [
  ["01", "Practitioner experience", "Legacy material references operational cybercrime, cyber lab, policing, legal and forensic backgrounds."],
  ["02", "Investigation + technology + law", "Connected disciplines help digital evidence remain understood in investigative and legal context."],
  ["03", "Evidence-oriented expertise", "The focus extends beyond generic security consulting to incidents, evidence and findings."],
  ["04", "Institutional experience", "Government, enterprise and training organizations appear in the legacy record, subject to relationship verification."],
  ["05", "Services + training", "Operational capability is supported by professional and institutional education pathways."],
] as const;
