"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { academyCourses, courseIntroduction, courseTypes, learningApproach, type AcademyCourse, type CourseType } from "@/components/academy/academy-data";

type CourseFilter = "all" | CourseType;

const learningSteps = [
  ["01", "Learn", "Build the concepts, vocabulary and workflow behind the discipline."],
  ["02", "Examine", "Work through cases, evidence questions and investigation context where the programme supports it."],
  ["03", "Analyze", "Connect technical information with investigative or legal meaning."],
  ["04", "Apply", "Use structured knowledge in scenarios and professional contexts."],
];

export function AcademyPage() {
  const [query, setQuery] = useState("");
  const [courseType, setCourseType] = useState<CourseFilter>("all");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredCourses = academyCourses.filter((course) =>
    (courseType === "all" || course.type === courseType) && course.title.toLowerCase().includes(normalizedQuery)
  );

  const resetFilters = () => {
    setQuery("");
    setCourseType("all");
  };

  return (
    <main className="mt-4 overflow-hidden border-x border-deep-navy bg-[#f8f6f0] text-obsidian dark:bg-obsidian dark:text-intelligence-white">
      <AcademyHero />

      <section aria-labelledby="course-types-title" className="border-b border-deep-navy bg-intelligence-white dark:bg-midnight">
        <div className="p-6 md:p-10">
          <h2 id="course-types-title" className="text-[clamp(2.15rem,5.5vw,5.7rem)] leading-[0.92] font-bold tracking-[-0.055em] uppercase">Explore the <span className="text-command-blue dark:text-electric-blue">courses.</span></h2>
        </div>
        <div className="grid gap-px border-t border-deep-navy bg-deep-navy md:grid-cols-2">
          {courseTypes.map((type) => (
            <a key={type} href="#programs" onClick={() => { setQuery(""); setCourseType(type); }} className="group flex items-center justify-between gap-5 bg-[#f8f6f0] p-6 transition-colors hover:bg-command-blue hover:text-white dark:bg-obsidian dark:hover:bg-command-blue md:p-10">
              <div>
                <h3 className="text-2xl font-bold tracking-tight uppercase sm:text-3xl">{`${type} Courses`}</h3>
                <p className="mt-3 text-sm">{academyCourses.filter((course) => course.type === type).length} programmes</p>
              </div>
              <ArrowDown className="h-7 w-7 shrink-0 transition-transform group-hover:translate-y-2" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section id="programs" aria-labelledby="programs-title" className="scroll-mt-6 border-b border-deep-navy bg-intelligence-white dark:bg-obsidian">
        <div className="grid border-b border-deep-navy lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-deep-navy p-6 lg:border-r lg:border-b-0 lg:p-10"><AcademyLabel>Programme finder / 03</AcademyLabel></div>
          <div className="p-6 lg:p-10">
            <h2 id="programs-title" className="text-[clamp(2.4rem,5.8vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.06em] uppercase">Find your <span className="text-command-blue dark:text-electric-blue">programme.</span></h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue">Search by course name or filter by course type.</p>
          </div>
        </div>

        <div className="grid border-b border-deep-navy bg-[#e9eef5] dark:bg-midnight lg:grid-cols-[1fr_0.7fr_auto]">
          <label className="relative flex items-center border-b border-deep-navy lg:border-r lg:border-b-0">
            <span className="sr-only">Search programmes</span>
            <Search className="absolute left-5 h-4 w-4 text-command-blue dark:text-electric-blue" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="SEARCH COURSES"
              className="academy-search min-h-16 w-full bg-transparent py-4 pr-12 pl-13 text-xs font-bold tracking-[0.11em] uppercase placeholder:text-steel focus:outline-none"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 cursor-pointer p-2"><X className="h-4 w-4" /></button>}
          </label>
          <FilterSelect label="Course type" value={courseType} onChange={(value) => setCourseType(value as CourseFilter)} options={[
            ["all", "All courses"], ...courseTypes.map((type) => [type, type]),
          ]} />
          <button type="button" onClick={resetFilters} className="flex min-h-16 cursor-pointer items-center justify-center gap-2 px-6 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors hover:bg-deep-navy hover:text-white"><SlidersHorizontal className="h-3.5 w-3.5" />Reset</button>
        </div>

        <div aria-live="polite" className="flex items-center justify-between border-b border-deep-navy px-6 py-4 text-[9px] font-bold tracking-[0.16em] text-steel uppercase md:px-10">
          <span>{filteredCourses.length.toString().padStart(2, "0")} programmes shown</span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid gap-px bg-deep-navy lg:grid-cols-2">
            {filteredCourses.map((course) => <CourseCard key={course.slug} course={course} />)}
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
            <BookOpen className="mb-5 h-8 w-8 text-command-blue" aria-hidden="true" />
            <h3 className="text-2xl font-bold uppercase">No programme matches those filters.</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-steel">Try another search term or course type.</p>
            <button type="button" onClick={resetFilters} className="mt-7 border-b-2 border-command-blue pb-1 text-xs font-bold tracking-widest uppercase">Clear all filters</button>
          </div>
        )}
      </section>

      <section aria-labelledby="practice-title" className="grid border-b border-deep-navy bg-[#f8f6f0] dark:bg-obsidian xl:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden border-b border-deep-navy bg-command-blue p-7 text-white xl:border-r xl:border-b-0 xl:p-12">
          <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative">
            <AcademyLabel light>Learning experience / 04</AcademyLabel>
            <h2 id="practice-title" className="mt-16 text-[clamp(2.7rem,5.5vw,6rem)] leading-[0.9] font-bold tracking-[-0.06em] uppercase">Knowledge<br />you can<br /><span className="text-electric-blue">work with.</span></h2>
            <p className="mt-8 max-w-lg text-sm leading-7 font-bold text-white/80">{learningApproach}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2">
          {learningSteps.map(([number, title, copy], index) => (
            <article key={title} className={`min-h-[250px] border-b border-deep-navy p-7 odd:sm:border-r sm:p-9 ${index >= 2 ? "sm:border-b-0" : ""}`}>
              <div className="flex items-center justify-between"><span className="text-[9px] font-bold tracking-[0.16em] text-steel uppercase">Session marker</span><span className="text-sm font-bold text-command-blue dark:text-electric-blue">{number}</span></div>
              <h3 className="mt-12 text-3xl font-bold uppercase">{title}</h3>
              <p className="mt-5 max-w-md text-sm leading-6 font-bold text-deep-navy dark:text-mist-blue">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="advisor" aria-labelledby="advisor-title" className="grid bg-electric-blue text-obsidian lg:grid-cols-[1fr_auto]">
        <div className="p-7 md:p-12 lg:p-16">
          <AcademyLabel>Course guidance / Final note</AcademyLabel>
          <h2 id="advisor-title" className="mt-10 max-w-5xl text-[clamp(2.7rem,6.4vw,7.4rem)] leading-[0.87] font-bold tracking-[-0.065em] uppercase">Not sure where<br />to start?</h2>
          <p className="mt-7 max-w-2xl text-sm leading-7 font-bold">Ask about the syllabus, eligibility, dates and delivery format for the courses you are considering.</p>
        </div>
        <div className="flex min-w-[300px] flex-col justify-end border-t border-obsidian p-7 lg:border-t-0 lg:border-l lg:p-12">
          <Link href="/contact?intent=course-advisor" className="group flex min-h-20 items-center justify-between border-2 border-obsidian bg-obsidian px-6 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-obsidian">
            Talk to a course advisor <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="#programs" className="mt-4 flex min-h-16 items-center justify-between border-2 border-obsidian px-6 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-white">Explore all programs <ArrowDown className="h-4 w-4" /></a>
        </div>
      </section>
    </main>
  );
}

function AcademyHero() {
  return (
    <section aria-labelledby="academy-title" className="relative min-h-[760px] border-b border-deep-navy bg-[#f8f6f0] dark:bg-obsidian">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(33,55,90,.13)_1px,transparent_1px)] [background-size:100%_32px] dark:opacity-15" />
      <div className="relative grid min-h-[760px] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-12">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div><AcademyLabel>Cyber-I Academy / Professional Education</AcademyLabel><p className="mt-3 text-[9px] font-bold tracking-[0.16em] text-steel uppercase">Academy prospectus / Course index</p></div>
            <div className="border border-deep-navy bg-intelligence-white px-4 py-3 text-[9px] font-bold tracking-[0.14em] uppercase dark:bg-midnight">{academyCourses.length} programmes</div>
          </div>
          <div className="my-16">
            <p className="mb-5 text-[10px] font-bold tracking-[0.22em] text-command-blue uppercase dark:text-electric-blue">Learn / Examine / Analyze / Apply</p>
            <h1 id="academy-title" className="max-w-6xl text-[clamp(2rem,5.5vw,6.25rem)] leading-[0.82] font-bold tracking-[-0.075em] uppercase">
              Building Investigative Capacity Through <span className="text-command-blue dark:text-electric-blue">Practical Learning</span>
            </h1>
          </div>
          <div className="grid gap-8 border-t border-deep-navy pt-7 xl:grid-cols-[1fr_auto] xl:items-end">
            <p className="max-w-3xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue md:text-base">{courseIntroduction}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#programs" className="flex items-center justify-center gap-3 border-2 border-command-blue bg-command-blue px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-electric-blue hover:text-obsidian">Explore programs <ArrowDown className="h-4 w-4" /></a>
              <a href="#advisor" className="flex items-center justify-center border-2 border-deep-navy px-6 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-deep-navy hover:text-white">Talk to an advisor</a>
            </div>
          </div>
        </div>
        <aside className="relative hidden overflow-hidden border-l border-deep-navy bg-intelligence-white dark:bg-midnight lg:block" aria-label="Academy learning map">
          <div className="absolute inset-x-0 top-0 h-14 border-b border-deep-navy bg-electric-blue px-6 py-5 text-[9px] font-bold tracking-[0.18em] text-obsidian uppercase">Course catalogue</div>
          <div className="absolute inset-x-6 top-24 border border-deep-navy bg-[#f8f6f0] p-6 text-obsidian shadow-[12px_12px_0_#21375a]">
            <p className="text-[9px] font-bold tracking-[0.16em] text-command-blue uppercase">Programme types</p>
            <div className="mt-8 space-y-7">
              {courseTypes.map((type) => <div key={type} className="border-b border-deep-navy pb-5"><p className="text-sm font-bold uppercase">{type} Courses</p><p className="mt-3 text-xs">{academyCourses.filter((course) => course.type === type).length} programmes</p></div>)}
            </div>
          </div>
          <div className="absolute right-6 bottom-7 left-6 grid grid-cols-3 gap-px bg-deep-navy border border-deep-navy">
            {["Learn", "Practice", "Apply"].map((item, index) => <div key={item} className="bg-midnight p-4 text-center text-[8px] font-bold tracking-[0.16em] text-mist-blue uppercase"><span className="mb-2 block text-electric-blue">0{index + 1}</span>{item}</div>)}
          </div>
        </aside>
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: AcademyCourse }) {
  return (
    <article className="flex min-h-56 flex-col bg-[#f8f6f0] p-7 dark:bg-midnight sm:p-9">
      <p className="text-[9px] font-bold tracking-[0.15em] text-command-blue uppercase dark:text-electric-blue">{course.type} Course</p>
      <h3 className="mt-5 mb-8 text-[clamp(1.5rem,2.6vw,2.5rem)] leading-tight font-bold tracking-[-0.04em]">{course.title}</h3>
      <Link href={`/courses/${course.slug}`} aria-label={`View course details for ${course.title}`} className="group mt-auto flex min-h-14 items-center justify-between gap-3 border-t-2 border-deep-navy py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:border-command-blue hover:text-command-blue dark:hover:text-electric-blue">
        View course details <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return (
    <label className="grid min-h-16 grid-cols-[auto_1fr] items-center gap-3 border-b border-deep-navy px-5 lg:border-r lg:border-b-0">
      <span className="text-[8px] font-bold tracking-[0.13em] text-steel uppercase">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full cursor-pointer bg-transparent py-4 text-[10px] font-bold tracking-[0.1em] uppercase focus:outline-none dark:bg-midnight">
        {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
      </select>
    </label>
  );
}

function AcademyLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-[9px] font-bold tracking-[0.2em] uppercase ${light ? "text-electric-blue" : "text-command-blue dark:text-electric-blue"}`}><span className="mr-2">/</span>{children}</p>;
}
