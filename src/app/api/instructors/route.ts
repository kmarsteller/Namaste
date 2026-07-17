import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

const WIDGET = "namasteyogaohio";
const WEEKS = 8;

function stripHtml(html: string): string {
  return html
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .trim()
    .replace(/\n{3,}/g, "\n\n");
}

export async function GET() {
  const weekSec = 7 * 24 * 60 * 60;
  const now = Math.floor(Date.now() / 1000);

  const fetches = Array.from({ length: WEEKS }, (_, i) =>
    fetch(
      `https://app.arketa.co/api/widget/data?widgetName=${WIDGET}&type=classes&start_time=${now + i * weekSec}`,
      { next: { revalidate: 3600 } }
    )
      .then((r) => r.json())
      .catch(() => null)
  );

  const results = await Promise.all(fetches);

  const byId = new Map<string, { id: string; name: string; photo: string; bio: string }>();

  for (const result of results) {
    const classes: Record<string, unknown>[] = result?.data?.classes ?? [];
    for (const cls of classes) {
      const hosts = cls.hostData as { id?: string; name?: string; profileImageUrl?: string; about?: string }[] | undefined;
      for (const host of hosts ?? []) {
        if (host.id && !byId.has(host.id)) {
          byId.set(host.id, {
            id: host.id,
            name: host.name ?? "",
            photo: host.profileImageUrl ?? "",
            bio: host.about ? stripHtml(host.about) : "",
          });
        }
      }
    }
  }

  return NextResponse.json({ instructors: Array.from(byId.values()) });
}
