import type { Metadata } from "next";
import { ForensicsService, SecurityService } from "@/components/services/ForensicsSecurityServices";
import { InvestigationService } from "@/components/services/InvestigationService";
import { AdvisoryService, CyberLawService, TrainingService } from "@/components/services/LawTrainingServices";
import { EngagementProcess, WhyAndProof } from "@/components/services/ProcessAndProof";
import { ServiceNavigator } from "@/components/services/ServiceNavigator";
import { ServicesFinalCTA } from "@/components/services/ServicesFinalCTA";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  title: "Cybercrime Investigation, Forensics & Cybersecurity Services | Cyber-I",
  description: "Explore cybercrime investigation, digital forensics, cybersecurity, techno-legal consulting, training and cyber advisory services.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cyber-I Consultancy Services",
    description: "Specialised services to strengthen investigations, secure digital environments and build institutional capability.",
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
      <AdvisoryService />
      <EngagementProcess />
      <WhyAndProof />
      <ServicesFinalCTA />
    </main>
  );
}
