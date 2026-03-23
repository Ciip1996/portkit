# Setup Guide

This guide walks you through cloning, configuring, and running the portfolio template locally.

---

## Prerequisites

| Requirement | Minimum version | Check |
|-------------|-----------------|-------|
| Node.js | 18.x | `node -v` |
| npm | 9.x | `npm -v` |
| Git | any | `git --version` |

---

## 1. Fork & Clone

```bash
# Fork the repo on GitHub, then clone your fork:
git clone https://github.com/your-username/ciip.git
cd ciip
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and set the following:

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `PORTFOLIO_PIN` | 4-digit PIN to access `/admin` and protected routes | `7639` |
| `PORTFOLIO_TOKEN_SECRET` | 64-char hex secret for signing cookies & tokens | `openssl rand -hex 32` |

### Optional (Redis — enables persistent admin CMS)

| Variable | Description |
|----------|-------------|
| `KV_REST_API_URL` | Your Upstash Redis REST URL |
| `KV_REST_API_TOKEN` | Your Upstash Redis REST token |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL (no trailing slash) |

**Without Redis**, the app works fully. Portfolio variants won't persist across restarts, and admin content edits won't be saved.

**To get a free Redis instance:**
1. Go to [console.upstash.com](https://console.upstash.com)
2. Create a new Redis database
3. Copy the REST URL and token into your `.env.local`

---

## 4. Personalize Content

### A. Update `config/portfolio.ts`

This is the first file to edit. It contains all personal information:

```typescript
export const portfolio = {
  author: {
    firstName: "Jane",
    lastName: "Doe",
    displayName: "Jane Doe",
    jobTitle: "Full Stack Engineer",
    email: "jane@example.com",
    phone: "+1 555 000 0000",
    location: "San Francisco · Open to Remote",
    // ...
  },
  siteUrl: "https://janedoe.dev",
  social: {
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
    email: "mailto:jane@example.com",
    website: "https://janedoe.dev",
  },
  photos: [
    "/profile-photo.jpg",
    // add more to /public/photos/ and list them here
  ],
  // ...
};
```

### B. Update `lib/i18n/en.ts`

This file contains all portfolio content in English (experience, projects, skills, etc.).

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for a field-by-field guide.

### C. Replace Photos

- Replace `/public/profile-photo.jpg` with your own photo
- Add additional photos to `/public/photos/` and list them in `config/portfolio.ts`
- Replace company logos in `/public/logos/` (PNG recommended, any size)

---

## 5. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin) (enter your PIN from `.env.local`).

---

## 6. Build for Production

```bash
npm run build
npm run start
```

---

## Troubleshooting

### "PORTFOLIO_TOKEN_SECRET env var is not set"
Make sure `.env.local` exists at the project root and contains `PORTFOLIO_TOKEN_SECRET`.

### Admin page redirects to `/admin/unlock` immediately
The cookie isn't set yet. Enter your `PORTFOLIO_PIN` in the unlock form.

### Photos not showing
Ensure the file paths in `config/portfolio.ts` match the actual files in `/public/`. Paths must start with `/`.

### Redis errors
If you see Redis connection errors, check that both `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set. Or remove them from `.env.local` to run without Redis.
