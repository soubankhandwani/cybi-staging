export const enquiryTypes = [
  "Service / Investigation",
  "Course / Training",
  "Partnership",
  "General",
  "Cybercrime Investigation",
  "Digital Forensics",
  "Cybersecurity",
  "Techno-Legal Consulting",
  "Training & Capacity Building",
  "Cyber Advisory Services",
] as const;

export const contactLimits = { name: 120, organisation: 160, email: 254, phone: 40, message: 5000 };