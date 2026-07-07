import { sql } from "@vercel/postgres";

export type Post = {
  id: number;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  body: string;
  hero_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id           SERIAL PRIMARY KEY,
      title        TEXT        NOT NULL,
      slug         TEXT        NOT NULL UNIQUE,
      author       TEXT        NOT NULL DEFAULT 'Namaste Yoga Studio',
      excerpt      TEXT        NOT NULL DEFAULT '',
      body         TEXT        NOT NULL DEFAULT '',
      hero_image_url TEXT,
      published    BOOLEAN     NOT NULL DEFAULT false,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}
