"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./PartnersSection.module.css";

interface Partner {
  id: string;
  abbr: string;
  name: string;
  logoSrc: string;
}

const partners: Partner[] = [
  {
    id: "indian-army",
    abbr: "IA",
    name: "Indian Army",
    logoSrc: "/images/partners/cropped/Indian_Army-bright.png",
  },
  {
    id: "drdo",
    abbr: "DRDO",
    name: "Defence Research and Development Organisation",
    logoSrc: "/images/partners/cropped/DRDO-bright.png",
  },
  {
    id: "iaf",
    abbr: "IAF",
    name: "Indian Air Force",
    logoSrc: "/images/partners/cropped/Indian_Air_Force-bright.png",
  },
  {
    id: "csir-nal",
    abbr: "CSIR-NAL",
    name: "Council of Scientific and Industrial Research - National Aerospace Laboratories",
    logoSrc: "/images/partners/cropped/CSIR-NAL-light.png",
  },
  {
    id: "ids",
    abbr: "IDS",
    name: "Integrated Defence Staff",
    logoSrc: "/images/partners/cropped/IDS-bright.png",
  },
  {
    id: "isro",
    abbr: "ISRO",
    name: "Indian Space Research Organisation",
    logoSrc: "/images/partners/cropped/ISRO-bright.png",
  },
  {
    id: "csir-csio",
    abbr: "CSIR-CSIO",
    name: "Council of Scientific and Industrial Research - Central Scientific Instruments Organisation",
    logoSrc: "/images/partners/cropped/csir-csio-light.png",
  },
  {
    id: "airblades",
    abbr: "AIRBLADES",
    name: "Airblades",
    logoSrc: "/images/partners/cropped/airblades-light.png",
  },
  {
    id: "andurax",
    abbr: "ANDURAX",
    name: "Andura Expeditions",
    logoSrc: "/images/partners/cropped/andura-expeditions.png",
  },
  {
    id: "bharat-forge-kalyani",
    abbr: "BHARAT FORGE KALYANI",
    name: "Bharat Forge Kalyani",
    logoSrc: "/images/partners/cropped/bharat-forge-kalyani-light.png",
  },
  {
    id: "centum",
    abbr: "CENTUM T&S",
    name: "CENTUM Technologies & Solutions",
    logoSrc: "/images/partners/cropped/centum-light.png",
  },
  {
    id: "pagariya-group",
    abbr: "PAGARIYA GROUP",
    name: "Pagariya Group",
    logoSrc: "/images/partners/cropped/pagariya-group-light.png",
  },
  {
    id: "psgl",
    abbr: "PSGL",
    name: "Project Services Group Limited",
    logoSrc: "/images/partners/cropped/psgl-group.png",
  },
  {
    id: "sky-wardens",
    abbr: "SKY WARDENS",
    name: "Sky Wardens",
    logoSrc: "/images/partners/cropped/sky-wardens-light.png",
  },
  {
    id: "tas",
    abbr: "TAS",
    name: "Throttle Aerospace Systems",
    logoSrc: "/images/partners/cropped/throttle-aerospace-systems.png",
  },
];

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let subtitleSplit: SplitText | null = null;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
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
      const subtitle = sectionRef.current?.querySelector<HTMLElement>(
        `.${styles.subtitle}`
      );
      if (subtitle) {
        subtitleSplit = SplitText.create(subtitle, { type: "words" });
        gsap.from(subtitleSplit.words, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: subtitle,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: validCards[0],
              start: "top 85%",
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
      aria-label="Partnerships with Purpose"
    >
      <div className={styles.inner}>
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>OUR NETWORK</span>
          <AnimatedTitle className={styles.title}>
            Partnerships with Purpose
          </AnimatedTitle>
          <p className={styles.subtitle}>
            Trusted collaborations across defence, aerospace, research, and
            industry that turn sovereign ambition into deployable capability.
          </p>
        </div>

        <div className={styles.grid}>
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={styles.card}
              tabIndex={0}
              aria-label={partner.name}
            >
              <div className={styles.logoWrap}>
                <Image
                  src={partner.logoSrc}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="(max-width: 575px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={styles.logo}
                />
              </div>

              <div className={styles.info} aria-hidden="true">
                <span className={styles.abbr}>{partner.abbr}</span>
                <span className={styles.name}>{partner.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
