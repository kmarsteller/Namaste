import { NextResponse } from "next/server";
import { getSQL, ensureTable, slugify, hasDB, type Post } from "@/lib/blog-db";

export async function GET(req: Request) {
  try {
    if (!hasDB()) return NextResponse.json([]);
    await ensureTable();
    const sql = getSQL();
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "1";
    const rows = adminMode
      ? await sql`SELECT * FROM posts ORDER BY created_at DESC`
      : await sql`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!hasDB()) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    await ensureTable();
    const sql = getSQL();
    const { title, author, excerpt, body, hero_image_url, published } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });

    let slug = slugify(title);
    const existing = await sql`SELECT id FROM posts WHERE slug = ${slug}`;
    if (existing.length > 0) slug = `${slug}-${Date.now()}`;

    const rows = await sql`
      INSERT INTO posts (title, slug, author, excerpt, body, hero_image_url, published)
      VALUES (${title.trim()}, ${slug}, ${author || "Namaste Yoga Studio"}, ${excerpt || ""}, ${body || ""}, ${hero_image_url || null}, ${!!published})
      RETURNING *
    `;
    return NextResponse.json(rows[0] as Post, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
