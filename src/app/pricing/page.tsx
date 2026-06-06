import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PricingContent from "@/components/PricingContent";

export const metadata = {
  title: "Pricing | Namaste Yoga Studio",
  description:
    "Flexible class packages, memberships, and drop-in rates at Namaste Yoga Studio in Northfield, Ohio. Options for every budget and schedule.",
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main>
        <PricingContent />
      </main>
      <Footer />
    </>
  );
}
