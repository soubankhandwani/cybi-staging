import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/editorial-content";
import { BlogCard, EditorialHero, FinalCTA, OutlineLink, SectionLabel, TextLink } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = { title: "Insights | Cyber-I", description: "Practical field notes on cyber investigation, digital forensics, security readiness, cyber law, risk, and professional learning." };

const categories = ["All insights", "Digital forensics", "Cyber investigation", "Training", "Risk & advisory"];

export default function BlogPage() {
  const [featured, ...recent] = blogPosts;
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Insights / Field notes" index="10" title={<>Useful thinking for <span className="text-command-blue dark:text-electric-blue">decisive</span> moments.</>} description="Practical perspectives on investigation, evidence, security, and learning—written to help professionals ask better questions and take responsible next steps." actions={<><TextLink href="#featured">Read featured insight</TextLink><OutlineLink href="/services">Explore services</OutlineLink></>} />

      <nav aria-label="Insight categories" className="border-x border-b border-deep-navy"><div className="flex overflow-x-auto">{categories.map((category, index) => <span key={category} className={`whitespace-nowrap border-r border-deep-navy px-5 py-4 text-[10px] font-bold tracking-[0.14em] uppercase ${index === 0 ? "bg-midnight text-electric-blue" : "text-steel dark:text-mist-blue"}`}>{category}</span>)}</div></nav>

      <section id="featured" className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 03">Featured analysis</SectionLabel>
        <div className="mt-8"><BlogCard post={featured} featured /></div>
      </section>

      <section className="border-x border-b border-deep-navy px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel index="02 / 03">Recent field notes</SectionLabel>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">{recent.map((post) => <BlogCard key={post.slug} post={post} />)}</div>
      </section>

      <section className="border-x border-b border-deep-navy bg-ice-gray/50 px-5 py-12 dark:bg-midnight sm:px-8 lg:px-12"><div className="grid gap-8 md:grid-cols-[1fr_2fr] md:items-center"><div><p className="text-[10px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">Reader pathways</p><h2 className="mt-4 text-2xl font-bold tracking-[-0.04em] uppercase">Turn insight into action.</h2></div><div className="grid gap-px border border-deep-navy bg-deep-navy sm:grid-cols-2"><Link href="/services" className="group flex items-center justify-between bg-intelligence-white p-5 text-xs font-bold tracking-widest uppercase hover:bg-electric-blue dark:bg-obsidian dark:hover:bg-command-blue">For organizations <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link><Link href="/courses" className="group flex items-center justify-between bg-intelligence-white p-5 text-xs font-bold tracking-widest uppercase hover:bg-electric-blue dark:bg-obsidian dark:hover:bg-command-blue">For learners <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div></div></section>
      <FinalCTA eyebrow="Need context for a real situation?" title="Move from a general question to a structured next step." description="Discuss an investigation, evidence, security, or training requirement with the Cyber-I team." />
    </main>
  );
}
