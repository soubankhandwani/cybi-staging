import type { Metadata } from "next";
import { companyName } from "@/data/company";
import { DualPathCTA, FinalContactCTA } from "@/components/about/AboutCTAs";
import { AboutHero } from "@/components/about/AboutHero";
import { AudienceNavigator } from "@/components/about/AudienceNavigator";
import { ExpertiseMatrix } from "@/components/about/ExpertiseMatrix";
import { IdentityFramework } from "@/components/about/IdentityFramework";
import { InstitutionalExperience } from "@/components/about/InstitutionalExperience";
import { CompanyTimeline, MissionVision } from "@/components/about/MissionTimeline";
import { LeadershipSection, OperatingPrinciples } from "@/components/about/PrinciplesExpertise";

export const metadata: Metadata = {
  title: "About Cyber-I Consultancy Services",
  description:
    "Learn how Cyber-I Consultancy Services brings together cybercrime investigation, digital forensics, cybersecurity and techno-legal consulting in Mumbai, India.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Cyber-I Consultancy Services",
    description: "Explore Cyber-I’s multidisciplinary approach to strengthening investigations, improving organisational resilience and building technical capability.",
    type: "website",
    url: "/about",
  },
};

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  };

  return (
    <main className="relative z-20 py-4 sm:py-6" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <AboutHero />
      <IdentityFramework />
      <MissionVision />
      <CompanyTimeline />
      <ExpertiseMatrix />
      <OperatingPrinciples />
      <LeadershipSection />
      <InstitutionalExperience />
      <AudienceNavigator />
      <DualPathCTA />
      <FinalContactCTA />
    </main>
  );
}
