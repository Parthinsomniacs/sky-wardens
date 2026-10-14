import type { Metadata } from "next";
import ProductHeroBanner from "../components/ProductHeroBanner";
import AerospaceCatalogSection from "./sections/AerospaceCatalogSection";

export const metadata: Metadata = {
  title: "Aerospace | Products | Sky Wardens",
  description:
    "Sovereign aerospace systems, autonomous flight airframes, tactical UAV platforms, and next-generation airborne deterrence engineered by Sky Wardens.",
};

export default function AerospaceProductPage() {
  return (
    <>
      <ProductHeroBanner
        title="AEROSPACE"
        taglines={["Autonomous Flight", "Tactical Systems", "Sovereign Airframes"]}
        imageSrc="/images/products-aerospace-banner.jpg"
        imageAlt="Advanced stealth supersonic fighter airframe banking in tactical airspace"
        objectPosition="center 40%"
        ariaLabel="Aerospace Products & Solutions Banner"
      />
      <AerospaceCatalogSection />
    </>
  );
}
