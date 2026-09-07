import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { getSQL, ensureTable, listGallery } from "@/lib/gallery-db";

// Normalize a YouTube or Vimeo URL to an embeddable src
function toEmbedUrl(url: string): string | null {
  // YouTube: youtu.be/ID or youtube.com/watch?v=ID
  const ytShort = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  const ytLong = url.match(/youtube\.com\/watch\?.*v=([A-Za-z0-9_-]{11})/);
  const ytId = (ytShort ?? ytLong)?.[1];
  if (ytId) return `https://www.youtube.com/embed/${ytId}`;

  // Vimeo: vimeo.com/ID
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return null;
}

export async function GET() {
  try {
    const items = await listGallery();
    return NextResponse.json({ items });
  } catch (err) {
    console.error("Gallery GET error:", err);
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const sql = getSQL();
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const caption = (formData.get("caption") as string) || null;
    const takenOn = (formData.get("taken_on") as string) || null;
    const videoUrl = (formData.get("video_url") as string) || null;
    const file = formData.get("file") as File | null;

    let storageUrl: string;
    let videoEmbedUrl: string | null = null;

    if (type === "video" && videoUrl) {
      // External video link
      videoEmbedUrl = toEmbedUrl(videoUrl);
      storageUrl = videoUrl;
    } else if (file) {
      // Upload to Vercel Blob
      const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
        access: "public",
        contentType: file.type,
        token: process.env.GALLERY_BLOB_TOKEN_READ_WRITE_TOKEN,
      });
      storageUrl = blob.url;
    } else {
      return NextResponse.json({ error: "No file or video URL provided" }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO gallery (type, storage_url, video_embed_url, caption, taken_on)
      VALUES (${type}, ${storageUrl}, ${videoEmbedUrl}, ${caption}, ${takenOn || null})
      RETURNING id
    `;
    return NextResponse.json({ id: (rows[0] as { id: number }).id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Gallery POST error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const sql = getSQL();
    const { id, caption, taken_on } = await req.json();
    await sql`
      UPDATE gallery SET caption = ${caption ?? null}, taken_on = ${taken_on || null}
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Gallery PATCH error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sql = getSQL();
    const { id } = await req.json();
    // Fetch the item to get the blob URL
    const rows = await sql`SELECT storage_url, video_embed_url FROM gallery WHERE id = ${id}`;
    if (rows.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const item = rows[0] as { storage_url: string; video_embed_url: string | null };
    // Only delete from blob storage if it's not an external URL
    if (!item.video_embed_url && item.storage_url.includes("vercel-storage.com")) {
      await del(item.storage_url, { token: process.env.GALLERY_BLOB_TOKEN_READ_WRITE_TOKEN });
    }

    await sql`DELETE FROM gallery WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Gallery DELETE error:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
