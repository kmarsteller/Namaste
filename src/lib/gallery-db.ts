import { neon } from "@neondatabase/serverless";

export type GalleryItem = {
  id: number;
  type: "photo" | "video";
  storage_url: string;       // Vercel Blob URL for uploads; YouTube/Vimeo URL for embeds
  video_embed_url: string | null; // normalized embed URL (null for photos/uploaded video)
  caption: string | null;
  taken_on: string | null;   // ISO date string YYYY-MM-DD
  sort_order: number;
  created_at: string;
};

export function getSQL() {
  const url = process.env.POSTGRES_URL ?? process.env.DATABASE_URL;
  if (!url) throw new Error("No database URL configured");
  return neon(url);
}

export async function ensureTable() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id               SERIAL PRIMARY KEY,
      type             TEXT        NOT NULL CHECK (type IN ('photo','video')),
      storage_url      TEXT        NOT NULL,
      video_embed_url  TEXT,
      caption          TEXT,
      taken_on         DATE,
      sort_order       INTEGER     NOT NULL DEFAULT 0,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function listGallery(): Promise<GalleryItem[]> {
  const sql = getSQL();
  await ensureTable();
  const rows = await sql`
    SELECT id, type, storage_url, video_embed_url, caption,
           to_char(taken_on, 'YYYY-MM-DD') AS taken_on,
           sort_order, created_at
    FROM gallery
    ORDER BY sort_order DESC, created_at DESC
  `;
  return rows as GalleryItem[];
}
