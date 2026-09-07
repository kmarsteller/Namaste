# Namaste Yoga Website — Project Handoff

Everything you need to pick this up cold.

---

## The Big Picture

Rebuilding **namasteyogaohio.com** as a modern Next.js site, replacing the old WordPress site.
Hosted on **Vercel**, auto-deploys on every `git push` to `main`.

**Repo:** `github.com/kmarsteller/Namaste`
**Live site:** Vercel dashboard → `Namaste` project
**Local path:** `/Users/kmarsteller/Projects/Namaste/`

---

## Tech Stack

| Thing | What it is |
|---|---|
| Framework | Next.js 16.2.2, App Router, TypeScript |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel (auto-deploy from GitHub) |
| Booking / scheduling | Arketa (embedded iframes + public widget API) |
| Database | Neon Postgres (`@neondatabase/serverless`) |
| Blog image uploads | Vercel Blob |
| Admin auth | HMAC cookie derived from `ADMIN_PASSWORD` env var |
| Email (pending) | Resend — coded but not yet activated |

**Fonts:** Cormorant Garamond (`font-display`) + Inter (`font-body`)
**Color palette:** stone-950 base, sage green (`sage-*` = Grow), gold (`gold-*` = Slow), blue for Flow, terra for accents

**Navigation structure** (`src/components/Nav.tsx`):
- **Yoga**: Classes, Workshops, Class Descriptions, New Students
- **Studio**: Our Story, Faculty, Contact, Mindful Musings, Yoga Teacher Training
- **Shop**: Buy Passes, Gift Cards, Custom Event

All Arketa iframes are dark-mode'd with CSS: `filter: invert(1) hue-rotate(180deg)`

---

## Pages

| Route | Component | Notes |
|---|---|---|
| `/` | `Hero.tsx`, `ClassesTeaser.tsx`, etc. | Video hero, lens flare, ambient music toggle, social icons |
| `/about` | `AboutContent.tsx` | Timeline, Jolynn bio, community causes |
| `/instructors` | `InstructorsGrid.tsx` | Hover cards with Bio/Schedule lightbox; managed via Admin |
| `/classes` | `ClassesContent.tsx` | Arketa schedule iframe + classes notice banner |
| `/class-descriptions` | `ClassDescriptionsContent.tsx` | Grow / Slow / Flow descriptions with animations |
| `/workshops` | `WorkshopsContent.tsx` | Arketa workshops iframe + workshop notice banner |
| `/pricing` | `PricingContent.tsx` | Arketa pricing iframe |
| `/gift-cards` | `GiftCardsContent.tsx` | Arketa gifting iframe |
| `/new-students` | `NewStudentsContent.tsx` | First class free info |
| `/contact` | `ContactContent.tsx` | Map + contact form (email stubbed — see Email section) |
| `/teacher-training` | `TeacherTrainingContent.tsx` | YTT 200-hr program info + schedule |
| `/customize-your-event` | `CustomizeEventContent.tsx` | Private/group event inquiry form (email stubbed) |
| `/mindful-musings` | `src/app/mindful-musings/` | Blog listing + post detail pages |
| `/admin` | `AdminPanel.tsx` | Password-gated admin dashboard |
| `/admin/blog` | `src/app/admin/blog/` | Blog post management (list, new, edit) |
| `/admin/faculty` | `src/app/admin/faculty/` | Faculty visibility management |

---

## Admin Panel

Go to `yoursite.com/admin` — you will be prompted for a password.

The password is the `ADMIN_PASSWORD` environment variable set in Vercel.

From the admin panel you can:
- Edit the **Classes page notice** (banner alert above the schedule)
- Edit the **Workshops page notice**
- **Manage blog posts** (Mindful Musings — create, edit, delete, publish/draft)
- **Manage Faculty** — mute/unmute instructors, add Arketa staff not yet on site, delete from roster

---

## Faculty Management

The instructors page (`/instructors`) is managed two ways:

### Static list
`src/data/instructors.ts` — the base roster. Each entry has `name`, `certs`, optional `owner` flag, local fallback `photo`, and `arketaId`. Photos and bios are pulled **live from Arketa** (1-hour cache) and merged by name.

### Admin overrides (stored in Neon DB)
The `/admin/faculty` page lets you:
- **Mute** — hide an instructor temporarily (stays in list, button flips to Unmute)
- **Unmute** — restore them
- **Delete** — remove from site; moves them to the "In Arketa — Not on Site" section
- **Add from Arketa** — pull in someone teaching on Arketa who isn't in `instructors.ts` yet (enter their certs, confirm)

Three Neon tables back this: `faculty_muted`, `faculty_added`, `faculty_deleted`.

**To permanently add a new instructor to the base roster:** add an entry to `instructors.ts` with `name` and `certs`. Their photo and bio appear automatically from Arketa once they have a scheduled class.

---

## Notices (Banner Alerts)

Both the Classes and Workshops pages support a highlighted notice banner at the top.
These are stored in Neon Postgres (`classes_notice` and `workshop_notice` tables, auto-created).
Edit them from `/admin` — changes appear on the next page load.

---

## Ambient Music

The homepage hero has a **Sound: Off / Sound: On** button (fixed bottom-right, follows scroll).
Music: *"Meditation Impromptu 01"* by Kevin MacLeod (incompetech.com), CC BY 4.0.
File: `public/ambient.mp3` — loops at 35% volume. Implemented as a module-level Audio singleton in `Hero.tsx`.

---

## Environment Variables

| Variable | What it's for | Status |
|---|---|---|
| `ADMIN_PASSWORD` | Admin panel login | ✅ Set in Vercel |
| `POSTGRES_URL` | All Neon DB features (blog, notices, faculty) | ✅ Set in Vercel |
| `BLOB_READ_WRITE_TOKEN` | Blog image uploads | ✅ Set in Vercel |
| `RESEND_API_KEY` | Contact & event inquiry emails | ❌ Needs setup (see below) |
| `CONTACT_TO` | Where contact form emails go | ❌ Set to `namasteyogaohio@gmail.com` once Resend is live |

**Local development:** create `/Users/kmarsteller/Projects/Namaste/.env.local` with at minimum:
```
POSTGRES_URL=your-neon-connection-string
```
The admin panel works without a password locally (gate is skipped when `ADMIN_PASSWORD` is unset).

---

## Email — ONE STEP AWAY FROM LIVE

Both `/contact` and `/customize-your-event` forms submit to API routes. Email via **Resend** is fully coded but commented out — forms currently validate and silently succeed.

### What needs to happen

1. **Sign in to resend.com** (requires Jolynn's 2FA — she has the account)
2. **Domains → Add Domain →** `namasteyogaohio.com`
3. Add the DNS records Resend shows you in **GoDaddy** (TXT + DKIM records)
4. Click **Verify** in Resend
5. **API Keys → Create API Key** → copy it
6. In **Vercel → Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = the key
   - `CONTACT_TO` = `namasteyogaohio@gmail.com`
7. Tell the developer — one commit to uncomment two files and it's live

### The code activation (developer step)

In `src/app/api/contact/route.ts` and `src/app/api/event-inquiry/route.ts`:
1. Uncomment the `import { Resend }` line and everything below it
2. Delete the stub `return NextResponse.json({ ok: true });`
3. Push — emails will start flowing immediately

The templates are already written and tested inside those comment blocks.

---

## Neon Database Tables

All tables are auto-created on first use — no manual SQL needed.

| Table | Purpose |
|---|---|
| `posts` | Blog posts (Mindful Musings) |
| `classes_notice` | Classes page banner text |
| `workshop_notice` | Workshops page banner text |
| `faculty_muted` | Instructors hidden temporarily |
| `faculty_added` | Instructors added via admin (not in instructors.ts) |
| `faculty_deleted` | Static instructors removed from the public roster |

---

## Key Files

```
src/
  data/
    instructors.ts              base instructor roster (name, certs, photos)
  components/
    Nav.tsx                     navigation (desktop + mobile)
    Footer.tsx                  footer with social links
    Hero.tsx                    homepage hero (video, lens flare, ambient music)
    ClassesTeaser.tsx           homepage class tier cards (Grow/Slow/Flow animations)
    ClassDescriptionsContent.tsx  full class descriptions page (same animations)
    InstructorsGrid.tsx         instructor cards + lightbox
    ScheduleLightbox.tsx        Bio/Schedule lightbox modal
    OmDraw.tsx                  animated Om symbol (paths from studio logo)
    BlogEditor.tsx              markdown editor for blog posts
    PostBody.tsx                renders markdown on public blog pages
    AdminPanel.tsx              admin dashboard
  app/
    globals.css                 CSS variables (colors, fonts, sage/gold palette)
    layout.tsx                  root layout
    mindful-musings/            public blog pages
    admin/                      password-gated admin pages
      blog/                     blog management
      faculty/                  faculty management
    api/
      faculty/route.ts          mute/add/delete faculty
      instructors/route.ts      pulls live data from Arketa widget API
      classes-notice/route.ts   classes banner (Neon)
      workshop-notice/route.ts  workshops banner (Neon)
      blog/posts/route.ts       blog CRUD
      contact/route.ts          contact form (Resend stubbed)
      event-inquiry/route.ts    event inquiry form (Resend stubbed)
      admin-login/route.ts      HMAC cookie auth
  lib/
    blog-db.ts                  Neon Postgres helpers (used across all DB routes)
  proxy.ts                      admin auth middleware (Next.js 16 convention — not middleware.ts)
public/
  ambient.mp3                   homepage background music (Kevin MacLeod, CC BY 4.0)
  hero-web.mp4                  homepage video hero
  instructors/                  instructor headshot photos (local fallbacks)
  sanskrit_pen.png              Mindful Musings hero image
```

---

## Local Development

```bash
cd /Users/kmarsteller/Projects/Namaste
npm run dev
# open http://localhost:3000
```

Create `.env.local` with `POSTGRES_URL` to use DB features locally.

## Deploy

```bash
git add -A
git commit -m "your message"
git push
# Vercel auto-deploys in ~1 minute
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
- **Domain registrar:** GoDaddy
