import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "Our Story | Namaste Yoga Studio",
  description:
    "Over 20 years of community, connection, and yoga in Northeast Ohio. Meet Jolynn McFerren and learn the history of Namaste Yoga Studio.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
