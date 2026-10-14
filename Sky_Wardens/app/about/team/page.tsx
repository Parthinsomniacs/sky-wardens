import type { Metadata } from "next";
import Section from "@/app/components/ui/Section";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind the work.",
};

export default function TeamPage() {
  return (
    <Section id="team" eyebrow="About" title="Our team">
      <p>Placeholder for the team page. Add team sections here.</p>
    </Section>
  );
}
