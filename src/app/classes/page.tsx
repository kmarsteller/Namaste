import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClassesContent from "@/components/ClassesContent";
import { getSQL, hasDB } from "@/lib/blog-db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Classes | Namaste Yoga Studio",
  description:
    "Browse and book yoga classes at Namaste Yoga Studio in Northfield, Ohio. 45+ weekly classes for all levels.",
};

async function getNotice(): Promise<string> {
  if (!hasDB()) return "";
  try {
    const sql = getSQL();
    const rows = await sql`SELECT notice FROM classes_notice WHERE id = 1`;
    return rows[0]?.notice ?? "";
  } catch {
    return "";
  }
}

export default async function ClassesPage() {
  const notice = await getNotice();
  return (
    <>
      <Nav />
      <main>
        <Suspense fallback={null}>
          <ClassesContent notice={notice} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
