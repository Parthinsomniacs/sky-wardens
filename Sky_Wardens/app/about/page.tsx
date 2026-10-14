import type { Metadata } from "next";
import AboutHero from "./sections/AboutHero";
import PartnerLogosSection from "@/app/(home)/sections/PartnerLogosSection";
import AboutManifesto from "./sections/AboutManifesto";
import DigitalExcellenceSection from "./sections/DigitalExcellenceSection";
import MissionVisionSection from "./sections/MissionVisionSection";
import ProductsSection from "./sections/ProductsSection";

export const metadata: Metadata = {
  title: "About Us | Sky Wardens",
  description:
    "Engineering strategic sovereign capability across aerospace and defence sectors.", // across aerospace, defence, advanced systems, and petrochemical sectors.
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <PartnerLogosSection />
      <AboutManifesto />
      <DigitalExcellenceSection />
      <MissionVisionSection />
      <ProductsSection />
    </>
  );
}
