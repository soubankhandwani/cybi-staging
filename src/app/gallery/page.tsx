import type { Metadata } from "next";
import Image from "next/image";
import { GalleryGrid } from "@/components/editorial/GalleryGrid";
import { EditorialHero, FinalCTA, OutlineLink, SectionLabel, TextLink } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = {
  title: "Gallery | Cyber-I",
  description: "A visual record of Cyber-I training, digital forensics, workshops, and institutional knowledge sessions.",
};

export default function GalleryPage() {
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Gallery / Visual evidence" index="06" title={<>Work in the <span className="text-command-blue dark:text-electric-blue">field.</span></>} description="A visual record of practical learning, evidence-focused workflows, and institutional knowledge exchange. Demo media is clearly marked for replacement before launch." actions={<><TextLink href="#gallery-index">Browse gallery</TextLink><OutlineLink href="/contact">Plan a session</OutlineLink></>} />

      <section className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 03">Featured field note</SectionLabel>
        <div className="mt-8 grid gap-0 border border-deep-navy bg-midnight text-intelligence-white lg:grid-cols-[1.45fr_1fr]">
          <div className="relative min-h-80 overflow-hidden lg:min-h-[36rem]">
            <Image src="/images/editorial/training-workshop.png" alt="Cyber investigation training workshop with an instructor and professional learners" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover grayscale" />
            <span className="absolute top-4 left-4 border border-intelligence-white/50 bg-obsidian/80 px-2 py-1 text-[9px] font-bold tracking-widest uppercase">Demo media</span>
          </div>
          <div className="flex flex-col justify-between border-t border-mist-blue/30 p-6 lg:border-t-0 lg:border-l lg:p-10">
            <div><p className="text-[10px] font-bold tracking-[0.2em] text-electric-blue uppercase">Training / Applied learning</p><h2 className="mt-8 text-3xl leading-[1.02] font-bold tracking-[-0.05em] uppercase sm:text-5xl">Investigation readiness becomes real through practice.</h2><p className="mt-6 text-sm leading-7 text-mist-blue">Scenario-led sessions can make evidence handling, escalation, and decision paths easier to understand before a real incident tests them.</p></div>
            <p className="mt-12 border-t border-mist-blue/30 pt-4 text-[10px] leading-5 tracking-wider text-mist-blue uppercase">Staging note: replace with an approved event photograph and verified caption.</p>
          </div>
        </div>
      </section>

      <section id="gallery-index" className="border-x border-b border-deep-navy px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel index="02 / 03">Media index</SectionLabel>
        <div className="mt-8"><GalleryGrid /></div>
      </section>

      <FinalCTA eyebrow="Bring practical learning to your team" title="Turn awareness into operational readiness." description="Discuss a workshop, institutional programme, or specialist training requirement with the Cyber-I team." primaryLabel="Discuss a training requirement" secondaryHref="/courses" secondaryLabel="Explore courses" />
    </main>
  );
}
