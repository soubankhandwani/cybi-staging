import { AboutLabel } from "@/components/about/AboutPrimitives";
import { incidentSignals, investigationCapabilities } from "@/components/service-detail/cyber-crime-content";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";

export function ProblemRecognition() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="need-title">
      <div className="grid lg:grid-cols-[34%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>01 / Recognition</AboutLabel>
          <h2 id="need-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">When an incident needs investigation.</h2>
          <p className="mt-6 text-sm leading-7 text-deep-navy dark:text-mist-blue">You may recognize the situation before you know the technical service name.</p>
        </header>
        <ol className="grid sm:grid-cols-2">
          {incidentSignals.map(([number, title, description]) => (
            <li key={number} className="service-detail-reveal min-h-48 border-b border-deep-navy p-6 even:sm:border-l sm:p-8 sm:[&:nth-last-child(-n+2)]:border-b-0">
              <span className="text-[9px] font-bold text-command-blue dark:text-electric-blue">{number}</span>
              <h3 className="mt-7 text-lg font-bold uppercase">{title}</h3>
              <p className="mt-4 text-xs leading-6 text-steel dark:text-mist-blue">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CapabilityBreakdown() {
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="capability-title">
      <header className="grid border-b border-deep-navy lg:grid-cols-[1fr_0.7fr]">
        <div className="p-7 sm:p-10 lg:border-r lg:p-12">
          <AboutLabel>02 / Investigation capability</AboutLabel>
          <h2 id="capability-title" className="mt-8 max-w-4xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">A connected investigation system.</h2>
        </div>
        <div className="border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:p-12">
          <p className="text-sm leading-7 text-deep-navy">The capability is organized around the investigation question—not a generic checklist of security services.</p>
          <div className="mt-6 flex items-center gap-3 text-[9px] font-bold tracking-[0.1em] text-command-blue uppercase"><span>Matter</span><span>→</span><span>Evidence</span><span>→</span><span>Findings</span></div>
        </div>
      </header>
      <div className="grid lg:grid-cols-[1fr_0.72fr]">
        <ol>
          {investigationCapabilities.map((capability) => (
            <li key={capability.number} className="service-detail-reveal grid border-b border-deep-navy last:border-b-0 sm:grid-cols-[70px_0.8fr_1fr]">
              <span className="border-b border-deep-navy p-6 text-[10px] font-bold text-command-blue sm:border-r sm:border-b-0 sm:p-7">{capability.number}</span>
              <div className="border-b border-deep-navy p-6 sm:border-r sm:border-b-0 sm:p-7"><h3 className="text-lg font-bold uppercase">{capability.title}</h3><p className="mt-4 text-xs leading-6 text-steel">{capability.description}</p></div>
              <ul className="p-6 text-[10px] leading-6 font-bold tracking-[0.08em] text-deep-navy uppercase sm:p-7">{capability.items.map((item) => <li key={item} className="border-t border-mist-blue py-2 first:border-t-0">{item}</li>)}</ul>
            </li>
          ))}
        </ol>
        <aside className="border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <EditorialImagePlaceholder
            code="INV / EVIDENCE_RELATION / 02"
            subject="Recommended subject: authentic device, document and evidence relationship photograph from an approved Cyber-I setting."
            altDraft="Digital devices and evidence documentation arranged for cybercrime investigation review."
            className="service-detail-media-reveal aspect-[4/5] min-h-0 bg-intelligence-white lg:sticky lg:top-28"
          />
        </aside>
      </div>
    </section>
  );
}
