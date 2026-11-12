import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CornerDownRight } from "lucide-react";
import type { BlogPost } from "@/data/editorial-content";
import { cn } from "@/lib/cn";

export function EditorialHero({
  eyebrow,
  title,
  description,
  index,
  actions,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  index: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="relative border-x border-b border-deep-navy bg-intelligence-white dark:bg-obsidian">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <p className="mb-8 text-[10px] font-bold tracking-[0.22em] text-command-blue uppercase dark:text-electric-blue">/ {eyebrow}</p>
          <h1 className="max-w-6xl text-[clamp(2rem,7.4vw,7.75rem)] leading-[0.9] font-bold tracking-[-0.075em] text-obsidian uppercase dark:text-intelligence-white">{title}</h1>
          <div className="mt-10 grid gap-8 border-t border-deep-navy pt-6 md:grid-cols-[minmax(0,38rem)_auto] md:items-end md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-deep-navy dark:text-mist-blue sm:text-base">{description}</p>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
        <aside aria-hidden="true" className="technical-grid-large hidden border-l border-deep-navy p-8 lg:flex lg:flex-col lg:justify-between">
          <span className="text-right text-7xl leading-none font-bold tracking-[-0.08em] text-ice-gray dark:text-deep-navy">{index}</span>
          <div>
            <div className="mb-4 h-px bg-electric-blue" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-steel uppercase">Cyber-I / Field intelligence</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function TextLink({ href, children, inverse = false }: { href: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <Link href={href} className={cn("group inline-flex min-h-11 items-center gap-3 border px-5 py-3 text-xs font-bold tracking-[0.14em] uppercase transition-colors", inverse ? "border-electric-blue bg-electric-blue text-obsidian hover:bg-intelligence-white" : "border-command-blue bg-signal-blue text-intelligence-white hover:border-electric-blue hover:bg-electric-blue hover:text-obsidian")}>
      {children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-3 border border-deep-navy px-5 py-3 text-xs font-bold tracking-[0.14em] text-deep-navy uppercase transition-colors hover:bg-deep-navy hover:text-intelligence-white dark:border-mist-blue dark:text-mist-blue dark:hover:bg-mist-blue dark:hover:text-obsidian">
      {children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function SectionLabel({ index, children, inverse = false }: { index: string; children: React.ReactNode; inverse?: boolean }) {
  return (
    <p className={cn("flex items-center justify-between gap-4 border-b pb-4 text-[10px] font-bold tracking-[0.2em] uppercase", inverse ? "border-mist-blue/30 text-mist-blue" : "border-deep-navy text-steel dark:text-mist-blue")}>
      <span>/ {children}</span><span>{index}</span>
    </p>
  );
}

export function FinalCTA({ eyebrow, title, description, primaryHref = "/contact", primaryLabel = "Discuss your requirement", secondaryHref, secondaryLabel }: { eyebrow: string; title: string; description: string; primaryHref?: string; primaryLabel?: string; secondaryHref?: string; secondaryLabel?: string }) {
  return (
    <section className="border-x border-b border-deep-navy bg-midnight px-5 py-14 text-intelligence-white sm:px-8 sm:py-20 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <p className="mb-6 text-[10px] font-bold tracking-[0.2em] text-electric-blue uppercase">/ {eyebrow}</p>
          <h2 className="max-w-5xl text-[clamp(2.25rem,5.6vw,6.5rem)] leading-[0.95] font-bold tracking-[-0.065em] uppercase">{title}</h2>
        </div>
        <div className="border-l border-electric-blue pl-5">
          <p className="mb-7 text-sm leading-6 text-mist-blue">{description}</p>
          <div className="flex flex-wrap gap-3">
            <TextLink href={primaryHref} inverse>{primaryLabel}</TextLink>
            {secondaryHref && secondaryLabel && <Link className="inline-flex min-h-11 items-center gap-2 px-2 py-3 text-xs font-bold tracking-[0.14em] text-mist-blue uppercase hover:text-electric-blue" href={secondaryHref}>{secondaryLabel}<CornerDownRight className="h-4 w-4" /></Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={cn("group grid border border-deep-navy bg-intelligence-white dark:bg-obsidian", featured ? "lg:grid-cols-[1.3fr_1fr]" : "grid-rows-[auto_1fr]")}>
      <Link href={`/blog/${post.slug}`} className={cn("relative block overflow-hidden bg-deep-navy", featured ? "min-h-72 lg:min-h-[31rem]" : "aspect-[4/3]")} aria-label={`Read ${post.title}`}>
        <Image src={post.image} alt={post.imageAlt} fill sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover grayscale transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />
        {post.image.startsWith("/images/editorial/") && <span className="absolute right-3 bottom-3 border border-intelligence-white/50 bg-obsidian/70 px-2 py-1 text-[9px] font-bold tracking-widest text-intelligence-white uppercase">Demo image</span>}
      </Link>
      <div className={cn("flex flex-col p-5 sm:p-7", featured && "lg:justify-between lg:p-10")}>
        <div>
          <div className="mb-8 flex items-center justify-between gap-3 text-[10px] font-bold tracking-[0.16em] text-steel uppercase dark:text-mist-blue"><span>{post.category}</span><span>{post.readTime}</span></div>
          <h2 className={cn("font-bold tracking-[-0.045em] text-obsidian dark:text-intelligence-white", featured ? "text-3xl leading-tight sm:text-5xl" : "text-xl leading-tight sm:text-2xl")}>
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-command-blue dark:hover:text-electric-blue">{post.title}</Link>
          </h2>
          <p className="mt-5 text-sm leading-6 text-steel dark:text-mist-blue">{post.subtitle}</p>
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-ice-gray pt-4 text-[10px] font-bold tracking-wider uppercase dark:border-deep-navy">
          <time dateTime={post.date}>{post.displayDate}</time>
          <span className="flex items-center gap-2 text-command-blue dark:text-electric-blue">Read field note <ArrowRight className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </article>
  );
}
