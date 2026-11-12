import Link from "next/link";
import { serviceDescriptions } from "@/data/site-content";
import { AboutLabel, ActionLink, CornerMarks } from "@/components/about/AboutPrimitives";
import { EditorialImagePlaceholder } from "@/components/ui/EditorialImagePlaceholder";
import { TechnicalGrid } from "@/components/ui/TechnicalGrid";

export function ServiceDetailHero() {
  return (
    <section className="relative isolate overflow-hidden border-x border-b border-deep-navy bg-obsidian text-intelligence-white" aria-labelledby="service-detail-title">
      <TechnicalGrid large className="opacity-20" />
      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_37%]">
        <div className="flex min-h-[720px] flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <AboutLabel inverse>Services / Investigation</AboutLabel>
            <nav aria-label="Breadcrumb" className="mt-4 flex flex-wrap gap-2 text-[9px] font-bold tracking-[0.14em] text-mist-blue uppercase">
              <Link href="/" className="hover:text-electric-blue">Home</Link><span aria-hidden="true">/</span>
              <Link href="/services" className="hover:text-electric-blue">Services</Link><span aria-hidden="true">/</span>
              <span aria-current="page">Cybercrime Investigation</span>
            </nav>
          </div>

          <div className="my-12">
            <h1 id="service-detail-title" className="max-w-5xl text-[clamp(2rem,6.6vw,7.6rem)] leading-[0.9] font-bold tracking-[-0.065em] uppercase">
              <span className="about-hero-line block">Understand</span>
              <span className="about-hero-line block">what happened.</span>
              <span className="about-hero-line block text-electric-blue">Establish what</span>
              <span className="about-hero-line block text-electric-blue">the evidence supports.</span>
            </h1>
          </div>

          <div className="grid gap-8 border-t border-deep-navy pt-7 xl:grid-cols-[1fr_auto] xl:items-end">
            <div>
              <p className="max-w-3xl text-sm leading-7 font-bold text-mist-blue md:text-base">{serviceDescriptions.investigation}</p>
              <p className="mt-4 text-[9px] font-bold tracking-[0.13em] text-electric-blue uppercase">Law enforcement / Legal professionals / Organisations</p>
            </div>
            <ActionLink href="/contact" variant="light" event="service_primary_cta_click">Discuss an Incident</ActionLink>
          </div>
        </div>

        <aside className="relative border-t border-deep-navy bg-midnight p-7 sm:p-9 lg:border-t-0 lg:border-l">
          <CornerMarks />
          <div className="relative flex h-full flex-col gap-6">
            <div className="flex items-center justify-between text-[8px] font-bold tracking-[0.15em] uppercase"><span className="text-electric-blue">Case-file visual / 01</span><span className="text-mist-blue">Asset pending</span></div>
            <EditorialImagePlaceholder
              code="INV / CASE_CONTEXT / HERO"
              subject="Recommended subject: authentic investigator consultation or controlled digital-evidence review. Avoid identifiable sensitive data."
              altDraft="Cyber-I specialist reviewing information relating to a cybercrime investigation."
              inverse
              className="service-detail-media-reveal min-h-[430px] flex-1"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
