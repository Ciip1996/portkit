export interface Dictionary {
  nav: {
    experience: string;
    skills: string;
    education: string;
    projects: string;
    demos: string;
    contact: string;
    timeline: string;
    toggleMenu: string;
    langLabel: string;
  };

  hero: {
    imgAlt: string;
    subtitle: string;
    firstName: string;
    lastName: string;
    bio: string;
    location: string;
    cta: string;
  };

  experience: {
    sectionLabel: string;
    heading: string;
    viewFullTimeline: string;
    jobs: Array<{
      title: string;
      company: string;
      location: string;
      period: string;
      logo: string | null;
      logoBg?: string;
      bullets: string[];
      tags: string[];
    }>;
  };

  skills: {
    sectionLabel: string;
    heading: string;
    categories: Array<{
      label: string;
      skills: string[];
    }>;
  };

  education: {
    sectionLabel: string;
    heading: string;
    schools: Array<{
      school: string;
      degree: string;
      detail: string;
      location: string;
      logo?: string;
      logoBg?: string;
      sortDate?: string;
      timelineType?: "education" | "exchange";
    }>;
    award: {
      title: string;
      org: string;
      description: string;
    };
    languagesHeading: string;
    languages: Array<{
      name: string;
      detail: string;
    }>;
  };

  diplomas: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
      file: string;
    }>;
    viewDocument: string;
    download: string;
    documentViewer: string;
    pdfViewer: string;
    prevAriaLabel: string;
    nextAriaLabel: string;
    goToAriaLabel: string;
  };

  projects: {
    sectionLabel: string;
    heading: string;
    items: Array<{
      title: string;
      role: string;
      period: string;
      description: string;
      tags: string[];
      /** Cover screenshot or preview image URL (e.g. "/projects/my-project.png") */
      image?: string;
      /** Link to the live site or primary URL */
      link?: string;
      /** GitHub repository URL */
      github?: string;
      /** Live demo URL (separate from the main link) */
      demo?: string;
      /** Pin this project to the top of the list */
      featured?: boolean;
      /** Project lifecycle status */
      status?: "In Progress" | "Completed" | "Archived";
      /** One-line impact summary, e.g. "2M monthly users · +40% perf improvement" */
      metrics?: string;
    }>;
    visitAriaLabel: string;
    githubAriaLabel: string;
    demoAriaLabel: string;
  };

  freelance: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    visitAriaLabel: string;
    items: Array<{
      title: string;
      description: string;
      tags: string[];
      link?: string;
    }>;
  };

  demos: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      video: string;
      poster: string;
      duration: string;
      company: string;
      period: string;
      tags: string[];
    }>;
    playVideo: string;
    pause: string;
    play: string;
    unmute: string;
    mute: string;
    fullscreen: string;
    close: string;
  };

  contact: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
  };

  footer: {
    copyright: string;
  };

  press: {
    sectionLabel: string;
    heading: string;
    subtitle: string;
    readArticle: string;
    featuredIn: string;
    items: Array<{
      title: string;
      source: string;
      date: string;
      excerpt: string;
      url: string;
      image?: string;
      /** Original article language, e.g. "EN", "ES" */
      lang?: string;
    }>;
  };

  notFound: {
    body: string;
    back: string;
  };

  timelinePage: {
    title: string;
    subtitle: string;
    backToHome: string;
    filters: {
      all: string;
      work: string;
      education: string;
      milestones: string;
      press: string;
    };
    typeLabels: {
      work: string;
      education: string;
      award: string;
      certification: string;
      exchange: string;
      press: string;
    };
    events: Array<{
      type: "work" | "education" | "exchange" | "award" | "certification" | "press";
      title: string;
      subtitle: string;
      location: string;
      period: string;
      startDate: string;
      endDate?: string;
      description?: string;
      bullets?: string[];
      tags?: string[];
      logo?: string;
      logoBg?: string;
    }>;
  };
}
