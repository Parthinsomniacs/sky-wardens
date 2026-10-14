"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CtaSection.module.css";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Call to Action"
    >
      <div className={styles.inner}>
        <div ref={cardRef} className={styles.ctaCard}>
          {/* Subtle Star Particle Field */}
          <div className={styles.particles} aria-hidden="true" />

          {/* Left Column: Large 3D Radar Visual */}
          <div ref={mockupRef} className={styles.visualStage}>
            <div className={styles.radarWrapper}>
              <div className={styles.radarGlow} aria-hidden="true" />
              <Image
                src="/images/CTA%20img%20robot.png"
                alt="Next-Gen Autonomous Robotics System"
                width={480}
                height={480}
                className={styles.bigRadarImg}
                priority
              />
            </div>
          </div>

          {/* Right Column: Copy & Actions */}
          <div ref={textColRef} className={styles.contentCol}>
            {/* Live Indicator Pill */}
            <div className={styles.livePill}>
              <span className={styles.liveDot} />
              <span>Introducing Next-Gen Sovereign Systems</span>
            </div>

            {/* Display Headline */}
            <h2 className={styles.ctaTitle}>
              Turn your strategic vision into mission-ready capability
            </h2>

            {/* Description */}
            <p className={styles.ctaDescription}>
              Partner with Sky Wardens to engineer and deploy next-generation
              autonomous aerospace airframes, multi-domain defence systems, and
              resilient industrial technologies.
            </p>

            {/* Button Actions */}
            <div className={styles.buttonGroup}>
              <Link href="/contact" className={styles.primaryBtn}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles.btnArrow}
                  aria-hidden="true"
                >
                  <path
                    d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Initiate Collaboration</span>
              </Link>
              <Link href="/capabilities" className={styles.secondaryBtn}>
                Explore Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
