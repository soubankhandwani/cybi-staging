import { AboutLabel, CornerMarks } from "@/components/about/AboutPrimitives";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function InvestigationExpertise() {
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="expertise-detail-title">
      <div className="grid lg:grid-cols-[1fr_40%]">
        <article className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>06 / Relevant expertise</AboutLabel>
          <h2 id="expertise-detail-title" className="mt-8 max-w-4xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Investigation requires technical and procedural context.</h2>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-deep-navy">Our approach combines digital analysis and evidence examination with an understanding of investigative and legal procedures.</p>
          <div className="mt-10 grid gap-0 border-t border-l border-deep-navy sm:grid-cols-2">
            {["Operational investigation context", "Digital forensic expertise", "Technical + legal understanding", "Evidence-oriented work"].map((item, index) => <div key={item} className="service-detail-reveal min-h-28 border-r border-b border-deep-navy p-5"><span className="text-[9px] font-bold text-command-blue">0{index + 1}</span><p className="mt-5 text-xs font-bold uppercase">{item}</p></div>)}
          </div>
        </article>
        <aside className="relative overflow-hidden border-t border-deep-navy bg-midnight p-7 text-intelligence-white sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <TechnicalGrid large className="opacity-20" />
          <CornerMarks />
          <div className="relative">
            <EditorialImagePlaceholder
              code="PROFILE / INV_SPECIALIST / 01"
              subject="Required subject: verified Cyber-I investigation specialist portrait in a professional environment."
              altDraft="Portrait of [verified name], Cyber-I cybercrime investigation specialist."
              inverse
              className="service-detail-media-reveal aspect-[4/5] min-h-0"
            />
            <h3 className="mt-7 text-xl font-bold uppercase">[Service expert profile required]</h3>
            <p className="mt-3 text-[9px] leading-5 font-bold tracking-[0.12em] text-mist-blue uppercase">Name / Role / Investigation background / Verified credentials</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function AudienceAndUseCases() {
  const audiences = ["Corporate organisations", "Government departments", "Law enforcement", "Legal professionals", "Financial institutions", "Educational institutions"];
  const useCases = ["Online financial fraud", "Business Email Compromise", "Data theft", "Hacking and intrusion", "Phishing and extortion", "Digital impersonation"];

  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="audience-detail-title">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <article className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>07 / Who it is for</AboutLabel>
          <h2 id="audience-detail-title" className="mt-8 text-3xl leading-none font-bold tracking-[-0.045em] uppercase sm:text-4xl">Relevant across different responsibilities.</h2>
          <ul className="mt-8 border-t border-deep-navy">{audiences.map((audience, index) => <li key={audience} className="grid grid-cols-[42px_1fr] border-b border-deep-navy py-4 text-xs font-bold uppercase"><span className="text-command-blue dark:text-electric-blue">0{index + 1}</span><span>{audience}</span></li>)}</ul>
        </article>
        <article className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>08 / Investigation contexts</AboutLabel>
          <h2 className="mt-8 text-3xl leading-none font-bold tracking-[-0.045em] uppercase sm:text-4xl">Examples of technology-enabled incidents.</h2>
          <div className="mt-8 grid border-t border-l border-deep-navy sm:grid-cols-2 lg:grid-cols-3">{useCases.map((useCase, index) => <div key={useCase} className="service-detail-reveal min-h-32 border-r border-b border-deep-navy p-5"><span className="text-[9px] font-bold text-command-blue dark:text-electric-blue">C-{String(index + 1).padStart(2, "0")}</span><h3 className="mt-5 text-xs font-bold uppercase">{useCase}</h3></div>)}</div>
        </article>
      </div>
    </section>
  );
}
