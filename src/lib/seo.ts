import { companyName } from "@/data/company";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Absolute, normalized origin used by metadata routes and structured data. */
export const SITE_URL = new URL(configuredSiteUrl || "http://localhost:3000").origin;

export const SITE_NAME = companyName;
export const SITE_TITLE = "Cyber-I | Cybercrime Investigation, Digital Forensics & Cybersecurity";
export const SITE_DESCRIPTION =
  "Cybercrime investigation, digital forensics, cybersecurity, techno-legal consulting, professional training and cyber advisory from Cyber-I Consultancy Services.";
