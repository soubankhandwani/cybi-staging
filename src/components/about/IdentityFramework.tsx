import { AboutLabel } from "@/components/about/AboutPrimitives";
import { identityStages } from "@/components/about/about-content";

export function IdentityFramework() {
  return (
    <section className="border-x border-b border-deep-navy bg-midnight text-intelligence-white" aria-labelledby="identity-title">
      <div className="grid lg:grid-cols-[30%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel inverse>02 / Core Thesis</AboutLabel>
          <h2 id="identity-title" className="mt-8 text-4xl leading-[0.98] font-bold tracking-[-0.05em] uppercase sm:text-5xl lg:sticky lg:top-8 lg:text-6xl">
            From signal<br />to informed<br /><span className="text-electric-blue">action.</span>
          </h2>
        </header>
        <div>
          {identityStages.map((stage) => (
            <article key={stage.number} className="intelligence-reveal group grid border-b border-deep-navy last:border-b-0 md:grid-cols-[90px_minmax(180px,0.65fr)_1fr]">
              <span className="border-b border-deep-navy p-6 text-sm font-bold text-electric-blue md:border-r md:border-b-0 md:p-8">{stage.number}</span>
              <div className="border-b border-deep-navy p-6 md:border-r md:border-b-0 md:p-8">
                <h3 className="text-2xl font-bold tracking-[-0.04em] uppercase sm:text-3xl">{stage.title}</h3>
                <p className="mt-3 text-[9px] font-bold tracking-[0.16em] text-mist-blue uppercase">{stage.question}</p>
              </div>
              <p className="p-6 text-sm leading-7 text-mist-blue md:p-8">{stage.description}</p>
            </article>
          ))}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-2 border-t border-electric-blue/40 p-6 text-[9px] font-bold tracking-[0.08em] uppercase sm:p-8 sm:text-xs">
            <span>Information</span><span className="text-electric-blue">→</span><span>Investigation</span><span className="text-electric-blue">→</span><span>Intelligence</span><span className="text-electric-blue">→</span><span className="text-electric-blue">Action</span>
          </div>
        </div>
      </div>
    </section>
  );
}
