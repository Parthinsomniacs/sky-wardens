"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import styles from "./ContactBanner.module.css";

gsap.registerPlugin(SplitText);

export default function ContactBanner() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const title = rootRef.current?.querySelector<HTMLElement>(
        "[data-hero-title]"
      );

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // Title: staggered per-letter reveal using SplitText.
      if (title) {
        split = SplitText.create(title, { type: "chars" });
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

      // Tagline words reveal one by one.
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
    <section ref={rootRef} className={styles.hero} aria-label="Contact Hero Section">
      {/* Background cinematic banner image */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/contact-banner.jpg"
          alt="Tactical operations and strategic communications"
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
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
          {/* Tagline + Giant CONTACT US Typography */}
          <div className={styles.heroBlock}>
            <div className={styles.tagline}>
              <span data-tagline>Aerospace</span>
              <span className={styles.slash} aria-hidden="true" data-tagline>
                /
              </span>
              <span data-tagline>Defence</span>
              {/* <span className={styles.slash} aria-hidden="true" data-tagline>
                /
              </span>
              <span data-tagline>Advanced Systems</span>
              <span className={styles.slash} aria-hidden="true" data-tagline>
                /
              </span>
              <span data-tagline>Petrochemical</span> */}
            </div>
            <h1 className={styles.heroTitle} data-hero-title>
              CONTACT US
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
