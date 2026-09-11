import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { ServiceDetailHero } from "@/components/service-detail/ServiceDetailHero";
import { AudienceAndUseCases, InvestigationExpertise } from "@/components/service-detail/ExpertiseAndQualification";
import { CapabilityBreakdown, ProblemRecognition } from "@/components/service-detail/ProblemAndCapabilities";
import { InvestigationProcess, UnderstandingAndDeliverables } from "@/components/service-detail/ProcessAndOutcomes";
import { InvestigationProof, ServiceConversionAndRelated, ServiceFAQ } from "@/components/service-detail/ProofFaqCTA";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [{ slug: "cyber-crime-investigation" }];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== "cyber-crime-investigation") return { title: "Service Details | Cyber-I Consultancy" };
  return {
    title: "Cyber Crime Investigation Services | Cyber-I Consultancy",
    description: "Explore Cyber-I's cybercrime investigation capabilities for fraud, hacking, data theft, Business Email Compromise and other technology-assisted incidents.",
    alternates: { canonical: "/services/cyber-crime-investigation" },
    openGraph: {
      title: "Cyber Crime Investigation | Cyber-I Consultancy",
      description: "Understand incidents, identify relevant digital evidence and establish supported findings with Cyber-I's investigation capability.",
      type: "website",
      url: "/services/cyber-crime-investigation",
    },
  };
}

export default async function ServiceDetailsPage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (slug !== "cyber-crime-investigation") return <PagePlaceholder eyebrow="Services" title="Service Details" />;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
      { "@type": "ListItem", position: 3, name: "Cyber Crime Investigation", item: "/services/cyber-crime-investigation" },
    ],
  };

  return (
    <main className="relative z-20 py-4 sm:py-6" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ServiceDetailHero />
      <ProblemRecognition />
      <CapabilityBreakdown />
      <InvestigationProcess />
      <UnderstandingAndDeliverables />
      <InvestigationExpertise />
      <AudienceAndUseCases />
      <InvestigationProof />
      <ServiceFAQ />
      <ServiceConversionAndRelated />
    </main>
  );
}
