"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, BookOpen, Search, SlidersHorizontal, X } from "lucide-react";
import { academyCourses, disciplines, type CourseLevel, type DisciplineId } from "@/components/academy/academy-data";

type DisciplineFilter = "all" | DisciplineId;
type LevelFilter = "all" | CourseLevel;

const learningSteps = [
  ["01", "Learn", "Build the concepts, vocabulary and workflow behind the discipline."],
  ["02", "Examine", "Work through cases, evidence questions and investigation context where the programme supports it."],
  ["03", "Analyze", "Connect technical information with investigative or legal meaning."],
  ["04", "Apply", "Use structured knowledge in scenarios and professional contexts."],
];

export function AcademyPage() {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState<DisciplineFilter>("all");
  const [level, setLevel] = useState<LevelFilter>("all");

  const filteredCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return academyCourses.filter((course) => {
      const matchesDiscipline = discipline === "all" || course.disciplineId === discipline;
      const matchesLevel = level === "all" || course.level === level;
      const matchesQuery = !normalizedQuery || [course.code, course.title, course.discipline, ...course.topics]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesDiscipline && matchesLevel && matchesQuery;
    });
  }, [discipline, level, query]);

  const resetFilters = () => {
    setQuery("");
    setDiscipline("all");
    setLevel("all");
  };

  return (
    <main className="mt-4 overflow-hidden border-x border-deep-navy bg-[#f8f6f0] text-obsidian dark:bg-obsidian dark:text-intelligence-white">
      <AcademyHero />

      <section id="disciplines" aria-labelledby="disciplines-title" className="border-b border-deep-navy">
        <div className="grid border-b border-deep-navy bg-intelligence-white dark:bg-midnight md:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-deep-navy p-6 md:border-r md:border-b-0 md:p-10">
            <AcademyLabel>Curriculum map / 01</AcademyLabel>
          </div>
          <div className="p-6 md:p-10">
            <h2 id="disciplines-title" className="max-w-4xl text-[clamp(2.15rem,5.5vw,5.7rem)] leading-[0.92] font-bold tracking-[-0.055em] uppercase">
              Choose your <span className="text-command-blue dark:text-electric-blue">discipline.</span>
            </h2>
          </div>
        </div>

        <div className="divide-y divide-deep-navy bg-[#f8f6f0] dark:bg-obsidian">
          {disciplines.map((item) => (
            <a
              key={item.id}
              href="#programs"
              onClick={() => setDiscipline(item.id)}
              className="group grid min-h-[190px] items-stretch transition-colors hover:bg-command-blue hover:text-white md:grid-cols-[110px_1.25fr_1fr_90px]"
            >
              <div className="flex items-center border-b border-deep-navy p-6 text-4xl font-bold text-command-blue group-hover:text-electric-blue md:border-r md:border-b-0 md:p-8">{item.number}</div>
              <div className="flex items-center border-b border-deep-navy p-6 md:border-r md:border-b-0 md:p-8">
                <h3 className="text-2xl leading-none font-bold tracking-[-0.035em] uppercase sm:text-3xl lg:text-4xl">{item.name}</h3>
              </div>
              <div className="flex flex-col justify-center gap-5 border-b border-deep-navy p-6 md:border-r md:border-b-0 md:p-8">
                <p className="max-w-xl text-sm leading-6 font-bold text-deep-navy group-hover:text-white/80 dark:text-mist-blue">{item.purpose}</p>
                <div className="flex items-center gap-3 text-xs font-bold tracking-[0.18em] uppercase">
                  <span>{item.pathway[0]}</span><ArrowRight className="h-4 w-4" aria-hidden="true" /><span>{item.pathway[1]}</span>
                  <span className="ml-1 text-[9px] text-steel group-hover:text-electric-blue">Suggested progression</span>
                </div>
              </div>
              <div className="flex items-center justify-center p-6"><ArrowDown className="h-7 w-7 transition-transform group-hover:translate-y-2" aria-hidden="true" /></div>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="pathway-title" className="border-b border-deep-navy bg-midnight px-6 py-16 text-white md:px-10 md:py-24">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <AcademyLabel light>Learning pathways / 02</AcademyLabel>
          <div>
            <h2 id="pathway-title" className="text-[clamp(2.4rem,5.8vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.06em] uppercase">
              Start with foundations.<br /><span className="text-electric-blue">Advance with focus.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-sm leading-7 font-bold text-mist-blue">Each discipline has a basic and advanced programme. The sequence below is a suggested learning path; prerequisite requirements should be confirmed with a course advisor.</p>
          </div>
        </div>
        <div className="grid border border-deep-navy lg:grid-cols-3">
          {disciplines.map((item, index) => (
            <div key={item.id} className="relative overflow-hidden border-b border-deep-navy p-7 last:border-b-0 lg:min-h-[300px] lg:border-r lg:border-b-0 lg:last:border-r-0">
              <span className="absolute -right-3 -bottom-12 text-[11rem] leading-none font-bold text-white/[0.025]">{item.number}</span>
              <p className="text-[9px] font-bold tracking-[0.18em] text-electric-blue uppercase">Track {String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 max-w-sm text-xl font-bold uppercase">{item.name}</h3>
              <div className="mt-12 flex items-center gap-3" aria-label={`${item.pathway[0]} to ${item.pathway[1]}`}>
                <span className="border border-mist-blue/50 bg-white/5 px-4 py-3 text-lg font-bold">{item.pathway[0]}</span>
                <span className="h-px flex-1 bg-electric-blue" />
                <ArrowRight className="-ml-4 h-5 w-5 text-electric-blue" aria-hidden="true" />
                <span className="border border-electric-blue bg-electric-blue px-4 py-3 text-lg font-bold text-obsidian">{item.pathway[1]}</span>
              </div>
              <div className="mt-4 flex justify-between text-[8px] font-bold tracking-[0.16em] text-mist-blue uppercase"><span>Foundation</span><span>Advanced</span></div>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" aria-labelledby="programs-title" className="scroll-mt-6 border-b border-deep-navy bg-intelligence-white dark:bg-obsidian">
        <div className="grid border-b border-deep-navy lg:grid-cols-[0.7fr_1.3fr]">
          <div className="border-b border-deep-navy p-6 lg:border-r lg:border-b-0 lg:p-10"><AcademyLabel>Programme finder / 03</AcademyLabel></div>
          <div className="p-6 lg:p-10">
            <h2 id="programs-title" className="text-[clamp(2.4rem,5.8vw,6.25rem)] leading-[0.9] font-bold tracking-[-0.06em] uppercase">Find your <span className="text-command-blue dark:text-electric-blue">programme.</span></h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue">Search by programme name, code or subject. Then narrow the catalogue by discipline and level.</p>
          </div>
        </div>

        <div className="grid border-b border-deep-navy bg-[#e9eef5] dark:bg-midnight lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
          <label className="relative flex items-center border-b border-deep-navy lg:border-r lg:border-b-0">
            <span className="sr-only">Search programmes</span>
            <Search className="absolute left-5 h-4 w-4 text-command-blue dark:text-electric-blue" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="SEARCH TITLE, CODE OR SUBJECT"
              className="academy-search min-h-16 w-full bg-transparent py-4 pr-12 pl-13 text-xs font-bold tracking-[0.11em] uppercase placeholder:text-steel focus:outline-none"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-4 cursor-pointer p-2"><X className="h-4 w-4" /></button>}
          </label>
          <FilterSelect label="Discipline" value={discipline} onChange={(value) => setDiscipline(value as DisciplineFilter)} options={[
            ["all", "All disciplines"], ["investigation", "Investigation"], ["forensics", "Forensics"], ["law", "Cyber law"],
          ]} />
          <FilterSelect label="Level" value={level} onChange={(value) => setLevel(value as LevelFilter)} options={[["all", "All levels"], ["Foundation", "Foundation"], ["Advanced", "Advanced"]]} />
          <button type="button" onClick={resetFilters} className="flex min-h-16 cursor-pointer items-center justify-center gap-2 px-6 text-[10px] font-bold tracking-[0.16em] uppercase transition-colors hover:bg-deep-navy hover:text-white"><SlidersHorizontal className="h-3.5 w-3.5" />Reset</button>
        </div>

        <div aria-live="polite" className="flex items-center justify-between border-b border-deep-navy px-6 py-4 text-[9px] font-bold tracking-[0.16em] text-steel uppercase md:px-10">
          <span>{filteredCourses.length.toString().padStart(2, "0")} programmes shown</span><span>Academy index / Demo selection</span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid gap-px bg-deep-navy lg:grid-cols-2">
            {filteredCourses.map((course, index) => <CourseCard key={course.slug} course={course} featured={filteredCourses.length === 3 && index === 0} />)}
          </div>
        ) : (
          <div className="flex min-h-[360px] flex-col items-center justify-center p-8 text-center">
            <BookOpen className="mb-5 h-8 w-8 text-command-blue" aria-hidden="true" />
            <h3 className="text-2xl font-bold uppercase">No programme matches those filters.</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-steel">Try another subject, discipline or level.</p>
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
            <p className="mt-8 max-w-lg text-sm leading-7 font-bold text-white/80">Investigation programmes draw on documented case studies, tools and scenario-based learning. Programme-specific practical components for forensics and law are confirmed during course guidance.</p>
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

      <section aria-labelledby="faculty-title" className="border-b border-deep-navy bg-intelligence-white p-6 dark:bg-midnight md:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <AcademyLabel>Practitioner context / 05</AcademyLabel>
            <h2 id="faculty-title" className="mt-10 max-w-5xl text-[clamp(2.5rem,5.7vw,6.3rem)] leading-[0.92] font-bold tracking-[-0.06em] uppercase">Learn from disciplines used <span className="text-command-blue dark:text-electric-blue">beyond the classroom.</span></h2>
          </div>
          <div className="flex flex-col justify-end border-l border-deep-navy pl-6 md:pl-9">
            <p className="text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue">Cyber-I&apos;s documented team background spans former cybercrime and cyber-lab personnel, practicing advocates, retired police officials and cyber-forensic specialists.</p>
            <p className="mt-5 text-[9px] leading-5 font-bold tracking-[0.14em] text-steel uppercase">Individual faculty profiles and course assignments will be published after verification.</p>
          </div>
        </div>
      </section>

      <section id="advisor" aria-labelledby="advisor-title" className="grid bg-electric-blue text-obsidian lg:grid-cols-[1fr_auto]">
        <div className="p-7 md:p-12 lg:p-16">
          <AcademyLabel>Course guidance / Final note</AcademyLabel>
          <h2 id="advisor-title" className="mt-10 max-w-5xl text-[clamp(2.7rem,6.4vw,7.4rem)] leading-[0.87] font-bold tracking-[-0.065em] uppercase">Not sure where<br />to start?</h2>
          <p className="mt-7 max-w-2xl text-sm leading-7 font-bold">Speak with a course advisor to compare disciplines, current programme details and the learning path that best fits your starting point.</p>
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
            <div className="border border-deep-navy bg-intelligence-white px-4 py-3 text-[9px] font-bold tracking-[0.14em] uppercase dark:bg-midnight">3 disciplines / 6 pathways</div>
          </div>
          <div className="my-16">
            <p className="mb-5 text-[10px] font-bold tracking-[0.22em] text-command-blue uppercase dark:text-electric-blue">Learn / Examine / Analyze / Apply</p>
            <h1 id="academy-title" className="max-w-6xl text-[clamp(2rem,8.3vw,9.25rem)] leading-[0.82] font-bold tracking-[-0.075em] uppercase">
              Learn how<br />cyber incidents<br /><span className="text-command-blue dark:text-electric-blue">are understood.</span>
            </h1>
          </div>
          <div className="grid gap-8 border-t border-deep-navy pt-7 xl:grid-cols-[1fr_auto] xl:items-end">
            <p className="max-w-3xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue md:text-base">Build practical, structured knowledge across cyber investigation, digital forensics, cyber law and digital evidence.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#programs" className="flex items-center justify-center gap-3 border-2 border-command-blue bg-command-blue px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-electric-blue hover:text-obsidian">Explore programs <ArrowDown className="h-4 w-4" /></a>
              <a href="#advisor" className="flex items-center justify-center border-2 border-deep-navy px-6 py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:bg-deep-navy hover:text-white">Talk to an advisor</a>
            </div>
          </div>
        </div>
        <aside className="relative hidden overflow-hidden border-l border-deep-navy bg-intelligence-white dark:bg-midnight lg:block" aria-label="Academy learning map">
          <div className="absolute inset-x-0 top-0 h-14 border-b border-deep-navy bg-electric-blue px-6 py-5 text-[9px] font-bold tracking-[0.18em] text-obsidian uppercase">Syllabus register / A-01</div>
          <div className="absolute inset-x-6 top-24 border border-deep-navy bg-[#f8f6f0] p-6 text-obsidian shadow-[12px_12px_0_#21375a]">
            <p className="text-[9px] font-bold tracking-[0.16em] text-command-blue uppercase">Select a discipline</p>
            <div className="mt-8 space-y-7">
              {disciplines.map((item) => <div key={item.id} className="border-b border-deep-navy pb-5"><div className="flex items-baseline justify-between"><span className="text-4xl font-bold">{item.number}</span><span className="text-[9px] font-bold tracking-widest uppercase">{item.pathway.join(" / ")}</span></div><p className="mt-3 text-sm font-bold uppercase">{item.name}</p></div>)}
            </div>
            <p className="mt-7 text-[8px] leading-5 font-bold tracking-[0.14em] text-steel uppercase">Foundation and advanced routes are shown as suggested progression.</p>
          </div>
          <div className="absolute right-6 bottom-7 left-6 grid grid-cols-3 gap-px bg-deep-navy border border-deep-navy">
            {["Learn", "Practice", "Apply"].map((item, index) => <div key={item} className="bg-midnight p-4 text-center text-[8px] font-bold tracking-[0.16em] text-mist-blue uppercase"><span className="mb-2 block text-electric-blue">0{index + 1}</span>{item}</div>)}
          </div>
        </aside>
      </div>
    </section>
  );
}

function CourseCard({ course, featured }: { course: (typeof academyCourses)[number]; featured: boolean }) {
  return (
    <article className={`group grid bg-[#f8f6f0] dark:bg-midnight ${featured ? "lg:col-span-2 lg:grid-cols-[1.1fr_0.9fr]" : ""}`}>
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/9] lg:aspect-auto lg:min-h-[520px]" : "aspect-[16/10]"}`}>
        <Image src={course.image} alt={course.imageAlt} fill sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"} className="object-cover saturate-[0.82] transition duration-700 group-hover:scale-[1.025] group-hover:saturate-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent" />
        <span className="absolute top-5 left-5 border border-white/60 bg-obsidian/80 px-3 py-2 text-[9px] font-bold tracking-[0.16em] text-white uppercase">Demo programme</span>
        <span className="absolute right-5 bottom-4 text-[clamp(4rem,8vw,7rem)] leading-none font-bold tracking-[-0.08em] text-white">{course.code}</span>
      </div>
      <div className="flex min-h-[430px] flex-col p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-deep-navy pb-5 text-[9px] font-bold tracking-[0.15em] uppercase">
          <span className="text-command-blue dark:text-electric-blue">{course.discipline}</span><span>{course.level}</span>
        </div>
        <h3 className="mt-8 text-[clamp(1.85rem,3.2vw,3.6rem)] leading-[0.95] font-bold tracking-[-0.04em] uppercase">{course.title}</h3>
        <p className="mt-6 max-w-2xl text-sm leading-7 font-bold text-deep-navy dark:text-mist-blue">{course.summary}</p>
        <div className="mt-7 flex flex-wrap gap-2">{course.topics.map((topic) => <span key={topic} className="border border-mist-blue bg-white/60 px-3 py-2 text-[8px] font-bold tracking-[0.13em] text-deep-navy uppercase dark:bg-obsidian dark:text-mist-blue">{topic}</span>)}</div>
        <p className="mt-6 text-[9px] leading-5 font-bold tracking-[0.11em] text-steel uppercase">{course.decisionNote}</p>
        <div className="mt-auto pt-8">
          <p className="mb-4 text-[8px] font-bold tracking-[0.14em] text-steel uppercase">{course.status}</p>
          <Link href={`/courses/${course.slug}`} className="group/link flex min-h-14 items-center justify-between border-t-2 border-deep-navy py-4 text-xs font-bold tracking-widest uppercase transition-colors hover:border-command-blue hover:text-command-blue dark:hover:text-electric-blue">View course details <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" /></Link>
        </div>
      </div>
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
