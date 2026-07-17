import fs from "fs";
import path from "path";
import { Suspense } from "react";
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
  if (process.env.UPSTASH_REDIS_REST_URL) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
      const data = await redis.get<{ notice: string }>("classes-notice");
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
        <Suspense fallback={null}>
          <ClassesContent notice={notice} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
