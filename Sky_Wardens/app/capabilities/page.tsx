import type { Metadata } from "next";
import Section from "@/app/components/ui/Section";

export const metadata: Metadata = {
  title: "Capabilities",
  description: "What we can do.",
};

export default function CapabilitiesPage() {
  return (
    <Section id="capabilities" eyebrow="Capabilities" title="What we do">
      <p>Placeholder for the capabilities page. Add sections here.</p>
    </Section>
  );
}
