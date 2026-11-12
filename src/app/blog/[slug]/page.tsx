import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { ShareArticle } from "@/components/editorial/ShareArticle";
import { SITE_URL } from "@/lib/seo";
import { getDemoPost, getPublishedBlog, listDemoPosts } from "@/lib/server/blogs";
import { BlogCard, FinalCTA, TextLink } from "@/components/editorial/PagePrimitives";

export const dynamic = "force-dynamic";

type BlogPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const databasePost = await getPublishedBlog(slug);
  if (databasePost) return {
    title: `${databasePost.title} | Cyber-I Insights`,
    description: databasePost.subtitle,
    alternates: { canonical: `/blog/${databasePost.slug}` },
    openGraph: { title: databasePost.title, description: databasePost.subtitle, type: "article", images: [{ url: databasePost.featuredImage, alt: databasePost.imageAlt }] },
  };
  const post = getDemoPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Cyber-I Insights`,
    description: post.subtitle,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.subtitle, type: "article", images: [{ url: post.image, alt: post.imageAlt }] },
  };
}

export default async function SingleBlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const databasePost = await getPublishedBlog(slug);
  if (databasePost) return <PublishedDatabaseBlog post={databasePost} />;
  const post = getDemoPost(slug);
  if (!post) notFound();
  const related = listDemoPosts().filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Cyber-I Editorial Desk" },
    publisher: { "@type": "Organization", name: "Cyber-I" },
    image: post.image,
    mainEntityOfPage: `/blog/${post.slug}`,
  };

  return (
    <main className="my-4 border-x border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white sm:my-6 md:my-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 border-b border-deep-navy px-5 py-4 text-[10px] font-bold tracking-wider text-steel uppercase sm:px-8 lg:px-12"><Link href="/blog" className="text-command-blue hover:underline dark:text-electric-blue">Insights</Link><span>/</span><span>{post.category}</span><span>/</span><span aria-current="page" className="truncate">Field note</span></nav>

      <header className="grid border-b border-deep-navy lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-[0.17em] uppercase"><span className="bg-signal-blue px-3 py-2 text-intelligence-white">{post.category}</span><time dateTime={post.date} className="text-steel dark:text-mist-blue">{post.displayDate}</time><span className="flex items-center gap-1.5 text-steel dark:text-mist-blue"><Clock3 className="h-3.5 w-3.5" />{post.readTime}</span></div>
          <h1 className="mt-10 max-w-6xl text-[clamp(2.5rem,6.6vw,7rem)] leading-[0.96] font-bold tracking-[-0.07em]">{post.title}</h1>
          <p className="mt-8 max-w-3xl border-l-2 border-electric-blue pl-5 text-base leading-7 text-deep-navy dark:text-mist-blue sm:text-xl sm:leading-8">{post.subtitle}</p>
          <div className="mt-10 flex items-center justify-between gap-5 border-t border-ice-gray pt-5 dark:border-deep-navy"><div><p className="text-xs font-bold uppercase">{post.author}</p><p className="mt-1 text-[9px] tracking-widest text-steel uppercase dark:text-mist-blue">{post.authorRole}</p></div><ShareArticle title={post.title} /></div>
        </div>
        <aside className="technical-grid-large hidden border-l border-deep-navy p-8 lg:flex lg:flex-col lg:justify-between" aria-hidden="true"><span className="text-right text-7xl font-bold tracking-[-0.08em] text-ice-gray dark:text-deep-navy">11</span><p className="text-[9px] leading-5 tracking-widest text-steel uppercase">Analysis brief<br />Demo editorial content</p></aside>
      </header>

      <figure className="border-b border-deep-navy p-3 sm:p-5 lg:p-8"><div className="relative aspect-[16/7] min-h-72 overflow-hidden bg-deep-navy"><Image src={post.image} alt={post.imageAlt} fill preload sizes="100vw" className="object-cover grayscale" /><span className="absolute right-3 bottom-3 border border-intelligence-white/50 bg-obsidian/75 px-2 py-1 text-[9px] font-bold tracking-widest text-intelligence-white uppercase">Demo image</span></div><figcaption className="mt-3 flex flex-wrap justify-between gap-2 text-[9px] leading-4 tracking-wider text-steel uppercase"><span>{post.imageAlt}</span><span>Cyber-I staging / Generated demo media</span></figcaption></figure>

      <div className="grid border-b border-deep-navy lg:grid-cols-[18rem_minmax(0,48rem)] lg:justify-center lg:gap-16 xl:grid-cols-[20rem_minmax(0,52rem)_12rem]">
        <aside className="border-b border-deep-navy px-5 py-8 lg:border-r lg:border-b-0 lg:px-8 lg:py-14"><div className="lg:sticky lg:top-8"><p className="mb-5 text-[10px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">On this page</p><nav aria-label="Table of contents" className="divide-y divide-ice-gray border-y border-ice-gray dark:divide-deep-navy dark:border-deep-navy">{post.sections.map((section, index) => <a key={section.id} href={`#${section.id}`} className="flex gap-3 py-3 text-[10px] leading-5 font-bold tracking-wider uppercase hover:text-command-blue dark:hover:text-electric-blue"><span className="text-steel">0{index + 1}</span>{section.title}</a>)}</nav><Link href="/blog" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-steel uppercase hover:text-command-blue"><ArrowLeft className="h-3.5 w-3.5" />All insights</Link></div></aside>

        <article className="px-5 py-12 sm:px-8 sm:py-16 lg:px-0 lg:py-20">
          <p className="text-xl leading-9 font-bold tracking-[-0.025em] sm:text-2xl sm:leading-10">Strong decisions depend on evidence that has been preserved carefully, understood in context, and connected to the question the investigation must answer.</p>
          {post.sections.map((section, index) => <section id={section.id} key={section.id} className="scroll-mt-8 border-t border-ice-gray py-10 first:mt-12 dark:border-deep-navy"><div className="mb-6 flex items-center gap-4"><span className="text-[10px] font-bold text-command-blue dark:text-electric-blue">0{index + 1}</span><h2 className="text-2xl leading-tight font-bold tracking-[-0.04em] sm:text-3xl">{section.title}</h2></div>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-5 text-[15px] leading-8 text-deep-navy last:mb-0 dark:text-mist-blue sm:text-base">{paragraph}</p>)}{section.bullets && <ul className="mt-7 border-y border-deep-navy">{section.bullets.map((bullet, bulletIndex) => <li key={bullet} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-ice-gray py-4 text-sm leading-6 last:border-b-0 dark:border-deep-navy"><span className="font-bold text-command-blue dark:text-electric-blue">{String(bulletIndex + 1).padStart(2,"0")}</span><span>{bullet}</span></li>)}</ul>}{index === 1 && <aside className="mt-10 border border-command-blue bg-ice-gray/50 p-5 dark:bg-midnight sm:p-7"><p className="text-[9px] font-bold tracking-[0.2em] text-command-blue uppercase dark:text-electric-blue">Field note</p><p className="mt-4 text-base leading-7 font-bold">When a situation may have legal, regulatory, employment, or criminal implications, coordinate the response with appropriate legal and specialist advice.</p></aside>}</section>)}
          <div className="mt-6 border-l-2 border-electric-blue bg-midnight p-6 text-intelligence-white sm:p-8"><p className="text-[9px] font-bold tracking-[0.2em] text-electric-blue uppercase">Contextual next step</p><h2 className="mt-4 text-2xl font-bold tracking-[-0.04em] uppercase">Need help structuring an investigation or evidence requirement?</h2><p className="mt-4 text-sm leading-6 text-mist-blue">Share the situation at a high level without sending sensitive evidence through the general enquiry form.</p><div className="mt-6"><TextLink href="/contact" inverse>Discuss your requirement</TextLink></div></div>
        </article>

        <aside className="hidden border-l border-deep-navy px-5 py-20 xl:block"><p className="sticky top-8 text-[9px] leading-5 tracking-widest text-steel uppercase">CYBER-I<br />INSIGHT NODE<br />{post.category}<br /><br />Educational content<br />Not legal advice</p></aside>
      </div>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12"><div className="mb-8 flex items-end justify-between gap-4 border-b border-deep-navy pb-4"><div><p className="text-[10px] font-bold tracking-widest text-command-blue uppercase dark:text-electric-blue">Continue reading</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] uppercase">Related field notes</h2></div><Link href="/blog" className="hidden items-center gap-2 text-[10px] font-bold tracking-widest uppercase sm:flex">All insights <ArrowRight className="h-4 w-4" /></Link></div><div className="grid gap-5 lg:grid-cols-2">{related.map((item) => <BlogCard key={item.slug} post={item} />)}</div></section>
      <FinalCTA eyebrow="From insight to action" title="Make the next decision with better context." description="Explore Cyber-I services or start a careful conversation about the situation you are facing." secondaryHref="/services" secondaryLabel="Explore services" />
    </main>
  );
}

async function PublishedDatabaseBlog({ post }: { post: NonNullable<Awaited<ReturnType<typeof getPublishedBlog>>> }) {
  const articleSchema = {
    "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.subtitle,
    datePublished: (post.publishedAt || post.updatedAt).toISOString(), dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Organization", name: post.authorName }, publisher: { "@type": "Organization", name: "Cyber-I" },
    image: new URL(post.featuredImage, SITE_URL).href, mainEntityOfPage: `/blog/${post.slug}`,
  };
  return <main className="my-4 border-x border-deep-navy bg-intelligence-white text-obsidian dark:bg-obsidian dark:text-intelligence-white sm:my-6 md:my-8">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 border-b border-deep-navy px-5 py-4 text-[10px] font-bold tracking-wider text-steel uppercase sm:px-8 lg:px-12"><Link href="/blog" className="text-command-blue hover:underline dark:text-electric-blue">Insights</Link><span>/</span><span>{post.category}</span><span>/</span><span aria-current="page" className="truncate">Article</span></nav>
    <header className="grid border-b border-deep-navy lg:grid-cols-[minmax(0,1fr)_18rem]"><div className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"><div className="flex flex-wrap items-center gap-4 text-[10px] font-bold tracking-[0.17em] uppercase"><span className="bg-signal-blue px-3 py-2 text-intelligence-white">{post.category}</span><time dateTime={(post.publishedAt || post.updatedAt).toISOString()} className="text-steel dark:text-mist-blue">{post.displayDate}</time><span className="flex items-center gap-1.5 text-steel dark:text-mist-blue"><Clock3 className="h-3.5 w-3.5" />{post.readTime}</span></div><h1 className="mt-10 max-w-6xl text-[clamp(2.5rem,6.6vw,7rem)] leading-[0.96] font-bold tracking-[-0.07em]">{post.title}</h1><p className="mt-8 max-w-3xl border-l-2 border-electric-blue pl-5 text-base leading-7 text-deep-navy dark:text-mist-blue sm:text-xl sm:leading-8">{post.subtitle}</p><div className="mt-10 flex items-center justify-between gap-4 border-t border-ice-gray pt-5 dark:border-deep-navy"><div><p className="text-xs font-bold uppercase">{post.authorName}</p><p className="mt-1 text-[9px] tracking-widest text-steel uppercase dark:text-mist-blue">Cyber-I Editorial Desk</p></div><ShareArticle title={post.title} /></div></div><aside className="technical-grid-large hidden border-l border-deep-navy p-8 lg:flex lg:flex-col lg:justify-between" aria-hidden="true"><span className="text-right text-7xl font-bold tracking-[-0.08em] text-ice-gray dark:text-deep-navy">{new Date(post.publishedAt || post.updatedAt).getFullYear().toString().slice(-2)}</span><p className="text-[9px] leading-5 tracking-widest text-steel uppercase">Cyber-I insight<br />Published field note</p></aside></header>
    <figure className="border-b border-deep-navy p-3 sm:p-5 lg:p-8"><div className="relative aspect-[16/7] min-h-72 overflow-hidden bg-deep-navy"><Image src={post.featuredImage} alt={post.imageAlt} fill preload unoptimized sizes="100vw" className="object-cover" /></div><figcaption className="mt-3 text-[9px] leading-4 tracking-wider text-steel uppercase">{post.imageAlt}</figcaption></figure>
    <div className="mx-auto max-w-[52rem] px-5 py-12 sm:px-8 sm:py-16 lg:py-20"><article className="published-blog-body" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} /><div className="mt-14 border-l-2 border-electric-blue bg-midnight p-6 text-intelligence-white sm:p-8"><p className="text-[9px] font-bold tracking-[0.2em] text-electric-blue uppercase">Contextual next step</p><h2 className="mt-4 text-2xl font-bold tracking-[-0.04em] uppercase">Need help applying this insight?</h2><p className="mt-4 text-sm leading-6 text-mist-blue">Start a careful conversation with the Cyber-I team without sharing sensitive evidence through the general enquiry form.</p><div className="mt-6"><TextLink href="/contact" inverse>Discuss your requirement</TextLink></div></div></div>
    <FinalCTA eyebrow="From insight to action" title="Make the next decision with better context." description="Explore Cyber-I services or start a careful conversation about the situation you are facing." secondaryHref="/services" secondaryLabel="Explore services" />
  </main>;
}
