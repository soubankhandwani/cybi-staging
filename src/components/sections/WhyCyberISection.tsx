import { ModalTrigger } from "@/components/interactive/ModalTrigger";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { valueRows } from "@/data/site-content";

export function WhyCyberISection() {
  return (
    <section className="relative z-20 w-full overflow-hidden border-t border-mist-blue/50 bg-ice-gray py-16 text-obsidian select-none dark:border-mist-blue/10 dark:bg-obsidian dark:text-intelligence-white">
      <SectionHeading eyebrow="Why Cyber-I" align="center" className="mx-auto mb-8 max-w-4xl px-4">From information<br />to intelligence<br />to action</SectionHeading>
      <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
        <ModalTrigger modal="boost">Explore Services</ModalTrigger>
        <ModalTrigger modal="about" variant="outline">Request Briefing</ModalTrigger>
      </div>
      <div className="flex w-full flex-col gap-4">
        <Marquee items={valueRows[0]} variant="chips" speed="fast" />
        <Marquee items={valueRows[1]} variant="chips" direction="right" />
        <Marquee items={valueRows[2]} variant="chips" speed="slow" />
      </div>
    </section>
  );
}
