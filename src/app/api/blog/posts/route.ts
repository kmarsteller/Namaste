import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { ensureTable, slugify, type Post } from "@/lib/blog-db";

export async function GET(req: Request) {
  try {
    await ensureTable();
    const { searchParams } = new URL(req.url);
    const adminMode = searchParams.get("admin") === "1";
    const rows = adminMode
      ? await sql<Post>`SELECT * FROM posts ORDER BY created_at DESC`
      : await sql<Post>`SELECT * FROM posts WHERE published = true ORDER BY created_at DESC`;
    return NextResponse.json(rows.rows);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureTable();
    const { title, author, excerpt, body, hero_image_url, published } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });

    let slug = slugify(title);
    // Ensure unique slug
    const existing = await sql`SELECT id FROM posts WHERE slug = ${slug}`;
    if (existing.rows.length > 0) slug = `${slug}-${Date.now()}`;

    const result = await sql<Post>`
      INSERT INTO posts (title, slug, author, excerpt, body, hero_image_url, published)
      VALUES (${title.trim()}, ${slug}, ${author || "Namaste Yoga Studio"}, ${excerpt || ""}, ${body || ""}, ${hero_image_url || null}, ${!!published})
      RETURNING *
    `;
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
