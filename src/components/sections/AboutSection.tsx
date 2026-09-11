import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

const statements = [
  { code: "MISSION_STATEMENT // 01", title: "Mission", description: "To transform information into actionable intelligence through investigation, analysis, digital forensics, and strategic advisory." },
  { code: "VISION_STATEMENT // 02", title: "Vision", description: "To be the most trusted authority in intelligence, investigations, digital forensics, and information-driven decision support." },
];

export function AboutSection() {
  return (
    <section className="relative z-20 w-full border-t border-mist-blue/50 py-16 select-none dark:border-mist-blue/10" id="about">
      <SectionHeading eyebrow="About Cyber-I" className="mb-12">Understanding information.<br />Uncovering truth.<br />Delivering intelligence.</SectionHeading>
      <div className="custom-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
        {statements.map((statement) => (
          <article key={statement.title} className="relative flex min-h-[320px] w-[90%] min-w-[280px] flex-none snap-start flex-col justify-between overflow-hidden border border-mist-blue bg-ice-gray p-8 text-obsidian shadow-[0_2px_8px_rgba(11,18,28,0.03)] dark:border-deep-navy dark:bg-midnight dark:text-intelligence-white sm:w-[48%] md:p-10">
            <TechnicalGrid />
            <span className="absolute top-2 right-2 font-mono text-[8px] font-bold text-steel uppercase dark:text-mist-blue/50">{statement.code}</span>
            <h3 className="relative z-10 mb-6 flex items-center gap-2 text-lg font-bold tracking-wider uppercase sm:text-xl md:text-2xl"><span className="font-black">/</span>{statement.title}</h3>
            <p className="relative z-10 mt-auto text-[12px] leading-relaxed font-bold tracking-wider text-steel uppercase dark:text-mist-blue sm:text-[11px]">{statement.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
