import type { Metadata } from "next";
import { AcademyPage } from "@/components/academy/AcademyPage";

export const metadata: Metadata = {
  title: "Certification and Capsule Courses | Cyber-I",
  description: "Explore certification and capsule courses from Cyber-I Consultancy Services, including CEH, CHFI and specialist investigation and forensics courses.",
  openGraph: {
    title: "Cyber-I Academy",
    description: "Build investigative capability through practical case studies and real-world scenarios.",
    type: "website",
  },
};

export default function CoursesPage() {
  return <AcademyPage />;
}
