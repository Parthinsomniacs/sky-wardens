"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./BusinessesSection.module.css";

interface BusinessItem {
  id: string;
  sector: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc: string;
  logoAlt: string;
  href: string;
}

const DEFAULT_BUSINESSES: BusinessItem[] = [
  {
    id: "aerospace",
    sector: "Sector 1",
    title: "AEROSPACE",
    description: "Aeronautical systems, tactical UAVs, ISR reconnaissance, and flight avionics.",
    buttonText: "Explore Aerospace",
    imageSrc: "",
    imageAlt: "Aerospace platform",
    logoSrc: "",
    logoAlt: "Aerospace Logo",
    href: "/products/aerospace",
  },
  {
    id: "defence",
    sector: "Sector 2",
    title: "DEFENCE",
    description: "Frontline ballistic protection, tactical helmets, combat body armor, and riot gear.",
    buttonText: "Explore Defence",
    imageSrc: "",
    imageAlt: "Defence equipment",
    logoSrc: "",
    logoAlt: "Defence Logo",
    href: "/products/defence",
  },
];

export default function BusinessesSection() {
  const [items, setItems] = useState<BusinessItem[]>(DEFAULT_BUSINESSES);
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    const loadDivisions = () => {
      fetch(`${apiUrl}/divisions`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success && Array.isArray(data.divisions)) {
            const activeDivs = data.divisions.filter(
              (d: any) => (d.status || "Active") === "Active"
            );
            if (activeDivs.length > 0) {
              const mapped: BusinessItem[] = activeDivs.map((d: any, idx: number) => {
                const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return {
                  id: slug,
                  sector: d.sector || `Sector ${idx + 1}`,
                  title: d.name.toUpperCase(),
                  description:
                    d.description ||
                    `${d.name} advanced engineering platforms and systems.`,
                  buttonText: d.buttonText || `Explore ${d.name}`,
                  imageSrc: d.imageSrc || "",
                  imageAlt: d.imageAlt || `${d.name} industrial equipment`,
                  logoSrc: d.logoSrc || "",
                  logoAlt: d.logoAlt || `${d.name} Logo`,
                  href: d.href || `/products/${slug}`,
                };
              });
              setItems(mapped);
            } else {
              setItems([]);
            }
          }
        })
        .catch((err) => {
          console.warn("Failed to load live divisions for business section:", err);
        });
    };

    loadDivisions();
    window.addEventListener("focus", loadDivisions);
    return () => window.removeEventListener("focus", loadDivisions);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger, SplitText);

    let metaSplit: SplitText | null = null;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Robotic arm slides in from the left on scroll (keeps its flip).
      const robot = sectionRef.current?.querySelector<HTMLElement>(
        "[data-robot]"
      );
      if (robot) {
        gsap.fromTo(
          robot,
          { x: -120, autoAlpha: 0, scaleX: 1 },
          {
            x: 0,
            autoAlpha: 1,
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Meta row: description reveals word by word, label fades up.
      const metaLeft = metaRef.current?.querySelector<HTMLElement>(
        `.${styles.metaLeft}`
      );
      const metaRight = metaRef.current?.querySelector<HTMLElement>(
        `.${styles.metaRight}`
      );

      if (metaLeft) {
        metaSplit = SplitText.create(metaLeft, { type: "words" });
        gsap.from(metaSplit.words, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.04,
          scrollTrigger: {
            trigger: metaRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (metaRight) {
        gsap.from(metaRight, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Desktop: cards rise up from below and fade in as they scroll
      // into view, scrubbed to the scroll position for a smooth reveal.
      mm.add("(min-width: 1025px)", () => {
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

        cards.forEach((card, index) => {
          const isEdge = index === 0 || index === cards.length - 1;
          // Outer cards travel further for a subtle depth difference.
          const fromY = isEdge ? 160 : 110;

          gsap.fromTo(
            card,
            { y: fromY, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsGridRef.current,
                start: "top 90%",
                end: "top 45%",
                scrub: 1,
              },
            }
          );
        });

        // Subtle inner image un-zoom (1.08 -> 1.0)
        const validImages = imageRefs.current.filter(Boolean);
        if (validImages.length > 0) {
          gsap.fromTo(
            validImages,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "power1.out",
              scrollTrigger: {
                trigger: cardsGridRef.current,
                start: "top 90%",
                end: "top 40%",
                scrub: 1,
              },
            }
          );
        }
      });

      // Mobile & Tablet (Natural cascading entrance without pinning)
      mm.add("(max-width: 1024px)", () => {
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

        const validCards = cardRefs.current.filter(Boolean);
        if (validCards.length > 0) {
          gsap.fromTo(
            validCards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: validCards[0],
                start: "top 82%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      metaSplit?.revert();
      ctx.revert();
    };
  }, [items]);

  return (
    <section
      id="our-businesses"
      ref={sectionRef}
      className={styles.section}
      aria-label="Our Businesses"
    >
      <div ref={pinWrapRef} className={styles.pinWrapper}>
        <div className={styles.inner}>
          {/* Decorative robotic arm (top-left) */}
          <Image
            src="/images/robot-arm.webp"
            alt=""
            aria-hidden="true"
            width={320}
            height={320}
            className={styles.robotArm}
            data-robot
          />

          {/* Header Block (Stays clearly visible & sharp at top) */}
          <div ref={headerRef} className={styles.header}>
            <span className={styles.eyebrow}>OUR BUSINESSES</span>
            <AnimatedTitle className={styles.title}>
              <span className={styles.titleLine}>
                WE OPERATE <span className={styles.whereWord}>WHERE</span>
              </span>
              <span className={styles.titleLine}>IMPACT MATTERS</span>
            </AnimatedTitle>
          </div>

          {/* Divider & Context Row (Cleanly visible below title) */}
          <div ref={metaRef} className={styles.metaRow}>
            <p className={styles.metaLeft}>
              Sky Wardens operates in sectors where the stakes are too high for
              anything less than full commitment.
            </p>
            <span className={styles.metaRight}>Critical Domains</span>
          </div>

          {/* Cards Grid (4 Cards that slide smoothly up underneath the divider line) */}
          <div ref={cardsGridRef} className={styles.grid}>
            {items.map((item, index) => (
              <article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                <Link href={item.href} aria-label={item.title}>
                  {/* Media with Hover Zoom & Floating Center Logo Card */}
                  <div className={styles.mediaWrap}>
                    {item.imageSrc ? (
                      <Image
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                        src={item.imageSrc}
                        alt={item.imageAlt || item.title}
                        fill
                        sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className={styles.cardImage}
                        priority={index === 0}
                        unoptimized={item.imageSrc.startsWith("data:")}
                      />
                    ) : (
                      <div className={styles.emptyPlaceholder}>
                        <div className={styles.placeholderPattern} />
                        <div className={styles.placeholderContent}>
                          <div className={styles.placeholderIconBox}>
                            <svg
                              width="28"
                              height="28"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={styles.placeholderIcon}
                            >
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </div>
                          <span className={styles.placeholderLabel}>{item.sector}</span>
                          <span className={styles.placeholderHint}>No image uploaded</span>
                        </div>
                      </div>
                    )}

                    {/* Floating Center Card with Zoom-in Logo Animation */}
                    {item.logoSrc && (
                      <div className={styles.centerCard} aria-hidden="true">
                        <div className={styles.logoImageWrap}>
                          <Image
                            src={item.logoSrc}
                            alt={item.logoAlt || `${item.title} Logo`}
                            fill
                            sizes="180px"
                            className={styles.logoImage}
                            unoptimized={item.logoSrc.startsWith("data:")}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Info Below Media */}
                  <div className={styles.cardBody}>
                    <span className={styles.sectorTag}>{item.sector}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                    <div className={styles.buttonWrap}>
                      <span className={styles.cardButton}>
                        <span>{item.buttonText}</span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={styles.buttonArrow}
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
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
