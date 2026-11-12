export type BlogSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  displayDate: string;
  readTime: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  author: string;
  authorRole: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "digital-evidence-first-response",
    category: "Digital Forensics",
    date: "2026-08-18",
    displayDate: "18 Aug 2026",
    readTime: "7 min read",
    title: "Digital evidence first response: what to preserve before analysis",
    subtitle: "A practical field guide to reducing evidence loss, documenting context, and preparing devices for specialist examination.",
    image: "/images/editorial/forensics-lab.png",
    imageAlt: "Digital forensics specialist examining a storage device at a laboratory workstation",
    author: "Cyber-I Editorial Desk",
    authorRole: "Investigation & Digital Evidence",
    sections: [
      {
        id: "why-first-response-matters",
        title: "Why first response matters",
        paragraphs: [
          "The first minutes after a suspected digital incident can shape the quality of every later decision. Devices may still be connected, accounts may remain active, and volatile information can disappear through routine use or an unplanned shutdown.",
          "A sound first response is not an attempt to perform a full forensic examination. Its purpose is to stabilize the situation, preserve context, and create a reliable handover for qualified analysis.",
        ],
      },
      {
        id: "preserve-context",
        title: "Preserve context before touching the device",
        paragraphs: [
          "Record what is visible and who is present. Photograph the workspace, note cable connections, capture the current screen when policy allows, and document the time. Small details can later explain how a device was being used.",
        ],
        bullets: ["Record date, time, location, and device state", "Identify the person responsible for the device", "Avoid opening files, browsing folders, or testing accounts", "Keep a written record of every action taken"],
      },
      {
        id: "isolate-carefully",
        title: "Isolate carefully, not reflexively",
        paragraphs: [
          "Disconnecting a device may stop remote activity, but it can also destroy volatile information or trigger security controls. The right action depends on the device, the suspected incident, and the organization’s response procedure. When the stakes are high, obtain specialist guidance before changing its state.",
        ],
      },
      {
        id: "handover",
        title: "Build a defensible handover",
        paragraphs: [
          "Package devices securely, identify them consistently, and preserve a clear record of custody. Provide the examiner with the incident timeline, relevant account information, known symptoms, and the questions the investigation needs to answer.",
          "Good forensic work begins with a precise question and reliable source material. A disciplined handover protects both.",
        ],
      },
    ],
  },
  {
    slug: "building-cyber-investigation-readiness",
    category: "Cyber Investigation",
    date: "2026-08-11",
    displayDate: "11 Aug 2026",
    readTime: "6 min read",
    title: "Building cyber investigation readiness before an incident",
    subtitle: "The policies, decision paths, and evidence practices that help organizations move from uncertainty to an effective investigation.",
    image: "/images/editorial/training-workshop.png",
    imageAlt: "Instructor leading a professional cyber investigation workshop",
    author: "Cyber-I Editorial Desk",
    authorRole: "Cyber Investigation & Readiness",
    sections: [
      { id: "readiness", title: "Readiness is an operating capability", paragraphs: ["Investigation readiness is the ability to recognize a potential incident, protect relevant information, make responsible decisions, and bring the right expertise into the room. It is built before a crisis through ownership, rehearsed procedures, and accessible records."] },
      { id: "decision-path", title: "Define the decision path", paragraphs: ["Teams should know who can authorize containment, who informs legal and leadership stakeholders, and when specialist investigation support is required."], bullets: ["Name an incident owner and deputy", "Document escalation thresholds", "Keep current contact and system-owner lists", "Rehearse the process with realistic scenarios"] },
      { id: "evidence", title: "Make evidence available and interpretable", paragraphs: ["Logs are useful only when they exist, can be located, and retain enough context. Review coverage, access controls, retention settings, time synchronization, and the process for exporting records without altering them."] },
      { id: "practice", title: "Practice the handoffs", paragraphs: ["Tabletop exercises reveal gaps that policy documents rarely expose. Test the transition from detection to containment, legal review, evidence preservation, and executive communication. Record decisions and turn lessons into owned improvements."] },
    ],
  },
  {
    slug: "security-awareness-that-changes-decisions",
    category: "Training",
    date: "2026-08-04",
    displayDate: "04 Aug 2026",
    readTime: "5 min read",
    title: "Security awareness that changes everyday decisions",
    subtitle: "Why practical scenarios, role-specific guidance, and a safe reporting culture matter more than a yearly compliance presentation.",
    image: "/images/editorial/awareness-session.png",
    imageAlt: "Professional audience attending an institutional cyber awareness session",
    author: "Cyber-I Editorial Desk",
    authorRole: "Professional Learning",
    sections: [
      { id: "behavior", title: "Design for behavior, not attendance", paragraphs: ["Awareness succeeds when people can recognize a risky moment and know the next safe action. Completion rates show reach; realistic decisions show whether the learning can transfer to work."] },
      { id: "specific", title: "Make scenarios role-specific", paragraphs: ["Finance teams, administrators, executives, and technical staff encounter different risks. Use the language, systems, and decisions each group actually handles."], bullets: ["Start with observable work situations", "Demonstrate the safe action", "Explain why the action matters", "Make reporting routes easy to remember"] },
      { id: "reporting", title: "Create a safe reporting culture", paragraphs: ["A person who reports a suspicious message quickly can limit impact. Treat good-faith reporting as a protective behavior and make the channel visible, simple, and responsive."] },
      { id: "measure", title: "Measure signals that guide improvement", paragraphs: ["Combine scenario results, reporting behavior, repeat questions, and incident patterns. The goal is not to catch people out; it is to identify where the organization needs clearer controls or better support."] },
    ],
  },
];

export const galleryItems = [
  { category: "Training", image: "/images/editorial/training-workshop.png", title: "Investigation readiness workshop", caption: "Demo image · Instructor-led session for operational teams.", featured: true },
  { category: "Forensics", image: "/images/editorial/forensics-lab.png", title: "Evidence handling lab", caption: "Demo image · Controlled examination workflow and practical tooling.", featured: false },
  { category: "Events", image: "/images/editorial/awareness-session.png", title: "Institutional awareness session", caption: "Demo image · Role-based cyber awareness for professional audiences.", featured: false },
  { category: "Training", image: "/images/editorial/training-workshop.png", title: "Analyst learning environment", caption: "Demo image · Applied exercises supported by guided instruction.", featured: false },
  { category: "Forensics", image: "/images/editorial/forensics-lab.png", title: "Digital media examination", caption: "Demo image · Careful collection, preservation, and examination.", featured: false },
  { category: "Events", image: "/images/editorial/awareness-session.png", title: "Industry knowledge exchange", caption: "Demo image · Structured discussion around digital risk and response.", featured: false },
];
