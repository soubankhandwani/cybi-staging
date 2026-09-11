import type { Metadata } from "next";
import { Building2, Landmark, Scale, School, ShieldCheck } from "lucide-react";
import { demoClients } from "@/data/editorial-content";
import { EditorialHero, FinalCTA, OutlineLink, SectionLabel, TextLink } from "@/components/editorial/PagePrimitives";

export const metadata: Metadata = { title: "Clients & Institutional Experience | Cyber-I", description: "Cyber-I capability for government, law enforcement, financial, legal, education, and enterprise environments." };

const sectors = [
  { icon: Landmark, title: "Government & public sector", text: "Investigation, awareness, and capacity-building contexts that require controlled handling and clear accountability." },
  { icon: ShieldCheck, title: "Law enforcement", text: "Digital evidence, cybercrime investigation, and practical training aligned with operational realities." },
  { icon: Building2, title: "Enterprise & finance", text: "Security assessment, incident investigation, and intelligence-led support for business stakeholders." },
  { icon: Scale, title: "Legal professionals", text: "Technical context around cyber law, digital evidence, and technology-enabled disputes." },
  { icon: School, title: "Education & training", text: "Applied learning for institutions, professionals, and emerging investigators." },
];

export default function ClientsPage() {
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Clients / Institutional experience" index="08" title={<>Capability for <span className="text-command-blue dark:text-electric-blue">serious</span> environments.</>} description="Cyber-I supports organizations where evidence, security, professional judgment, and confidentiality matter. The demo logo wall below is a layout preview, not a claim of endorsement." actions={<><TextLink href="/contact">Discuss your requirement</TextLink><OutlineLink href="#sectors">Sectors served</OutlineLink></>} />

      <section className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 03">Relationship index</SectionLabel>
        <div className="mt-8 border border-command-blue bg-command-blue p-3 text-center text-[10px] font-bold tracking-[0.16em] text-intelligence-white uppercase">Demo client marks · Replace only with verified, approved relationships before publication</div>
        <div className="grid gap-px border-x border-b border-deep-navy bg-deep-navy sm:grid-cols-2 lg:grid-cols-4">
          {demoClients.map((client, index) => <div key={client.name} className="group flex min-h-56 flex-col justify-between bg-intelligence-white p-5 transition-colors hover:bg-ice-gray dark:bg-obsidian dark:hover:bg-midnight"><div className="flex items-start justify-between"><span className="grid h-14 w-14 place-items-center border-2 border-deep-navy text-xl font-bold text-command-blue dark:border-mist-blue dark:text-electric-blue">{client.mark}</span><span className="text-[9px] font-bold tracking-widest text-steel">0{index + 1}</span></div><div><h2 className="text-sm font-bold uppercase">{client.name}</h2><p className="mt-2 text-[9px] tracking-widest text-steel uppercase dark:text-mist-blue">{client.sector}</p></div></div>)}
        </div>
      </section>

      <section id="sectors" className="border-x border-b border-deep-navy px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel index="02 / 03">Sectors served</SectionLabel>
        <div className="mt-8 divide-y divide-deep-navy border-y border-deep-navy">
          {sectors.map((sector, index) => { const Icon = sector.icon; return <article key={sector.title} className="grid gap-5 py-7 md:grid-cols-[5rem_1fr_1fr] md:items-center"><div className="flex items-center gap-4"><span className="text-[10px] font-bold text-steel">0{index + 1}</span><Icon className="h-5 w-5 text-command-blue dark:text-electric-blue" /></div><h2 className="text-xl font-bold tracking-[-0.03em] uppercase sm:text-2xl">{sector.title}</h2><p className="text-sm leading-6 text-steel dark:text-mist-blue">{sector.text}</p></article>; })}
        </div>
      </section>

      <section className="border-x border-b border-deep-navy bg-ice-gray/50 px-5 py-14 dark:bg-midnight sm:px-8 lg:px-12"><div className="grid gap-8 lg:grid-cols-[1fr_2fr]"><p className="text-[10px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">How we engage</p><div className="grid gap-px border border-deep-navy bg-deep-navy sm:grid-cols-3">{[["01","Clarify","Define the question, scope, stakeholders, and handling requirements."],["02","Structure","Set the work plan, communication path, and appropriate controls."],["03","Deliver","Provide clear findings, practical outputs, and responsible next steps."]].map(([n,t,d]) => <div key={n} className="bg-intelligence-white p-5 dark:bg-obsidian"><span className="text-3xl font-bold text-ice-gray dark:text-deep-navy">{n}</span><h3 className="mt-8 font-bold uppercase">{t}</h3><p className="mt-3 text-xs leading-5 text-steel dark:text-mist-blue">{d}</p></div>)}</div></div></section>
      <FinalCTA eyebrow="A precise starting point" title="Bring us the requirement. We’ll help structure the next step." description="Share the situation at a high level. Avoid sending passwords or sensitive evidence through the general contact form." />
    </main>
  );
}
