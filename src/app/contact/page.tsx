import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact | Namaste Yoga Studio",
  description:
    "Get in touch with Namaste Yoga Studio in Northfield, Ohio. Questions, suggestions, or just want to say hello — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
