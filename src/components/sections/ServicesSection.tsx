import { ModalTrigger } from "@/components/interactive/ModalTrigger";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/SiteIcon";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { services, serviceTicker } from "@/data/site-content";

export function ServicesSection() {
  return (
    <>
      <section className="relative z-20 w-full overflow-hidden border-y border-deep-navy bg-midnight py-5 text-intelligence-white select-none" aria-label="Services ticker">
        <div className="text-[13px] font-bold tracking-[0.25em] sm:text-[15px]"><Marquee items={serviceTicker} /></div>
      </section>
      <section className="relative z-20 w-full border-t border-mist-blue/50 bg-intelligence-white py-16 text-obsidian select-none" id="services">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Capabilities" headingClassName="max-w-4xl">Capabilities built for complex challenges</SectionHeading>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <ModalTrigger modal="boost">Request Consultation</ModalTrigger>
            <ModalTrigger modal="industries" variant="outline">Explore Sectors</ModalTrigger>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="relative flex min-h-[380px] flex-col justify-between overflow-hidden border border-mist-blue bg-intelligence-white p-8 shadow-[0_2px_8px_rgba(11,18,28,0.03)] md:p-10">
              <TechnicalGrid />
              <span className="absolute top-2 right-2 font-mono text-[8px] font-bold text-steel uppercase">{service.code}</span>
              <div className="relative z-10">
                <span className="mb-8 flex h-12 w-12 items-center justify-center border border-command-blue bg-signal-blue text-intelligence-white"><ServiceIcon name={service.icon} className="h-5 w-5" /></span>
                <h3 className="mb-4 text-xl font-bold tracking-[0.05em] text-obsidian uppercase sm:text-2xl">{service.title}</h3>
                <p className="mb-8 text-[12px] leading-relaxed font-bold tracking-wider text-steel uppercase sm:text-[11px]">{service.description}</p>
              </div>
              <div className="relative z-10 mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
                {service.tags.map((tag) => <span key={tag} className="flex items-center gap-1.5 border border-mist-blue bg-ice-gray px-3 py-1.5 text-[9px] font-bold tracking-wider text-deep-navy uppercase sm:text-[10px]"><span className="text-xs font-black text-electric-blue">✓</span>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
