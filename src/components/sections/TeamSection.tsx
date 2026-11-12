import Image from "next/image";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";
import { experts } from "@/data/site-content";
import { cn } from "@/lib/cn";

export function TeamSection() {
  if (!experts.length) return null;

  return (
    <section className="relative z-20 w-full border-t border-mist-blue/50 bg-intelligence-white py-16 text-obsidian select-none" id="team">
      <h2 className="sr-only">Our Leadership</h2>
      <p className="mb-10 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] text-steel uppercase sm:text-xs"><span className="font-black text-command-blue">/</span>Expert Initiatives & Leadership</p>
      <div className="flex flex-col gap-12">
        {experts.map((expert) => (
          <article key={expert.name} className="grid grid-cols-1 border-2 border-deep-navy lg:grid-cols-2">
            <div className={cn("relative flex min-h-[450px] flex-col justify-between overflow-hidden p-8 md:p-12", expert.imagePosition === "left" && "order-1 lg:order-2")}>
              <TechnicalGrid large />
              <span className="absolute top-2 left-2 z-10 font-mono text-[8px] font-bold tracking-widest text-steel uppercase">{expert.code}</span>
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-black tracking-tight text-obsidian uppercase sm:text-4xl">{expert.name}</h3>
                <p className="mt-1.5 mb-6 inline-block border border-command-blue bg-signal-blue px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-intelligence-white uppercase sm:text-xs">{expert.role}</p>
                <p className="max-w-2xl text-[13px] leading-relaxed font-bold tracking-wider text-deep-navy uppercase sm:text-[14px]">{expert.biography}</p>
              </div>
              <dl className="relative z-10 mt-auto grid grid-cols-2 gap-x-8 gap-y-6 border-t border-mist-blue/50 pt-8">
                {expert.stats.map((stat) => <div key={stat.label}><dd className="text-3xl font-black text-command-blue sm:text-4xl">{stat.value}</dd><dt className="mt-1 font-mono text-[9px] font-bold tracking-widest text-steel uppercase sm:text-[10px]">{stat.label}</dt></div>)}
              </dl>
            </div>
            <div className={cn("group relative min-h-[400px] overflow-hidden bg-signal-blue lg:min-h-[450px]", expert.imagePosition === "right" ? "border-t-2 border-deep-navy lg:border-t-0 lg:border-l-2" : "order-2 border-b-2 border-deep-navy lg:order-1 lg:border-r-2 lg:border-b-0")}>
              <Image src={expert.image} alt={expert.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover grayscale contrast-125 brightness-105 opacity-90 mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
              <Reticle />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reticle() {
  return <><span className="absolute top-4 left-4 z-20 h-5 w-5 border-t-2 border-l-2 border-electric-blue" /><span className="absolute top-4 right-4 z-20 h-5 w-5 border-t-2 border-r-2 border-electric-blue" /><span className="absolute bottom-4 left-4 z-20 h-5 w-5 border-b-2 border-l-2 border-electric-blue" /><span className="absolute right-4 bottom-4 z-20 h-5 w-5 border-r-2 border-b-2 border-electric-blue" /></>;
}
