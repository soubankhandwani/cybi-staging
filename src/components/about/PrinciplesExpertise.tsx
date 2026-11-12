import { AboutLabel, CornerMarks } from "@/components/about/AboutPrimitives";
import { principles } from "@/components/about/about-content";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function OperatingPrinciples() {
  return (
    <section className="border-x border-b border-deep-navy bg-obsidian text-intelligence-white" aria-labelledby="principles-title">
      <div className="grid lg:grid-cols-[34%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <div className="lg:sticky lg:top-8">
            <AboutLabel inverse>07 / How Cyber-I thinks</AboutLabel>
            <h2 id="principles-title" className="mt-8 text-4xl leading-none font-bold tracking-[-0.05em] uppercase sm:text-5xl">Standards before spectacle.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-mist-blue">Sensitive digital matters need a disciplined frame of mind as much as technical capability.</p>
          </div>
        </header>
        <ol>
          {principles.map((principle, index) => (
            <li key={principle.title} className="intelligence-reveal grid border-b border-deep-navy last:border-b-0 sm:grid-cols-[72px_0.7fr_1fr]">
              <span className="border-b border-deep-navy p-6 text-[10px] font-bold text-electric-blue sm:border-r sm:border-b-0 sm:p-7">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="border-b border-deep-navy p-6 text-xl font-bold tracking-[-0.03em] uppercase sm:border-r sm:border-b-0 sm:p-7">{principle.title}</h3>
              <p className="p-6 text-sm leading-7 text-mist-blue sm:p-7">{principle.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function LeadershipSection() {
  const backgrounds = ["Cybercrime investigation", "Digital forensics", "Cybersecurity", "Techno-legal consulting"];

  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian" aria-labelledby="leadership-title">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <article className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>08 / Expertise behind the work</AboutLabel>
          <h2 id="leadership-title" className="mt-8 max-w-4xl text-4xl leading-[0.98] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Practitioner context matters.</h2>
          <p className="mt-7 max-w-2xl text-sm leading-7 text-deep-navy">
            Cyber-I brings technical expertise together with an understanding of legal procedures, evidentiary standards and operational realities.
          </p>
          <div className="mt-10 grid border-t border-l border-deep-navy sm:grid-cols-2">
            {backgrounds.map((background, index) => (
              <div key={background} className="min-h-28 border-r border-b border-deep-navy p-5">
                <span className="text-[9px] font-bold text-command-blue">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-xs leading-5 font-bold tracking-[0.08em] uppercase">{background}</p>
              </div>
            ))}
          </div>
        </article>
        <aside className="relative min-h-[480px] overflow-hidden border-t border-deep-navy bg-midnight p-7 text-intelligence-white sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
          <TechnicalGrid large className="opacity-25" />
          <CornerMarks />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-4 text-[9px] font-bold tracking-[0.15em] text-mist-blue uppercase"><span>Profile file / Pending</span><span>08.01</span></div>
            <div className="my-14">
              <div aria-hidden="true" className="mx-auto flex aspect-[4/5] max-w-[260px] items-center justify-center border border-mist-blue/50 bg-deep-navy/30">
                <span className="text-center text-[10px] leading-6 font-bold tracking-[0.18em] text-electric-blue uppercase">Professional portrait<br />required</span>
              </div>
            </div>
            <div className="border-t border-mist-blue/30 pt-6">
              <h3 className="text-xl font-bold uppercase">[Leadership profile required]</h3>
              <p className="mt-3 text-[10px] leading-5 font-bold tracking-[0.12em] text-mist-blue uppercase">Name / Role / Specialization / Verified credentials / Relevant biography</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
