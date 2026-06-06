import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClassesTeaser from "@/components/ClassesTeaser";
import StudioEthos from "@/components/StudioEthos";
import FirstClassCTA from "@/components/FirstClassCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClassesTeaser />
        <StudioEthos />
        <FirstClassCTA />
      </main>
      <Footer />
    </>
  );
}
