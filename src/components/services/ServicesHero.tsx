import Link from "next/link";
import { AboutLabel, ActionLink, CornerMarks } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function ServicesHero() {
  return (
    <section className="relative isolate overflow-hidden border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="services-title">
      <TechnicalGrid large className="opacity-55 dark:opacity-20" />
      <div className="relative grid min-h-[720px] lg:grid-cols-[minmax(0,1fr)_34%]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <AboutLabel>Services / Capabilities</AboutLabel>
            <nav aria-label="Breadcrumb" className="mt-4 flex gap-2 text-[9px] font-bold tracking-[0.16em] text-steel uppercase">
              <Link href="/" className="hover:text-command-blue">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span>
            </nav>
          </div>
          <div className="my-14 lg:my-20">
            <h1 id="services-title" className="max-w-6xl text-[clamp(3.25rem,7.1vw,8rem)] leading-[0.9] font-bold tracking-[-0.065em] uppercase">
              <span className="about-hero-line block">Complex digital</span>
              <span className="about-hero-line block">matters require</span>
              <span className="about-hero-line block text-command-blue dark:text-electric-blue">more than one</span>
              <span className="about-hero-line block text-command-blue dark:text-electric-blue">discipline.</span>
            </h1>
          </div>
          <div className="grid gap-8 border-t border-mist-blue pt-7 xl:grid-cols-[1fr_auto] xl:items-end dark:border-deep-navy">
            <p className="max-w-3xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue md:text-base">
              Cyber-I connects cybercrime investigation, digital forensics, cybersecurity and cyber-law expertise to help clients understand incidents, uncover evidence, identify risk and determine an appropriate next step.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ActionLink href="#capabilities" event="services_hero_explore">Explore Capabilities ↓</ActionLink>
              <ActionLink href="/contact" variant="outline" event="services_hero_contact">Talk to an Expert</ActionLink>
            </div>
          </div>
        </div>
        <aside className="relative min-h-[420px] overflow-hidden border-t border-deep-navy bg-midnight p-7 text-white sm:p-10 lg:border-t-0 lg:border-l lg:p-9">
          <TechnicalGrid large className="opacity-20" />
          <CornerMarks />
          <div className="relative flex h-full flex-col justify-between">
            <p className="text-[9px] font-bold tracking-[0.18em] text-electric-blue uppercase">Capability logic / 01—04</p>
            <div className="my-12">
              {[
                ["Matter", "Establish the question"],
                ["Evidence", "Identify what is relevant"],
                ["Context", "Investigative / technical / legal"],
                ["Action", "Determine the next path"],
              ].map(([title, note], index) => (
                <div key={title} className="service-signal-row relative grid grid-cols-[36px_1fr] border-t border-deep-navy py-5 last:border-b">
                  <span className="text-[9px] font-bold text-electric-blue">0{index + 1}</span>
                  <div><p className="text-lg font-bold uppercase">{title}</p><p className="mt-1 text-[9px] font-bold tracking-[0.1em] text-mist-blue uppercase">{note}</p></div>
                </div>
              ))}
            </div>
            <p className="max-w-xs text-[10px] leading-6 font-bold tracking-[0.12em] text-mist-blue uppercase">Investigation / Forensics / Security / Law</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
