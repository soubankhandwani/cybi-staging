import { serviceDescriptions } from "@/data/site-content";
import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";

export function ForensicsService() {
  const evidenceTypes = ["Computers", "Mobile devices", "Cloud environments", "Networks", "Storage media", "IoT devices", "Emerging technologies"];
  return (
    <section id="digital-forensics" className="scroll-mt-24 border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="forensics-title">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_42%]">
        <div className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>02 / Digital Forensics</AboutLabel>
          <h2 id="forensics-title" className="mt-8 max-w-4xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Evidence needs disciplined handling before it can support a finding.</h2>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-deep-navy dark:text-mist-blue">{serviceDescriptions.forensics}</p>
          <div className="mt-10 grid border-t border-l border-deep-navy sm:grid-cols-3">
            {evidenceTypes.map((item, index) => <div key={item} className="service-reveal min-h-28 border-r border-b border-deep-navy p-5"><span className="text-[9px] font-bold text-command-blue dark:text-electric-blue">E-{String(index + 1).padStart(2, "0")}</span><p className="mt-5 text-xs font-bold uppercase">{item}</p></div>)}
          </div>
          <ActionLink href="/contact" className="mt-9">Discuss digital forensics</ActionLink>
        </div>
        <aside className="border-t border-deep-navy bg-ice-gray p-7 text-obsidian sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <p className="text-[10px] font-bold tracking-[0.15em] text-command-blue uppercase">Evidence ledger</p>
          <EditorialImagePlaceholder
            code="FRNSC / LAB_RECORD / 02"
            subject="Recommended subject: authentic forensic workstation, evidence media or examination environment without exposed sensitive data."
            altDraft="Digital forensic examination environment with evidence media prepared for analysis."
            className="mt-8 aspect-[4/3] min-h-0 bg-intelligence-white"
          />
          <ol className="mt-8 border-t border-deep-navy">
            {["Identify", "Preserve", "Collect", "Examine", "Analyze", "Report"].map((step, index) => <li key={step} className="grid grid-cols-[45px_1fr] border-b border-deep-navy py-5 text-sm font-bold uppercase"><span className="text-command-blue">0{index + 1}</span><span>{step}</span></li>)}
          </ol>
        </aside>
      </div>
    </section>
  );
}

export function SecurityService() {
  return (
    <section id="cyber-it-security" className="scroll-mt-24 border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="security-title">
      <div className="grid lg:grid-cols-[34%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>03 / Cybersecurity</AboutLabel>
          <h2 id="security-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Find the gaps before choosing the response.</h2>
          <ActionLink href="/contact" variant="outline" className="mt-9">Discuss cybersecurity</ActionLink>
        </header>
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="max-w-3xl text-lg leading-8 font-bold">{serviceDescriptions.cybersecurity}</p>
          <div className="mt-10 space-y-7">
            {[
              ["Architecture review", "Examine the current IT and information-security environment."],
              ["Gap identification", "Identify areas where the current security posture requires attention."],
              ["Security audits", "Assess controls and practices against the agreed scope."],
              ["Recommendations", "Communicate practical security observations and recommended next steps."],
            ].map(([title, description], index) => (
              <article key={title} className="service-reveal grid gap-3 border-t border-deep-navy pt-5 sm:grid-cols-[60px_0.55fr_1fr]">
                <span className="text-[9px] font-bold text-command-blue">S-0{index + 1}</span><h3 className="text-sm font-bold uppercase">{title}</h3><p className="text-xs leading-6 text-steel">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
