import { AboutLabel } from "@/components/about/AboutPrimitives";
import { companyPurpose } from "@/data/company";
import { timelineStages } from "@/components/about/about-content";

export function MissionVision() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="purpose-title">
      <h2 id="purpose-title" className="sr-only">Cyber-I purpose</h2>
      <div className="grid lg:grid-cols-2">
        <article className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>03 / Mission</AboutLabel>
          <h3 className="sr-only">Mission</h3>
          <p className="mt-10 max-w-2xl text-2xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">
            {companyPurpose.mission}
          </p>
        </article>
        <article className="p-7 sm:p-10 lg:p-12">
          <AboutLabel>04 / Vision</AboutLabel>
          <h3 className="sr-only">Vision</h3>
          <p className="mt-10 max-w-2xl text-2xl leading-tight font-bold tracking-[-0.035em] sm:text-4xl">
            {companyPurpose.vision}
          </p>
        </article>
      </div>
    </section>
  );
}

export function CompanyTimeline() {
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="story-title">
      <div className="grid lg:grid-cols-[30%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>05 / Case-file Chronology</AboutLabel>
          <h2 id="story-title" className="mt-8 text-4xl leading-none font-bold tracking-[-0.05em] uppercase sm:text-5xl">The Cyber-I story.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-deep-navy">Company milestones will be added as they become available.</p>
        </header>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-3">
          {timelineStages.map((stage, index) => (
            <li key={stage} className="relative min-h-48 border-b border-deep-navy p-6 odd:sm:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0">
              <span className="text-[9px] font-bold tracking-[0.16em] text-command-blue uppercase">T-{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 text-xl font-bold tracking-[-0.03em] uppercase">{stage}</h3>
              <p className="mt-5 max-w-[20rem] text-[9px] leading-5 font-bold tracking-[0.1em] text-steel uppercase">[Verified date / milestone required]</p>
              <span aria-hidden="true" className="absolute bottom-0 left-6 h-4 w-px bg-command-blue" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
