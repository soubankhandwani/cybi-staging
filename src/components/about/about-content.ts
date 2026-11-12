export const identityStages = [
  {
    number: "01",
    title: "Information",
    question: "What happened?",
    description:
      "Understanding digital activity, evidence, systems, incidents and threats before conclusions are drawn.",
  },
  {
    number: "02",
    title: "Investigation",
    question: "What can be established?",
    description:
      "Examining cybercrime, fraud, hacking, data theft and technology-assisted incidents through evidence and analysis.",
  },
  {
    number: "03",
    title: "Intelligence",
    question: "What should happen next?",
    description:
      "Turning information and findings into a clearer basis for operational, security and legal decisions.",
  },
] as const;

export const timelineStages = [
  "Origin",
  "Investigation",
  "Forensics",
  "Security + Law",
  "Training",
  "Cyber-I Today",
] as const;

export const disciplines = [
  { number: "01", title: "Cybercrime Investigation", note: "Intelligence gathering, digital analysis and investigative support" },
  { number: "02", title: "Digital Forensics", note: "Identification, preservation and examination" },
  { number: "03", title: "Cybersecurity", note: "Architecture, gaps and digital risk" },
  { number: "04", title: "Techno-Legal Consulting", note: "Evidence authentication, forensic review and expert opinions" },
  { number: "05", title: "Training & Capacity Building", note: "Practical, scenario-based learning for professionals and institutions" },
  { number: "06", title: "Cyber Advisory Services", note: "Cyber risk, digital governance and incident preparedness" },
] as const;

export const principles = [
  { title: "Evidence-driven", description: "Findings begin with available evidence and disciplined analysis." },
  { title: "Analytical", description: "Complex digital activity is examined systematically and in context." },
  { title: "Discreet", description: "Sensitive matters call for controlled communication and professional handling." },
  { title: "Legally aware", description: "Digital evidence exists within investigative, procedural and legal contexts." },
  { title: "Practical", description: "Work should help people and institutions determine an appropriate next step." },
  { title: "Professional", description: "Every engagement should reflect responsibility, clarity and institutional standards." },
] as const;

export const experienceGroups = [
  {
    code: "INVESTIGATION / TRAINING",
    sectors: ["Law Enforcement", "Government Departments"],
  },
  {
    code: "SECURITY / FORENSICS / ADVISORY",
    sectors: ["Corporate Organisations", "Financial Institutions"],
  },
  {
    code: "TECHNO-LEGAL / CAPACITY BUILDING",
    sectors: ["Legal Professionals", "Educational Institutions"],
  },
] as const;

export const audiences = [
  {
    number: "01",
    title: "Government & Law Enforcement",
    description: "Investigation, digital evidence, forensics, cyber law, cybersecurity and capacity building.",
    href: "/services",
  },
  {
    number: "02",
    title: "Corporations & Enterprises",
    description: "Incident investigation, data theft, fraud, security assessment, forensics and compliance-related needs.",
    href: "/services",
  },
  {
    number: "03",
    title: "Financial Institutions",
    description: "Fraud investigation, evidence, cybersecurity, incident response and specialist training.",
    href: "/services",
  },
  {
    number: "04",
    title: "Institutions & Professionals",
    description: "Cyber investigation, forensics, cyber law, digital evidence and professional training.",
    href: "/courses",
  },
  {
    number: "05",
    title: "Legal Professionals",
    description: "Digital evidence authentication, forensic review, expert opinions and cyber law consultation.",
    href: "/contact",
  },
] as const;
