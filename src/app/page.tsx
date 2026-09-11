import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { RevolutionSection } from "@/components/sections/RevolutionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyCyberISection } from "@/components/sections/WhyCyberISection";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/cyber-i-site-icon-2026.png`,
    email: "help@cipherintegrity.io",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: "IN",
    knowsAbout: [
      "Cybercrime investigation",
      "Digital forensics",
      "Information analysis",
      "Cyber law",
      "Cybersecurity training",
      "Strategic risk advisory",
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ServicesSection />
      <WhyCyberISection />
      <TeamSection />
      <RevolutionSection />
      <IndustriesSection />
      <ContactSection />
    </main>
  );
}
