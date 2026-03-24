# Portfolio Template

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCiip1996%2Fportkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org)

A modern, open-source developer portfolio template built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. Features a PIN-protected admin panel with full content management, audience-targeted portfolio variants, and bilingual (EN/ES) support.

---

<!-- Screenshot placeholder: homepage hero section -->
> **[Screenshot — Homepage]** *(Replace this line with a screenshot of your deployed homepage)*

<!-- Screenshot placeholder: admin panel -->
> **[Screenshot — Admin Panel]** *(Replace this line with a screenshot of the /admin page)*

---

## Features

- **One-file customization** — fork and edit `config/portfolio.ts` to make it yours
- **Admin CMS** — edit all content (experience, projects, skills, etc.) live from `/admin`
- **Portfolio variants** — create audience-specific versions (`/p/microsoft`, `/p/startup-xyz`)
- **Hybrid content layer** — content edits persist in Redis and revalidate pages in 60 seconds
- **Bilingual** — full English & Spanish support with a language toggle
- **Dark / Light mode** — CSS variable theming, persisted in `localStorage`
- **Animations** — Framer Motion scroll-triggered animations throughout
- **SEO** — Metadata API, JSON-LD, Open Graph, Twitter Cards, sitemap, robots.txt
- **Vercel Analytics** — built-in page view tracking
- **Zero layout shift** — `next/font` for Space Grotesk + JetBrains Mono

---

## Quick Start

```bash
# 1. Clone or fork the repository
git clone https://github.com/Ciip1996/portkit.git
cd portkit

# 2. Install dependencies
npm install

# 3. Create your .env.local from the template
npm run setup
# Then edit .env.local — set PORTFOLIO_PIN, PORTFOLIO_TOKEN_SECRET, and optionally Redis

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin panel:** [http://localhost:3000/admin](http://localhost:3000/admin) (enter your PIN)

---

## Configuration

Everything you need to change for your own portfolio is in two places:

### 1. `config/portfolio.ts` — Personal info & branding

| Key | Description |
|-----|-------------|
| `author.firstName / lastName` | Your name (used in hero, OG image, JSON-LD) |
| `author.email / phone` | Contact details |
| `author.jobTitle` | Shown in metadata and structured data |
| `siteUrl` | Your deployed domain (or set `NEXT_PUBLIC_SITE_URL` in `.env.local`) |
| `social.github / linkedin` | Social profile URLs for hero icon buttons |
| `photos` | Array of `/public/` image paths for the hero carousel |
| `metadata.*` | SEO title, description, keywords, OG config |
| `ogImage.*` | Open Graph card text |

### 2. `lib/i18n/en.ts` — All content (EN) · `lib/i18n/es.ts` — All content (ES)

Every piece of portfolio content lives here:

| Section | What to edit |
|---------|-------------|
| `hero` | Bio, subtitle, location |
| `experience.jobs` | Work history entries |
| `projects.items` | Contractor / featured projects |
| `freelance.items` | Freelance work |
| `skills.categories` | Skill groups and technologies |
| `education.schools` | Degree info |
| `press.items` | Media mentions |
| `contact` | Section labels |
| `timelinePage.events` | Full career timeline |

See [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for a complete field-by-field guide.

---

## Admin Panel

Access `/admin` with your PIN to:

- **Variants tab** — create audience-targeted portfolio links (e.g. `/p/google`)
- **Content tab** — edit all portfolio sections live (saves to Redis, no redeploy needed)

<!-- Screenshot placeholder: admin variants tab -->
> **[Screenshot — Admin Variants Tab]**

<!-- Screenshot placeholder: admin content tab -->
> **[Screenshot — Admin Content Tab]**

See [docs/ADMIN.md](docs/ADMIN.md) for full admin documentation.

---

## Portfolio Variants

Create custom portfolio links tailored to specific job applications:

1. Visit `/full` to preview all sections side-by-side
2. Tick the sections you want to include
3. Click **Create Variant** → name it and confirm
4. Share the link (`/p/your-variant`) — optionally PIN-protect it

---

## Deployment

### Vercel (recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCiip1996%2Fportkit)

Set these environment variables in your Vercel project settings:

```
NEXT_PUBLIC_SITE_URL        https://yourdomain.com
PORTFOLIO_PIN               1234
PORTFOLIO_TOKEN_SECRET      <64-char hex, run: openssl rand -hex 32>
KV_REST_API_URL             https://your-instance.upstash.io   # optional
KV_REST_API_TOKEN           <upstash token>                     # optional
```

**Redis is optional.** Without it, portfolio variants won't persist across deploys, and admin content edits won't be saved. For a static portfolio without an admin CMS, Redis is not needed.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full deployment instructions.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org) | App Router, SSG + ISR |
| [TypeScript 5.8](https://typescriptlang.org) | Type-safe everything |
| [Tailwind CSS 3](https://tailwindcss.com) | Dark-mode utility styling |
| [Framer Motion](https://framer.com/motion) | Scroll-triggered animations |
| [Radix UI](https://radix-ui.com) | Accessible dialog primitive |
| [Upstash Redis](https://upstash.com) | Serverless KV for admin CMS |
| [Lucide Icons](https://lucide.dev) | SVG icon set |
| [Vercel Analytics](https://vercel.com/analytics) | Page view tracking |

---

## Project Structure

```
config/              ← edit this to personalize your portfolio
 portfolio.ts        ← name, social links, photos, SEO metadata

lib/i18n/
 en.ts               ← all content in English (edit this!)
 es.ts               ← all content in Spanish
 types.ts            ← Dictionary TypeScript types

modules/             ← one folder per portfolio section
 hero/
 experience/
 skills/
 education/
 projects/
 freelance/
 demos/
 press/
 contact/

app/
 page.tsx            ← homepage (ISR, fetches Redis overrides)
 admin/              ← PIN-protected admin CMS panel
  admin-content.tsx  ← variants + content tab UI
  content-editor.tsx ← per-section CRUD forms
 api/
  content/[section]/ ← content CRUD API (GET/PUT/DELETE)
  variants/          ← variant CRUD API
  token/             ← shareable link token generator
  unlock/            ← PIN verification

lib/
 content.ts          ← Redis content loader with i18n fallback
 variants-server.ts  ← Redis variant CRUD
 auth.ts             ← HMAC PIN + cookie verification
```

---

## Scripts

```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request. This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md) code of conduct.

---

## License

[MIT](LICENSE) © Ivan Pacheco
