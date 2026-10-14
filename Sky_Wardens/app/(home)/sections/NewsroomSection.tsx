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
    sector: "",
    headline:
      "Anuvyom and PSGL Explore Deeper Collaboration in UAV and Aerospace Technologies",
    excerpt:
      "Discussions centre on unmanned systems, technical collaboration and opportunities to develop long-term aerospace manufacturing capability in Nigeria.",
    date: "",
    imageSrc: "/images/bel-ghaziabad-delegation-visit.webp",
    imageAlt: "BEL Ghaziabad delegation visit to Sky Wardens",
    href: "/news/anuvyom-psgl-aerospace-collaboration",
    gridClass: styles.card1,
  },
  {
    id: "news-defence",
    sector: "",
    headline:
      "PSGL Engages Bharat Electronics Limited on Defence Technology and Industrial Cooperation",
    excerpt:
      "Our partner PSGL Group explores defence electronics, systems integration and opportunities for local capability development through engagement with BEL.",
    date: "",
    imageSrc: "/images/psgl-bharat-electronics-industrial-cooperation.jpg",
    imageAlt:
      "PSGL Engages Bharat Electronics Limited on Defence Technology and Industrial Cooperation",
    href: "/news/psgl-bharat-electronics-industrial-cooperation",
    gridClass: styles.card2,
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
