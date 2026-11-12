import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { academyCourses, getCourse } from "@/components/academy/academy-data";

type CoursePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return academyCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} (${course.code}) | Cyber-I Academy`,
    description: course.summary,
  };
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <main className="course-detail mt-4 border-x border-deep-navy bg-white text-obsidian">
      <nav aria-label="Breadcrumb" className="border-b border-[#d8d8d8] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-4 text-xs text-[#4d4d4d] md:px-8">
          <Link href="/courses" className="font-bold text-command-blue hover:underline">Courses</Link>
          <span aria-hidden="true">›</span>
          <span>{course.discipline}</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{course.code}</span>
        </div>
      </nav>

      <section className="bg-[#0f2742] text-white" aria-labelledby="course-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="self-center">
            <p className="mb-5 text-xs font-bold tracking-[0.12em] text-[#9cc8ff] uppercase">{course.code} · {course.level}</p>
            <h1 id="course-title" className="max-w-4xl text-3xl leading-tight font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{course.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#e7edf5] md:text-lg">{course.summary}</p>
            <p className="mt-7 text-sm text-white/80">Offered by <span className="font-bold text-white">Cyber-I Academy</span></p>
          </div>

          <aside aria-label="Course enrolment information" className="overflow-hidden border border-[#c8c8c8] bg-white text-obsidian shadow-[0_4px_18px_rgba(0,0,0,0.24)]">
            <div className="relative aspect-[16/8]">
              <Image src={course.image} alt={course.imageAlt} fill preload sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
            </div>
            <div className="p-6">
              <Link href={`/contact?intent=course-advisor&course=${course.code}`} className="flex min-h-12 w-full items-center justify-center bg-[#0056d2] px-5 text-sm font-bold text-white transition-colors hover:bg-[#00419e]">
                Ask about this course
              </Link>
              <Link href={`/contact?intent=course-question&course=${course.code}`} className="mt-3 flex min-h-11 w-full items-center justify-center border-2 border-[#0056d2] px-5 text-sm font-bold text-[#0056d2] transition-colors hover:bg-[#eef5ff]">
                Contact a course advisor
              </Link>
              <dl className="mt-6 divide-y divide-[#e5e5e5] border-t border-[#e5e5e5] text-sm">
                <Fact label="Level" value={course.level} />
                <Fact label="Subject" value={course.discipline} />
                <Fact label="Schedule & mode" value="Ask an advisor" />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <div className="border-b border-[#d8d8d8] bg-white">
        <nav aria-label="On this page" className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-5 md:px-8">
          <a href="#overview" className="border-b-4 border-[#0056d2] py-5 text-sm font-bold whitespace-nowrap">About</a>
          <a href="#outcomes" className="py-5 text-sm font-bold whitespace-nowrap hover:text-[#0056d2]">What you&apos;ll learn</a>
          <a href="#curriculum" className="py-5 text-sm font-bold whitespace-nowrap hover:text-[#0056d2]">Course content</a>
          <a href="#details" className="py-5 text-sm font-bold whitespace-nowrap hover:text-[#0056d2]">Details</a>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="max-w-4xl">
          <section id="overview" className="scroll-mt-8 border-b border-[#d8d8d8] pb-12" aria-labelledby="overview-title">
            <h2 id="overview-title" className="text-2xl font-bold md:text-3xl">About this course</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-[#373737]">{course.decisionNote}</p>
            <div className="mt-8 border border-[#d8d8d8] bg-[#f7f9fa] p-6">
              <h3 className="text-base font-bold">Who this course is for</h3>
              <p className="mt-2 text-sm leading-6 text-[#373737]">{course.audience}</p>
            </div>
          </section>

          <section id="outcomes" className="scroll-mt-8 border-b border-[#d8d8d8] py-12" aria-labelledby="outcomes-title">
            <h2 id="outcomes-title" className="text-2xl font-bold md:text-3xl">What you&apos;ll learn</h2>
            <ul className="mt-7 grid gap-x-10 gap-y-5 md:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-6 text-[#373737]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#0056d2]" aria-hidden="true" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <h3 className="text-base font-bold">Skills and concepts</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.topics.map((topic) => <span key={topic} className="bg-[#eef2f6] px-3 py-2 text-xs font-bold text-[#27384a]">{topic}</span>)}
              </div>
            </div>
          </section>

          <section id="curriculum" className="scroll-mt-8 border-b border-[#d8d8d8] py-12" aria-labelledby="curriculum-title">
            <h2 id="curriculum-title" className="text-2xl font-bold md:text-3xl">Course content</h2>
            {course.curriculumVerified ? (
              <>
                <p className="mt-3 text-sm text-[#5b5b5b]">Topics currently listed for this course</p>
                <div className="mt-7 border border-[#cfcfcf]">
                  {course.curriculum.map((topic, index) => (
                    <div key={topic} className="flex items-center gap-4 border-b border-[#dedede] px-5 py-4 last:border-b-0">
                      <span className="w-7 shrink-0 text-xs font-bold text-[#6b6b6b]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-bold">{topic}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mt-7 border border-[#9bb9df] bg-[#f1f6fd] p-6">
                <p className="font-bold">The detailed curriculum is being verified.</p>
                <p className="mt-2 text-sm leading-6 text-[#373737]">Contact a course advisor for the latest syllabus before making your decision.</p>
              </div>
            )}
          </section>

          <section id="details" className="scroll-mt-8 py-12" aria-labelledby="details-title">
            <h2 id="details-title" className="text-2xl font-bold md:text-3xl">Course details</h2>
            <dl className="mt-7 border-t border-[#cfcfcf]">
              <DetailRow label="Level" value={course.level} />
              <DetailRow label="Duration" value="Confirm with a course advisor" />
              <DetailRow label="Delivery mode" value="Confirm with a course advisor" />
              <DetailRow label="Next batch" value="Confirm with a course advisor" />
              <DetailRow label="Certificate" value="Details not yet published" />
            </dl>
          </section>
        </div>
      </div>

      <section className="border-t border-[#bfd5ef] bg-[#eef5ff]" aria-labelledby="advisor-title">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 id="advisor-title" className="text-2xl font-bold">Interested in this course?</h2>
            <p className="mt-2 text-sm text-[#373737]">Ask about the syllabus, schedule, delivery mode and next batch.</p>
          </div>
          <Link href={`/contact?intent=course-advisor&course=${course.code}`} className="flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#0056d2] px-6 text-sm font-bold text-white transition-colors hover:bg-[#00419e]">
            Talk to a course advisor <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="border-t border-[#d8d8d8] px-5 py-6 md:px-8">
        <Link href="/courses#programs" className="mx-auto flex max-w-7xl items-center gap-2 text-sm font-bold text-[#0056d2] hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back to all courses</Link>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[110px_1fr] gap-3 py-3"><dt className="text-[#666]">{label}</dt><dd className="font-bold">{value}</dd></div>;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return <div className="grid gap-2 border-b border-[#cfcfcf] py-5 sm:grid-cols-[190px_1fr]"><dt className="text-sm font-bold">{label}</dt><dd className="text-sm text-[#373737]">{value}</dd></div>;
}
