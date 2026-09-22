import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClassesTeaser from "@/components/ClassesTeaser";
import OMtownPromo from "@/components/OMtownPromo";
import StudioEthos from "@/components/StudioEthos";
import CommunityCarousel from "@/components/CommunityCarousel";
import ReviewsSection from "@/components/ReviewsSection";
import InstagramFeed from "@/components/InstagramFeed";
import FirstClassCTA from "@/components/FirstClassCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <OMtownPromo />
        <ClassesTeaser />
        <StudioEthos />
        <CommunityCarousel />
        <ReviewsSection />
        <InstagramFeed />
        <FirstClassCTA />
      </main>
      <Footer />
    </>
  );
}
