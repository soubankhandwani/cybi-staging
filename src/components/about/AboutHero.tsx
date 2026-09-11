import Link from "next/link";
import { ActionLink, AboutLabel, CornerMarks } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

const globeVideo = "https://res.cloudinary.com/dbzx2pddp/video/upload/v1781262794/Add_revolution_to_earth_globe_202606121642_z2gkcs.mp4";

export function AboutHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-8rem)] overflow-hidden border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="about-title">
      <TechnicalGrid large className="opacity-55 dark:opacity-20" />
      <div aria-hidden="true" className="absolute top-0 bottom-0 left-[72%] hidden w-px bg-mist-blue/60 lg:block" />
      <div className="relative grid min-h-[calc(100svh-8rem)] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(250px,28%)]">
        <div className="flex flex-col justify-between px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="flex items-start justify-between gap-6">
            <div>
              <AboutLabel>About / Cyber-I Consultancy</AboutLabel>
              <nav aria-label="Breadcrumb" className="mt-4 flex gap-2 text-[9px] font-bold tracking-[0.16em] text-steel uppercase">
                <Link href="/" className="hover:text-command-blue">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span>
              </nav>
            </div>
            <span className="hidden text-right text-[9px] leading-relaxed font-bold tracking-[0.16em] text-steel uppercase sm:block">01 / Organization<br />Mumbai / India</span>
          </div>

          <div className="my-14 lg:my-20">
            <h1 id="about-title" className="text-[clamp(3.15rem,8.15vw,9rem)] leading-[0.88] font-bold tracking-[-0.07em] uppercase">
              <span className="about-hero-line block">Information.</span>
              <span className="about-hero-line block text-command-blue dark:text-electric-blue">Investigation.</span>
              <span className="about-hero-line block">Intelligence.</span>
            </h1>
          </div>

          <div className="grid items-end gap-8 border-t border-mist-blue pt-7 md:grid-cols-[minmax(0,1fr)_auto] dark:border-deep-navy">
            <p className="max-w-3xl text-sm leading-7 font-bold tracking-[0.04em] text-deep-navy dark:text-mist-blue md:text-base">
              Cyber-I brings together cybercrime investigation, digital forensics, cybersecurity, cyber law and professional training—helping organizations and individuals understand complex digital matters and determine an informed next step.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <ActionLink href="/services" event="about_hero_services">Explore Our Services</ActionLink>
              <ActionLink href="/contact" variant="outline" event="about_hero_contact">Talk to an Expert</ActionLink>
            </div>
          </div>
        </div>

        <aside className="about-globe-panel relative min-h-[500px] overflow-hidden border-t border-deep-navy bg-midnight text-intelligence-white lg:min-h-0 lg:border-t-0 lg:border-l">
          <TechnicalGrid large className="opacity-20" />
          <CornerMarks />
          <div className="relative flex h-full min-h-[500px] flex-col justify-start p-7 sm:p-9 lg:p-8">
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden" role="img" aria-label="Rotating view of Earth representing connected digital activity">
              <video src={globeVideo} autoPlay loop muted playsInline preload="metadata" aria-hidden="true" className="intelligence-globe about-globe-video h-full w-full scale-[1.35] object-cover opacity-75 mix-blend-screen" />
              <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,35,52,0.05)_0%,rgba(21,35,52,0.18)_50%,rgba(11,18,28,0.96)_100%)]" />
              <div aria-hidden="true" className="about-orbit absolute aspect-square w-[82%] rounded-full border border-electric-blue/35" />
              <div aria-hidden="true" className="about-orbit about-orbit-reverse absolute aspect-square w-[62%] rounded-full border border-mist-blue/25" />
            </div>
            <div className="relative z-10 border border-electric-blue/60 bg-obsidian p-5 shadow-[8px_8px_0_rgba(98,181,255,0.18)]">
              <p className="text-[10px] font-bold tracking-[0.18em] text-electric-blue uppercase">Cyber-I Academy</p>
              <p className="mt-3 max-w-xs text-sm leading-6 font-bold text-intelligence-white">Build practical capability in cyber investigation, forensics, cyber law and digital evidence.</p>
              <Link href="/courses" data-event="about_hero_academy" className="academy-cta mt-6 flex min-h-14 w-full items-center justify-between border-2 border-electric-blue bg-electric-blue px-5 py-4 text-xs font-bold tracking-[0.12em] text-obsidian uppercase transition-colors hover:bg-intelligence-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue">
                Explore Professional Courses <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
