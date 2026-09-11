import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/AcademyPage";

export const metadata: Metadata = {
  title: "Cyber-I Academy | Cyber Investigation, Forensics & Cyber Law Courses",
  description: "Explore professional learning pathways in cyber investigation, digital forensics, cyber law and digital evidence at Cyber-I Academy.",
  openGraph: {
    title: "Cyber-I Academy",
    description: "Find the right professional programme in cyber investigation, digital forensics or cyber law and digital evidence.",
    type: "website",
  },
};

export default function CoursesPage() {
  return <AcademyPage />;
}
