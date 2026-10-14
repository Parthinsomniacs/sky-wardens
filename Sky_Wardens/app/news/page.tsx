import type { Metadata } from "next";
import NewsBanner from "./sections/NewsBanner";
import NewsCardsSection from "./sections/NewsCardsSection";

export const metadata: Metadata = {
  title: "News & Media | Sky Wardens",
  description:
    "Latest sovereign defence developments, aerospace program positioning, tactical flight trials, and strategic press briefings from Sky Wardens.",
};

export default function NewsPage() {
  return (
    <>
      <NewsBanner />
      <NewsCardsSection />
    </>
  );
}
