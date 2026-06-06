import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkshopsContent from "@/components/WorkshopsContent";

export const dynamic = "force-dynamic"; // always re-read the file on each request

export const metadata = {
  title: "Workshops & Events | Namaste Yoga Studio",
  description:
    "Special workshops, events, and immersive experiences at Namaste Yoga Studio in Northfield, Ohio.",
};

function getNotice(): string {
  try {
    const file = path.join(process.cwd(), "data", "workshop-notice.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    return data.notice ?? "";
  } catch {
    return "";
  }
}

export default function WorkshopsPage() {
  const notice = getNotice();
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
