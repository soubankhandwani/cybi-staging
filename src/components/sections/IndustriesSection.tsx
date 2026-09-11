import { IndustriesExplorer } from "@/components/interactive/IndustriesExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustriesSection() {
  return (
    <section className="relative z-20 w-full border-t-2 border-deep-navy bg-ice-gray py-20 text-obsidian select-none" id="industries">
      <div className="absolute inset-x-0 top-0 h-4 bg-[linear-gradient(rgba(33,55,90,0.08)_1px,transparent_1px)] bg-[size:10px_10px] opacity-70" />
      <SectionHeading eyebrow="Industries" className="mb-12" headingClassName="text-4xl leading-[0.95] font-black sm:text-5xl lg:text-6xl">Specialized solutions<br />for every industry</SectionHeading>
      <IndustriesExplorer />
    </section>
  );
}
