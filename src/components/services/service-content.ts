import { services } from "@/data/site-content";

export const serviceNavigation = services.map((service, index) => ({
  number: String(index + 1).padStart(2, "0"),
  label: service.title,
  href: "#" + service.id,
}));

export const engagementSteps = [
  { number: "01", title: "Understand", description: "Establish the requirement, incident or objective." },
  { number: "02", title: "Assess", description: "Identify relevant information, scope and considerations." },
  { number: "03", title: "Examine / Advise", description: "Apply the specialist capability appropriate to the matter." },
  { number: "04", title: "Deliver", description: "Communicate findings, evidence, recommendations or next steps as appropriate." },
] as const;

export const differentiators = [
  ["01", "Investigation-Centric Approach", "Our investigative work is grounded in evidence, intelligence gathering and digital analysis."],
  ["02", "Multidisciplinary Expertise", "We bring together investigation, digital forensics, cybersecurity and techno-legal consulting."],
  ["03", "Practical Industry Experience", "We work with organisations in law enforcement, finance, government, business and education."],
  ["04", "Legally Defensible Solutions", "We consider legal procedures and evidentiary standards alongside technical findings."],
  ["05", "Capacity Building Focus", "Our training uses practical case studies and investigative scenarios."],
  ["06", "Trusted Professional Support", "We support organisations and professionals with specialist consultation and expert opinions."],
] as const;
