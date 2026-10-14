import type { Metadata } from "next";
import Section from "@/app/components/ui/Section";

export const metadata: Metadata = {
  title: "Platforms",
  description: "Our platforms.",
};

export default function PlatformsPage() {
  return (
    <Section id="platforms" eyebrow="Platforms" title="Our platforms">
      <p>Placeholder for the platforms page. Add sections here.</p>
    </Section>
  );
}
