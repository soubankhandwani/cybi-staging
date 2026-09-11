import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { RevolutionSection } from "@/components/sections/RevolutionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { WhyCyberISection } from "@/components/sections/WhyCyberISection";

export default function HomePage() {
  return (
    <main>
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
