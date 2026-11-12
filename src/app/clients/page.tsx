import type { Metadata } from "next";
import { IndustryIcon } from "@/components/ui/SiteIcon";
import { industries } from "@/data/industries";
import { EditorialHero, FinalCTA, OutlineLink, SectionLabel, TextLink } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = { title: "Clients & Institutional Experience | Cyber-I", description: "Cyber-I capability for government, law enforcement, financial, legal, education, and enterprise environments." };

export default function ClientsPage() {
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Clients / Institutional experience" index="08" title={<>Organisations We Have <span className="text-command-blue dark:text-electric-blue">Worked With</span></>} description="We are privileged to have collaborated with organisations across law enforcement, government, financial services, corporate sectors, educational institutions, and legal practice." actions={<><TextLink href="/contact">Discuss your requirement</TextLink><OutlineLink href="#sectors">Sectors served</OutlineLink></>} />

      <section className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 03">Client organisations</SectionLabel>
        <p className="mt-8 border border-deep-navy p-6 text-sm text-steel dark:text-mist-blue">Client profiles will be added as they become available.</p>
      </section>

      <section id="sectors" className="border-x border-b border-deep-navy px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel index="02 / 03">Sectors served</SectionLabel>
        <div className="mt-8 divide-y divide-deep-navy border-y border-deep-navy">
          {industries.map((sector) => (
            <article key={sector.id} className="grid gap-5 py-7 md:grid-cols-[5rem_1fr_1fr] md:items-center">
              <IndustryIcon name={sector.icon} className="h-5 w-5 text-command-blue dark:text-electric-blue" />
              <h2 className="text-xl font-bold tracking-[-0.03em] uppercase sm:text-2xl">{sector.name}</h2>
              <p className="text-sm leading-6 text-steel dark:text-mist-blue">{sector.description[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-x border-b border-deep-navy bg-ice-gray/50 px-5 py-14 dark:bg-midnight sm:px-8 lg:px-12"><div className="grid gap-8 lg:grid-cols-[1fr_2fr]"><p className="text-[10px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">How we engage</p><div className="grid gap-px border border-deep-navy bg-deep-navy sm:grid-cols-3">{[["01","Clarify","Define the question, scope, stakeholders, and handling requirements."],["02","Structure","Set the work plan, communication path, and appropriate controls."],["03","Deliver","Provide clear findings, practical outputs, and responsible next steps."]].map(([n,t,d]) => <div key={n} className="bg-intelligence-white p-5 dark:bg-obsidian"><span className="text-3xl font-bold text-ice-gray dark:text-deep-navy">{n}</span><h3 className="mt-8 font-bold uppercase">{t}</h3><p className="mt-3 text-xs leading-5 text-steel dark:text-mist-blue">{d}</p></div>)}</div></div></section>
      <FinalCTA eyebrow="A precise starting point" title="Bring us the requirement. We’ll help structure the next step." description="Share the situation at a high level. Avoid sending passwords or sensitive evidence through the general contact form." />
    </main>
  );
}
