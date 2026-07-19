# Namaste Yoga Website — Project Handoff

Everything you need to pick this up cold, including what's broken and how to fix it.

---

## The Big Picture

Rebuilding **namasteyogaohio.com** as a modern Next.js site, replacing the old WordPress site.
Hosted on **Vercel**, auto-deploys on every `git push` to `main`.

**Repo:** `github.com/kmarsteller/Namaste`
**Live site:** Vercel dashboard → `Namaste` project
**Local path:** `/Users/kmarsteller/Projects/2026_NamasteNewWebsite/namaste-web/`

---

## Tech Stack

| Thing | What it is |
|---|---|
| Framework | Next.js 16.2.2, App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel (auto-deploy from GitHub) |
| Booking / scheduling | Arketa (embedded iframes + API) |
| Blog database | Neon Postgres (`@neondatabase/serverless`) |
| Blog image uploads | Vercel Blob |
| Studio notices (banner alerts) | Upstash Redis |
| Admin auth | HMAC cookie derived from `ADMIN_PASSWORD` env var |

**Fonts:** Cormorant Garamond (`font-display`) + Inter (`font-body`)
**Color palette:** stone-950 base, sage green (`sage-*`), gold (`gold-*`), burgundy (`burgundy-*`)

All Arketa iframes are dark-mode'd with CSS: `filter: invert(1) hue-rotate(180deg)`

---

## Pages

| Route | Component | Notes |
|---|---|---|
| `/` | `Hero.tsx`, `ClassesTeaser.tsx`, etc. | Video hero, social icons, first class free CTA |
| `/about` | `AboutContent.tsx` | Timeline, Jolynn bio, community causes |
| `/instructors` | `InstructorsGrid.tsx` | Hover cards with Bio/Schedule lightbox |
| `/classes` | `ClassesContent.tsx` | Arketa schedule iframe |
| `/class-descriptions` | `ClassDescriptionsContent.tsx` | Grow / Slow / Flow descriptions |
| `/workshops` | `WorkshopsContent.tsx` | Arketa workshops iframe |
| `/pricing` | `PricingContent.tsx` | Arketa pricing iframe |
| `/gift-cards` | `GiftCardsContent.tsx` | Arketa gifting iframe |
| `/new-students` | `NewStudentsContent.tsx` | First class free info |
| `/contact` | `ContactContent.tsx` | Map + contact details |
| `/teacher-training` | `TeacherTrainingContent.tsx` | YTT 200-hr program info + schedule |
| `/customize-your-event` | `CustomizeEventContent.tsx` | Private/group event inquiry form |
| `/mindful-musings` | `src/app/mindful-musings/` | Blog listing + post detail pages |
| `/admin` | `AdminPanel.tsx` | Password-gated admin dashboard |
| `/admin/blog` | `src/app/admin/blog/` | Blog post management (list, new, edit) |

---

## Admin Panel

Go to `yoursite.com/admin` — you will be prompted for a password.

The password is the `ADMIN_PASSWORD` environment variable set in Vercel.
Check Vercel dashboard → Settings → Environment Variables.

From the admin panel you can:
- Edit the **Classes page notice** (banner above the schedule)
- Edit the **Workshops page notice**
- **Manage blog posts** (create, edit, delete, publish/draft)

---

## The Blog (Mindful Musings) — CURRENTLY BROKEN

The blog needs two more Vercel services before it will work.
The notice banners (Workshop/Classes) are already working — Upstash Redis is connected.

### What still needs to be set up

Go to **Vercel dashboard → your project → Settings → Environment Variables**

#### 1. Neon Postgres (blog posts database)

1. Go to **neon.tech** → create a free account
2. Create a new project / database
3. Copy the connection string (looks like `postgresql://user:pass@host/dbname?sslmode=require`)
4. In Vercel, add env var:
   - **Name:** `POSTGRES_URL`
   - **Value:** the connection string from Neon
5. Redeploy (push any commit, or go to Vercel → Deployments → Redeploy)

The blog table (`posts`) is created automatically on first use — no SQL to run manually.

#### 2. Vercel Blob (hero image uploads in blog editor)

1. In **Vercel dashboard → Storage → Create → Blob store**
2. Once created, go to the Blob store → Settings → copy the **Read/Write token**
3. Add env var:
   - **Name:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** the token
4. Redeploy

After both are added and redeployed, the blog will be fully functional.

---

## Instructor Data

`src/data/instructors.ts` is the **allow-list** — it controls who appears on the instructors page.
Photos, bios, and Arketa IDs are pulled **live from Arketa** (cached 1 hour) and merged by name.

Each entry only needs:
- `name` — must match the name in Arketa exactly (used for the merge)
- `certs` — maintained manually here; not stored in Arketa
- `owner` — optional flag for the gold "Owner" badge
- `photo` — local fallback image if Arketa photo isn't available
- `arketaId` — fallback if instructor has no upcoming classes in the 8-week Arketa scan

**To add an instructor:** add an entry to `instructors.ts` with their name and certs. Their photo and bio will appear automatically once they're in Arketa and have a scheduled class.

**To remove an instructor:** delete their entry from `instructors.ts`. They will no longer appear on the site regardless of whether they're still in Arketa.

**To update certs:** edit the `certs` array in `instructors.ts` and push. Everything else updates automatically from Arketa.

---

## Environment Variables Summary

| Variable | What it's for | Status |
|---|---|---|
| `ADMIN_PASSWORD` | Admin panel login | ✅ Already set in Vercel |
| `UPSTASH_REDIS_REST_URL` | Notice banners (Workshop/Classes) | ✅ Already set in Vercel |
| `UPSTASH_REDIS_REST_TOKEN` | Notice banners (Workshop/Classes) | ✅ Already set in Vercel |
| `POSTGRES_URL` | Blog post database | ❌ Needs setup (Neon) |
| `BLOB_READ_WRITE_TOKEN` | Blog image uploads | ❌ Needs setup (Vercel Blob) |
| `RESEND_API_KEY` | Contact & event inquiry emails | ❌ Needs setup (see Email section) |
| `CONTACT_TO` | Where contact form emails are sent | ❌ Set to `namasteyogaohio@gmail.com` |

---

## Email (Contact & Event Inquiry Forms) — CURRENTLY STUBBED

Both the `/contact` form and the `/customize-your-event` inquiry form submit to Next.js API routes.
Email sending via **Resend** is coded but commented out — the forms currently just validate and silently succeed.
Once the domain is verified and env vars are set, it takes one uncommenting step to go live.

### What needs to happen first

1. **namasteyogaohio.com must be pointed to Vercel** (DNS managed by your domain registrar)
2. **namasteyogaohio.com must be verified in Resend** (adds DNS records so Resend can send from `hello@namasteyogaohio.com`)
3. **`RESEND_API_KEY` and `CONTACT_TO` must be added to Vercel environment variables**

### Step-by-step

#### A. Verify your domain in Resend

1. Go to **resend.com** → sign in (or create a free account)
2. Go to **Domains** → click **Add Domain**
3. Enter `namasteyogaohio.com`
4. Resend will show you 3–4 DNS records (TXT, MX, DKIM CNAME) to add at your registrar
5. Log in to your domain registrar (wherever you bought the domain), add those DNS records
6. Back in Resend, click **Verify** — it may take a few minutes for DNS to propagate

#### B. Get your Resend API key

1. In Resend → **API Keys** → click **Create API Key**
2. Name it something like `namaste-website`
3. Copy the key (you only see it once)

#### C. Add env vars to Vercel

1. Vercel dashboard → your **Namaste** project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `RESEND_API_KEY` → **Value:** the key you copied
   - **Name:** `CONTACT_TO` → **Value:** `namasteyogaohio@gmail.com`
3. Click Save, then **redeploy** (push any commit, or Deployments → Redeploy)

### How to activate the code (one-time edit)

Open **`src/app/api/contact/route.ts`** and **`src/app/api/event-inquiry/route.ts`**.

In each file:
1. Uncomment the `import { Resend }` line and the lines below it
2. Delete the line `return NextResponse.json({ ok: true });` (the stub)
3. The commented-out `await resend.emails.send(...)` block is already complete — just uncomment it

Save, commit, push — forms will deliver email from that point on.

---

## Key Files

```
src/
  data/
    instructors.ts          instructor allow-list (name + certs); photos/bios/IDs from Arketa
  components/
    Nav.tsx                 navigation (desktop + mobile)
    Footer.tsx              footer with social links
    Hero.tsx                homepage hero (video + social icons)
    InstructorsGrid.tsx     instructor cards + lightbox trigger
    ScheduleLightbox.tsx    Bio/Schedule lightbox modal
    BlogEditor.tsx          markdown editor for blog posts
    PostBody.tsx            renders markdown on public blog pages
    AdminPanel.tsx          admin dashboard
  app/
    globals.css             all CSS variables (colors, fonts)
    layout.tsx              root layout
    mindful-musings/        public blog pages
    admin/                  password-gated admin pages
    api/                    backend API routes
  lib/
    blog-db.ts              Neon Postgres helpers for blog
  proxy.ts                  admin auth middleware (Next.js 16 convention)
public/
  instructors/              instructor headshot photos
  hero.mov                  homepage video hero
  sanskrit_pen.png          Mindful Musings hero image
  hero-retail.jpg           Gift Cards page hero
  hero-classes.jpg          Class Descriptions page hero
  hero-instructors.png      Instructors page calligraphy word
```

---

## Local Development

```bash
cd /Users/kmarsteller/Projects/2026_NamasteNewWebsite/namaste-web
npm run dev
# open http://localhost:3000
```

- Admin panel works locally without a password (gate is skipped when `ADMIN_PASSWORD` is not set)
- Blog and notices fall back gracefully when database env vars are not set locally

## Deploy

```bash
git add -A
git commit -m "your message"
git push
# Vercel auto-deploys in about 1-2 minutes
```

---

## Studio Info (content reference)

- **Address:** 9821 Olde 8 Rd, Suite H20, Northfield, OH 44067
- **Phone:** 330-908-0700
- **Email:** namasteyogaohio@gmail.com
- **Facebook:** facebook.com/namasteyogaohio
- **Instagram:** instagram.com/namasteyogaohio
- **YouTube:** youtube.com/channel/UCcWvYPcl7tXWaGZlu6N5Qlg
- **Booking system:** Arketa (studio ID: `namasteyogaohio`)
- **Owner:** Jolynn McFerren (RYT 500)
