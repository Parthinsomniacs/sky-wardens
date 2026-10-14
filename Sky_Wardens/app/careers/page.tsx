import type { Metadata } from "next";
import CareersBanner from "./sections/CareersBanner";
import CareersPositionsSection from "./sections/CareersPositionsSection";

export const metadata: Metadata = {
  title: "Careers | Sky Wardens",
  description:
    "Explore career opportunities with Sky Wardens. Join our sovereign aerospace, defence engineering, and autonomous systems mission.",
};

export default function CareersPage() {
  return (
    <>
      <CareersBanner />
      <CareersPositionsSection />
    </>
  );
}
