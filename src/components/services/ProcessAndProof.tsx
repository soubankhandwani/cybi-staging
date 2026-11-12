import { AboutLabel } from "@/components/about/AboutPrimitives";
import { differentiators, engagementSteps } from "@/components/services/service-content";
import { experienceGroups } from "@/components/about/about-content";

export function EngagementProcess() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="process-title">
      <header className="border-b border-deep-navy p-7 sm:p-10 lg:p-12">
        <AboutLabel>07 / Engagement model</AboutLabel>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 id="process-title" className="text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">A clear path from requirement to next step.</h2>
          <div><p className="text-sm leading-7 text-deep-navy dark:text-mist-blue">The scope and next steps depend on the type of assistance you need.</p></div>
        </div>
      </header>
      <ol className="grid md:grid-cols-4">
        {engagementSteps.map((step) => (
          <li key={step.number} className="service-reveal min-h-64 border-b border-deep-navy p-7 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 sm:p-8">
            <span className="text-xs font-bold text-command-blue dark:text-electric-blue">{step.number}</span>
            <h3 className="mt-12 text-xl font-bold uppercase">{step.title}</h3>
            <p className="mt-5 text-xs leading-6 text-steel dark:text-mist-blue">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function WhyAndProof() {
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="why-services-title">
      <div className="grid lg:grid-cols-[38%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <div className="lg:sticky lg:top-28">
            <AboutLabel>08 / Why Cyber-I</AboutLabel>
            <h2 id="why-services-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">The value is in the intersection.</h2>
            <p className="mt-7 text-sm leading-7 text-deep-navy">Investigation, evidence, security, legal context and professional training sit within one multidisciplinary positioning.</p>
          </div>
        </header>
        <ol>
          {differentiators.map(([number, title, description]) => (
            <li key={number} className="service-reveal grid border-b border-deep-navy last:border-b-0 p-6 sm:grid-cols-[55px_0.65fr_1fr] sm:p-8">
              <span className="text-[9px] font-bold text-command-blue">{number}</span><h3 className="mt-4 text-lg font-bold uppercase sm:mt-0 sm:pr-5">{title}</h3><p className="mt-4 text-xs leading-6 text-steel sm:mt-0">{description}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="border-t border-deep-navy">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
            <AboutLabel>09 / Sectors</AboutLabel>
            <h2 className="mt-8 text-3xl leading-none font-bold tracking-[-0.045em] uppercase sm:text-4xl">Organisations we work with.</h2>
            <p className="mt-6 text-xs leading-6 text-steel">Cyber-I supports public and private sector organisations.</p>
          </div>
          <div className="grid sm:grid-cols-3">
            {experienceGroups.map((group) => <article key={group.code} className="border-b border-deep-navy p-6 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"><h3 className="min-h-10 text-[8px] leading-4 font-bold tracking-[0.1em] text-command-blue uppercase">{group.code}</h3><p className="mt-5 text-[11px] leading-6 font-bold">{group.sectors.join(" / ")}</p></article>)}
          </div>
        </div>
      </div>
    </section>
  );
}
