import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AboutLabel } from "@/components/about/AboutPrimitives";
import { experienceGroups } from "@/components/about/about-content";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";

export function InstitutionalExperience() {
  return (
    <section className="border-x border-b border-deep-navy bg-ice-gray text-obsidian" aria-labelledby="experience-title">
      <header className="grid grid-cols-1 border-b border-deep-navy lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
        <div className="p-7 sm:p-10 lg:border-r lg:p-12">
          <AboutLabel>09 / Institutional experience</AboutLabel>
          <h2 id="experience-title" className="mt-8 text-4xl leading-none font-bold tracking-[-0.05em] uppercase sm:text-6xl">Experience across sectors.</h2>
        </div>
        <div className="border-t border-deep-navy p-7 sm:p-10 lg:border-t-0 lg:p-12">
          <p className="text-sm leading-7 text-deep-navy">We work with organisations across law enforcement, government, finance, business, education and legal practice.</p>
          <EditorialImagePlaceholder
            code="INST / PROGRAM_RECORD / 09"
            subject="Recommended subject: approved photography from an institutional training program, workshop or official engagement."
            altDraft="Cyber-I delivering a professional cyber investigation training session for institutional participants."
            className="mt-7 aspect-[16/8] min-h-0 bg-intelligence-white"
          />
        </div>
      </header>
      <div className="grid lg:grid-cols-3">
        {experienceGroups.map((group) => (
          <article key={group.code} className="border-b border-deep-navy p-7 last:border-b-0 sm:p-9 lg:border-r lg:border-b-0 lg:last:border-r-0">
            <h3 className="min-h-10 text-[10px] leading-5 font-bold tracking-[0.15em] text-command-blue uppercase">{group.code}</h3>
            <ul className="mt-7 border-t border-deep-navy">
              {group.sectors.map((sector) => (
                <li key={sector} className="border-b border-deep-navy py-4 text-sm font-bold tracking-[-0.01em]">{sector}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Link href="/clients" className="flex min-h-14 items-center justify-between border-t border-deep-navy px-7 text-[10px] font-bold tracking-[0.14em] uppercase transition-colors hover:bg-deep-navy hover:text-white sm:px-10">
        Review institutional experience <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}
