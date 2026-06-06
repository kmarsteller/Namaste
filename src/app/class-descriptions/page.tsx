import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClassDescriptionsContent from "@/components/ClassDescriptionsContent";

export const metadata = {
  title: "Class Descriptions | Namaste Yoga Studio",
  description:
    "Explore our full range of yoga classes at Namaste Yoga Studio — from gentle and restorative to dynamic vinyasa flows. Find the right class for your body and practice.",
};

export default function ClassDescriptionsPage() {
  return (
    <>
      <Nav />
      <main>
        <ClassDescriptionsContent />
      </main>
      <Footer />
    </>
  );
}
