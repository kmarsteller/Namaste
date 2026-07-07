import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClassesContent from "@/components/ClassesContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Classes | Namaste Yoga Studio",
  description:
    "Browse and book yoga classes at Namaste Yoga Studio in Northfield, Ohio. 45+ weekly classes for all levels.",
};

async function getNotice(): Promise<string> {
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import("@vercel/kv");
      const data = await kv.get<{ notice: string }>("classes-notice");
      return data?.notice ?? "";
    } catch {
      return "";
    }
  }
  try {
    const file = path.join(process.cwd(), "data", "classes-notice.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data.notice ?? "";
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
        <ClassesContent notice={notice} />
      </main>
      <Footer />
    </>
  );
}
