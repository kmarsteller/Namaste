import { NextResponse } from "next/server";
import { getSQL, hasDB } from "@/lib/blog-db";

async function ensureTable() {
  const sql = getSQL();
  await sql`
    CREATE TABLE IF NOT EXISTS workshop_notice (
      id         INTEGER PRIMARY KEY DEFAULT 1,
      notice     TEXT    NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`INSERT INTO workshop_notice (id) VALUES (1) ON CONFLICT DO NOTHING`;
}

async function readNotice() {
  if (!hasDB()) return { notice: "", updatedAt: "" };
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`SELECT notice, updated_at FROM workshop_notice WHERE id = 1`;
  const row = rows[0];
  return { notice: row?.notice ?? "", updatedAt: row?.updated_at ?? "" };
}

async function writeNotice(notice: string) {
  if (!hasDB()) return new Date().toISOString();
  await ensureTable();
  const sql = getSQL();
  const rows = await sql`
    UPDATE workshop_notice SET notice = ${notice}, updated_at = NOW() WHERE id = 1
    RETURNING updated_at
  `;
  return rows[0].updated_at;
}

export async function GET() {
  return NextResponse.json(await readNotice());
}

export async function POST(req: Request) {
  const { notice } = await req.json();
  const updatedAt = await writeNotice(String(notice ?? ""));
  return NextResponse.json({ ok: true, updatedAt });
}
