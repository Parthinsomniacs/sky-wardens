"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OurValuesHub.module.css";

gsap.registerPlugin(ScrollTrigger);

const valuesList = [
  {
    id: "01",
    index: "/01",
    title: "Aerospace",
    description:
      "To provide lightweight, high-performance armouring and protection solutions for aerospace platforms, ensuring enhanced survivability, reliability and performance through precision engineering and advanced material technologies.",
    icon: "/images/our-values/leadership-focused.svg",
    positionClass: styles.topLeftCard,
  },
  {
    id: "02",
    index: "/02",
    title: "Defence",
    description:
      "To design, manufacture and deliver mission-critical protection systems and ballistic solutions that enhance soldier safety, mobility and operational effectiveness, while meeting the highest international standards and evolving battlefield requirements.",
    icon: "/images/our-values/quality-first.svg",
    positionClass: styles.topRightCard,
  },
  /*
  {
    id: "03",
    index: "/03",
    title: "Advanced Systems",
    description:
      "To develop integrated and customized engineered systems for vehicles, mobile units, and temporary structures that address ballistic, blast and environmental threats, enabling operational resilience in complex and hostile conditions.",
    icon: "/images/our-values/growth.svg",
    positionClass: styles.bottomLeftCard,
  },
  {
    id: "04",
    index: "/04",
    title: "Petrochemical",
    description:
      "To support the petrochemical industry with robust, safety-driven solutions designed for aggressive chemical and hazardous environments, protecting critical assets, personnel and operations while ensuring long-term reliability and compliance.",
    icon: "/images/our-values/trust.svg",
    positionClass: styles.bottomRightCard,
  },
  */
];

export default function OurValuesHub() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<SVGLineElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);
  const line3Ref = useRef<SVGPathElement>(null);
  const line4Ref = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mm = gsap.matchMedia();

    // 1. DESKTOP (>= 1024px): Pinned scrub animation
    mm.add("(min-width: 1024px)", () => {
      if (prefersReducedMotion) return;

      // 1. Initial stroke-dash setup for tactical radar paths
      const mainPaths = wrapperRef.current?.querySelectorAll<SVGGeometryElement>(
        `.${styles.mainSvgPath}`
      );
      mainPaths?.forEach((p) => {
        try {
          const len = p.getTotalLength?.() || 150;
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        } catch {
          p.style.strokeDasharray = "150";
          p.style.strokeDashoffset = "150";
        }
      });

      // 2. Initial stroke-dash setup for 4 circuit paths
      const circuitLines = [
        line1Ref.current,
        line2Ref.current,
        line3Ref.current,
        line4Ref.current,
      ];
      circuitLines.forEach((line) => {
        if (line) {
          try {
            const len = line.getTotalLength?.() || 300;
            line.style.strokeDasharray = `${len}`;
            line.style.strokeDashoffset = `${len}`;
          } catch {
            line.style.strokeDasharray = "300";
            line.style.strokeDashoffset = "300";
          }
        }
      });

      // Hide decor and cards initially
      const decorElements = wrapperRef.current?.querySelectorAll(
        `.${styles.mainSvgDecorate}`
      );
      if (decorElements) {
        gsap.set(decorElements, { opacity: 0 });
      }
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 0 });
      });

      // Vertical drop line from top down to touch the dial ticks
      if (verticalLineRef.current) {
        try {
          const len = verticalLineRef.current.getTotalLength?.() || 160;
          verticalLineRef.current.style.strokeDasharray = `${len}`;
          verticalLineRef.current.style.strokeDashoffset = `${len}`;

          gsap.to(verticalLineRef.current, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 85%",
              end: "top 45%",
              scrub: 1,
            },
          });
        } catch {
          // fallback
        }
      }

      // 3. MASTER PINNED SCRUB TIMELINE (Exact Mirach Aerospace Flow)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "center center",
          end: "+=2800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Step 1: Tactical Radar Dial draws out
      if (mainPaths && mainPaths.length > 0) {
        masterTl.to(mainPaths, {
          strokeDashoffset: 0,
          duration: 1.2,
          stagger: 0.015,
          ease: "power2.out",
        });
      }

      // Step 2: Decorative radar tick elements fade in
      if (decorElements && decorElements.length > 0) {
        masterTl.to(
          decorElements,
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.03,
          },
          "-=0.3"
        );
      }

      // Step 3: Circuit Line 1 draws -> Card 1 reveals
      if (line1Ref.current) {
        masterTl.to(line1Ref.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (cardRefs.current[0]) {
        masterTl.fromTo(
          cardRefs.current[0],
          { opacity: 0, x: -35 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Step 4: Circuit Line 2 draws -> Card 2 reveals
      if (line2Ref.current) {
        masterTl.to(line2Ref.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (cardRefs.current[1]) {
        masterTl.fromTo(
          cardRefs.current[1],
          { opacity: 0, x: 35 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Step 5: Circuit Line 3 draws -> Card 3 reveals
      if (line3Ref.current) {
        masterTl.to(line3Ref.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (cardRefs.current[2]) {
        masterTl.fromTo(
          cardRefs.current[2],
          { opacity: 0, x: -35 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Step 6: Circuit Line 4 draws -> Card 4 reveals
      if (line4Ref.current) {
        masterTl.to(line4Ref.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (cardRefs.current[3]) {
        masterTl.fromTo(
          cardRefs.current[3],
          { opacity: 0, x: 35 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
      }
    });

    // 2. MOBILE & TABLET (< 1024px): NO PINNING, NO 2800px PIN SPACER!
    mm.add("(max-width: 1023px)", () => {
      // Clear any inline styles left over so cards render naturally
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { clearProps: "all" });
      });

      if (!prefersReducedMotion) {
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
              delay: idx * 0.08,
            }
          );
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.valuesWrapper}
      aria-label="Our Values Interactive Experience"
    >
      <div className={styles.pinContainer}>
        {/* Center Tactical Radar & Circuit SVG Overlay */}
        <div className={styles.centerGraphicBox} aria-hidden="true">
          {/* Tactical Radar Graphic with Exact Mirach Angles & Compass Ticks */}
          <svg className={styles.radarSvg} viewBox="0 0 1478 536" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_215_2078)"><path className={styles.mainSvgPath} d="M929.534 209.436C937.475 245.689 934.667 283.472 921.455 318.153C908.243 352.835 885.2 382.909 855.151 404.689C825.101 426.47 789.35 439.012 752.279 440.777C715.208 442.542 678.428 433.455 646.445 414.628C614.461 395.801 588.665 368.053 572.217 334.784C555.769 301.515 549.384 264.17 553.843 227.326C558.303 190.482 573.415 155.739 597.325 127.356C621.236 98.9718 652.908 78.1799 688.46 67.5279" stroke="#D9D9D9" strokeOpacity="0.49"></path><path className={styles.mainSvgDecorate} d="M688.524 84.1879L690.382 76.7661L692.273 83.0616L688.524 84.1879Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M628.931 184.377L632.816 190.968L627.05 187.811L628.931 184.377Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M801.944 132.4L802.357 140.04L805.411 134.219L801.944 132.4Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M858.536 322.742L855.411 315.758L860.788 319.54L858.536 322.742Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M797.809 416.148L795.951 423.569L794.06 417.274L797.809 416.148Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M686.088 374.468L685.574 366.834L682.597 372.695L686.088 374.468Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M806.744 445.89L801.103 440.72L802.994 447.016L806.744 445.89Z" fill="white"></path><path className={styles.mainSvgDecorate} d="M679.732 54.9199L685.372 60.0892L683.481 53.7936L679.732 54.9199Z" fill="white"></path><path className={styles.mainSvgPath} d="M693.379 56.283L696.556 66.8599" stroke="white"></path><path className={styles.mainSvgPath} d="M702.499 54.3357L705.164 65.0532" stroke="white"></path><path className={styles.mainSvgPath} d="M712.53 52.5837L714.397 63.4687" stroke="white"></path><path className={styles.mainSvgPath} d="M722.462 51.1121L723.759 62.0794" stroke="white"></path><path className={styles.mainSvgPath} d="M732.264 50.5388L733.192 61.5436" stroke="white"></path><path className={styles.mainSvgPath} d="M742.23 50.1558L742.622 61.1927" stroke="white"></path><path className={styles.mainSvgPath} d="M752.215 50.1871L751.904 61.2266" stroke="white"></path><path className={styles.mainSvgPath} d="M762.009 51.0034L761.257 62.0217" stroke="white"></path><path className={styles.mainSvgPath} d="M771.995 52.0378L770.47 62.9759" stroke="white"></path><path className={styles.mainSvgPath} d="M781.843 53.8364L779.645 64.6594" stroke="white"></path><path className={styles.mainSvgPath} d="M791.189 55.5984L788.992 66.4214" stroke="white"></path><path className={styles.mainSvgPath} d="M801.047 58.5935L797.995 69.2074" stroke="white"></path><path className={styles.mainSvgPath} d="M810.828 61.8865L806.597 72.0875" stroke="white"></path><path className={styles.mainSvgPath} d="M819.839 65.4949L815.521 75.6594" stroke="white"></path><path className={styles.mainSvgPath} d="M837.724 73.6746L832.572 83.443" stroke="white"></path><path className={styles.mainSvgPath} d="M846.364 78.687L840.759 88.2028" stroke="white"></path><path className={styles.mainSvgPath} d="M854.663 83.783L848.831 93.1611" stroke="white"></path><path className={styles.mainSvgPath} d="M862.895 89.5671L856.311 98.4339" stroke="white"></path><path className={styles.mainSvgPath} d="M870.706 95.7241L863.746 104.299" stroke="white"></path><path className={styles.mainSvgPath} d="M878.404 102.09L871.067 110.343" stroke="white"></path><path className={styles.mainSvgPath} d="M885.678 109.092L877.983 117.013" stroke="white"></path><path className={styles.mainSvgPath} d="M892.333 115.838L884.416 123.538" stroke="white"></path><path className={styles.mainSvgPath} d="M899.081 123.667L890.249 130.297" stroke="white"></path><path className={styles.mainSvgPath} d="M905.046 131.329L896.214 137.959" stroke="white"></path><path className={styles.mainSvgPath} d="M911.109 139.457L901.84 145.46" stroke="white"></path><path className={styles.mainSvgPath} d="M916.522 147.83L906.78 153.031" stroke="white"></path><path className={styles.mainSvgPath} d="M921.047 156.684L911.058 161.396" stroke="white"></path><path className={styles.mainSvgPath} d="M925.962 165.369L915.703 169.458" stroke="white"></path><path className={styles.mainSvgPath} d="M929.802 174.742L919.319 178.218" stroke="white"></path><path className={styles.mainSvgPath} d="M933.005 183.659L922.428 186.836" stroke="white"></path><path className={styles.mainSvgPath} d="M858.184 15.7927L823.996 79.3393" stroke="white"></path><path className={styles.mainSvgPath} d="M682.084 380.512L644.916 449.599" stroke="white"></path><path className={styles.mainSvgPath} d="M592.074 296.368L546.237 309.796" stroke="white"></path><path className={styles.mainSvgPath} d="M889.63 207.031L936.289 193.014" stroke="white"></path><circle className={styles.mainSvgPath} cx="4.30691" cy="4.30691" r="3.80691" transform="matrix(0.957722 -0.287695 -0.287695 -0.957722 640.372 458.449)" stroke="white"></circle><circle className={styles.mainSvgPath} cx="4.30691" cy="4.30691" r="3.80691" transform="matrix(0.957722 -0.287695 -0.287695 -0.957722 593.192 300.974)" stroke="white"></circle><path className={styles.mainSvgPath} d="M691.955 391.477L694.741 385.34" stroke="white"></path><path className={styles.mainSvgPath} d="M705.009 395.812L707.158 389.425" stroke="white"></path><path className={styles.mainSvgPath} d="M718.7 398.482L720.251 391.923" stroke="white"></path><path className={styles.mainSvgPath} d="M732.566 400.296L733.298 393.597" stroke="white"></path><path className={styles.mainSvgPath} d="M746.776 400.568L746.006 393.873" stroke="white"></path><path className={styles.mainSvgPath} d="M760.431 399.663L759.367 393.008" stroke="white"></path><path className={styles.mainSvgPath} d="M773.964 397.637L772.303 391.106" stroke="white"></path><path className={styles.mainSvgPath} d="M787.201 394.374L785.465 387.863" stroke="white"></path><circle className={styles.mainSvgPath} cx="744.254" cy="253.729" r="106.865" transform="rotate(-16.72 744.254 253.729)" stroke="#D9D9D9" strokeOpacity="0.49"></circle><path className={styles.mainSvgPath} d="M690.036 354.511C663.307 340.13 643.385 315.721 634.652 286.652C625.92 257.583 629.093 226.235 643.474 199.506" stroke="#D9D9D9" strokeOpacity="0.49"></path><path className={styles.mainSvgPath} d="M845.325 307.863C859.706 281.134 862.879 249.787 854.146 220.718C845.414 191.648 825.492 167.239 798.762 152.858" stroke="#D9D9D9" strokeOpacity="0.49"></path><path className={styles.mainSvgPath} d="M621.886 166.32C641.306 139.888 668.76 120.451 700.143 110.917C731.527 101.383 765.153 102.264 795.994 113.428" stroke="#D9D9D9" strokeOpacity="0.49" strokeWidth="1.14271"></path><path className={styles.mainSvgPath} d="M622.317 166.482L613.192 161.408" stroke="#D9D9D9" strokeOpacity="0.49"></path><path className={styles.mainSvgPath} d="M795.875 113.99L800.903 105.438" stroke="#D9D9D9" strokeOpacity="0.49"></path></g><defs><clipPath id="clip0_215_2078"><rect width="1478" height="536" fill="white"></rect></clipPath></defs></svg>

          {/* 4 Precision Circuit Lines Connecting from Dial to Cards + Vertical Drop Line */}
          <svg
            className={styles.circuitSvg}
            style={{ overflow: "visible" }}
            viewBox="0 0 1478 536"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="1">
              {/* Vertical Guide Line reaching down from top to touch the top dial tick */}
              <line
                ref={verticalLineRef}
                className={styles.verticalLine}
                x1="742.23"
                y1="-110"
                x2="742.23"
                y2="50.15"
              />
              <path
                ref={line1Ref}
                className={styles.circuitPath}
                d="M444 1H538.654L608.87 116.012"
              />
              <path
                ref={line2Ref}
                className={styles.circuitPath}
                d="M1046.7 1H945.445L874.724 105.121"
              />
              {/* <path
                ref={line3Ref}
                className={styles.circuitPath}
                d="M444 531.57H538.662C577.997 462.748 578.513 463.554 617.848 394.732"
              />
              <path
                ref={line4Ref}
                className={styles.circuitPath}
                d="M1046.7 531.219H945.421L858.527 402.941"
              /> */}
            </g>
          </svg>

          {/* Luminous Center Orb */}
          <div className={styles.centerOrb}>
            <span>Our values</span>
          </div>
        </div>

        {/* 4 Corner Values Cards */}
        <div className={styles.cardsGrid}>
          {valuesList.map((val, index) => (
            <article
              key={val.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`${styles.valueCard} ${val.positionClass}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardIconWrapper}>
                  <Image
                    src={val.icon}
                    alt={val.title}
                    width={64}
                    height={64}
                    className={styles.cardIcon}
                  />
                </div>
                <span className={styles.cardIndex}>{val.index}</span>
              </div>
              <h4 className={styles.cardTitle}>{val.title}</h4>
              <p className={styles.cardDescription}>{val.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
