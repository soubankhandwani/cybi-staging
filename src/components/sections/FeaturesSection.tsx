import { features } from "@/data/site-content";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function FeaturesSection() {
  return (
    <section className="relative z-20 w-full border-t border-mist-blue/50 py-12 select-none" aria-label="Core capabilities">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.id} className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden border border-mist-blue bg-intelligence-white p-8 shadow-[0_2px_8px_rgba(11,18,28,0.03)] transition-colors hover:border-electric-blue md:p-10">
            <TechnicalGrid className="opacity-70 transition-opacity group-hover:opacity-100" />
            <span className="absolute top-2 right-2 font-mono text-[8px] font-bold text-steel uppercase">{feature.code}</span>
            <span className="relative z-10 text-command-blue transition-colors group-hover:text-electric-blue"><FeatureIcon icon={feature.icon} /></span>
            <div className="relative z-10 mt-8">
              <h3 className="mb-3 text-sm font-bold tracking-[0.14em] text-obsidian uppercase">{feature.title}</h3>
              <p className="text-[11px] leading-relaxed font-bold tracking-wider text-steel uppercase">{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ icon }: { icon: (typeof features)[number]["icon"] }) {
  if (icon === "network") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="10" y="2" width="4" height="4" /><rect x="3" y="14" width="4" height="4" /><rect x="17" y="14" width="4" height="4" /><path d="M12 6v5M5 11h14v3" /></svg>;
  if (icon === "shield") return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M12 6v12M8 12h8" /></svg>;
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="15" r="4" /><circle cx="18" cy="15" r="4" /><path d="M10 15h4M4 11h3m10 0h3M7 11c1-3 3-5 5-5s4 2 5 5" /></svg>;
}
