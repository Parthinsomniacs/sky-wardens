"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./FaqSection.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "sectors",
    question: "What sectors does Sky Wardens\noperate in?",
    answer:
      "Sky Wardens operates across aerospace and defence sectors.", // across aerospace, defence, advanced systems, and petrochemical sectors.
  },
  {
    id: "partners",
    question: "Who does Sky Wardens work with?",
    answer:
      "We collaborate with national defence forces, premier aerospace laboratories, research institutions, and strategic industrial partners.",
  },
  {
    id: "custom",
    question: "Can organisations request customised solutions?",
    answer:
      "Yes. Every engagement is tailored to the partner's mission, guided by research, strategy, and measurable outcomes.",
  },
  {
    id: "delivery",
    question: "How does Sky Wardens approach delivery timelines?",
    answer:
      "Programs are structured around durable milestones, with capability built to last years and matter for decades.",
  },
  {
    id: "scale",
    question: "Can Sky Wardens scale with sovereign programs?",
    answer:
      "Yes. Our industrial capability and partner network scale to support national-level defence and aerospace initiatives.",
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

      rows.forEach((row) => {
        const number = row.querySelector<HTMLElement>(`.${styles.number}`);

        // Motion (row lift + fade) only when reduced motion is not requested.
        if (!prefersReduced) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              end: "top 50%",
              scrub: true,
            },
          });

          tl.fromTo(
            row,
            { opacity: 0.15, y: 32 },
            { opacity: 1, y: 0, ease: "none" },
            0
          );

          if (number) {
            tl.fromTo(
              number,
              { opacity: 0.35 },
              { opacity: 1, ease: "none" },
              0
            );
          }
        }

        // Blue highlight while the row spans the vertical center of the
        // viewport. Scroll-driven so it works on touch; always enabled.
        ScrollTrigger.create({
          trigger: row,
          start: "top center",
          end: "bottom center",
          onToggle: (self) =>
            row.classList.toggle(styles.rowActive, self.isActive),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Frequently Asked Questions"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <AnimatedTitle className={styles.title}>
            <span className={styles.titleLine}>FREQUENTLY ASKED</span>
            <span className={styles.titleLine}>QUESTIONS</span>
          </AnimatedTitle>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={styles.row}
            >
              <h3 className={styles.question}>
                {index + 1}. {faq.question}
              </h3>
              <p className={styles.answer}>{faq.answer}</p>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

