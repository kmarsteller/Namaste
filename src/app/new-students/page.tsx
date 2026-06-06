import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NewStudentsContent from "@/components/NewStudentsContent";

export const metadata = {
  title: "New Students | Namaste Yoga Studio",
  description:
    "Everything you need to know before your first class at Namaste Yoga Studio in Northfield, Ohio. Your first in-studio class is free.",
};

export default function NewStudentsPage() {
  return (
    <>
      <Nav />
      <main>
        <NewStudentsContent />
      </main>
      <Footer />
    </>
  );
}
