const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

/** Absolute, normalized origin used by metadata routes and structured data. */
export const SITE_URL = new URL(configuredSiteUrl || "http://localhost:3000").origin;

export const SITE_NAME = "Cyber-I Consultancy";
export const SITE_TITLE = "Cyber-I | Information. Investigation. Intelligence.";
export const SITE_DESCRIPTION =
  "Intelligence analysis, cyber investigations, digital forensics, cyber law, professional training, and strategic advisory from Cyber-I Consultancy.";
