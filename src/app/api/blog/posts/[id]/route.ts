import { NextResponse } from "next/server";
import { getSQL, ensureTable, slugify, type Post } from "@/lib/blog-db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureTable();
    const { id } = await params;
    const sql = getSQL();
    const rows = await sql`SELECT * FROM posts WHERE id = ${id}`;
    if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0] as Post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureTable();
    const { id } = await params;
    const sql = getSQL();
    const { title, author, excerpt, body, hero_image_url, published } = await req.json();
    if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const slug = slugify(title);
    const rows = await sql`
      UPDATE posts SET
        title          = ${title.trim()},
        slug           = ${slug},
        author         = ${author || "Namaste Yoga Studio"},
        excerpt        = ${excerpt || ""},
        body           = ${body || ""},
        hero_image_url = ${hero_image_url || null},
        published      = ${!!published},
        updated_at     = NOW()
      WHERE id = ${id}
      RETURNING *
    `;
    if (!rows[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0] as Post);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sql = getSQL();
    await sql`DELETE FROM posts WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
