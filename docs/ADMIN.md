# Admin Panel Guide

The admin panel at `/admin` gives you full control over your portfolio without editing code.

---

## Accessing the Admin Panel

1. Navigate to `/admin` on your site
2. You will be redirected to `/admin/unlock`
3. Enter your `PORTFOLIO_PIN` (set in `.env.local`)
4. You are now logged in for 30 days (HMAC-signed cookie)

<!-- Screenshot placeholder: admin unlock page -->
> **[Screenshot — Admin Unlock Page]** *(PIN entry form)*

---

## Variants Tab

Portfolio variants let you create tailored versions of your portfolio for different audiences (e.g. a frontend-focused version for Stripe, a full-stack version for a startup).

<!-- Screenshot placeholder: admin variants tab -->
> **[Screenshot — Admin Variants Tab]** *(List of built-in and custom variants)*

### Built-in variants

| Variant | URL | Protected | Description |
|---------|-----|-----------|-------------|
| General | `/` | No | Your public homepage |
| Full | `/full` | Yes | All sections visible, with module picker |

The **General** variant's section list can be customized — click the edit (pencil) icon on its card.

### Creating a custom variant

1. Click **Create Variant**
2. Enter a **slug** — this becomes the URL (`/p/your-slug`)
3. Enter a **label** — for your own reference (e.g. "Google Application")
4. Toggle the sections you want to include
5. Choose **Public** or **Protected**
6. Click **Create Variant**

<!-- Screenshot placeholder: create variant modal -->
> **[Screenshot — Create Variant Modal]**

### Sharing a variant

- **Public variant:** Copy the URL and share it. Anyone with the link can view it.
- **Protected variant:** Click the chain link icon to generate a **token link**. The token bypasses the PIN — you can send it directly to a recruiter.

### Editing / deleting variants

Use the pencil and trash icons on each variant card. Built-in variants cannot be deleted, but the General variant's sections can be edited.

---

## Content Tab

Edit all portfolio content live. Changes are saved to Redis and appear on the site within 60 seconds (ISR).

<!-- Screenshot placeholder: admin content tab -->
> **[Screenshot — Admin Content Tab]** *(Accordion of content sections)*

### Language selector

Toggle between **EN** and **ES** at the top right to edit content for each language independently.

### Sections

Each section is an expandable accordion panel:

| Section | What you can edit |
|---------|-------------------|
| **Hero** | Name, subtitle, bio, location, CTA button text |
| **Experience** | Add/edit/delete job entries (title, company, period, bullets, tags) |
| **Projects** | Add/edit/delete projects (+ image, GitHub, demo, metrics, status, featured) |
| **Skills** | Add/edit/delete skill categories and individual skills |
| **Press** | Add/edit/delete media mentions and articles |
| **Contact** | Section heading and subtitle text |
| **Education** | School entries, degree details, location |

<!-- Screenshot placeholder: experience editor -->
> **[Screenshot — Experience Section Editor]** *(Expanded accordion with job list)*

### Saving changes

Click **Save to Redis** at the bottom of each section. A green confirmation appears when saved.

The badge **"Redis override is active"** appears when that section has a live override. Content in Redis takes precedence over the static `lib/i18n/` files.

### Resetting to defaults

Click **Reset to default** to delete the Redis override and revert to the static `lib/i18n/` file content. This is useful if you made a mistake or want to re-sync with code changes.

### Making changes permanent

Admin edits live in Redis. If you want to commit them to the codebase (so they survive if Redis is cleared), copy the content back into `lib/i18n/en.ts` or `es.ts`.

---

## Token Links

Token links let someone view a protected portfolio variant without needing the PIN.

1. Open a protected variant's card in the Variants tab
2. Click the chain-link icon (**Generate token link**)
3. The link is copied to your clipboard and shown in a modal
4. Share it — it's valid indefinitely and grants read-only access to that variant

Tokens are HMAC-signed using `PORTFOLIO_TOKEN_SECRET`. Rotate the secret to invalidate all existing tokens.

---

## Security Notes

- The auth cookie is HttpOnly, SameSite=Lax, and valid for 30 days
- The PIN is compared using `timingSafeEqual` (constant-time) to prevent timing attacks
- Token links use HMAC-SHA256 signatures and cannot be forged
- Redis is only accessible server-side (API routes); no credentials are exposed to the browser
- Rotate `PORTFOLIO_TOKEN_SECRET` to invalidate all cookies and tokens simultaneously
