import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { experienceGroups } from "@/components/about/about-content";
import { faqItems } from "@/components/service-detail/cyber-crime-content";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function InvestigationProof() {
  const relevantGroups = experienceGroups.slice(0, 2);
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="proof-detail-title">
      <header className="grid border-b border-deep-navy lg:grid-cols-[1fr_0.72fr]">
        <div className="p-7 sm:p-10 lg:border-r lg:p-12"><AboutLabel>09 / Institutional context</AboutLabel><h2 id="proof-detail-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Relevant experience named in the legacy record.</h2></div>
        <div className="border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:p-12"><p className="text-sm leading-7 text-deep-navy">The exact nature of every relationship must be confirmed. These names are presented as neutral institutional context, not endorsements.</p><p className="mt-4 text-[9px] font-bold tracking-[0.11em] text-command-blue uppercase">[Relationship classification required]</p></div>
      </header>
      <div className="grid lg:grid-cols-[1fr_0.72fr]">
        <div className="grid sm:grid-cols-2">
          {relevantGroups.map((group) => <article key={group.code} className="border-b border-deep-navy p-7 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 sm:p-9"><h3 className="text-[9px] leading-5 font-bold tracking-[0.12em] text-command-blue uppercase">{group.code}</h3><p className="mt-7 text-sm leading-8 font-bold">{group.organizations.join(" / ")}</p><p className="mt-5 text-[8px] leading-4 font-bold tracking-[0.1em] text-steel uppercase">Relationship type requires verification</p></article>)}
        </div>
        <div className="border-t border-deep-navy p-7 sm:p-9 lg:border-t-0 lg:border-l">
          <EditorialImagePlaceholder
            code="INST / INVESTIGATION_CONTEXT / 09"
            subject="Recommended subject: approved photograph from a relevant institutional investigation or training engagement."
            altDraft="Cyber-I specialists participating in an approved institutional cyber investigation program."
            className="service-detail-media-reveal aspect-[16/11] min-h-0 bg-intelligence-white"
          />
        </div>
      </div>
    </section>
  );
}

export function ServiceFAQ() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="faq-detail-title">
      <div className="grid lg:grid-cols-[34%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12"><AboutLabel>10 / Before you enquire</AboutLabel><h2 id="faq-detail-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Practical questions.</h2></header>
        <div>
          {faqItems.map((item, index) => (
            <details key={item.question} className="group border-b border-deep-navy last:border-b-0">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-5 p-6 text-sm font-bold uppercase focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-electric-blue sm:p-8"><span><span className="mr-5 text-[9px] text-command-blue dark:text-electric-blue">{String(index + 1).padStart(2, "0")}</span>{item.question}</span><Plus aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" /></summary>
              <p className="max-w-3xl px-6 pb-7 text-sm leading-7 text-steel dark:text-mist-blue sm:px-8 sm:pb-8">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceConversionAndRelated() {
  const related = [
    ["Digital Forensics", "/services/digital-forensics", "Examine digital evidence relevant to an incident."],
    ["Cyber Law & Digital Evidence", "/services/cyber-law-digital-evidence", "Understand technical evidence within legal and procedural context."],
  ] as const;

  return (
    <>
      <section className="relative overflow-hidden border-x border-b border-deep-navy bg-obsidian p-7 text-intelligence-white sm:p-10 lg:p-12" aria-labelledby="conversion-detail-title">
        <TechnicalGrid large className="opacity-20" />
        <div className="relative grid min-h-[440px] gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><AboutLabel inverse>11 / Discuss the matter</AboutLabel><h2 id="conversion-detail-title" className="mt-9 max-w-5xl text-[clamp(2.9rem,6.4vw,7rem)] leading-[0.91] font-bold tracking-[-0.065em] uppercase">Start with the incident. Establish the right next step.</h2><p className="mt-8 max-w-2xl text-sm leading-7 text-mist-blue">Provide a brief, non-sensitive summary through the contact page. Cyber-I can then determine the relevant discussion and service pathway.</p></div>
          <ActionLink href="/contact" variant="light" event="service_primary_cta_click">Discuss an Incident</ActionLink>
        </div>
      </section>
      <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="related-title">
        <div className="grid lg:grid-cols-[34%_1fr]"><header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12"><AboutLabel>12 / Adjacent capability</AboutLabel><h2 id="related-title" className="mt-8 text-3xl font-bold tracking-[-0.045em] uppercase sm:text-4xl">Related services.</h2></header><div className="grid sm:grid-cols-2">{related.map(([title, href, description]) => <Link key={href} href={href} data-event="service_related_service_click" className="group min-h-56 border-b border-deep-navy p-7 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0 sm:p-9"><div className="flex items-start justify-between gap-6"><h3 className="text-xl font-bold uppercase">{title}</h3><ArrowUpRight aria-hidden="true" className="h-5 w-5 text-command-blue transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-electric-blue" /></div><p className="mt-7 max-w-sm text-xs leading-6 text-steel dark:text-mist-blue">{description}</p></Link>)}</div></div>
      </section>
    </>
  );
}
