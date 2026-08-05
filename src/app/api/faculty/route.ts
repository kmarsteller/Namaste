import { NextResponse } from "next/server";
import { getSQL, hasDB } from "@/lib/blog-db";

async function ensureTables() {
  if (!hasDB()) return;
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS faculty_muted (
      arketa_id TEXT PRIMARY KEY,
      muted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS faculty_added (
      arketa_id  TEXT PRIMARY KEY,
      name       TEXT NOT NULL,
      certs      TEXT NOT NULL DEFAULT '200-hr',
      photo      TEXT NOT NULL DEFAULT '',
      sort_order INT  NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Tracks static (instructors.ts) entries that have been permanently removed from the site
  await sql`
    CREATE TABLE IF NOT EXISTS faculty_deleted (
      arketa_id  TEXT PRIMARY KEY,
      deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

export async function GET() {
  if (!hasDB()) return NextResponse.json({ muted: [], added: [], deleted: [] });
  await ensureTables();
  const sql = getSQL();
  const [mutedRows, addedRows, deletedRows] = await Promise.all([
    sql`SELECT arketa_id FROM faculty_muted`,
    sql`SELECT arketa_id, name, certs, photo, sort_order, created_at FROM faculty_added ORDER BY sort_order, name`,
    sql`SELECT arketa_id FROM faculty_deleted`,
  ]);
  return NextResponse.json({
    muted:   mutedRows.map((r) => r.arketa_id as string),
    added:   addedRows,
    deleted: deletedRows.map((r) => r.arketa_id as string),
  });
}

export async function POST(req: Request) {
  if (!hasDB()) return NextResponse.json({ ok: false, error: "no db" }, { status: 503 });
  await ensureTables();
  const sql = getSQL();
  const body = await req.json();
  const { action, arketaId, name, certs, photo } = body as {
    action: string;
    arketaId: string;
    name?: string;
    certs?: string;
    photo?: string;
  };

  switch (action) {
    case "mute":
      await sql`INSERT INTO faculty_muted (arketa_id) VALUES (${arketaId}) ON CONFLICT DO NOTHING`;
      break;
    case "unmute":
      await sql`DELETE FROM faculty_muted WHERE arketa_id = ${arketaId}`;
      break;
    case "add":
      await sql`
        INSERT INTO faculty_added (arketa_id, name, certs, photo)
        VALUES (${arketaId}, ${name ?? ""}, ${certs ?? "200-hr"}, ${photo ?? ""})
        ON CONFLICT (arketa_id) DO UPDATE SET name = EXCLUDED.name, certs = EXCLUDED.certs, photo = EXCLUDED.photo
      `;
      // un-delete if previously deleted
      await sql`DELETE FROM faculty_deleted WHERE arketa_id = ${arketaId}`;
      break;
    case "delete": {
      const removed = await sql`DELETE FROM faculty_added WHERE arketa_id = ${arketaId} RETURNING arketa_id`;
      // Only mark deleted for static instructors (not DB-added ones — they just go back to candidates)
      if (removed.length === 0) {
        await sql`INSERT INTO faculty_deleted (arketa_id) VALUES (${arketaId}) ON CONFLICT DO NOTHING`;
      }
      await sql`DELETE FROM faculty_muted WHERE arketa_id = ${arketaId}`;
      break;
    }
    case "undelete":
      await sql`DELETE FROM faculty_deleted WHERE arketa_id = ${arketaId}`;
      break;
    default:
      return NextResponse.json({ ok: false, error: "unknown action" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
