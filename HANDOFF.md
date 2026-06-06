# Namaste Yoga Studio — Developer Handoff

This is the Next.js rebuild of namasteyogaohio.com. It runs on Node.js with Tailwind CSS and pulls live scheduling/pricing/gifting from Arketa.

---

## Getting set up on a new machine

### 1. Prerequisites

Install **Node.js v20 or higher** (v23 was used in development).  
The easiest way: https://nodejs.org — download the LTS version.

Confirm it's installed:
```bash
node --version   # should say v20.x or higher
npm --version
```

### 2. Clone the repo

Make sure your SSH key is added to GitHub first (Settings → SSH keys).

```bash
git clone git@github.com:kmarsteller/Namaste.git
cd Namaste
```

### 3. Install dependencies

```bash
npm install
```

This pulls in Next.js, Tailwind, and everything else. Takes about a minute.

### 4. Create the environment file

The contact form sends email via Gmail. Create a file called `.env.local` in the project root (this file is **not** in the repo — it contains secrets):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=namasteyogaohio@gmail.com
SMTP_PASS=your-gmail-app-password-here
CONTACT_TO=namasteyogaohio@gmail.com
```

To get the Gmail App Password:  
Google Account → Security → 2-Step Verification → App passwords → create one called "Namaste Website"

### 5. Run the dev server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Project structure

```
namaste-web/
├── src/
│   ├── app/              # One folder per page (Next.js App Router)
│   │   ├── page.tsx      # Home page
│   │   ├── classes/
│   │   ├── workshops/
│   │   ├── class-descriptions/
│   │   ├── pricing/
│   │   ├── instructors/
│   │   ├── about/
│   │   ├── new-students/
│   │   ├── contact/
│   │   ├── gift-cards/
│   │   ├── admin/        # ← site management (not public-facing)
│   │   └── api/          # Server-side API routes
│   ├── components/       # All React components
│   └── data/
│       └── instructors.ts  # Instructor names, photos, Arketa IDs
├── data/                 # Editable content files (JSON)
│   ├── workshop-notice.json
│   └── classes-notice.json
├── public/               # Images, video, logos
│   ├── hero.mov
│   ├── logo-greige.png
│   └── instructors/      # 21 instructor photos
└── .env.local            # ← YOU CREATE THIS (not in git)
```

---

## Admin page

Go to **http://localhost:3000/admin** (or the live URL + /admin).

From here you can update:
- **Workshop Notice** — appears as a callout at the top of the Workshops page
- **Classes Notice** — appears as a callout at the top of the Classes page

Leave either field blank to hide the callout. Changes save to the `data/` folder and appear on the next page load.

---

## Arketa (booking system)

The site embeds Arketa iframes for:
- **Classes** — `https://app.arketa.co/iframe/namasteyogaohio/schedule`
- **Workshops** — `https://app.arketa.co/iframe/namasteyogaohio/schedule?type=event`
- **Pricing** — `https://app.arketa.co/iframe/namasteyogaohio/pricing/cards`
- **Gift Cards** — `https://app.arketa.co/iframe/namasteyogaohio/gifting`
- **Individual instructor schedules** — `?host=[arketaId]` — IDs are stored in `src/data/instructors.ts`

No Arketa credentials are needed in the code — the iframes load publicly.

---

## Adding or updating an instructor

Edit `src/data/instructors.ts`. Each entry looks like:

```ts
{
  name: "Instructor Name",
  photo: "/instructors/filename.jpg",   // place photo in public/instructors/
  certs: ["200-hr", "Yin Yoga"],
  arketaId: "xxxxxxxxxxxxxxxxxxxx",     // from their Arketa schedule URL
  owner: true,                          // optional — shows "Owner" badge
}
```

---

## Pages still to build

- `/teacher-training`
- `/mindful-musings` (blog)
- `/customize-your-event`
- `/schedule` (currently redirects — may just use `/classes`)

---

## Deploying to production

The site is ready to deploy to **Vercel** (recommended — built by the Next.js team, free tier available).

1. Go to https://vercel.com → New Project → Import from GitHub → select `kmarsteller/Namaste`
2. Add the environment variables from `.env.local` in Vercel's project settings
3. Every `git push` to `main` auto-deploys

**Note:** The `data/*.json` files (workshop/classes notices) are written to disk by the admin page. This works locally but **will not persist on Vercel** (serverless filesystem is read-only). Before going live, we should move those to a simple database or Vercel KV. Flag this when ready to deploy.

---

## Quick reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Check for errors | `npx tsc --noEmit` |
| Commit changes | `git add -A && git commit -m "message"` |
| Push to GitHub | `git push origin main` |
