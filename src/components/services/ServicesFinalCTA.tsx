import { AboutLabel, ActionLink } from "@/components/about/AboutPrimitives";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function ServicesFinalCTA() {
  return (
    <section className="border-x border-b border-deep-navy" aria-labelledby="service-contact-title">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="border-b border-deep-navy bg-command-blue p-7 text-white sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel inverse>09 / Need direction?</AboutLabel>
          <h2 id="service-contact-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-5xl">Not sure which capability your situation requires?</h2>
          <p className="mt-7 max-w-lg text-sm leading-7 text-ice-gray">Start with the situation. Cyber-I can direct the enquiry toward the relevant investigation, forensic, security, legal or training path.</p>
          <ActionLink href="/contact" variant="light" event="services_unsure_contact" className="mt-9">Discuss Your Requirement</ActionLink>
        </aside>
        <article className="relative overflow-hidden bg-obsidian p-7 text-white sm:p-10 lg:p-12">
          <TechnicalGrid large className="opacity-20" />
          <div className="relative flex min-h-[430px] flex-col justify-between">
            <AboutLabel inverse>10 / Start with the problem</AboutLabel>
            <h2 className="my-12 max-w-4xl text-[clamp(2.9rem,6vw,6.8rem)] leading-[0.91] font-bold tracking-[-0.065em] uppercase">We’ll identify the right path.</h2>
            <div className="flex flex-col gap-3 border-t border-deep-navy pt-7 sm:flex-row">
              <ActionLink href="/contact" variant="light" event="services_final_expert">Talk to an Expert</ActionLink>
              <ActionLink href="/about" variant="text" event="services_final_about">Why Cyber-I</ActionLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
