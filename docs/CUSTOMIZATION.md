# Customization Guide

This guide covers all the ways you can personalize this portfolio template.

---

## Quick Customization Checklist

- [ ] Edit `config/portfolio.ts` — name, social links, photos, metadata
- [ ] Edit `lib/i18n/en.ts` — all portfolio content (experience, projects, skills, etc.)
- [ ] Replace `/public/profile-photo.jpg` with your photo
- [ ] Replace logos in `/public/logos/`
- [ ] (Optional) Edit `lib/i18n/es.ts` for Spanish translation
- [ ] (Optional) Add your diplomas/certificates to `/public/diplomas/`
- [ ] (Optional) Update theme color in `app/globals.css`

---

## `config/portfolio.ts` — Personal Branding

The single file you must edit when forking. Contains all personal/non-content data.

### `author`

```typescript
author: {
  firstName: "Jane",           // Used in hero and OG image
  lastName: "Doe",             // Displayed with gradient in hero
  displayName: "Jane Doe",     // Full name for metadata/JSON-LD
  jobTitle: "Full Stack Engineer",
  shortBio: "...",             // Used in JSON-LD and metadata description
  currentEmployer: "Acme Inc", // JSON-LD worksFor
  email: "jane@example.com",   // Shown in contact section
  phone: "+1 555 000 0000",    // Only shown in protected /full variant
  location: "City · Open to Remote",
}
```

### `siteUrl`

```typescript
siteUrl: "https://yourdomain.com"
// Also settable via NEXT_PUBLIC_SITE_URL env var
```

### `social`

```typescript
social: {
  github: "https://github.com/your-handle",
  linkedin: "https://linkedin.com/in/your-handle",
  email: "mailto:you@example.com",
  website: "https://yourdomain.com",
}
```

### `photos`

The hero section cycles through these images. Add photos to `/public/photos/` and list them:

```typescript
photos: [
  "/profile-photo.jpg",       // Main profile photo (loaded first, priority)
  "/photos/photo-1.png",
  "/photos/photo-2.png",
  // add as many as you want
]
```

### `metadata`

Controls all SEO metadata (`<title>`, description, keywords, OG):

```typescript
metadata: {
  defaultTitle: "Jane Doe — Full Stack Engineer",
  titleTemplate: "%s | Jane Doe",
  description: "Your meta description here...",
  keywords: ["Jane Doe", "Software Engineer", ...],
  siteName: "Jane Doe — Portfolio",
  ogDescription: "Short OG description...",
}
```

### `ogImage`

The text shown on the auto-generated Open Graph card (1200×630px):

```typescript
ogImage: {
  roleLabel: "Full Stack Engineer",
  tagline: "5+ years building web apps. React, TypeScript & Node.js.",
  footerLinks: [
    "github.com/your-handle",
    "linkedin.com/in/your-handle",
    "yourdomain.com",
  ],
}
```

---

## `lib/i18n/en.ts` — Portfolio Content

All portfolio content lives here. The structure matches the `Dictionary` type in `lib/i18n/types.ts`.

### `hero`

```typescript
hero: {
  imgAlt: "Jane Doe — Full Stack Engineer",   // alt text for profile photo
  subtitle: "Full Stack Engineer",            // mono text above name
  firstName: "Jane",
  lastName: "Doe",
  bio: "Your bio paragraph here...",
  location: "City · Open to Remote",
  cta: "Get in Touch",                        // CTA button text
}
```

### `experience.jobs`

Array of work history entries:

```typescript
{
  title: "Senior Engineer",
  company: "Acme Inc",
  location: "Remote",
  period: "Jan 2023 – Present",
  logo: "acme",               // filename in /public/logos/ without extension
  logoBg: "#ffffff",          // optional logo background color
  bullets: [
    "Led the migration of...",
    "Built and maintained...",
  ],
  tags: ["React", "TypeScript", "AWS"],
}
```

**Adding a company logo:**
1. Add a PNG to `/public/logos/yourcompany.png`
2. Register it in `lib/logos.tsx` (follow existing pattern)
3. Use the key (e.g. `"yourcompany"`) in the `logo` field

### `projects.items`

```typescript
{
  title: "Project Name",
  role: "Lead Engineer",
  period: "2022 – 2023",
  description: "What the project was and what you did...",
  tags: ["React", "Node.js"],
  image: "/projects/screenshot.png",    // optional cover image
  link: "https://example.com",          // optional live URL
  github: "https://github.com/...",     // optional GitHub link
  demo: "https://demo.example.com",     // optional demo link
  featured: true,                       // pin to top of list
  status: "Completed",                  // "In Progress" | "Completed" | "Archived"
  metrics: "2M monthly users · +40% performance",  // impact highlight
}
```

### `skills.categories`

```typescript
{
  label: "Frontend",
  skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
}
```

### `education.schools`

```typescript
{
  school: "MIT",
  degree: "B.Sc. Computer Science",
  detail: "4.0 GPA",
  location: "Cambridge, MA",
  logo: "mit",           // /public/logos/mit.png
  sortDate: "2020-06",
  timelineType: "education",
}
```

### `press.items`

```typescript
{
  title: "Article Title",
  source: "TechCrunch",
  date: "Jan 2024",
  excerpt: "Quote or short description...",
  url: "https://techcrunch.com/...",
  lang: "EN",
}
```

---

## Theming

### Colors

The theme uses HSL CSS variables defined in `app/globals.css`. The primary color (teal/green) is:

```css
--primary: 160 84% 39%;
```

To change the accent color, update the `--primary` and `--primary-foreground` variables.

### Fonts

Fonts are configured in `app/layout.tsx`:

```typescript
const spaceGrotesk = Space_Grotesk({ ... });     // body font
const jetbrainsMono = JetBrains_Mono({ ... });   // monospace/code font
```

Change these to any [Google Font](https://fonts.google.com) by swapping the import.

---

## Adding a New Section

1. Create `modules/your-section/your-section.tsx` (follow existing module pattern)
2. Create `modules/your-section/index.tsx` that re-exports the default
3. Add the section ID to `lib/variants.ts` `ALL_SECTIONS` array
4. Register it in `components/layout/variant-page-content.tsx` `SECTION_MAP`
5. Add translation keys to `lib/i18n/types.ts`, `en.ts`, and `es.ts`

---

## Spanish Translation

Edit `lib/i18n/es.ts` — same structure as `en.ts`. Visitors can toggle languages using the navbar button.

If you don't need Spanish, you can ignore `es.ts`. It only loads if a user selects Spanish.

---

## Adding Diplomas / Certificates

1. Add PDFs to `/public/diplomas/`
2. Add entries to `diplomas.items` in `lib/i18n/en.ts`:

```typescript
{
  title: "My Certificate",
  description: "Description of this credential",
  file: "/diplomas/my-certificate.pdf",
}
```
