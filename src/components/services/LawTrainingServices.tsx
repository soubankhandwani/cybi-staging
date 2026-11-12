import { serviceDescriptions } from "@/data/site-content";
import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function CyberLawService() {
  return (
    <section id="cyber-law-digital-evidence" className="scroll-mt-24 border-x border-b border-deep-navy bg-midnight text-intelligence-white" aria-labelledby="law-title">
      <div className="grid lg:grid-cols-[1fr_38%]">
        <div className="p-7 sm:p-10 lg:p-12">
          <AboutLabel inverse>04 / Techno-Legal Consulting</AboutLabel>
          <h2 id="law-title" className="mt-8 max-w-5xl text-4xl leading-[0.95] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Technical evidence exists within a legal context.</h2>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-mist-blue">{serviceDescriptions.technoLegal}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-deep-navy py-6 text-[10px] font-bold tracking-[0.1em] uppercase">
            <span>Technical evidence</span><span className="text-electric-blue">→</span><span>Investigation</span><span className="text-electric-blue">→</span><span>Legal understanding</span>
          </div>
          <ActionLink href="/contact" variant="light" className="mt-9">Discuss cyber law and digital evidence</ActionLink>
        </div>
        <aside className="relative overflow-hidden border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <TechnicalGrid className="opacity-20" />
          <div className="relative">
            <h3 className="text-[10px] font-bold tracking-[0.15em] text-electric-blue uppercase">Consulting capabilities</h3>
            <ul className="mt-8 space-y-0 border-t border-deep-navy">
              {["Digital evidence authentication", "Forensic review", "Expert opinions", "Expert witness testimony", "Cyber law consultation"].map((item) => <li key={item} className="border-b border-deep-navy py-4 text-xs font-bold">{item}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function TrainingService() {
  return (
    <section id="institutional-training" className="scroll-mt-24 border-x border-b border-deep-navy bg-command-blue text-white" aria-labelledby="training-title">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <article className="flex min-h-[480px] flex-col justify-between border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <div>
            <AboutLabel inverse>05A / Training & Capacity Building</AboutLabel>
            <h2 id="training-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Build capability across teams and institutions.</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-ice-gray">{serviceDescriptions.training}</p>
          </div>
          <div className="mt-10 flex flex-col items-start gap-5">
            <ActionLink href="/contact" variant="light" event="service_training_contact">Discuss a training requirement</ActionLink>
          </div>
        </article>
        <article className="flex min-h-[480px] flex-col justify-between bg-intelligence-white p-7 text-obsidian sm:p-10 lg:p-12">
          <div>
            <AboutLabel>05B / Individual learning</AboutLabel>
            <h3 className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Looking for a professional course?</h3>
            <p className="mt-7 max-w-xl text-sm leading-7 text-deep-navy">Explore certification and capsule courses based on practical case studies and investigative scenarios.</p>
          </div>
          <ActionLink href="/courses" variant="outline" event="service_training_courses" className="mt-10 self-start">Explore Cyber-I Academy</ActionLink>
        </article>
      </div>
    </section>
  );
}

export function AdvisoryService() {
  return (
    <section id="cyber-advisory-services" className="scroll-mt-24 border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="advisory-title">
      <div className="grid lg:grid-cols-[38%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>06 / Advisory</AboutLabel>
          <h2 id="advisory-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Cyber Advisory Services</h2>
          <ActionLink href="/contact" variant="outline" className="mt-9">Discuss your advisory needs</ActionLink>
        </header>
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="max-w-3xl text-lg leading-8 font-bold">{serviceDescriptions.advisory}</p>
          <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
            {["Cyber risk", "Digital governance", "Incident response", "Organisational preparedness", "Investigative planning"].map((item) => (
              <li key={item} className="border-t border-deep-navy py-4 text-sm font-bold">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
