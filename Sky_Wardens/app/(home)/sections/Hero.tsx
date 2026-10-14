"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import AnimatedButton from "@/app/components/ui/AnimatedButton";
import styles from "./Hero.module.css";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero]");
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

      // Supporting text + buttons cascade in.
      if (items.length) {
        tl.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: reduceMotion ? 0.01 : 0.8,
            stagger: reduceMotion ? 0 : 0.12,
          },
          reduceMotion ? 0 : 0.35
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
    <section ref={rootRef} className={styles.hero} aria-label="Hero Section">
      {/* Background cinematic video */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <video
          className={styles.bgVideo}
          src="/images/hero-video.mp4"
          poster="/images/hero-editorial.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          {/* Bottom Left Info & CTA */}
          <div className={styles.leftBlock}>
            <span className={styles.squareIndicator} aria-hidden="true" data-hero />
            <p className={styles.headline} data-hero>
              ENGINEERING<br />
              STRATEGIC CAPABILITY<br />
              FOR THE NEXT ERA
            </p>
            <div className={styles.buttonGroup} data-hero>
              <AnimatedButton href="/capabilities">
                Explore Capabilities
              </AnimatedButton>
              <AnimatedButton href="/contact">Contact Sky Wardens</AnimatedButton>
            </div>
          </div>

          {/* Bottom Right: Tagline + Giant SKY WARDENS Typography */}
          <div className={styles.rightBlock}>
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
              SKY WARDENS
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

