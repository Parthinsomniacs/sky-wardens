"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./NewsroomSection.module.css";

interface NewsItem {
  id: string;
  sector: string;
  headline: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  gridClass: string;
}

const newsItems: NewsItem[] = [
  {
    id: "news-aerospace",
    sector: "Aerospace",
    headline: "Aerospace highlights and autonomous program positioning",
    excerpt:
      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones.",
    date: "March 2026",
    imageSrc: "/images/business-aerospace.jpg",
    imageAlt: "Stealth autonomous aerospace drone in testing hangar",
    href: "/capabilities",
    gridClass: styles.card1,
  },
  {
    id: "news-defence",
    sector: "Defence",
    headline: "Defence systems, protective platforms, and readiness updates",
    excerpt:
      "Sovereign tactical systems engineered for extreme operational theaters and multi-domain defense preparedness.",
    date: "February 2026",
    imageSrc: "/images/business-systems.jpg",
    imageAlt: "Specialist engineer analyzing tactical defence command telemetry",
    href: "/capabilities",
    gridClass: styles.card2,
  },
  /*
  {
    id: "news-systems",
    sector: "Advanced Systems",
    headline: "Autonomous telemetry & cyber architecture for next-gen command",
    excerpt:
      "Real-time sensor fusion, encrypted communications, and edge-AI compute units engineered for zero-latency operations in contested theaters.",
    date: "January 2026",
    imageSrc: "/images/business-tactical.jpg",
    imageAlt: "Tactical telemetry and orbital defence mission tablet",
    href: "/capabilities",
    gridClass: styles.card3,
  },
  {
    id: "news-petrochem",
    sector: "Petrochemical",
    headline: "Industrial product lines and operational market developments",
    excerpt:
      "High-temperature metallurgy, zero-fail pressure equipment, and strategic processing solutions for national energy resilience.",
    date: "December 2025",
    imageSrc: "/images/business-energy.jpg",
    imageAlt: "Advanced petrochemical processing infrastructure at twilight",
    href: "/capabilities",
    gridClass: styles.card4,
  },
  */
  {
    id: "news-strategic",
    sector: "Strategic Initiative",
    headline: "Indigenous defence supply chain: Scaling sovereign capability",
    excerpt:
      "Accelerating sovereign production through industrial partnerships, advanced testing facilities, and indigenous manufacturing networks.",
    date: "November 2025",
    imageSrc: "/images/hero-editorial.jpg",
    imageAlt: "High-technology sovereign defence engineering portrait",
    href: "/capabilities",
    gridClass: styles.card5,
  },
];

export default function NewsroomSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let subtitleSplit: SplitText | null = null;

    const ctx = gsap.context(() => {
      // Badge entrance (title handled by AnimatedTitle).
      const badge = headerRef.current?.querySelector<HTMLElement>(
        `.${styles.pillBadge}`
      );
      if (badge) {
        gsap.fromTo(
          badge,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Subtitle: reveal word by word on scroll.
      const subtitle = headerRef.current?.querySelector<HTMLElement>(
        `.${styles.subtitle}`
      );
      if (subtitle) {
        subtitleSplit = SplitText.create(subtitle, { type: "words" });
        gsap.from(subtitleSplit.words, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: subtitle,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Bento cards staggered entrance
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: validCards[0],
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      subtitleSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Newsroom - News & Insights"
    >
      <div className={styles.inner}>
        {/* Header Block */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.pillBadge}>NEWSROOM</span>
          <AnimatedTitle className={styles.title}>News &amp; Insights</AnimatedTitle>
          <p className={styles.subtitle}>
            A sharper look at how the company operates.
          </p>
        </div>

        {/* 5-Card Bento Grid */}
        <div className={styles.bentoGrid}>
          {newsItems.map((item, index) => (
            <Link
              key={item.id}
              href={item.href}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`${styles.card} ${item.gridClass}`}
              aria-label={item.headline}
            >
              {/* Background Cinematic Visual */}
              <div className={styles.imageWrap}>
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className={styles.cardBgImage}
                />
                <div className={styles.overlay} />
              </div>

              {/* Card Content Overlay */}
              <div className={styles.content}>
                <div className={styles.cardMeta}>
                  <span className={styles.sectorBadge}>{item.sector}</span>
                  <span className={styles.cardDate}>{item.date}</span>
                </div>
                <h3 className={styles.cardHeadline}>{item.headline}</h3>
                <p className={styles.cardExcerpt}>{item.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span>Read insight</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={styles.arrowIcon}
                    aria-hidden="true"
                  >
                    <path
                      d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
