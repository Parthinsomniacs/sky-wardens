import type { Metadata } from "next";
import ProductHeroBanner from "../components/ProductHeroBanner";
import DefenceCatalogSection from "./sections/DefenceCatalogSection";

export const metadata: Metadata = {
  title: "Defence | Products | Sky Wardens",
  description:
    "Tactical land platforms, armored readiness systems, remote weapon stations, and multi-domain defense protection engineered by Sky Wardens.",
};

export default function DefenceProductPage() {
  return (
    <>
      <ProductHeroBanner
        title="DEFENCE"
        taglines={["Tactical Systems", "Multi-Domain Readiness", "Sovereign Protection"]}
        imageSrc="/images/products-defence-banner.jpg"
        imageAlt="Heavy tactical main battle tank firing in combat theater with dust and blast smoke"
        objectPosition="center 30%"
        ariaLabel="Defence Products & Solutions Banner"
      />
      <DefenceCatalogSection />
    </>
  );
}

