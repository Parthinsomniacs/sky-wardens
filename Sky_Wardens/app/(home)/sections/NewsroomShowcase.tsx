"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./NewsroomShowcase.module.css";

interface NewsItem {
  id: string;
  sector: string;
  headline: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
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
  },
];

export default function NewsroomShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        );
      }

      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: listRef.current, start: "top 85%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeItem = newsItems[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="News & Insights"
    >
      <div className={styles.inner}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.headingWrap}>
            <span className={styles.eyebrow}>THE NEWSROOM</span>
            <h2 className={styles.title}>
              <span className={styles.titleLine}>NEWS &amp; INSIGHTS</span>
            </h2>
          </div>
          <Link href="/news" className={styles.viewAll}>
            <span>View all</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M4 10L10 4M10 4H5M10 4V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className={styles.body}>
          <ul ref={listRef} className={styles.list}>
            {newsItems.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={item.id}
                  className={`${styles.item} ${
                    isActive ? styles.itemActive : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocusCapture={() => setActiveIndex(index)}
                >
                  <button
                    type="button"
                    className={styles.itemButton}
                    aria-expanded={isActive}
                    onClick={() => setActiveIndex(index)}
                  >
                    <h3 className={styles.headline}>{item.headline}</h3>
                  </button>

                  <div className={styles.detail}>
                    <div className={styles.detailInner}>
                      <div className={styles.detailMedia}>
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          sizes="100vw"
                          className={styles.detailImage}
                        />
                      </div>
                      {(item.sector || item.date) ? (
                        <div className={styles.meta}>
                          {item.sector ? <span className={styles.sector}>{item.sector}</span> : null}
                          {item.date ? <span className={styles.date}>{item.date}</span> : null}
                        </div>
                      ) : null}
                      <p className={styles.excerpt}>{item.excerpt}</p>
                      <Link href={item.href} className={styles.readLink}>
                        <span>Read article</span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 10 10"
                          fill="none"
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
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href={activeItem.href}
            className={styles.media}
            aria-label={`Read article: ${activeItem.headline}`}
          >
            {newsItems.map((item, index) => (
              <Image
                key={item.id}
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={`${styles.mediaImage} ${
                  index === activeIndex ? styles.mediaImageActive : ""
                }`}
                priority={index === 0}
              />
            ))}
            {activeItem.sector ? (
              <span className={styles.mediaSector} aria-hidden="true">
                {activeItem.sector}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </section>
  );
}
