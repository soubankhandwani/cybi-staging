import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";

export function ForensicsService() {
  const evidenceTypes = ["Computers", "Email activity", "Internet activity", "Storage devices", "Smartphones", "File activity"];
  return (
    <section id="digital-forensics" className="scroll-mt-24 border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="forensics-title">
      <div className="grid lg:grid-cols-[1fr_42%]">
        <div className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>02 / Digital Forensics</AboutLabel>
          <h2 id="forensics-title" className="mt-8 max-w-4xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Evidence needs disciplined handling before it can support a finding.</h2>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-deep-navy dark:text-mist-blue">Digital forensics focuses on identifying, preserving, collecting, examining, analyzing and interpreting digital evidence. Investigation asks the broader questions around the incident; forensic work examines the digital material relevant to those questions.</p>
          <div className="mt-10 grid border-t border-l border-deep-navy sm:grid-cols-3">
            {evidenceTypes.map((item, index) => <div key={item} className="service-reveal min-h-28 border-r border-b border-deep-navy p-5"><span className="text-[9px] font-bold text-command-blue dark:text-electric-blue">E-{String(index + 1).padStart(2, "0")}</span><p className="mt-5 text-xs font-bold uppercase">{item}</p></div>)}
          </div>
          <ActionLink href="/services/digital-forensics" event="service_forensics_explore" className="mt-9">Explore Digital Forensics</ActionLink>
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
          <p className="mt-7 text-[9px] leading-5 font-bold tracking-[0.12em] text-steel uppercase">Current EnCase usage and tool credentials require verification before publication.</p>
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
          <AboutLabel>03 / Cyber / IT Security</AboutLabel>
          <h2 id="security-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Find the gaps before choosing the response.</h2>
          <ActionLink href="/services/cyber-it-security" variant="outline" event="service_security_explore" className="mt-9">Explore Cyber / IT Security</ActionLink>
        </header>
        <div className="p-7 sm:p-10 lg:p-12">
          <p className="max-w-3xl text-lg leading-8 font-bold">Cyber-I’s source-supported security proposition is the evaluation of information technology and information-security architecture to identify security gaps.</p>
          <div className="mt-10 space-y-7">
            {[
              ["Architecture review", "Examine the current IT and information-security environment."],
              ["Gap identification", "Identify areas where the current security posture requires attention."],
              ["Standards-based assessment", "Evaluate the environment against relevant standards, subject to confirmed scope."],
              ["Recommendations", "Communicate practical security observations and recommended next steps."],
            ].map(([title, description], index) => (
              <article key={title} className="service-reveal grid gap-3 border-t border-deep-navy pt-5 sm:grid-cols-[60px_0.55fr_1fr]">
                <span className="text-[9px] font-bold text-command-blue">S-0{index + 1}</span><h3 className="text-sm font-bold uppercase">{title}</h3><p className="text-xs leading-6 text-steel">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 border-l-2 border-command-blue pl-5 text-[9px] leading-5 font-bold tracking-[0.11em] text-steel uppercase">Specific frameworks, certifications, penetration testing, SOC, VAPT or red-team capabilities are not stated in the supplied source and are not claimed here.</p>
        </div>
      </div>
    </section>
  );
}
