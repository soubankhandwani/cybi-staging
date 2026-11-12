import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { academyCourses, getCourse } from "@/components/academy/academy-data";

const previousCourseSlugs = new Set([
  "basic-course-cyber-investigation",
  "advanced-course-cyber-forensics",
  "advanced-course-cyber-law-digital-evidence",
]);

type CoursePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return academyCourses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: `${course.title} | Cyber-I Academy`,
    description: `Explore the ${course.title} ${course.type.toLowerCase()} course from Cyber-I Consultancy Services.`,
  };
}

export default async function CourseDetailsPage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (previousCourseSlugs.has(slug)) redirect("/courses#programs");
  if (!course) notFound();
  const enquiryHref = `/contact?intent=course-advisor&course=${course.slug}#enquiry`;

  return (
    <main className="course-detail mt-4 border-x border-deep-navy bg-white text-obsidian">
      <nav aria-label="Breadcrumb" className="border-b border-[#d8d8d8] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-5 py-4 text-xs text-[#4d4d4d] md:px-8">
          <Link href="/courses" className="font-bold text-command-blue hover:underline">Courses</Link>
          <span aria-hidden="true">›</span>
          <span>{course.type} Courses</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{course.title}</span>
        </div>
      </nav>

      <section className="bg-[#0f2742] text-white" aria-labelledby="course-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
          <div className="self-center">
            <p className="mb-5 text-xs font-bold tracking-[0.12em] text-[#9cc8ff] uppercase">{course.type} Course</p>
            <h1 id="course-title" className="max-w-4xl text-3xl leading-tight font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">{course.title}</h1>
            <p className="mt-7 text-sm text-white/80">Offered by <span className="font-bold text-white">Cyber-I Consultancy Services</span></p>
          </div>

          <aside aria-label="Course enrolment information" className="overflow-hidden border border-[#c8c8c8] bg-white text-obsidian shadow-[0_4px_18px_rgba(0,0,0,0.24)]">
            <div className="p-6">
              <Link href={enquiryHref} className="flex min-h-12 w-full items-center justify-center bg-[#0056d2] px-5 text-sm font-bold text-white transition-colors hover:bg-[#00419e]">
                Ask about this course
              </Link>
              <dl className="mt-6 divide-y divide-[#e5e5e5] border-t border-[#e5e5e5] text-sm">
                <Fact label="Course type" value={course.type} />
                <Fact label="Schedule & format" value="Enquire for details" />
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16" aria-labelledby="details-title">
        <h2 id="details-title" className="text-2xl font-bold md:text-3xl">Course details</h2>
        <p className="mt-5 max-w-3xl text-base leading-7 text-[#373737]">Ask us about the syllabus, eligibility, fees, delivery format and upcoming dates for {course.title}.</p>
      </section>

      <section className="border-t border-[#bfd5ef] bg-[#eef5ff]" aria-labelledby="advisor-title">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 id="advisor-title" className="text-2xl font-bold">Interested in this course?</h2>
            <p className="mt-2 text-sm text-[#373737]">Ask about the syllabus, schedule, delivery mode and next batch.</p>
          </div>
          <Link href={enquiryHref} className="flex min-h-12 shrink-0 items-center justify-center gap-3 bg-[#0056d2] px-6 text-sm font-bold text-white transition-colors hover:bg-[#00419e]">
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
