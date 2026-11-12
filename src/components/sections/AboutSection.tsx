import { SectionHeading } from "@/components/ui/SectionHeading";
import { companyPurpose } from "@/data/company";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

const statements = [
  { code: "MISSION_STATEMENT // 01", title: "Mission", description: companyPurpose.mission },
  { code: "VISION_STATEMENT // 02", title: "Vision", description: companyPurpose.vision },
];

export function AboutSection() {
  return (
    <section className="relative z-20 w-full border-t border-mist-blue/50 py-16 select-none dark:border-mist-blue/10" id="about">
      <SectionHeading eyebrow="About Cyber-I" className="mb-12">Bridging Technology, Investigation &amp; Law</SectionHeading>
      <div className="mb-8 max-w-3xl space-y-4 text-sm leading-7 text-steel dark:text-mist-blue">
        <p>Technology has transformed the way crimes are committed and investigated. Digital evidence now plays a critical role across almost every investigation, making specialised technical expertise essential.</p>
        <p>Cyber-I Consultancy Services was established to bridge the gap between technology, investigation, and law by delivering practical, technically sound, and legally sustainable solutions. Our multidisciplinary expertise enables us to support investigations, strengthen cybersecurity, provide expert opinions, and build professional capacity across both public and private sectors.</p>
      </div>
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
