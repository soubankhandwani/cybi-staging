import type { Metadata } from "next";
import { BookOpen, BriefcaseBusiness, Handshake, LockKeyhole, MessageCircleWarning, MessageSquareText } from "lucide-react";
import { ContactForm } from "@/components/interactive/ContactForm";
import { EditorialHero, SectionLabel } from "@/components/editorial/PagePrimitives";
import { incidentWhatsAppUrl } from "@/data/site-content";

export const metadata: Metadata = { title: "Contact Cyber-I", description: "Contact Cyber-I about investigation, digital forensics, cybersecurity services, institutional training, courses, or partnerships." };

const paths = [
  { icon: BriefcaseBusiness, title: "Service or investigation", text: "Share the situation, desired outcome, and any timing constraints at a high level." },
  { icon: BookOpen, title: "Course or training", text: "Tell us the subject, learner profile, and whether you need individual or institutional learning." },
  { icon: Handshake, title: "Partnership", text: "Outline the organization, proposed collaboration, and the people the initiative should serve." },
  { icon: MessageSquareText, title: "General enquiry", text: "Use this route when you are unsure which team should respond." },
];

export default function ContactPage() {
  return (
    <main className="my-4 sm:my-6 md:my-8">
      <EditorialHero eyebrow="Contact / Secure starting point" index="09" title={<>Start with the <span className="text-command-blue dark:text-electric-blue">right signal.</span></>} description="Tell us what you need without sending sensitive evidence. The enquiry type helps route your message to the right area with minimal friction." actions={<a href={incidentWhatsAppUrl} target="_blank" rel="noreferrer" data-event="whatsapp_click" className="inline-flex min-h-11 items-center gap-2 border-2 border-electric-blue bg-electric-blue px-5 py-3 text-xs font-black tracking-[0.14em] text-obsidian uppercase shadow-[3px_3px_0_#23559c] transition-colors hover:bg-intelligence-white"><MessageCircleWarning className="h-4 w-4" aria-hidden="true" />Report an Incident</a>} />
      <section className="border-x border-b border-deep-navy p-5 sm:p-8 lg:p-12">
        <SectionLabel index="01 / 02">Enquiry routing</SectionLabel>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(30rem,1.15fr)]">
          <div>
            <h2 className="max-w-lg text-3xl leading-tight font-bold tracking-[-0.05em] uppercase sm:text-4xl">What would you like to discuss?</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-steel dark:text-mist-blue">Choose the closest enquiry type in the form. If the matter is sensitive, provide only enough context for the team to establish a safer follow-up path.</p>
            <div className="mt-10 divide-y divide-deep-navy border-y border-deep-navy">
              {paths.map((path) => { const Icon = path.icon; return <div key={path.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5"><Icon className="mt-0.5 h-5 w-5 text-command-blue dark:text-electric-blue" /><div><h3 className="text-sm font-bold uppercase">{path.title}</h3><p className="mt-2 text-xs leading-5 text-steel dark:text-mist-blue">{path.text}</p></div></div>; })}
            </div>
            <div className="mt-8 flex gap-4 border border-command-blue bg-ice-gray/60 p-4 dark:bg-midnight"><LockKeyhole className="h-5 w-5 shrink-0 text-command-blue dark:text-electric-blue" /><p className="text-[10px] leading-5 text-deep-navy dark:text-mist-blue"><strong className="uppercase">Sensitive matter?</strong><br />Do not include passwords, raw evidence, personal records, or confidential attachments. Use the form to request an appropriate contact method.</p></div>
          </div>
          <div className="border border-deep-navy bg-intelligence-white p-5 shadow-[6px_6px_0_#21375a] dark:bg-obsidian sm:p-8">
            <div className="mb-8 flex items-center justify-between border-b border-deep-navy pb-5"><div><p className="text-[9px] font-bold tracking-widest text-command-blue uppercase dark:text-electric-blue">General enquiry</p><h2 className="mt-2 text-xl font-bold uppercase">Send a message</h2></div><span className="text-[9px] font-bold tracking-widest text-steel uppercase">Required fields *</span></div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section className="border-x border-b border-deep-navy bg-midnight px-5 py-10 text-intelligence-white sm:px-8 lg:px-12"><div className="grid gap-6 sm:grid-cols-3">{[["01","We review","Your enquiry is routed according to the selected intent."],["02","We clarify","The team may request context or propose a suitable conversation."],["03","We structure","If there is a fit, the next step, scope, and handling route are made clear."]].map(([n,t,d]) => <div key={n} className="border-l border-electric-blue pl-4"><span className="text-[9px] font-bold tracking-widest text-electric-blue">{n}</span><h2 className="mt-3 text-sm font-bold uppercase">{t}</h2><p className="mt-2 text-[10px] leading-5 text-mist-blue">{d}</p></div>)}</div><p className="mt-10 border-t border-mist-blue/30 pt-4 text-[9px] leading-5 tracking-wider text-mist-blue uppercase">WhatsApp is an initial response channel only. Do not send passwords, raw evidence, personal records, or confidential attachments until Cyber-I confirms a secure handling route.</p></section>
    </main>
  );
}
