import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomizeEventContent from "@/components/CustomizeEventContent";

export const metadata = {
  title: "Customize Your Event | Namaste Yoga Studio",
  description:
    "Private yoga sessions, birthday parties, bachelorette parties, corporate events and more. Work with Namaste Yoga Studio to create your perfect experience.",
};

export default function CustomizeYourEventPage() {
  return (
    <>
      <Nav />
      <main>
        <CustomizeEventContent />
      </main>
      <Footer />
    </>
  );
}
