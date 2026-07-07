import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkshopsContent from "@/components/WorkshopsContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Workshops & Events | Namaste Yoga Studio",
  description:
    "Special workshops, events, and immersive experiences at Namaste Yoga Studio in Northfield, Ohio.",
};

async function getNotice(): Promise<string> {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    try {
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
      const data = await redis.get<{ notice: string }>("workshop-notice");
      return data?.notice ?? "";
    } catch {
      return "";
    }
  }
  try {
    const file = path.join(process.cwd(), "data", "workshop-notice.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data.notice ?? "";
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
