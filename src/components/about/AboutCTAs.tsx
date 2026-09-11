import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function DualPathCTA() {
  return (
    <section className="border-x border-b border-deep-navy" aria-labelledby="path-title">
      <h2 id="path-title" className="sr-only">Choose your next path</h2>
      <div className="grid lg:grid-cols-2">
        <article className="flex min-h-[450px] flex-col justify-between border-b border-deep-navy bg-command-blue p-7 text-white sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <div>
            <AboutLabel inverse>11A / Need expertise?</AboutLabel>
            <h3 className="mt-9 max-w-xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Resolve a digital matter with specialist support.</h3>
            <p className="mt-7 max-w-lg text-sm leading-7 text-ice-gray">For investigation, digital forensics, cybersecurity, cyber-law related expertise and other verified specialist requirements.</p>
          </div>
          <ActionLink href="/services" variant="light" event="about_dual_services" className="mt-10 self-start">Explore Services</ActionLink>
        </article>
        <article className="flex min-h-[450px] flex-col justify-between bg-ice-gray p-7 text-obsidian sm:p-10 lg:p-12">
          <div>
            <AboutLabel>11B / Build expertise?</AboutLabel>
            <h3 className="mt-9 max-w-xl text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Learn the disciplines behind the work.</h3>
            <p className="mt-7 max-w-lg text-sm leading-7 text-deep-navy">For professionals and learners exploring cyber investigation, cyber forensics, cyber law and digital evidence.</p>
          </div>
          <ActionLink href="/courses" variant="outline" event="about_dual_courses" className="mt-10 self-start">Explore Courses</ActionLink>
        </article>
      </div>
    </section>
  );
}

export function FinalContactCTA() {
  return (
    <section className="relative overflow-hidden border-x border-b border-deep-navy bg-obsidian px-7 py-16 text-intelligence-white sm:px-10 sm:py-20 lg:px-12 lg:py-24" aria-labelledby="final-contact-title">
      <TechnicalGrid large className="opacity-20" />
      <div className="relative">
        <AboutLabel inverse>12 / Start a conversation</AboutLabel>
        <h2 id="final-contact-title" className="mt-9 max-w-6xl text-[clamp(2.75rem,7vw,7.5rem)] leading-[0.91] font-bold tracking-[-0.065em] uppercase">A serious digital matter deserves the right expertise.</h2>
        <div className="mt-10 grid gap-8 border-t border-deep-navy pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-2xl text-sm leading-7 text-mist-blue">Organizations, institutions and individuals can contact Cyber-I to discuss an investigation, forensic, security, legal or training requirement.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/contact" variant="light" event="about_final_contact">Talk to an Expert</ActionLink>
            <ActionLink href="/services" variant="text" event="about_final_services">Explore Services</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
