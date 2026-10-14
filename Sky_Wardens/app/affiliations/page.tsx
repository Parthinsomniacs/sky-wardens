import type { Metadata } from "next";
import AffiliationsBanner from "./sections/AffiliationsBanner";
import PartnerLogosSection from "@/app/(home)/sections/PartnerLogosSection";
import StrategicProgramSection from "./sections/StrategicProgramSection";

export const metadata: Metadata = {
  title: "Affiliations | Sky Wardens",
  description:
    "Strategic collaborations and aligned institutional relationships across defence, aerospace, research, and industry with Sky Wardens.",
};

export default function AffiliationsPage() {
  return (
    <>
      <AffiliationsBanner />
      <PartnerLogosSection />
      <StrategicProgramSection />
    </>
  );
}
