import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClassesTeaser from "@/components/ClassesTeaser";
import StudioEthos from "@/components/StudioEthos";
import CommunityCarousel from "@/components/CommunityCarousel";
import ReviewsSection from "@/components/ReviewsSection";
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
        <CommunityCarousel />
        <ReviewsSection />
        <FirstClassCTA />
      </main>
      <Footer />
    </>
  );
}
