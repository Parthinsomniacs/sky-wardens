"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./ProductHeroBanner.module.css";

gsap.registerPlugin(SplitText);

export interface ProductHeroBannerProps {
  title: string;
  taglines: string[];
  imageSrc: string;
  imageAlt: string;
  objectPosition?: string;
  ariaLabel?: string;
}

export default function ProductHeroBanner({
  title,
  taglines,
  imageSrc,
  imageAlt,
  objectPosition = "center 35%",
  ariaLabel,
}: ProductHeroBannerProps) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const heroTitleEl = rootRef.current?.querySelector<HTMLElement>(
        "[data-hero-title]"
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // Title: staggered per-letter reveal using SplitText.
      if (heroTitleEl) {
        split = SplitText.create(heroTitleEl, { type: "chars" });
        tl.from(
          split.chars,
          {
            y: 50,
            opacity: 0,
            duration: reduceMotion ? 0.01 : 1.1,
            ease: reduceMotion ? "none" : "back.out(1.7)",
            stagger: reduceMotion ? 0 : 0.08,
          },
          0
        );
      }

      // Tagline items reveal one by one.
      const taglineItems = gsap.utils.toArray<HTMLElement>("[data-tagline]");
      if (taglineItems.length) {
        tl.fromTo(
          taglineItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: reduceMotion ? 0.01 : 0.5,
            ease: reduceMotion ? "none" : "power2.out",
            stagger: reduceMotion ? 0 : 0.1,
          },
          reduceMotion ? 0 : 0.5
        );
      }
    }, rootRef);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-label={ariaLabel || `${title} Hero Section`}
    >
      {/* Background cinematic banner image */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
          style={{ objectPosition }}
        />
        <div className={styles.overlay} />
      </div>

      {/* Subtle Vertical Grid Guidelines */}
      <div className={styles.gridLines} aria-hidden="true">
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
      </div>

      {/* Main Content Layout */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.heroBlock}>
            <div className={styles.tagline}>
              {taglines.map((tag, idx) => (
                <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "0.85rem" }}>
                  <span data-tagline>{tag}</span>
                  {idx < taglines.length - 1 && (
                    <span className={styles.slash} aria-hidden="true" data-tagline>
                      /
                    </span>
                  )}
                </span>
              ))}
            </div>
            <h1 className={styles.heroTitle} data-hero-title>
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
