import { AboutLabel } from "@/components/about/AboutPrimitives";
import { disciplines } from "@/components/about/about-content";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";

export function ExpertiseMatrix() {
  return (
    <section className="border-x border-b border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white" aria-labelledby="matrix-title">
      <div className="grid grid-cols-1 lg:grid-cols-[42%_minmax(0,1fr)]">
        <header className="border-b border-deep-navy p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
          <AboutLabel>06 / Where disciplines converge</AboutLabel>
          <h2 id="matrix-title" className="mt-8 text-4xl leading-[0.96] font-bold tracking-[-0.055em] uppercase sm:text-6xl">Expertise across disciplines</h2>
          <p className="mt-8 max-w-lg text-sm leading-7 text-deep-navy dark:text-mist-blue">
            Cyber-I’s distinction is the connection between technical evidence, investigative thinking, security context, legal understanding and professional training.
          </p>
          <div className="mt-10 border-y border-mist-blue py-5 text-[10px] leading-6 font-bold tracking-[0.12em] text-command-blue uppercase dark:border-deep-navy dark:text-electric-blue">
            Technical evidence → Investigation → Legal understanding → Informed action
          </div>
          <EditorialImagePlaceholder
            code="DISCIPLINE / EVIDENCE / 06"
            subject="Recommended subject: an authentic evidence-review, forensic-lab or multidisciplinary consultation scene."
            altDraft="Cyber-I specialists reviewing digital evidence in a professional forensic environment."
            className="mt-10 aspect-[16/10] min-h-0 dark:border-mist-blue/50 dark:bg-midnight dark:text-intelligence-white"
          />
        </header>
        <div className="grid sm:grid-cols-2">
          {disciplines.map((discipline) => (
            <article key={discipline.number} className="intelligence-reveal group min-h-52 border-b border-deep-navy p-6 even:sm:border-l sm:p-8 sm:[&:nth-last-child(-n+2)]:border-b-0">
              <div className="flex items-start justify-between gap-5">
                <span className="text-[10px] font-bold tracking-wider text-command-blue dark:text-electric-blue">{discipline.number}</span>
                <span aria-hidden="true" className="h-2 w-2 bg-command-blue transition-transform group-hover:rotate-45 dark:bg-electric-blue" />
              </div>
              <h3 className="mt-10 text-xl font-bold tracking-[-0.03em] uppercase sm:text-2xl">{discipline.title}</h3>
              <p className="mt-4 max-w-sm text-xs leading-6 text-steel dark:text-mist-blue">{discipline.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
