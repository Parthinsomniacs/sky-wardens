import type { Metadata } from "next";
import Section from "@/app/components/ui/Section";

export const metadata: Metadata = {
  title: "History",
  description: "Our journey so far.",
};

export default function HistoryPage() {
  return (
    <Section id="history" eyebrow="About" title="Our history">
      <p>Placeholder for the history page. Add history sections here.</p>
    </Section>
  );
}
