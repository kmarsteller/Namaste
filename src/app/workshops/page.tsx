import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkshopsContent from "@/components/WorkshopsContent";
import { getSQL, hasDB } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workshops & Events | Namaste Yoga Studio",
  description:
    "Special workshops, events, and immersive experiences at Namaste Yoga Studio in Northfield, Ohio.",
};

async function getNotice(): Promise<string> {
  if (!hasDB()) return "";
  try {
    const sql = getSQL();
    const rows = await sql`SELECT notice FROM workshop_notice WHERE id = 1`;
    return rows[0]?.notice ?? "";
  } catch {
    return "";
  }
}

export default async function WorkshopsPage() {
  const notice = await getNotice();
  return (
    <>
      <Nav />
      <main>
        <WorkshopsContent notice={notice} />
      </main>
      <Footer />
    </>
  );
}
