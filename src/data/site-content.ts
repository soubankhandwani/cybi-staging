import type { Expert, Feature, NavigationItem, Service } from "@/types";

export const navigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Clients", href: "/clients" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const incidentWhatsAppMessage = "Hello Cyber-I, I need to report or discuss a cyber incident. I will not send sensitive evidence here. Please advise the next secure step.";
export const incidentWhatsAppUrl = `https://wa.me/16444666114?text=${encodeURIComponent(incidentWhatsAppMessage)}`;

export const features: Feature[] = [
  {
    id: "information-analysis",
    code: "SEC_CTR_NODE // 01",
    title: "Information Analysis",
    description: "Converting complex information into meaningful intelligence and strategic insights.",
    icon: "network",
  },
  {
    id: "investigation-support",
    code: "AUD_COMPL_SYS // 02",
    title: "Investigation Support",
    description: "Supporting law enforcement, institutions, and organizations with investigative expertise.",
    icon: "shield",
  },
  {
    id: "digital-forensics",
    code: "INV_ANOMALY_REG // 03",
    title: "Digital Forensics",
    description: "Uncovering evidence, validating facts, and strengthening decision-making.",
    icon: "forensics",
  },
];

export const services: Service[] = [
  {
    id: "information-analysis",
    code: "INFO_ANLYS // 01",
    title: "Information Analysis",
    description: "Transform scattered information into meaningful intelligence through structured analysis and insight generation.",
    tags: ["Data Structuring", "Insight Generation", "Pattern Recognition", "Strategic Reporting"],
    icon: "globe",
  },
  {
    id: "investigation-services",
    code: "INVEST_SVC // 02",
    title: "Investigation Services",
    description: "Supporting investigations with evidence review, intelligence gathering, and analytical expertise.",
    tags: ["Evidence Review", "Intelligence Gathering", "Case Analysis", "Expert Testimony"],
    icon: "search",
  },
  {
    id: "digital-forensics",
    code: "DIG_FRNSCS // 03",
    title: "Digital Forensics",
    description: "Identification, preservation, analysis, and presentation of digital evidence.",
    tags: ["Evidence Preservation", "Data Recovery", "Forensic Analysis", "Expert Reporting"],
    icon: "lock",
  },
  {
    id: "cyber-investigations",
    code: "CYBER_INV // 04",
    title: "Cyber Investigations",
    description: "Investigating cyber incidents, digital threats, and technology-enabled crimes.",
    tags: ["Incident Response", "Threat Analysis", "Digital Tracking", "Crime Investigation"],
    icon: "database",
  },
  {
    id: "law-enforcement-training",
    code: "LAW_TRNG // 05",
    title: "Law Enforcement Training",
    description: "Specialized training programs for investigators, intelligence professionals, and enforcement agencies.",
    tags: ["Capacity Building", "Skills Development", "Certification Programs", "Workshop Delivery"],
    icon: "graduation",
  },
  {
    id: "strategic-risk-advisory",
    code: "STRTG_ADV // 06",
    title: "Strategic Risk Advisory",
    description: "Intelligence-led advisory services supporting informed decision-making.",
    tags: ["Risk Assessment", "Strategic Planning", "Policy Advisory", "Decision Support"],
    icon: "shield",
  },
];

export const serviceTicker = [
  "Information Analysis",
  "Intelligence Operations",
  "Digital Forensics",
  "Investigations",
  "Law Enforcement Training",
  "Strategic Advisory",
  "Cyber Analysis",
  "OSINT",
  "Risk Assessment",
  "Threat Intelligence",
];

export const valueRows = [
  ["Compliance", "Reliability", "Scalability", "Protection", "Monitoring", "Expertise", "Customization"],
  ["Agility", "Integration", "Transparency", "Resilience", "Empowerment", "Support", "Efficiency", "Innovation"],
  ["Performance", "Adaptability", "Simplicity", "Collaboration", "Insights", "Security", "Confidentiality"],
];

export const experts: Expert[] = [
  {
    name: "Alex Turner",
    role: "Chief Technology Officer",
    biography: "Alex drives our technology strategy and develops innovative cybersecurity solutions, leveraging over a decade of experience to combat threats.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=700&h=800",
    code: "SYS_CORP // LDR_01",
    imagePosition: "right",
    stats: [
      { value: "12", label: "Years of Experience" },
      { value: "200+", label: "Successful Projects" },
      { value: "360+", label: "Security Assessments" },
      { value: "95%", label: "On-Time Delivery" },
    ],
  },
  {
    name: "Maria Chen",
    role: "Security Analyst",
    biography: "Maria specializes in threat detection and incident response, analyzing breaches to enhance client defenses while staying ahead of threats.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700&h=800",
    code: "SYS_CORP // LDR_02",
    imagePosition: "left",
    stats: [
      { value: "08", label: "Years of Experience" },
      { value: "130+", label: "Successful Projects" },
      { value: "420+", label: "Security Assessments" },
      { value: "97%", label: "On-Time Delivery" },
    ],
  },
];

export const modalSolutions = [
  { title: "Proactive Audit Control", description: "Rigorous diagnostic scripts scan vulnerabilities before threats compromise endpoints." },
  { title: "Autonomous System Segmentation", description: "Instantly partition and isolate active workloads at the onset of anomalous packet behaviors." },
  { title: "Hardened Credential Store", description: "Zero-knowledge encryption for database credentials, secrets, and authorization signatures." },
];

export const modalIndustryMetrics = [
  ["Financial Services", "0.00% fraud penetration achieved"],
  ["Military-Tech Sector", "Sub-millisecond response threat shields"],
  ["Healthcare Logistics", "HIPAA compliant secured packets"],
  ["Decentralized Cryptonet", "Secured at level 1 validator ends"],
];

export const contactActions = [
  { icon: "mail", title: "Drop Us a Line", description: "Need assistance? Shoot us an email, and we'll get back to you as soon as possible!", label: "Send Email", href: "mailto:help@cipherintegrity.io" },
  { icon: "message", title: "Report an Incident", description: "Start a WhatsApp chat for initial guidance. Do not send sensitive evidence until a secure route is confirmed.", label: "Open WhatsApp", href: incidentWhatsAppUrl, external: true, featured: true },
  { icon: "calendar", title: "Request a Call", description: "Tell us what you would like to discuss so we can arrange a call.", label: "Request a Call", href: "/contact?intent=call" },
] as const;
