"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./AboutSection.module.css";

const capabilities = [
  {
    id: "sectors",
    label: "Sectors",
    title: "02", // "04",
    description: "Aerospace and Defence.", // "Aerospace, Defence, Advanced Systems, and Petrochemical.",
    activeDots: 1,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 69 62"
        fill="none"
        className={styles.cardIconSvg}
        aria-hidden="true"
      >
        <path
          d="M23.0447 29.0047C22.1488 29.0047 21.2529 28.6528 20.5707 27.9481C19.9078 27.2631 19.5434 26.352 19.5434 25.3832C19.5434 24.4139 19.9078 23.5028 20.5702 22.8183C21.9341 21.4084 24.1547 21.4078 25.5192 22.8177C26.1816 23.5023 26.5465 24.4139 26.5465 25.3832C26.5465 26.352 26.1816 27.2631 25.5192 27.9476C24.8375 28.6528 23.9411 29.0047 23.0447 29.0047ZM23.0452 23.3928C22.5499 23.3928 22.0546 23.5872 21.6781 23.9771C21.3147 24.3529 21.1147 24.8523 21.1147 25.3832C21.1147 25.9142 21.3147 26.4136 21.6781 26.7893C22.4316 27.5681 23.6578 27.5675 24.4128 26.7888C24.7757 26.4136 24.9762 25.9142 24.9762 25.3832C24.9762 24.8523 24.7757 24.3529 24.4123 23.9771C24.0353 23.5872 23.54 23.3928 23.0452 23.3928Z"
          fill="var(--color-accent)"
        />
        <path
          d="M51.3582 62H17.6433C17.36 62 17.0987 61.841 16.9589 61.5845C16.8196 61.3275 16.8244 61.0127 16.9704 60.7605L19.0172 57.235L43.3822 15.8608C43.6095 15.4758 44.0933 15.356 44.4624 15.5907C44.8326 15.8259 44.9488 16.3291 44.7221 16.7141L20.3597 58.0839L19.035 60.3657H50.9058L67.3069 31L50.9058 1.63373H18.0951L1.69397 31L15.7636 56.1905C15.9814 56.5809 15.8541 57.0809 15.4792 57.3074C15.1038 57.534 14.6231 57.401 14.4053 57.0117L0.106421 31.4106C-0.0354737 31.1568 -0.0354737 30.8437 0.106421 30.5894L16.9636 0.406238C17.104 0.154644 17.3631 0 17.6427 0H51.3577C51.6373 0 51.8959 0.154644 52.0368 0.406238L68.894 30.5894C69.0353 30.8437 69.0353 31.1568 68.894 31.4106L52.0368 61.5932C51.8964 61.8454 51.6378 62 51.3582 62Z"
          fill="var(--color-accent)"
        />
        <path
          d="M30.5023 40.114C30.0713 40.114 29.7205 39.753 29.7169 39.3042C29.7132 38.8533 30.0619 38.4841 30.4955 38.4803L63.7376 38.1884H63.7444C64.1753 38.1884 64.5261 38.5494 64.5298 38.9982C64.5335 39.4491 64.1847 39.8183 63.7512 39.8221L30.5091 40.114H30.5023Z"
          fill="var(--color-accent)"
        />
      </svg>
    ),
  },
  {
    id: "model",
    label: "Model",
    title: "B2G",
    description: "Government, institutional, and strategic partner engagement.",
    activeDots: 2,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 69 55"
        fill="none"
        className={styles.cardIconSvg}
        aria-hidden="true"
      >
        <path
          d="M34.6349 55C34.3936 55 34.1621 54.8994 33.9967 54.7222L0.238484 18.6353C-0.0262615 18.3528 -0.0759286 17.9278 0.116348 17.5905L8.85177 2.26619C9.0084 1.99189 9.29827 1.82296 9.6121 1.82296H14.2028C14.6867 1.82296 15.0794 2.21852 15.0794 2.7059C15.0794 3.19329 14.6867 3.58884 14.2028 3.58884H10.1194L1.96078 17.9013L34.632 52.8262L67.0186 17.9278L57.9366 3.58884H34.4993C34.0154 3.58884 33.6227 3.19329 33.6227 2.7059C33.6227 2.21852 34.0154 1.82296 34.4993 1.82296H58.417C58.7168 1.82296 58.995 1.97718 59.1563 2.23088L68.8625 17.5552C69.0775 17.8948 69.0372 18.3386 68.7637 18.6329L35.2743 54.7198C35.1089 54.8982 34.8769 54.9994 34.6349 55Z"
          fill="var(--color-accent)"
        />
        <path
          d="M49.335 39.1595C49.1088 39.1595 48.8827 39.0718 48.7114 38.897L13.8597 3.32571C13.5196 2.97842 13.5231 2.41983 13.8679 2.07725C14.2115 1.73467 14.7673 1.73819 15.1075 2.08547L49.9592 37.6567C50.2993 38.004 50.2958 38.5626 49.951 38.9052C49.7803 39.0753 49.5577 39.1595 49.335 39.1595Z"
          fill="var(--color-accent)"
        />
        <path
          d="M28.0993 7.06351C26.1654 7.06351 24.5927 5.47952 24.5927 3.53175C24.5927 1.58399 26.1654 0 28.0993 0C30.0331 0 31.6058 1.58399 31.6058 3.53175C31.6058 5.47952 30.0331 7.06351 28.0993 7.06351ZM28.0993 1.76588C27.1326 1.76588 26.346 2.55817 26.346 3.53175C26.346 4.50534 27.1326 5.29763 28.0993 5.29763C29.0659 5.29763 29.8525 4.50534 29.8525 3.53175C29.8525 2.55817 29.0659 1.76588 28.0993 1.76588Z"
          fill="var(--color-accent)"
        />
      </svg>
    ),
  },
  {
    id: "direction",
    label: "Direction",
    title: "Long Term",
    description: "Capability, scale, and execution built to last.",
    activeDots: 3,
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 69 69"
        fill="none"
        className={styles.cardIconSvg}
        aria-hidden="true"
      >
        <path
          d="M34.5338 69C34.332 69 34.1379 68.9197 33.9946 68.7769L0.223356 35.0053C-0.074452 34.7075 -0.074452 34.2252 0.223356 33.9274L33.9275 0.223355C34.2253 -0.0744517 34.7076 -0.0744517 35.0054 0.223355L68.7766 33.9945C69.0745 34.2923 69.0745 34.7746 68.7766 35.0724L35.0725 68.7769C34.9297 68.9197 34.7356 69 34.5338 69ZM1.84044 34.4661L34.5338 67.1598L67.16 34.5332L34.4667 1.83996L1.84044 34.4661Z"
          fill="var(--color-accent)"
        />
        <path
          d="M33.9097 49.4413C33.7146 49.4413 33.5199 49.3666 33.371 49.2177L21.7682 37.6149C21.4704 37.3171 21.4704 36.8349 21.7682 36.537L30.3569 27.9484C30.6547 27.6506 31.1369 27.6506 31.4347 27.9484C31.7326 28.2462 31.7326 28.7285 31.4347 29.0263L23.3853 37.0757L33.9102 47.6006L57.6083 23.9026C57.9061 23.6048 58.3884 23.6048 58.6862 23.9026C58.984 24.2004 58.984 24.6827 58.6862 24.9805L34.4494 49.2172C34.3 49.3666 34.1049 49.4413 33.9097 49.4413Z"
          fill="var(--color-accent)"
        />
        <path
          d="M34.9627 27.0336C34.2939 27.0336 33.6246 26.7785 33.1149 26.2687C32.0964 25.2503 32.0949 23.5946 33.1118 22.5772C34.1298 21.5603 35.7855 21.5623 36.8034 22.5802C37.2969 23.0732 37.5688 23.7288 37.5693 24.4255C37.5698 25.1233 37.2989 25.7788 36.806 26.2713C36.2972 26.7795 35.6305 27.0336 34.9627 27.0336ZM34.9551 23.3395C34.6776 23.3395 34.4006 23.4447 34.1897 23.6551C33.7674 24.0779 33.7689 24.767 34.1928 25.1903C34.6161 25.6142 35.3047 25.6152 35.7281 25.1929C35.9324 24.9886 36.0452 24.7162 36.0447 24.4265C36.0442 24.1363 35.9308 23.8634 35.7255 23.6576C35.5126 23.4457 35.2336 23.3395 34.9551 23.3395Z"
          fill="var(--color-accent)"
        />
      </svg>
    ),
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let descSplit: SplitText | null = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Left column: reveal heading + text on scroll into view.
      const leftItems = gsap.utils.toArray<HTMLElement>("[data-about-reveal]");
      if (leftItems.length) {
        gsap.fromTo(
          leftItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Description: reveal word by word on scroll.
      const desc =
        sectionRef.current?.querySelector<HTMLElement>("[data-about-desc]");
      if (desc) {
        descSplit = SplitText.create(desc, { type: "words" });
        gsap.from(descSplit.words, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: desc,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Desktop & Tablet scroll animation (slow, luxurious scrubbed cascading reveal)
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "+=900",
            scrub: 1.8,
          },
        });

        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          tl.fromTo(
            card,
            {
              x: 160,
              opacity: 0.15,
            },
            {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1.2,
            },
            index * 0.75,
          );
        });
      });

      // Mobile smooth slow fade-up on scroll
      mm.add("(max-width: 768px)", () => {
        cardRefs.current.forEach((card, index) => {
          if (!card) return;
          gsap.fromTo(
            card,
            {
              opacity: 0.2,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              delay: index * 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      // Ambient top accent line animation
      lineRefs.current.forEach((line, index) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { x: index % 2 === 0 ? "-30%" : "320%" },
          {
            x: index % 2 === 0 ? "320%" : "-30%",
            duration: 6 + index * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        );
      });
    }, sectionRef);

    return () => {
      descSplit?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={styles.section}
      aria-label="Capabilities & Value"
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* Left Column: Heading & Description */}
          <div className={styles.leftColumn}>
            <div className={styles.titleWrap}>
              <span className={styles.eyebrow} data-about-reveal>
                OUR CAPABILITIES
              </span>
              <AnimatedTitle className={styles.mainHeading}>
                <span className={styles.headingLine}>ABOUT</span>
                <span className={styles.headingLine}>US</span>
              </AnimatedTitle>
            </div>

            <div className={styles.bottomInfo}>
              <div
                className={styles.arrowIconWrap}
                aria-hidden="true"
                data-about-reveal
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  className={styles.arrowIcon}
                >
                  <path
                    d="M21.3536 9.85355C21.5488 9.65829 21.5488 9.34171 21.3536 9.14645L18.1716 5.96447C17.9763 5.7692 17.6597 5.7692 17.4645 5.96447C17.2692 6.15973 17.2692 6.47631 17.4645 6.67157L20.2929 9.5L17.4645 12.3284C17.2692 12.5237 17.2692 12.8403 17.4645 13.0355C17.6597 13.2308 17.9763 13.2308 18.1716 13.0355L21.3536 9.85355ZM0.5 0H0V2.5H0.5H1V0H0.5ZM7.5 9.5V10H21V9.5V9H7.5V9.5ZM0.5 2.5H0C0 6.64214 3.35786 10 7.5 10V9.5V9C3.91015 9 1 6.08985 1 2.5H0.5Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3 className={styles.subHeadline} data-about-reveal>
                  BUILT FOR WHAT THE
                  <br />
                  DEFENCE WORLD NEEDS
                </h3>
                <p className={styles.description} data-about-desc>
                  Sky Wardens was established to develop durable industrial
                  capability, the kind that takes years to build and decades to
                  matter.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Capability Cards */}
          <div className={styles.rightColumn}>
            {capabilities.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                {/* Moving Accent Top Line */}
                <div
                  ref={(el) => {
                    lineRefs.current[index] = el;
                  }}
                  className={styles.topAccentLine}
                  aria-hidden="true"
                />

                {/* Left Wireframe Icon */}
                <div className={styles.iconWrap}>{item.svg}</div>

                {/* Center Content */}
                <div className={styles.cardBody}>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.description}</p>
                </div>

                {/* Right 3 Indicator Dots */}
                <div className={styles.dotsWrap} aria-hidden="true">
                  {[0, 1, 2].map((dotIdx) => (
                    <span
                      key={dotIdx}
                      className={
                        dotIdx < item.activeDots
                          ? styles.dotActive
                          : styles.dotInactive
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
