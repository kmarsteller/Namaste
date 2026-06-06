import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import InstructorsGrid from "@/components/InstructorsGrid";

export const metadata = {
  title: "Instructors | Namaste Yoga Studio",
  description:
    "Meet the 21 certified yoga instructors at Namaste Yoga Studio in Northfield, Ohio.",
};

export default function InstructorsPage() {
  return (
    <>
      <Nav />
      <main>
        <InstructorsGrid />
      </main>
      <Footer />
    </>
  );
}
