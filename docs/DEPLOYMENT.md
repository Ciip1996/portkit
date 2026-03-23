# Deployment Guide

---

## Vercel (Recommended)

Vercel is the easiest deployment target for this Next.js project.

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCiip1996%2Fciip)

### Manual deploy steps

1. **Push your fork to GitHub** (or GitLab / Bitbucket)

2. **Import the project in Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Framework preset: **Next.js** (auto-detected)

3. **Set environment variables** in Vercel project settings → Environment Variables:

   | Variable | Required | Description |
   |----------|----------|-------------|
   | `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL, e.g. `https://yourdomain.com` |
   | `PORTFOLIO_PIN` | Yes | 4-digit PIN for `/admin` and protected routes |
   | `PORTFOLIO_TOKEN_SECRET` | Yes | 64-char hex — run `openssl rand -hex 32` |
   | `KV_REST_API_URL` | Optional | Upstash Redis REST URL |
   | `KV_REST_API_TOKEN` | Optional | Upstash Redis REST token |

4. **Deploy.** Vercel builds and deploys automatically on every push to `main`.

---

## Setting Up Upstash Redis (Optional)

Redis enables:
- Persistent portfolio variants (survive deploys)
- Live content editing from the admin panel

### Steps

1. Create a free account at [console.upstash.com](https://console.upstash.com)
2. Click **Create Database**
3. Choose **Redis**, give it a name, and select a region
4. On the database page, copy:
   - **REST URL** → `KV_REST_API_URL`
   - **REST Token** → `KV_REST_API_TOKEN`
5. Add both to your Vercel environment variables (and your local `.env.local`)

---

## Custom Domain

1. In Vercel project settings → **Domains**, add your domain
2. Update your DNS records as instructed by Vercel
3. Update `NEXT_PUBLIC_SITE_URL` to match your domain

---

## ISR (Incremental Static Regeneration)

Pages revalidate every **60 seconds** after a deploy. This means:

- After saving content in the admin panel, the live site reflects changes within 60 seconds
- No manual redeploy required for content changes

To change the revalidation interval, update `export const revalidate = 60` in `app/page.tsx` and other route pages.

---

## Other Platforms

### Node.js server (self-hosted)

```bash
npm run build
npm run start
# Listens on port 3000 by default
PORT=8080 npm run start   # custom port
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Remember to pass all required environment variables to the container.

---

## Security Checklist

- [ ] `PORTFOLIO_TOKEN_SECRET` is a unique, random 64-char hex string
- [ ] `PORTFOLIO_PIN` is set to a private value (not the default)
- [ ] `.env.local` is not committed to version control (it's in `.gitignore`)
- [ ] Redis token has minimal required permissions
- [ ] `NEXT_PUBLIC_SITE_URL` is set correctly (affects canonical URLs and SEO)
