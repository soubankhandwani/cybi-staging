import type { Metadata } from "next";
import { ForensicsService, SecurityService } from "@/components/services/ForensicsSecurityServices";
import { InvestigationService } from "@/components/services/InvestigationService";
import { CyberLawService, TrainingService } from "@/components/services/LawTrainingServices";
import { EngagementProcess, WhyAndProof } from "@/components/services/ProcessAndProof";
import { ServiceNavigator } from "@/components/services/ServiceNavigator";
import { ServicesFinalCTA } from "@/components/services/ServicesFinalCTA";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Cyber Investigation, Digital Forensics, Security & Cyber Law Services | Cyber-I",
  description: "Explore Cyber-I services for cybercrime investigation, digital forensics, IT security assessment, cyber law, digital evidence and institutional training.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cyber-I Consultancy Services",
    description: "A multidisciplinary capability dossier spanning cybercrime investigation, digital forensics, cybersecurity, cyber law and institutional training.",
    type: "website",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="relative z-20 py-4 sm:py-6" id="main-content">
      <ServicesHero />
      <ServiceNavigator />
      <InvestigationService />
      <ForensicsService />
      <SecurityService />
      <CyberLawService />
      <TrainingService />
      <EngagementProcess />
      <WhyAndProof />
      <ServicesFinalCTA />
    </main>
  );
}
