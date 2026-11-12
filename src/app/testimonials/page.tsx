import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { demoTestimonials } from "@/data/editorial-content";
import { EditorialHero, FinalCTA, OutlineLink, SectionLabel, TextLink } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = { title: "Testimonials | Cyber-I", description: "Placeholder proof layouts for Cyber-I client, learner, and training-partner testimonials.", robots: { index: false } };

export default function TestimonialsPage() {
  const [featured, ...others] = demoTestimonials;
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Testimonials / Proof" index="07" title={<>Confidence, built through <span className="text-command-blue dark:text-electric-blue">experience.</span></>} description="A production-ready proof system for client, learner, and partner perspectives. All current quotes are explicit placeholders awaiting verified attribution." actions={<><TextLink href="#proof-index">Review perspectives</TextLink><OutlineLink href="/clients">View clients</OutlineLink></>} />

      <section id="proof-index" className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 03">Featured perspective</SectionLabel>
        <article className="mt-8 grid border border-deep-navy bg-midnight text-intelligence-white lg:grid-cols-[14rem_1fr]">
          <div className="technical-grid border-b border-mist-blue/30 p-6 lg:border-r lg:border-b-0 lg:p-8"><Quote className="h-12 w-12 text-electric-blue" aria-hidden="true" /><p className="mt-20 text-[10px] font-bold tracking-widest text-mist-blue uppercase">{featured.code}</p><span className="mt-3 inline-block border border-electric-blue px-2 py-1 text-[9px] font-bold tracking-widest text-electric-blue uppercase">Not verified</span></div>
          <div className="p-6 sm:p-10 lg:p-14"><p className="text-2xl leading-[1.35] font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl">“{featured.quote}”</p><div className="mt-12 border-t border-mist-blue/30 pt-5"><p className="font-bold uppercase">{featured.name}</p><p className="mt-1 text-[10px] tracking-wider text-mist-blue uppercase">{featured.role}</p></div></div>
        </article>
      </section>

      <section className="border-x border-b border-deep-navy px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel index="02 / 03">More perspectives</SectionLabel>
        <div className="mt-8 grid gap-px border border-deep-navy bg-deep-navy lg:grid-cols-2">
          {others.map((item, index) => <article key={item.code} className="flex min-h-[30rem] flex-col justify-between bg-intelligence-white p-6 dark:bg-obsidian sm:p-9"><div><div className="flex items-center justify-between text-[9px] font-bold tracking-widest uppercase"><span className="text-command-blue dark:text-electric-blue">{item.type}</span><span className="text-steel">0{index + 2}</span></div><Quote className="mt-12 h-7 w-7 text-signal-blue" /><p className="mt-8 text-xl leading-8 font-bold tracking-[-0.025em] sm:text-2xl">“{item.quote}”</p></div><div className="mt-12 border-t border-ice-gray pt-5 dark:border-deep-navy"><p className="text-sm font-bold uppercase">{item.name}</p><p className="mt-2 text-[10px] leading-5 tracking-wider text-steel uppercase dark:text-mist-blue">{item.role}</p><span className="mt-4 inline-block bg-ice-gray px-2 py-1 text-[9px] font-bold tracking-widest text-deep-navy uppercase">Placeholder content</span></div></article>)}
        </div>
      </section>

      <section className="border-x border-b border-deep-navy bg-ice-gray/50 px-5 py-12 dark:bg-midnight sm:px-8 lg:px-12"><div className="grid gap-6 md:grid-cols-[1fr_2fr]"><p className="text-[10px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">Proof standard</p><p className="max-w-3xl text-lg leading-8 font-bold">Before publication, each quote should be approved, attributed to a real person, and connected to a specific engagement or learning outcome.</p></div></section>
      <FinalCTA eyebrow="Choose your path" title="Serious work starts with a clear conversation." description="Explore Cyber-I’s organizational services or find a practical learning programme aligned with your goals." primaryLabel="Explore services" primaryHref="/services" secondaryHref="/courses" secondaryLabel="Explore courses" />
    </main>
  );
}
