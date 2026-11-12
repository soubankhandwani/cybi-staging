import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function CyberLawService() {
  return (
    <section id="cyber-law-digital-evidence" className="scroll-mt-24 border-x border-b border-deep-navy bg-midnight text-intelligence-white" aria-labelledby="law-title">
      <div className="grid lg:grid-cols-[1fr_38%]">
        <div className="p-7 sm:p-10 lg:p-12">
          <AboutLabel inverse>04 / Cyber Law & Digital Evidence</AboutLabel>
          <h2 id="law-title" className="mt-8 max-w-5xl text-4xl leading-[0.95] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Technical evidence exists within a legal context.</h2>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-mist-blue">Cyber-I’s legacy material references practicing advocates and retired police officials providing consultation on cyber-law matters—creating a bridge between technical findings, investigative context and legal understanding.</p>
          <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-deep-navy py-6 text-[10px] font-bold tracking-[0.1em] uppercase">
            <span>Technical evidence</span><span className="text-electric-blue">→</span><span>Investigation</span><span className="text-electric-blue">→</span><span>Legal understanding</span>
          </div>
          <ActionLink href="/contact" variant="light" className="mt-9">Discuss cyber law and digital evidence</ActionLink>
        </div>
        <aside className="relative overflow-hidden border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <TechnicalGrid className="opacity-20" />
          <div className="relative">
            <h3 className="text-[10px] font-bold tracking-[0.15em] text-electric-blue uppercase">Source-supported themes</h3>
            <ul className="mt-8 space-y-0 border-t border-deep-navy">
              {["Cyber-law consultation", "Digital evidence guidance", "IT compliance", "Civil and criminal cybercrime matters", "Legal procedures relating to cybercrime", "Investigation-to-legal-process support"].map((item) => <li key={item} className="border-b border-deep-navy py-4 text-xs font-bold">{item}</li>)}
            </ul>
            <p className="mt-7 text-[9px] leading-5 font-bold tracking-[0.12em] text-mist-blue uppercase">No courtroom representation or specific legal outcome is implied. Exact legal services require verification.</p>
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
            <AboutLabel inverse>05A / Institutional training</AboutLabel>
            <h2 id="training-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Build capability across teams and institutions.</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-ice-gray">For law-enforcement, government, corporate and institutional training requirements in source-supported cyber investigation, digital forensics and cyber-law contexts.</p>
          </div>
          <div className="mt-10 flex flex-col items-start gap-5">
            <ActionLink href="/contact" variant="light" event="service_training_contact">Discuss a training requirement</ActionLink>
          </div>
        </article>
        <article className="flex min-h-[480px] flex-col justify-between bg-intelligence-white p-7 text-obsidian sm:p-10 lg:p-12">
          <div>
            <AboutLabel>05B / Individual learning</AboutLabel>
            <h3 className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Looking for a professional course?</h3>
            <p className="mt-7 max-w-xl text-sm leading-7 text-deep-navy">Cyber-I Academy organizes learning across cyber investigation, cyber forensics, cyber law and digital evidence.</p>
          </div>
          <ActionLink href="/courses" variant="outline" event="service_training_courses" className="mt-10 self-start">Explore Cyber-I Academy</ActionLink>
        </article>
      </div>
    </section>
  );
}
