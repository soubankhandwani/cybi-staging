import { AboutLabel } from "@/components/about/AboutPrimitives";
import { processSteps } from "@/components/service-detail/cyber-crime-content";

export function InvestigationProcess() {
  return (
    <section className="border-x border-b border-deep-navy bg-midnight text-intelligence-white" aria-labelledby="detail-process-title">
      <header className="grid border-b border-deep-navy lg:grid-cols-[0.7fr_1fr]">
        <div className="p-7 sm:p-10 lg:border-r lg:p-12">
          <AboutLabel inverse>03 / Engagement sequence</AboutLabel>
          <h2 id="detail-process-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">What engagement may involve.</h2>
        </div>
        <div className="border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:p-12"><p className="max-w-2xl text-sm leading-7 text-mist-blue">This high-level sequence explains a possible engagement. It is not presented as Cyber-I’s verified official investigation methodology.</p><p className="mt-4 text-[9px] font-bold tracking-[0.12em] text-electric-blue uppercase">[Process requires client validation]</p></div>
      </header>
      <ol className="service-process-track relative grid lg:grid-cols-5">
        {processSteps.map(([number, title, description]) => (
          <li key={number} className="service-detail-reveal relative min-h-64 border-b border-deep-navy p-7 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 sm:p-8">
            <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center border border-electric-blue bg-midnight text-[9px] font-bold text-electric-blue">{number}</span>
            <h3 className="mt-10 text-lg font-bold uppercase">{title}</h3>
            <p className="mt-5 text-xs leading-6 text-mist-blue">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function UnderstandingAndDeliverables() {
  const questions = ["What happened?", "What digital evidence may be relevant?", "What activity can be established?", "What should be considered next?"];
  const deliverables = ["Investigation findings", "Evidence analysis", "Investigation reporting", "Evidence preparation for legal proceedings"];

  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="understand-title">
      <div className="grid lg:grid-cols-2">
        <article className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>04 / Questions</AboutLabel>
          <h2 id="understand-title" className="mt-8 text-3xl leading-none font-bold tracking-[-0.045em] uppercase sm:text-4xl">What this work may help you understand.</h2>
          <ol className="mt-9 border-t border-deep-navy">{questions.map((question, index) => <li key={question} className="service-detail-reveal grid grid-cols-[42px_1fr] border-b border-deep-navy py-5 text-sm font-bold"><span className="text-command-blue">0{index + 1}</span><span>{question}</span></li>)}</ol>
        </article>
        <article className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>05 / Potential outputs</AboutLabel>
          <h2 className="mt-8 text-3xl leading-none font-bold tracking-[-0.045em] uppercase sm:text-4xl">What the client may receive.</h2>
          <ul className="mt-9 grid border-t border-l border-deep-navy sm:grid-cols-2">{deliverables.map((item, index) => <li key={item} className="service-detail-reveal min-h-32 border-r border-b border-deep-navy p-5"><span className="text-[9px] font-bold text-command-blue">D-{String(index + 1).padStart(2, "0")}</span><p className="mt-5 text-xs font-bold uppercase">{item}</p></li>)}</ul>
          <p className="mt-6 text-[9px] leading-5 font-bold tracking-[0.11em] text-steel uppercase dark:text-mist-blue">Exact deliverables depend on agreed scope. No court-admissibility, recovery, attribution or legal outcome is promised.</p>
        </article>
      </div>
    </section>
  );
}
