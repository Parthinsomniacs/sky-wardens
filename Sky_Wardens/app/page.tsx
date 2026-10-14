import Hero from "./(home)/sections/Hero";
import PartnerLogosSection from "./(home)/sections/PartnerLogosSection";
import AboutSection from "./(home)/sections/AboutSection";
import TextLoopSection from "./(home)/sections/TextLoopSection";
import BusinessesSection from "./(home)/sections/BusinessesSection";
import FeaturedPlatform from "./(home)/sections/FeaturedPlatform";
import PartnersSection from "./(home)/sections/PartnersSection";
import NewsroomShowcase from "./(home)/sections/NewsroomShowcase";
import CtaSection from "./(home)/sections/CtaSection";
import FaqSection from "./(home)/sections/FaqSection";

export default function Home() {
  return (
    <>
      <Hero />
      <PartnerLogosSection />
      <AboutSection />
      <BusinessesSection />
      <FeaturedPlatform />
      <PartnersSection />
      <NewsroomShowcase />
      <CtaSection />
      <FaqSection />
      <TextLoopSection />
    </>
  );
}
