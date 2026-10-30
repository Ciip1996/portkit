import type { Dictionary } from "./types";
import { portfolio } from "@/config/portfolio";

export const en: Dictionary = {
  profile: {
    firstName: portfolio.author.firstName,
    lastName: portfolio.author.lastName,
    jobTitle: portfolio.author.jobTitle,
    email: portfolio.author.email,
    phone: portfolio.author.phone,
    github: portfolio.social.github,
    linkedin: portfolio.social.linkedin,
    website: portfolio.social.website,
    location: portfolio.author.location,
  },

  nav: {
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    projects: "Projects",
    demos: "Demos",
    contact: "Contact",
    timeline: "Timeline",
    toggleMenu: "Toggle menu",
    langLabel: "EN",
  },

  hero: {
    imgAlt: "Ivan Pacheco — Software Engineer",
    subtitle: "Software Engineer at Microsoft",
    firstName: "Ivan",
    lastName: "Ibarra Pacheco",
    bio: "Software Engineer at Microsoft. Holds a Master’s in Cybersecurity from Tec de Monterrey and has 8+ years of experience building web applications with React, TypeScript, Python, Node.js, and AWS, growing from a small company in León to mid-size and large tech companies before joining Microsoft.",
    location: "Redmond, WA \u00b7 From León, Mexico",
    birthLine: "Born in 1996 in León, Guanajuato, Mexico",
    showBirthLine: true,
    cta: "Get in Touch",
  },

  experience: {
    sectionLabel: "Career",
    heading: "Work Experience",
    viewFullTimeline: "View Full Timeline",
    jobs: [
      {
        title: "Software Engineer",
        company: "Microsoft",
        location: "Redmond, WA",
        period: "Aug 2026 \u2013 Present",
        logo: "microsoft",
        bullets: [
          "Returned full-time after the 2025 Software Engineering Master\u2019s Internship.",
        ],
        tags: [],
      },
      {
        title: "Senior Software Engineer / FE Lead",
        company: "C Infinity Solutions",
        location: "Remote, Mexico",
        period: "Sep 2025 \u2013 Aug 2026",
        logo: "cinfinity",
        logoBg: "#0f1218",
        bullets: [
          "Returned after Microsoft internship to lead frontend architecture of a React-based SaaS CMS serving enterprise clients with Dynamics 365 integrations.",
          "Mentored and guided 3\u20134 frontend engineers through code reviews, technical direction, and best practices in performance and maintainability.",
          "Owned the frontend codebase and collaborated with product, design, and backend teams to deliver high-impact, user-facing features.",
        ],
        tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"],
      },
      {
        title: "Software Engineering Master\u2019s Internship",
        company: "Microsoft",
        location: "Redmond, WA",
        period: "Jun 2025 \u2013 Sep 2025",
        logo: "microsoft",
        bullets: [
          "Built a Dynamics 365 app to digitize a legal/business process, improving efficiency and data integrity.",
          "Developed custom plugins and business logic in JavaScript and C#; collaborated with stakeholders to align on requirements.",
        ],
        tags: ["Dynamics 365", "JavaScript", "C#", "Power Platform"],
      },
      {
        title: "Senior Software Engineer / FE Lead",
        company: "C Infinity Solutions",
        location: "Remote, Mexico",
        period: "Oct 2024 \u2013 May 2025",
        logo: "cinfinity",
        logoBg: "#0f1218",
        bullets: [
          "Led the frontend architecture of a React-based SaaS CMS, defining scalable patterns, state management, and reusable components.",
          "Mentored and guided 3\u20134 frontend engineers through code reviews, technical direction, and best practices in performance and maintainability.",
          "Owned the frontend codebase and collaborated with product, design, and backend teams to deliver high-impact, user-facing features.",
        ],
        tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"],
      },
      {
        title: "Senior Software Engineer",
        company: "Drift",
        location: "Guadalajara, Mexico",
        period: "Mar 2023 \u2013 Nov 2024",
        logo: "drift",
        logoBg: "#ffffff",
        bullets: [
          "Maintained and enhanced the Design System Library, ensuring consistency and high-quality user experiences across the platform.",
          "Collaborated with the Analytics Team to create, improve, and refine reports using Highcharts, Cube, React, TypeScript, and the internal Design System Library.",
          "Developed custom components from scratch, including Gantt charts and other advanced visualizations, to deliver insightful and polished analytics reports.",
        ],
        tags: ["React", "TypeScript", "Highcharts", "Cube", "Design System", "Jest", "Agile/Scrum"],
      },
      {
        title: "Software Engineer III",
        company: "Wizeline",
        location: "Guadalajara, Mexico",
        period: "Jun 2022 \u2013 Mar 2023",
        logo: "wizeline",
        bullets: [
          "Served as Tech Lead on the greenfield Arc XP launch for The Baltimore Banner, a nationally recognized nonprofit news startup ($50M+ funded).",
          "Coordinated between design, management, and development teams as frontend lead; the publication grew to 30,000+ paid subscribers in its first year.",
        ],
        tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"],
      },
      {
        title: "Software Engineer II",
        company: "Wizeline",
        location: "Guadalajara, Mexico",
        period: "Oct 2021 \u2013 Jun 2022",
        logo: "wizeline",
        bullets: [
          "Contracted for a major news company in the US, delivering frontend solutions and developing React components for clients located primarily in the US and Canada.",
          "Configured, maintained, and added features to Arc XP-based platforms, ensuring high-quality CMS integrations and responsive user experiences.",
        ],
        tags: ["React", "Arc XP", "SCSS", "TypeScript", "CMS"],
      },
      {
        title: "Software Engineer I",
        company: "Wizeline",
        location: "Guadalajara, Mexico",
        period: "Oct 2020 \u2013 Sep 2021",
        logo: "wizeline",
        bullets: [
          "Migrated WPLG Local10.com (Miami\u2019s #1 ABC affiliate, 5\u201310M monthly visitors) from a legacy CMS to Arc XP, developing social login (OAuth), SEO optimizations, and Core Web Vitals improvements.",
          "Participated in Wizeline bootcamps and internal tooling projects; contributed as a contractor for Washington Post\u2019s Arc XP platform.",
        ],
        tags: ["React", "Arc XP", "SEO", "OAuth", "JavaScript", "Go"],
      },
      {
        title: "Frontend Developer",
        company: "GPAC",
        location: "Remote, Mexico",
        period: "Apr 2020 \u2013 Oct 2020",
        logo: "gpac",
        logoBg: "#ffffff",
        bullets: [
          "Developed the \u201cFortPAC\u201d project, a tailored web system that automates the recruiting process and replaced the legacy \u201cPCR\u201d system, improving recruiter productivity.",
          "Built scalable React components following Atomic Design principles with Redux state management, Material UI, and Enzyme testing.",
        ],
        tags: ["React", "Redux", "Material UI", "Enzyme", "Atomic Design", "Azure DevOps"],
      },
      {
        title: "Software Developer",
        company: "CBQA Solutions",
        location: "Le\u00f3n, Mexico",
        period: "Sep 2018 \u2013 Apr 2020",
        logo: "cbqa",
        logoBg: "#ffffff",
        bullets: [
          "Developed CBQA Solutions\u2019 website (React, SASS, Material UI) and a cross-platform mobile app (React Native, Enzyme, Jest).",
          "Re-designed and compiled cryptocurrency wallets (PAC Coin / PAC Global and XOAT Coin) for Windows, Linux, and macOS using C++, Qt5, and Gitian Builder.",
          "Built an internal Smashing dashboard for company displays using Ruby, CoffeeScript, and Google Calendar APIs.",
        ],
        tags: ["React", "React Native", "C++", "Qt5", "Ruby", "SASS", "Material UI", "Jest"],
      },
    ],
  },

  skills: {
    sectionLabel: "Stack",
    heading: "Skills & Technologies",
    categories: [
      {
        label: "Frontend",
        skills: ["React", "TypeScript", "JavaScript", "Next.js", "HTML5", "CSS/SCSS", "React Native"],
      },
      {
        label: "Backend & Cloud",
        skills: ["Node.js", "Nest.js", "Express", "Python", "Go", "AWS", "MySQL"],
      },
      {
        label: "Specialized Expertise",
        skills: ["Arc XP", "Dynamics 365", "Highcharts", "Cube", "Material UI", "Design Systems"],
      },
      {
        label: "Testing",
        skills: ["React Testing Library", "Jest", "Unit Testing", "Integration Testing"],
      },
      {
        label: "Tools & Practices",
        skills: ["Git", "Figma", "CI/CD", "Docker", "Unix", "Agile/Scrum"],
      },
      {
        label: "AI Tools",
        skills: ["Claude", "ChatGPT", "GitHub Copilot", "Gemini", "Cursor"],
      },
      {
        label: "Focus Areas",
        skills: ["Web & Mobile Dev", "Design Systems", "API Development", "Cloud", "UI/UX", "Cybersecurity"],
      },
      {
        label: "Soft Skills",
        skills: ["Leadership", "Problem Solving", "Mentorship", "Collaboration"],
      },
    ],
  },

  education: {
    sectionLabel: "Education",
    heading: "Academic Background",
    schools: [
      {
        school: "Monterrey Institute of Technology and Higher Education (ITESM)",
        degree: "Master\u2019s Degree in Cybersecurity",
        detail: "Graduated 2026",
        location: "Mexico",
        logo: "itesm",
        sortDate: "2024-08",
        timelineType: "education",
      },
      {
        school: "Universidad de La Salle Bajio",
        degree: "Bachelor\u2019s Degree in Software and Computer Engineering",
        detail: "Graduated July 2020",
        location: "Mexico",
        logo: "lasalle",
        sortDate: "2016-08",
        timelineType: "education",
      },
      {
        school: "University of Regina",
        degree: "Academic Exchange in Computer Science",
        detail: "Fall 2017 \u2013 Winter 2018",
        location: "Canada",
        logo: "uofregina",
        sortDate: "2017-09",
        timelineType: "exchange",
      },
      {
        school: "Dongseo University",
        degree: "GKS Scholarship for LATAM Program in Technology",
        detail: "Summer 2019",
        location: "South Korea",
        logo: "dongseo",
        sortDate: "2019-06",
        timelineType: "exchange",
      },
    ],
    award: {
      title: "Excellence Award \u2014 Global Korean Scholarship",
      org: "National Institute of International Education (NIIED), South Korea \u00b7 Aug 2019",
      description: "Awarded for best project presentation during the GKS Final Program at Dongseo University.",
    },
    languagesHeading: "Languages",
    languages: [
      { name: "English", detail: "Duolingo English Test CEFR C1 (2025) \u00b7 IELTS (2025)" },
      { name: "Spanish", detail: "Native" },
    ],
  },

  diplomas: {
    heading: "Diplomas & Certificates",
    items: [
      {
        title: "Bachelor\u2019s Degree Diploma",
        description: "B.S. in Software & Computer Engineering \u2014 Universidad de La Salle Baj\u00edo (Official English Translation)",
        file: "/diplomas/Bachelors_Degree_Diploma.pdf",
      },
      {
        title: "Award of Excellence \u2014 GKS",
        description: "Global Korean Scholarship \u2014 Best Project Presentation, Dongseo University, South Korea, 2019",
        file: "/diplomas/Award_of_Excellence_GKS.pdf",
      },
      {
        title: "Go Bootcamp Diploma",
        description: "Golang programming bootcamp certification",
        file: "/diplomas/Go_Bootcamp_Diploma.pdf",
      },
      {
        title: "IELTS Certificate",
        description: "International English Language Testing System \u2014 2025",
        file: "/diplomas/IELTS_Certificate_2025.pdf",
      },
      {
        title: "Duolingo English Test \u2014 CEFR C1",
        description: "Duolingo English Test \u2014 CEFR C1 Certified, 2025",
        file: "/diplomas/Duolingo_English_Test_C1.pdf",
      },
    ],
    viewDocument: "View Document",
    download: "Download",
    documentViewer: "Document Viewer",
    pdfViewer: "PDF Viewer",
    prevAriaLabel: "Previous diploma",
    nextAriaLabel: "Next diploma",
    goToAriaLabel: "Go to diploma",
  },

  projects: {
    sectionLabel: "Projects",
    heading: "Featured Projects",
    items: [
      {
        title: "VerifiA — Cryptographic Presence Verification",
        role: "Master’s Thesis · Tec de Monterrey",
        period: "2025 – 2026",
        description:
          "Verification platform that issues a short-lived cryptographic “presence badge” proving a person was physically present, passed a certified 3D liveness check (FaceTec, iBeta ISO 30107-3 Levels 1 & 2), and authorized with Face ID via Passkeys on genuine Apple hardware (App Attest). Built to counter AI-assisted fraud such as deepfakes and voice cloning. A web portal shows a QR code with a one-time nonce, the iOS app scans it and runs the security checks, and the backend issues a single-use ES256 JWT that the portal validates.",
        tags: ["Cybersecurity", "Passkeys", "App Attest", "JWT (ES256)", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "React", "Flutter"],
        github: "https://github.com/Ciip1996/VerifiA",
        featured: true,
        status: "Completed" as const,
        metrics: "Badge valid 2–5 min · 4 layered security checks",
      },
      {
        title: "Christie\u2019s International Real Estate",
        role: "Tech Lead @ Wizeline",
        period: "2021 \u2013 2023",
        description:
          "Led frontend development for Christie\u2019s \u2014 the world\u2019s oldest auction house (est. 1766) \u2014 building a luxury real estate platform on Arc XP (Washington Post\u2019s CMS). Designed and executed a full design system with React and Arc Themes. Built custom templates, layouts, and reusable component blocks, integrating Queryly search and property data feeds across 940+ affiliate offices in 48+ countries.",
        tags: ["React", "Arc XP", "Design Systems", "SCSS/BEM", "Queryly", "TypeScript"],
        featured: true,
        status: "Completed" as const,
        metrics: "940+ affiliate offices across 48+ countries",
      },
      {
        title: "WPLG Local10.com",
        role: "Software Engineer @ Wizeline",
        period: "2020 \u2013 2022",
        description:
          "Migrated Miami\u2019s #1 ABC affiliate news site (5\u201310M monthly visitors) from a legacy CMS to Arc XP. Developed social login (OAuth), SEO optimizations, and Core Web Vitals improvements that directly impacted Google Search rankings and ad revenue. Integrated Associated Press wire feeds for real-time breaking news delivery.",
        tags: ["React", "Arc XP", "SEO", "Core Web Vitals", "AP Data Feeds", "OAuth"],
        link: "https://www.local10.com",
        demo: "https://www.local10.com",
        status: "Completed" as const,
        metrics: "5\u201310M monthly visitors \u00b7 #1 ABC affiliate in Miami",
      },
      {
        title: "The Baltimore Banner",
        role: "Tech Lead @ Wizeline",
        period: "2022 \u2013 2023",
        description:
          "Led the greenfield Arc XP launch for this nationally recognized nonprofit news startup ($50M+ funded). Coordinated between design, management, and development teams as frontend lead. The publication grew to 30,000+ paid subscribers within its first year, receiving coverage from The New York Times and NPR.",
        tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"],
        status: "Completed" as const,
        metrics: "30,000+ paid subscribers in year one \u00b7 $50M+ funded",
      },
      {
        title: "Tracker me",
        role: "Co-founder · Student Startup",
        period: "2017",
        description:
          "Vehicle geolocation system that let owners see a car’s location and security status in real time — such as a broken window, a triggered alarm, or the engine starting — and shut it off remotely. Built with two fellow students and pitched to seed investors at the 5th “Now” Demo Day at Tec de Monterrey León.",
        tags: ["iOS", "GPS", "IoT", "Startup"],
        github: "https://github.com/Ciip1996/TrackerMe",
        status: "Archived" as const,
        metrics: "Featured in Periódico AM (2017)",
      },
    ],
    visitAriaLabel: "Visit",
    githubAriaLabel: "View on GitHub",
    demoAriaLabel: "View live demo",
  },

  freelance: {
    sectionLabel: "Freelance",
    heading: "Freelance Projects",
    subtitle: "Independent projects built end-to-end as a freelance engineer.",
    visitAriaLabel: "Visit",
    items: [
      {
        title: "Picolin Store",
        description:
          "Architected and developed the entire system (frontend in React, backend APIs in Node.js, MySQL database) and managed AWS cloud resources. Led full project lifecycle from design (UI/UX mockups) to development, deployment (CI/CD), and post-launch maintenance.",
        tags: ["React", "Node.js", "MySQL", "AWS", "UI/UX", "CI/CD"],
        link: "https://demo.picolinstore.com",
      },
      {
        title: "Dr. Diego Azpeitia",
        description:
          "Designed and developed a professional medical website for Dr. Diego Azpeitia, featuring appointment scheduling, service information, and a modern responsive UI optimized for patient engagement and SEO.",
        tags: ["Web Development", "UI/UX", "SEO", "Responsive Design"],
        link: "https://drdiegoazpeitia.com",
      },
    ],
  },

  demos: {
    sectionLabel: "Demos",
    heading: "Work Demos",
    subtitle: "Visual walkthroughs of real contributions at previous companies, shared within NDA-compliant boundaries.",
    items: [
      {
        title: "Drift \u2014 Contributions Walkthrough (Part 1)",
        description:
          "A visual walkthrough of key features and contributions built at Drift, including React analytics dashboards, Highcharts data visualizations, and design system components used across the product.",
        video: "/demos/drift-demo-part-1.mp4",
        poster: "/demos/drift-demo-part-1-poster.jpg",
        duration: "19 min",
        company: "Drift",
        period: "2023 \u2013 2024",
        tags: ["React", "TypeScript", "Highcharts", "Design System"],
      },
      {
        title: "Drift \u2014 Contributions Walkthrough (Part 2)",
        description:
          "Continued walkthrough covering additional features, component architecture, and UI patterns delivered during the Drift engagement.",
        video: "/demos/drift-demo-part-2.mp4",
        poster: "/demos/drift-demo-part-2-poster.jpg",
        duration: "4 min",
        company: "Drift",
        period: "2023 \u2013 2024",
        tags: ["React", "TypeScript", "Analytics", "UI/UX"],
      },
    ],
    playVideo: "Play video",
    pause: "Pause",
    play: "Play",
    unmute: "Unmute",
    mute: "Mute",
    fullscreen: "Fullscreen",
    close: "Close",
  },

  contact: {
    sectionLabel: "Contact",
    heading: "Let\u2019s Connect",
    subtitle: "Open to collaborations, speaking, and media inquiries. Feel free to reach out!",
  },

  footer: {
    copyright: "Ivan Pacheco. All rights reserved.",
  },

  press: {
    sectionLabel: "Press",
    heading: "In the Media",
    subtitle:
      "Awards, recognitions, and mentions in third-party publications.",
    readArticle: "Read Article",
    featuredIn: "As Featured In",
    items: [
      {
        title: "Mexican Engineer Turned More Than 200 Rejections into an Opportunity with Microsoft",
        source: "Latino Herald",
        date: "Oct 2026",
        excerpt:
          "Feature profile and interview by the Seattle-based Latino Herald on his path from León, Guanajuato to a full-time software engineering role at Microsoft, including his scholarships in Canada and South Korea and his master’s at Tec de Monterrey.",
        url: "https://latinoherald.com/2026/10/28/ingeniero-mexicano-microsoft-200-rechazos/",
        lang: "ES",
      },
      {
        title: "Mexican Engineer Lands a Job at Microsoft After More Than 200 Rejections",
        source: "El Congresista",
        date: "Oct 2026",
        excerpt:
          "Guanajuato news site covering his path from León to a software engineering role at Microsoft, including his studies abroad.",
        url: "https://elcongresista.mx/politica/guanajuato/ingeniero-mexicano-empleo-microsoft",
        lang: "ES",
      },
      {
        title: "The 2019 Global Korea Scholarship for African and Latin American Undergraduate Students Comes to a Successful Close",
        source: "Dongseo University",
        date: "Aug 2019",
        excerpt:
          "\"The winning team … consisted of … Carlos Ivan Ibarra Pacheco …\" — University news article covering the GKS program's excellence award ceremony at Dongseo University, Busan, South Korea.",
        url: "https://uni.dongseo.ac.kr/eng/index.php?CgCode=news&idx=370&mode=view&pCode=dsunews&pg=3",
        lang: "EN",
      },
      {
        title: "La Salle Student Wins Excellence Award for Innovation Project in South Korea",
        source: "Universidad de La Salle Bajío",
        date: "Aug 2019",
        excerpt:
          "\"Carlos Iván Ibarra Pacheco … receives excellence award …\" — Institutional news covering the award received during the GKS innovation program in South Korea.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2537",
        lang: "ES",
      },
      {
        title: "Technology Students Win Innovation Scholarship",
        source: "Universidad de La Salle Bajío",
        date: "May 2019",
        excerpt:
          "\"Gonzalo Aldana Chávez and Carlos Iván Ibarra Pacheco … were 2 of the 20 winners …\" — Institutional news recognizing the selection for the Global Korean Scholarship among 20 winners.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2491",
        lang: "ES",
      },
      {
        title: "Sharing Knowledge in Research Competitions",
        source: "Universidad de La Salle Bajío",
        date: "2019",
        excerpt:
          "Carlos Iván Ibarra Pacheco featured for contributions and participation in academic research competitions at the university level.",
        url: "https://www.lasallebajio.edu.mx/noticias/noticia.php?n=2924",
        lang: "ES",
      },
      {
        title: "Investing in Start-ups — 'Now' Demo Day at Tec de Monterrey",
        source: "Periódico AM",
        date: "Jun 2017",
        excerpt:
          "\"Uriel Hernández, Iván Ibarra, and David Alcaraz developed 'Tracker me', a vehicle geolocation system …\" — Regional newspaper coverage of the 5th 'Now' Demo Day at Tec de Monterrey León, where the team pitched to seed investors.",
        url: "https://www.am.com.mx/news/2017/06/06/invierten-en-start-up-291518.html",
        lang: "ES",
      },
    ],
  },

  social: {
    enabled: true,
    sectionLabel: "Social",
    heading: "Follow My Journey",
    subtitle:
      "Life as a Mexican software engineer at Microsoft — career tips, scholarships, studying abroad, and tech.",
    followLabel: "Follow",
    links: [
      {
        platform: "instagram",
        handle: "@ivani.dev",
        url: "https://www.instagram.com/ivani.dev/",
        description: "Career tips, scholarships, and life in Seattle.",
      },
      {
        platform: "tiktok",
        handle: "@ivani.dev",
        url: "https://www.tiktok.com/@ivani.dev",
        description: "Short videos on tech, gadgets, and working at Microsoft.",
      },
    ],
  },

  notFound: {
    body: "This page doesn\u2019t exist.",
    back: "Back to Home",
  },

  timelinePage: {
    title: "My Journey",
    subtitle:
      "A complete chronological timeline of my career, education, academic achievements, and certifications.",
    backToHome: "Back to Home",
    filters: {
      all: "All",
      work: "Work",
      education: "Education",
      milestones: "Milestones",
      press: "Press",
    },
    typeLabels: {
      work: "Work",
      education: "Education",
      award: "Award",
      certification: "Certification",
      exchange: "Exchange",
      press: "Press",
    },
    events: [
      { type: "press", title: "Mexican Engineer Turned More Than 200 Rejections into an Opportunity with Microsoft", subtitle: "Latino Herald", location: "Seattle, WA", period: "Oct 2026", startDate: "2026-10", description: "Feature profile and interview on his path from León, Guanajuato to a full-time software engineering role at Microsoft.", tags: ["Media", "Interview"] },
      { type: "work", title: "Software Engineer", subtitle: "Microsoft", location: "Redmond, WA", period: "Aug 2026 – Present", startDate: "2026-08", endDate: "present", bullets: ["Returned full-time after the 2025 Software Engineering Master’s Internship."], tags: [], logo: "microsoft" },
      { type: "education", title: "Graduated — Master’s Degree in Cybersecurity", subtitle: "Monterrey Institute of Technology and Higher Education (ITESM)", location: "Mexico", period: "2026", startDate: "2026-07", description: "Completed M.S. in Cybersecurity.", tags: ["Cybersecurity", "Networking", "Cryptography"], logo: "itesm" },
      { type: "work", title: "Senior Software Engineer / FE Lead", subtitle: "C Infinity Solutions", location: "Remote, Mexico", period: "Sep 2025 \u2013 Aug 2026", startDate: "2025-09", endDate: "2026-08", bullets: ["Returned after Microsoft internship to lead frontend architecture of a React-based SaaS CMS serving enterprise clients with Dynamics 365 integrations.", "Mentored and guided 3\u20134 frontend engineers through code reviews, technical direction, and best practices in performance and maintainability.", "Owned the frontend codebase and collaborated with product, design, and backend teams to deliver high-impact, user-facing features."], tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"], logo: "cinfinity", logoBg: "#0f1218" },
      { type: "work", title: "Software Engineering Master\u2019s Internship", subtitle: "Microsoft", location: "Redmond, WA", period: "Jun 2025 \u2013 Sep 2025", startDate: "2025-06", endDate: "2025-09", bullets: ["Built a Dynamics 365 app to digitize a legal/business process, improving efficiency and data integrity.", "Developed custom plugins and business logic in JavaScript and C#; collaborated with stakeholders to align on requirements."], tags: ["Dynamics 365", "JavaScript", "C#", "Power Platform"], logo: "microsoft" },
      { type: "certification", title: "Duolingo English Test \u2014 CEFR C1", subtitle: "Duolingo", location: "", period: "2025", startDate: "2025-02", description: "CEFR C1 certified English proficiency via Duolingo English Test.", tags: ["English", "CEFR C1"] },
      { type: "certification", title: "IELTS Certificate", subtitle: "International English Language Testing System", location: "", period: "2025", startDate: "2025-01", description: "International English proficiency certification.", tags: ["English", "IELTS"] },
      { type: "work", title: "Senior Software Engineer / FE Lead", subtitle: "C Infinity Solutions", location: "Remote, Mexico", period: "Oct 2024 \u2013 May 2025", startDate: "2024-10", endDate: "2025-05", bullets: ["Led the frontend architecture of a React-based SaaS CMS, defining scalable patterns, state management, and reusable components.", "Mentored and guided 3\u20134 frontend engineers through code reviews, technical direction, and best practices in performance and maintainability.", "Owned the frontend codebase and collaborated with product, design, and backend teams to deliver high-impact, user-facing features."], tags: ["React", "TypeScript", "Dynamics 365", "Cube", "Node.js", "Agile/Scrum"], logo: "cinfinity", logoBg: "#0f1218" },
      { type: "education", title: "Started Master\u2019s Degree in Cybersecurity", subtitle: "Monterrey Institute of Technology and Higher Education (ITESM)", location: "Mexico", period: "Aug 2024 \u2013 2026", startDate: "2024-08", description: "Two-year M.S. in Cybersecurity, completed in 2026.", tags: ["Cybersecurity", "Networking", "Cryptography"], logo: "itesm" },
      { type: "work", title: "Senior Software Engineer", subtitle: "Drift", location: "Guadalajara, Mexico", period: "Mar 2023 \u2013 Nov 2024", startDate: "2023-03", endDate: "2024-11", bullets: ["Maintained and enhanced the Design System Library, ensuring consistency and high-quality user experiences across the platform.", "Collaborated with the Analytics Team to create, improve, and refine reports using Highcharts, Cube, React, TypeScript, and the internal Design System Library.", "Developed custom components from scratch, including Gantt charts and other advanced visualizations, to deliver insightful and polished analytics reports."], tags: ["React", "TypeScript", "Highcharts", "Cube", "Design System", "Jest", "Agile/Scrum"], logo: "drift", logoBg: "#ffffff" },
      { type: "work", title: "Software Engineer III", subtitle: "Wizeline", location: "Guadalajara, Mexico", period: "Jun 2022 \u2013 Mar 2023", startDate: "2022-06", endDate: "2023-03", bullets: ["Served as Tech Lead on the greenfield Arc XP launch for The Baltimore Banner, a nationally recognized nonprofit news startup ($50M+ funded).", "Coordinated between design, management, and development teams as frontend lead; the publication grew to 30,000+ paid subscribers in its first year."], tags: ["React", "TypeScript", "SCSS", "Arc XP", "Jest"], logo: "wizeline" },
      { type: "work", title: "Software Engineer II", subtitle: "Wizeline", location: "Guadalajara, Mexico", period: "Oct 2021 \u2013 Jun 2022", startDate: "2021-10", endDate: "2022-06", bullets: ["Contracted for a major news company in the US, delivering frontend solutions and developing React components for clients located primarily in the US and Canada.", "Configured, maintained, and added features to Arc XP-based platforms, ensuring high-quality CMS integrations and responsive user experiences."], tags: ["React", "Arc XP", "SCSS", "TypeScript", "CMS"], logo: "wizeline" },
      { type: "work", title: "Software Engineer I", subtitle: "Wizeline", location: "Guadalajara, Mexico", period: "Oct 2020 \u2013 Sep 2021", startDate: "2020-10", endDate: "2021-09", bullets: ["Migrated WPLG Local10.com (Miami\u2019s #1 ABC affiliate, 5\u201310M monthly visitors) from a legacy CMS to Arc XP, developing social login (OAuth), SEO optimizations, and Core Web Vitals improvements.", "Participated in Wizeline bootcamps and internal tooling projects; contributed as a contractor for Washington Post\u2019s Arc XP platform."], tags: ["React", "Arc XP", "SEO", "OAuth", "JavaScript", "Go"], logo: "wizeline" },
      { type: "education", title: "Graduated \u2014 Bachelor\u2019s Degree in Software and Computer Engineering", subtitle: "Universidad de La Salle Bajio", location: "Mexico", period: "Jul 2020", startDate: "2020-07", description: "Completed B.S. in Software & Computer Engineering.", tags: ["Software Engineering", "Computer Science"], logo: "lasalle" },
      { type: "work", title: "Frontend Developer", subtitle: "GPAC", location: "Remote, Mexico", period: "Apr 2020 \u2013 Oct 2020", startDate: "2020-04", endDate: "2020-10", bullets: ["Developed the \u201cFortPAC\u201d project, a tailored web system that automates the recruiting process and replaced the legacy \u201cPCR\u201d system, improving recruiter productivity.", "Built scalable React components following Atomic Design principles with Redux state management, Material UI, and Enzyme testing."], tags: ["React", "Redux", "Material UI", "Enzyme", "Atomic Design", "Azure DevOps"], logo: "gpac", logoBg: "#ffffff" },
      { type: "award", title: "Excellence Award \u2014 Global Korean Scholarship", subtitle: "National Institute of International Education (NIIED)", location: "South Korea", period: "Aug 2019", startDate: "2019-08", description: "Awarded for best project presentation during the GKS Final Program at Dongseo University.", tags: ["GKS", "Research", "Presentation"], logo: "dongseo" },
      { type: "press", title: "GKS Program Comes to a Successful Close", subtitle: "Dongseo University", location: "South Korea", period: "Aug 2019", startDate: "2019-08", description: "University news article covering the GKS program\u2019s excellence award ceremony, featuring the winning team members.", tags: ["GKS", "University News"], logo: "dongseo" },
      { type: "press", title: "La Salle Student Wins Excellence Award in South Korea", subtitle: "Universidad de La Salle Baj\u00edo", location: "Mexico", period: "Aug 2019", startDate: "2019-08", description: "Institutional news covering the excellence award received during the GKS innovation program in South Korea.", tags: ["GKS", "University News"], logo: "lasalle" },
      { type: "exchange", title: "GKS Scholarship for LATAM Program in Technology", subtitle: "Dongseo University", location: "South Korea", period: "Jun 2019 \u2013 Aug 2019", startDate: "2019-06", endDate: "2019-08", description: "International scholarship program in technology for Latin American students at Dongseo University, Busan.", tags: ["GKS", "Technology", "International"], logo: "dongseo" },
      { type: "press", title: "Technology Students Win Innovation Scholarship", subtitle: "Universidad de La Salle Baj\u00edo", location: "Mexico", period: "May 2019", startDate: "2019-05", description: "Institutional news recognizing the selection for the Global Korean Scholarship among 20 winners nationwide.", tags: ["GKS", "University News"], logo: "lasalle" },
      { type: "press", title: "Sharing Knowledge in Research Competitions", subtitle: "Universidad de La Salle Baj\u00edo", location: "Mexico", period: "2019", startDate: "2019-01", description: "Featured for contributions and participation in academic research competitions at the university level.", tags: ["Research", "University News"], logo: "lasalle" },
      { type: "work", title: "Software Developer", subtitle: "CBQA Solutions", location: "Le\u00f3n, Mexico", period: "Sep 2018 \u2013 Apr 2020", startDate: "2018-09", endDate: "2020-04", bullets: ["Developed CBQA Solutions\u2019 website (React, SASS, Material UI) and a cross-platform mobile app (React Native, Enzyme, Jest).", "Re-designed and compiled cryptocurrency wallets (PAC Coin / PAC Global and XOAT Coin) for Windows, Linux, and macOS using C++, Qt5, and Gitian Builder.", "Built an internal Smashing dashboard for company displays using Ruby, CoffeeScript, and Google Calendar APIs."], tags: ["React", "React Native", "C++", "Qt5", "Ruby", "SASS", "Material UI", "Jest"], logo: "cbqa", logoBg: "#ffffff" },
      { type: "exchange", title: "Academic Exchange in Computer Science", subtitle: "University of Regina", location: "Canada", period: "Sep 2017 \u2013 Apr 2018", startDate: "2017-09", endDate: "2018-04", description: "International academic exchange program in Computer Science at the University of Regina, Saskatchewan, Canada.", tags: ["Computer Science", "Exchange", "International"], logo: "uofregina" },
      { type: "press", title: "Investing in Start-ups \u2014 \u2018Now\u2019 Demo Day at Tec de Monterrey", subtitle: "Peri\u00f3dico AM", location: "Mexico", period: "Jun 2017", startDate: "2017-06", description: "Regional newspaper coverage of the 5th \u2018Now\u2019 Demo Day at Tec de Monterrey Le\u00f3n, where the team pitched \u2018Tracker me\u2019, a vehicle geolocation system, to seed investors.", tags: ["Startup", "Demo Day", "Media"], logo: "itesm" },
      { type: "education", title: "Started Bachelor\u2019s Degree in Software and Computer Engineering", subtitle: "Universidad de La Salle Bajio", location: "Mexico", period: "Aug 2016", startDate: "2016-08", description: "Enrolled in B.S. in Software & Computer Engineering.", tags: ["Software Engineering", "Computer Science"], logo: "lasalle" },
    ],
  },
};
