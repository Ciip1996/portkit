/**
 * Portfolio Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the PRIMARY file to edit when forking this template.
 * Change the values below to reflect your personal information.
 *
 * Content (experience entries, projects, skills, etc.) lives in:
 *   lib/i18n/en.ts  — English
 *   lib/i18n/es.ts  — Spanish (optional)
 *
 * See docs/CUSTOMIZATION.md for a full walkthrough.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const portfolio = {
  // ── Identity ───────────────────────────────────────────────────────────────
  author: {
    firstName: "Ivan",
    lastName: "Ibarra Pacheco",
    /** Shown in metadata titles and JSON-LD */
    displayName: "Ivan Pacheco",
    jobTitle: "Software Engineer",
    /** Short bio for SEO description and JSON-LD */
    shortBio:
      "Software Engineer at Microsoft with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, Python, Node.js, and AWS.",
    /** Current employer (used in JSON-LD) */
    currentEmployer: "Microsoft",
    /** Email address */
    email: "bytepacheco@gmail.com",
    /** Phone (optional – only shown in protected variants) */
    phone: "+52 477 880 8887",
    /** Location string shown in hero section */
    location: "Redmond, WA · From León, Mexico",
  },

  // ── Site ───────────────────────────────────────────────────────────────────
  /**
   * The canonical URL of your deployed site (no trailing slash).
   * Falls back to the NEXT_PUBLIC_SITE_URL env var.
   */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ivanpacheco.dev",

  // ── Social Links ───────────────────────────────────────────────────────────
  social: {
    github: "https://github.com/Ciip1996",
    linkedin: "https://www.linkedin.com/in/ciip/",
    /** Used in hero icon links and contact section */
    email: "mailto:bytepacheco@gmail.com",
    /** Your portfolio/personal website */
    website: "https://ivanpacheco.dev",
  },

  // ── Profile Photos ─────────────────────────────────────────────────────────
  /**
   * Ordered list of images for the hero section photo carousel.
   * Place images in /public/ and reference them with a leading slash.
   * The first image is displayed on initial load (priority loaded).
   */
  photos: [
    "/profile-photo.jpg",
    "/photos/photo-1.png",
    "/photos/photo-2.png",
    "/photos/photo-3.png",
    "/photos/photo-4.png",
    "/photos/photo-5.png",
    "/photos/photo-6.png",
  ],

  // ── SEO & Metadata ─────────────────────────────────────────────────────────
  metadata: {
    /** Default <title> for the homepage */
    defaultTitle: "Ivan Pacheco — Software Engineer at Microsoft",
    /** %s is replaced with the page name on sub-routes */
    titleTemplate: "%s | Ivan Pacheco",
    /** Meta description */
    description:
      "Passionate Software Engineer with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, Python, Node.js, and AWS. Software Engineer at Microsoft with a Master's in Cybersecurity from Tec de Monterrey.",
    /** Keywords for meta[name=keywords] */
    keywords: [
      "Ivan Pacheco",
      "Software Engineer",
      "Senior Software Engineer",
      "React Developer",
      "TypeScript",
      "Frontend Engineer",
      "Full Stack Developer",
      "Web Developer",
      "Microsoft",
      "Cybersecurity",
      "Portfolio",
      "Remote Developer",
      "Mexico",
    ],
    /** Open Graph site name */
    siteName: "Ivan Pacheco — Portfolio",
    /** OG image short description */
    ogDescription:
      "Software Engineer at Microsoft with 8+ years of experience. Specialized in React, TypeScript, and cloud technologies.",
  },

  // ── JSON-LD Structured Data ─────────────────────────────────────────────────
  jsonLd: {
    /** Universities / schools to list in alumniOf */
    alumniOf: [
      "Monterrey Institute of Technology and Higher Education (ITESM)",
      "Universidad de La Salle Bajio",
    ],
    /** Topics you know (knowsAbout) */
    knowsAbout: [
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "AWS",
      "Cybersecurity",
      "Software Engineering",
    ],
  },

  // ── OG Image ───────────────────────────────────────────────────────────────
  ogImage: {
    /** Role label displayed above your name in the OG card */
    roleLabel: "Software Engineer",
    /** Tagline shown below your name */
    tagline: "Software Engineer at Microsoft. 8+ years building scalable web applications. React, TypeScript & Cloud.",
    /** Footer links displayed at the bottom of the OG card */
    footerLinks: [
      "github.com/Ciip1996",
      "linkedin.com/in/ciip",
      "ivanpacheco.dev",
    ],
  },
} as const;

export type Portfolio = typeof portfolio;
