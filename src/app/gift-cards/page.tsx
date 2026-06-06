import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GiftCardsContent from "@/components/GiftCardsContent";

export const metadata = {
  title: "Gift Cards | Namaste Yoga Studio",
  description:
    "Give the gift of yoga. Purchase a Namaste Yoga Studio gift card for someone you love.",
};

export default function GiftCardsPage() {
  return (
    <>
      <Nav />
      <main>
        <GiftCardsContent />
      </main>
      <Footer />
    </>
  );
}
