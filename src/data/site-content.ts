import { companyContact } from "@/data/company";
import type { Expert, Feature, NavigationItem, Service } from "@/types";

export const navigation: NavigationItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Courses", href: "/courses" },
  { label: "Clients", href: "/clients" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const features: Feature[] = [
  {
    id: "investigation",
    code: "SEC_CTR_NODE // 01",
    title: "Cybercrime Investigation",
    description: "Evidence-driven investigative support for technology-enabled crimes.",
    icon: "network",
  },
  {
    id: "cybersecurity",
    code: "AUD_COMPL_SYS // 02",
    title: "Cybersecurity",
    description: "Identify vulnerabilities and strengthen digital infrastructure through assessments, audits and advisory services.",
    icon: "shield",
  },
  {
    id: "digital-forensics",
    code: "INV_ANOMALY_REG // 03",
    title: "Digital Forensics",
    description: "Collect, preserve, examine and report digital evidence.",
    icon: "forensics",
  },
];

export const serviceDescriptions = {
  investigation: "Providing specialised investigative support for technology-enabled crimes through evidence-driven methodologies, intelligence gathering, digital analysis, and investigative consultation.",
  forensics: "Collection, preservation, examination, analysis, and reporting of digital evidence from computers, mobile devices, cloud environments, networks, storage media, IoT devices, and emerging technologies.",
  cybersecurity: "Helping organisations identify vulnerabilities, assess cyber risks, strengthen infrastructure, and improve security posture through assessments, audits, and advisory services.",
  technoLegal: "Supporting legal professionals, corporates, and investigative agencies through digital evidence authentication, forensic review, expert opinions, expert witness testimony, and cyber law consultation.",
  training: "Delivering practical, scenario-based training programmes for law enforcement agencies, financial institutions, corporate organisations, government departments, legal professionals, and academic institutions.",
  advisory: "Providing strategic guidance on cyber risk, digital governance, incident response, organisational preparedness, and investigative planning.",
};

export const services: Service[] = [
  {
    id: "cyber-crime-investigation",
    code: "CYBER_INV // 01",
    title: "Cybercrime Investigation",
    description: serviceDescriptions.investigation,
    tags: ["Intelligence Gathering", "Digital Analysis", "Investigative Consultation"],
    icon: "search",
  },
  {
    id: "digital-forensics",
    code: "DIG_FRNSCS // 02",
    title: "Digital Forensics",
    description: serviceDescriptions.forensics,
    tags: ["Evidence Collection", "Preservation", "Examination", "Reporting"],
    icon: "lock",
  },
  {
    id: "cyber-it-security",
    code: "CYBER_SEC // 03",
    title: "Cybersecurity",
    description: serviceDescriptions.cybersecurity,
    tags: ["Risk Assessment", "Vulnerability Assessment", "Security Audits"],
    icon: "shield",
  },
  {
    id: "cyber-law-digital-evidence",
    code: "TECHNO_LEGAL // 04",
    title: "Techno-Legal Consulting",
    description: serviceDescriptions.technoLegal,
    tags: ["Evidence Authentication", "Forensic Review", "Expert Opinions", "Expert Witness Testimony"],
    icon: "database",
  },
  {
    id: "institutional-training",
    code: "TRAINING // 05",
    title: "Training & Capacity Building",
    description: serviceDescriptions.training,
    tags: ["Scenario-Based Learning", "Institutional Training"],
    icon: "graduation",
  },
  {
    id: "cyber-advisory-services",
    code: "CYBER_ADV // 06",
    title: "Cyber Advisory Services",
    description: serviceDescriptions.advisory,
    tags: ["Cyber Risk", "Digital Governance", "Incident Readiness", "Investigative Planning"],
    icon: "globe",
  },
];

export const serviceTicker = services.map((service) => service.title);

export const valueRows = [
  ["Investigation-Centric Approach", "Multidisciplinary Expertise"],
  ["Practical Industry Experience", "Legally Defensible Solutions"],
  ["Capacity Building Focus", "Trusted Professional Support"],
];

export const experts: Expert[] = [];

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
  { icon: "mail", title: "Email Cyber-I", description: "Contact the team about services, training or expert consultation.", label: "Send Email", href: `mailto:${companyContact.emails[0]}` },
  { icon: "message", title: "Report an Incident", description: "Share a brief summary of the incident and the assistance you need.", label: "Discuss an Incident", href: "/contact?intent=incident#enquiry", featured: true },
  { icon: "calendar", title: "Request a Call", description: "Tell us what you would like to discuss so we can arrange a call.", label: "Request a Call", href: "/contact?intent=call#enquiry" },
] as const;
