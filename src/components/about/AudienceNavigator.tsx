import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutLabel } from "@/components/about/AboutPrimitives";
import { audiences } from "@/components/about/about-content";

export function AudienceNavigator() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="audience-title">
      <div className="grid lg:grid-cols-[34%_1fr]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <div className="lg:sticky lg:top-8">
            <AboutLabel>10 / Responsibility</AboutLabel>
            <h2 id="audience-title" className="mt-8 text-4xl leading-[0.98] font-bold tracking-[-0.05em] uppercase sm:text-5xl">Built for different kinds of responsibility.</h2>
            <p className="mt-6 text-sm leading-7 text-deep-navy dark:text-mist-blue">Identify the context closest to yours and continue to the most relevant capability.</p>
          </div>
        </header>
        <div>
          {audiences.map((audience) => (
            <Link key={audience.number} href={audience.href} className="group grid min-h-40 border-b border-deep-navy p-6 last:border-b-0 sm:grid-cols-[52px_0.8fr_1fr_40px] sm:items-center sm:p-8">
              <span className="text-[10px] font-bold text-command-blue dark:text-electric-blue">{audience.number}</span>
              <h3 className="mt-5 text-xl font-bold tracking-[-0.035em] uppercase sm:mt-0 sm:pr-8 sm:text-2xl">{audience.title}</h3>
              <p className="mt-4 max-w-xl text-xs leading-6 text-steel dark:text-mist-blue sm:mt-0">{audience.description}</p>
              <ArrowRight aria-hidden="true" className="mt-5 h-5 w-5 text-command-blue transition-transform group-hover:translate-x-1 sm:mt-0 dark:text-electric-blue" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
