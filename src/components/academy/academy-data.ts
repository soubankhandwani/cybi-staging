export type DisciplineId = "investigation" | "forensics" | "law";
export type CourseLevel = "Foundation" | "Advanced";

export interface AcademyCourse {
  slug: string;
  code: string;
  title: string;
  discipline: string;
  disciplineId: DisciplineId;
  level: CourseLevel;
  image: string;
  imageAlt: string;
  summary: string;
  decisionNote: string;
  topics: string[];
  status: string;
  audience: string;
  outcomes: string[];
  curriculum: string[];
  curriculumVerified: boolean;
}

export const disciplines = [
  {
    id: "investigation" as const,
    number: "01",
    name: "Cyber Investigation",
    purpose: "Learn how cybercrime cases are approached, examined, documented and investigated.",
    pathway: ["BCCI", "ACCI"],
  },
  {
    id: "forensics" as const,
    number: "02",
    name: "Cyber Forensics",
    purpose: "Build an understanding of digital evidence, forensic examination and analysis.",
    pathway: ["BCCF", "ACCF"],
  },
  {
    id: "law" as const,
    number: "03",
    name: "Cyber Law & Digital Evidence",
    purpose: "Study the relationship between cybercrime, digital evidence and legal procedure.",
    pathway: ["BCCL", "ACCL"],
  },
];

export const academyCourses: AcademyCourse[] = [
  {
    slug: "basic-course-cyber-investigation",
    code: "BCCI",
    title: "Basic Course in Cyber Investigation",
    discipline: "Cyber Investigation",
    disciplineId: "investigation",
    level: "Foundation",
    image: "/images/academy/cyber-investigation.png",
    imageAlt: "Investigation study desk with case sheets, evidence markers and a magnifying lens",
    summary: "An introduction to the fundamentals, strategies and tools used to build and examine cybercrime cases.",
    decisionNote: "For learners beginning to build structured cyber-investigation knowledge.",
    topics: ["Investigation fundamentals", "Case studies", "Investigation tools"],
    status: "Course schedule and delivery format available from an advisor",
    audience: "Learners who are beginning to build structured knowledge of cybercrime investigation.",
    outcomes: [
      "Understand the fundamentals of cybercrime investigation.",
      "Recognise approaches used to examine cybercrime scenes.",
      "Explore investigation techniques and tools through case studies.",
      "Understand how cybercrime cases are built and examined.",
    ],
    curriculum: [
      "Cybercrime investigation fundamentals",
      "Cybercrime scene investigation strategies",
      "Case studies",
      "Investigation techniques",
      "Investigation tools",
      "Building cybercrime cases",
      "Solving cybercrime cases",
    ],
    curriculumVerified: true,
  },
  {
    slug: "advanced-course-cyber-forensics",
    code: "ACCF",
    title: "Advanced Course in Cyber Forensics",
    discipline: "Cyber Forensics",
    disciplineId: "forensics",
    level: "Advanced",
    image: "/images/academy/digital-forensics.png",
    imageAlt: "Digital forensics workbench with storage media and examination tools",
    summary: "An advanced pathway in the discipline of digital forensics and the examination of digital evidence.",
    decisionNote: "The detailed syllabus and practical components are currently being validated for publication.",
    topics: ["Digital evidence", "Forensic examination", "Analysis & reporting"],
    status: "Detailed curriculum available from an advisor",
    audience: "Learners exploring an advanced pathway in cyber forensics and digital evidence.",
    outcomes: [
      "Build context around digital evidence and forensic examination.",
      "Understand how analysis and reporting fit into forensic work.",
    ],
    curriculum: [],
    curriculumVerified: false,
  },
  {
    slug: "advanced-course-cyber-law-digital-evidence",
    code: "ACCL",
    title: "Advanced Course in Cyber Law & Digital Evidence",
    discipline: "Cyber Law & Digital Evidence",
    disciplineId: "law",
    level: "Advanced",
    image: "/images/academy/cyber-law-evidence.png",
    imageAlt: "Legal study desk with an evidence sleeve, reference volume and annotated documents",
    summary: "An advanced pathway exploring cyber law in relation to digital evidence and legal procedure.",
    decisionNote: "The detailed legal and digital-evidence curriculum is currently being validated for publication.",
    topics: ["Cyber law", "Digital evidence", "Legal procedure"],
    status: "Detailed curriculum available from an advisor",
    audience: "Learners exploring an advanced pathway in cyber law and digital evidence.",
    outcomes: [
      "Explore the relationship between cyber law and digital evidence.",
      "Understand the role of legal procedure in this discipline.",
    ],
    curriculum: [],
    curriculumVerified: false,
  },
];

export function getCourse(slug: string) {
  return academyCourses.find((course) => course.slug === slug);
}
