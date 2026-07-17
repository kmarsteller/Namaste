import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TeacherTrainingContent from "@/components/TeacherTrainingContent";

export const metadata = {
  title: "200-Hour Yoga Teacher Training | Namaste Yoga Studio",
  description:
    "Yoga Alliance RYS 200-hour teacher training at Namaste Yoga Studio in Northfield, Ohio. September 2026 through June 2027. Building the foundation.",
};

export default function TeacherTrainingPage() {
  return (
    <>
      <Nav />
      <main>
        <TeacherTrainingContent />
      </main>
      <Footer />
    </>
  );
}
