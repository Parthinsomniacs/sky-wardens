import type { Metadata } from "next";
import ContactBanner from "./sections/ContactBanner";
import ContactHero from "./sections/ContactHero";
import ContactFormSection from "./sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact | Sky Wardens",
  description:
    "Direct strategic engagement, institutional defense procurement, aerospace engineering inquiries, and collaboration with Sky Wardens.",
};

export default function ContactPage() {
  return (
    <>
      <ContactBanner />
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
