import { serviceDescriptions } from "@/data/site-content";
import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function InvestigationService() {
  return (
    <section id="cyber-crime-investigation" className="scroll-mt-24 border-x border-b border-deep-navy bg-obsidian text-intelligence-white" aria-labelledby="investigation-title">
      <div className="grid lg:grid-cols-[38%_1fr]">
        <header className="relative overflow-hidden border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <TechnicalGrid large className="opacity-20" />
          <div className="relative lg:sticky lg:top-28">
            <AboutLabel inverse>01 / Primary capability</AboutLabel>
            <h2 id="investigation-title" className="mt-8 text-4xl leading-[0.95] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Cybercrime Investigation</h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-mist-blue">{serviceDescriptions.investigation}</p>
            <ActionLink href="/services/cyber-crime-investigation" variant="light" event="service_investigation_explore" className="mt-9">Explore Cybercrime Investigation</ActionLink>
            <EditorialImagePlaceholder
              code="INV / FIELD_RECORD / 01"
              subject="Recommended subject: a real Cyber-I investigator reviewing digital evidence in a controlled workspace."
              altDraft="Cyber-I investigator reviewing digital evidence during an examination."
              inverse
              className="mt-12 aspect-[4/3] min-h-0"
            />
          </div>
        </header>
        <div>
          <article className="service-reveal border-b border-deep-navy p-7 sm:p-10">
            <p className="text-[10px] font-bold tracking-[0.15em] text-electric-blue uppercase">When the matter may involve</p>
            <div className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {["Online and financial fraud", "Data theft and business fraud", "Hacking and computer intrusion", "Business Email Compromise", "Phishing and technology-assisted fraud", "Extortion and false digital identities"].map((item) => <p key={item} className="border-t border-deep-navy pt-4 text-sm font-bold">{item}</p>)}
            </div>
          </article>
          <div className="grid md:grid-cols-2">
            <article className="service-reveal border-b border-deep-navy p-7 sm:p-10 md:border-r md:border-b-0">
              <h3 className="text-xl font-bold uppercase">Evidence and examination</h3>
              <ul className="mt-6 space-y-3 text-xs leading-6 text-mist-blue">
                <li>Digital evidence identification, preservation and collection</li>
                <li>Internet activity and email examination</li>
                <li>Smartphone-related evidence examination</li>
              </ul>
            </article>
            <article className="service-reveal p-7 sm:p-10">
              <h3 className="text-xl font-bold uppercase">Findings and next steps</h3>
              <ul className="mt-6 space-y-3 text-xs leading-6 text-mist-blue">
                <li>Evidence analysis in the context of the incident</li>
                <li>Investigation reporting</li>
                <li>Preparation of evidence for legal proceedings</li>
              </ul>
            </article>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 border-t border-electric-blue/30 p-6 text-[8px] font-bold tracking-[0.08em] uppercase sm:p-8 sm:text-[10px]">
            <span>Understand</span><span className="text-electric-blue">→</span><span>Identify</span><span className="text-electric-blue">→</span><span>Establish</span><span className="text-electric-blue">→</span><span className="text-electric-blue">Act</span>
          </div>
        </div>
      </div>
    </section>
  );
}
