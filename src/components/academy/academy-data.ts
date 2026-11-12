export const courseTypes = ["Certification", "Capsule"] as const;
export type CourseType = (typeof courseTypes)[number];

export interface AcademyCourse {
  slug: string;
  title: string;
  type: CourseType;
  code?: string;
}

export const courseIntroduction =
  "Cyber-I Consultancy Services offers specialised training programmes designed to strengthen technical knowledge, investigative thinking, and operational capability.";

export const learningApproach =
  "Our programmes combine practical case studies, real-world investigative scenarios, and specialised technologies to equip participants with skills that can be directly applied in the field.";

export const academyCourses: AcademyCourse[] = [
  { slug: "certified-ethical-hacker", title: "Certified Ethical Hacker (CEH)", type: "Certification", code: "CEH" },
  { slug: "computer-hacking-forensic-investigator", title: "Computer Hacking Forensic Investigator (CHFI)", type: "Certification", code: "CHFI" },
  { slug: "advanced-computer-forensics", title: "Advanced Computer Forensics", type: "Capsule" },
  { slug: "mobile-device-forensics", title: "Mobile Device Forensics", type: "Capsule" },
  { slug: "cryptocurrency-investigations", title: "Cryptocurrency Investigations", type: "Capsule" },
  { slug: "osint-digital-intelligence", title: "OSINT & Digital Intelligence", type: "Capsule" },
  { slug: "ipdr-analysis", title: "IPDR Analysis", type: "Capsule" },
  { slug: "digital-evidence-handling", title: "Digital Evidence Handling", type: "Capsule" },
  { slug: "deepfake-detection", title: "Deepfake Detection", type: "Capsule" },
  { slug: "malware-investigation", title: "Malware Investigation", type: "Capsule" },
  { slug: "cctv-video-forensics", title: "CCTV & Video Forensics", type: "Capsule" },
  { slug: "threat-intelligence", title: "Threat Intelligence", type: "Capsule" },
  { slug: "incident-response", title: "Incident Response", type: "Capsule" },
  { slug: "financial-fraud-investigation", title: "Financial Fraud Investigation", type: "Capsule" },
];

export function getCourse(slug: string) {
  return academyCourses.find((course) => course.slug === slug);
}
