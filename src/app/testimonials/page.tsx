import type { Metadata } from "next";
import { EditorialHero, FinalCTA, OutlineLink, SectionLabel } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = {
  title: "What Our Partners Say | Cyber-I",
  description: "Perspectives from Cyber-I partners across investigations, training programmes and advisory engagements.",
  robots: { index: false },
};

export default function TestimonialsPage() {
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero
        eyebrow="Testimonials"
        index="07"
        title={<>What Our <span className="text-command-blue dark:text-electric-blue">Partners Say</span></>}
        description="At Cyber-I Consultancy Services, we value long-term relationships built on trust, professionalism, and measurable outcomes. Hear from organisations and professionals who have partnered with us across investigations, training programmes, and advisory engagements."
        actions={<OutlineLink href="/clients">View clients</OutlineLink>}
      />
      <section className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01">Partner testimonials</SectionLabel>
        <p className="mt-8 border border-deep-navy bg-midnight p-6 text-sm text-intelligence-white sm:p-10">Partner testimonials will be added as they become available.</p>
      </section>
      <FinalCTA eyebrow="Work with Cyber-I" title="Discuss your investigation, training or advisory needs." description="Explore Cyber-I’s services and professional learning programmes." primaryLabel="Explore services" primaryHref="/services" secondaryHref="/courses" secondaryLabel="Explore courses" />
    </main>
  );
}
