import { Calendar, Mail, MessageCircleWarning } from "lucide-react";
import { ContactForm } from "@/components/interactive/ContactForm";
import { ModalTrigger } from "@/components/interactive/ModalTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { contactActions } from "@/data/site-content";
import { cn } from "@/lib/cn";

const icons = { calendar: Calendar, mail: Mail, message: MessageCircleWarning };

export function ContactSection() {
  return (
    <section className="relative z-20 w-full border-t-2 border-deep-navy bg-intelligence-white py-20 text-obsidian select-none" id="contact">
      <div className="noise-layer pointer-events-none absolute inset-0 z-0 opacity-[0.03]" />
      <div className="relative z-10">
        <SectionHeading eyebrow="Let's Boost Security" className="mb-12" headingClassName="text-4xl leading-[0.95] font-black sm:text-5xl lg:text-6xl">Connect with us to begin<br />your journey toward<br />cybersecurity protection</SectionHeading>
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-4">
            {contactActions.map((action) => {
              const Icon = icons[action.icon];
              const featured = "featured" in action && action.featured;
              return (
                <article key={action.title} className={cn("group relative flex flex-1 flex-col justify-between overflow-hidden border p-6 transition-shadow duration-300", featured ? "border-command-blue bg-command-blue text-intelligence-white shadow-[4px_4px_0_#62B5FF]" : "border-mist-blue bg-intelligence-white shadow-[2px_2px_0_#21375A] hover:shadow-[4px_4px_0_#62B5FF]")}>
                  <TechnicalGrid />
                  <div className="relative z-10"><Icon className={cn("mb-4 h-6 w-6 transition-transform duration-300 group-hover:scale-110", featured ? "text-electric-blue" : "text-command-blue")} /><h3 className="mb-2 text-lg font-black tracking-wider uppercase">{action.title}</h3><p className={cn("mb-6 text-[11px] leading-relaxed font-bold tracking-wider uppercase sm:text-[12px]", featured ? "text-ice-gray" : "text-steel")}>{action.description}</p></div>
                  <div className="relative z-10 w-full">
                    {"href" in action ? <a href={action.href} target={"external" in action ? "_blank" : undefined} rel={"external" in action ? "noreferrer" : undefined} data-event={featured ? "whatsapp_click" : undefined} className={cn("block w-full border px-4 py-2.5 text-center font-mono text-xs font-bold tracking-widest uppercase transition-all active:scale-[0.98]", featured ? "border-electric-blue bg-electric-blue text-obsidian hover:bg-intelligence-white" : "border-command-blue bg-intelligence-white text-command-blue hover:bg-signal-blue hover:text-intelligence-white")}>{action.label}</a> : <ModalTrigger modal="boost" variant="outline" size="sm" className="w-full border">{action.label}</ModalTrigger>}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="relative flex flex-col justify-between overflow-hidden border-2 border-deep-navy bg-ice-gray p-8 lg:col-span-8 md:p-12">
            <TechnicalGrid large />
            <div className="relative z-10"><h3 className="mb-8 text-3xl leading-none font-black tracking-tight uppercase sm:text-4xl">Let&apos;s make great things happen!</h3><ContactForm /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
