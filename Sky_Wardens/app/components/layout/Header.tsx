"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { pageLinks, socialLinks } from "@/app/config/navigation";
import AnimatedButton from "@/app/components/ui/AnimatedButton";
import styles from "./Header.module.css";

/**
 * Theme icon: a fine upward zig-zag / signal spike line — a subtle,
 * refined accent mark for a premium feel next to each nav link.
 * Uses currentColor so it inherits the link colour (and hover state).
 */
function LinkIcon() {
  return (
    <svg
      width="24"
      height="12"
      viewBox="0 0 24 12"
      fill="none"
      aria-hidden="true"
      className={styles.linkIcon}
    >
      <path
        d="M1 11L5.5 2.5L9 8L13 1L16.5 6.5L20 3.5L23 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tabler "chevron-down" icon — rotated via GSAP when the dropdown is open. */
function ChevronIcon({ label }: { label: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={styles.chevronIcon}
      data-chevron={label}
    >
      <path d="M6 9l6 6l6 -6" />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [navLinks, setNavLinks] = useState(pageLinks);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    const loadNavLinks = () => {
      fetch(`${apiUrl}/divisions`, { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success && Array.isArray(data.divisions)) {
            const activeDivs = data.divisions.filter(
              (d: any) => (d.status || "Active") === "Active"
            );
            const productChildren = activeDivs.map((d: any) => {
              const slug = d.slug || d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return {
                label: d.name,
                href: d.href || `/products/${slug}`,
              };
            });

            setNavLinks((prev) =>
              prev.map((item) => {
                if (item.label === "Products") {
                  return {
                    ...item,
                    children: productChildren,
                  };
                }
                return item;
              })
            );
          }
        })
        .catch((err) => {
          console.warn("Failed to fetch dynamic division links for header:", err);
        });
    };

    loadNavLinks();
    window.addEventListener("focus", loadNavLinks);
    return () => window.removeEventListener("focus", loadNavLinks);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };
  const drawerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Build the open/close timeline once (paused, played/reversed on toggle).
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const overlayDuration = reduceMotion ? 0.01 : 0.9;
    const drawerDuration = reduceMotion ? 0.01 : 1.1;

    const ctx = gsap.context(() => {
      // Content items that reveal in sequence once the panel is down.
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", drawerRef.current);

      // Initial hidden state.
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(drawerRef.current, { yPercent: -100 });

      const tl = gsap
        .timeline({ paused: true })
        .set(overlayRef.current, { autoAlpha: 1 })
        .fromTo(
          overlayRef.current,
          { backgroundColor: "rgba(0, 0, 0, 0)" },
          {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            duration: overlayDuration,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          drawerRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: drawerDuration, ease: "power3.inOut" },
          0
        );

      if (items.length) {
        tl.fromTo(
          items,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: reduceMotion ? 0.01 : 0.8,
            ease: "power3.out",
            stagger: reduceMotion ? 0 : 0.1,
          },
          reduceMotion ? 0 : 0.45
        );
      }

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  // Play forward when opening, reverse when closing.
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  // Smoothly rotate the chevron of the active dropdown (GSAP).
  useEffect(() => {
    const chevrons =
      drawerRef.current?.querySelectorAll<SVGElement>("[data-chevron]");
    if (!chevrons) return;

    chevrons.forEach((chevron) => {
      const isActive = chevron.dataset.chevron === expandedItem;
      gsap.to(chevron, {
        rotate: isActive ? 180 : 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.6)",
        overwrite: "auto",
      });
    });
  }, [expandedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const renderNavItem = (item: (typeof pageLinks)[number]) => {
    const isExpanded = expandedItem === item.label;

    // Items with children: the whole link toggles the dropdown.
    if (item.children) {
      return (
        <li key={item.label} className={styles.drawerItem} data-reveal>
          <button
            type="button"
            className={`${styles.drawerLink} ${styles.drawerToggle} ${
              isExpanded ? styles.drawerToggleOpen : ""
            }`}
            onClick={() =>
              setExpandedItem((prev) => (prev === item.label ? null : item.label))
            }
            aria-expanded={isExpanded}
          >
            <LinkIcon />
            <span className={styles.drawerLabel}>{item.label}</span>
            <ChevronIcon label={item.label} />
          </button>

          <div
            className={`${styles.drawerSubWrap} ${
              isExpanded ? styles.drawerSubWrapOpen : ""
            }`}
          >
            <ul className={styles.drawerSubList}>
              {item.children.map((child, i) => (
                <li
                  key={child.label}
                  className={styles.drawerSubItem}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Link
                    href={child.href}
                    className={styles.drawerSubLink}
                    onClick={closeMenu}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      );
    }

    // Plain links (external or internal).
    return (
      <li key={item.label} className={styles.drawerItem} data-reveal>
        {item.external ? (
          <a
            href={item.href}
            className={styles.drawerLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            <LinkIcon />
            <span className={styles.drawerLabel}>{item.label}</span>
          </a>
        ) : (
          <Link href={item.href} className={styles.drawerLink} onClick={closeMenu}>
            <LinkIcon />
            <span className={styles.drawerLabel}>{item.label}</span>
          </Link>
        )}
      </li>
    );
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""} ${isOpen ? styles.headerOpen : ""}`.trim()}
    >
      <div className={styles.inner}>
        {/* Brand / Logo */}
        <Link href="/" className={styles.brand} aria-label="Sky Wardens Home">
          <Image
            src="/images/New Logo s/Icon.png"
            alt="Sky Wardens Icon"
            width={44}
            height={42}
            priority
            className={styles.logoIcon}
          />
          <Image
            src="/images/New Logo s/Text.png"
            alt="Sky Wardens"
            width={178}
            height={18}
            priority
            className={styles.logoText}
          />
        </Link>

        {/* Right Actions: 2 Separate Buttons (LETS TALK + Hamburger Menu) */}
        <div className={styles.actions}>
          <AnimatedButton href="/contact" size="sm">
            LETS TALK
          </AnimatedButton>
          <button
            type="button"
            className={`${styles.menuButton} ${isOpen ? styles.menuButtonActive : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span className={`${styles.menuBar} ${styles.menuBarTop}`} />
            <span className={`${styles.menuBar} ${styles.menuBarMid}`} />
            <span className={`${styles.menuBar} ${styles.menuBarBot}`} />
          </button>
        </div>
      </div>

      {/* Full-width navigation panel (slides down from the top) */}
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      >
        <div
          ref={drawerRef}
          className={styles.drawer}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          <div className={styles.drawerBody}>
            {/* Left: navigation */}
            <div className={styles.drawerNav}>
              <div className={styles.drawerContent}>
                <ul className={styles.drawerList}>
                  {navLinks.map(renderNavItem)}
                </ul>
              </div>

              <ul className={styles.socialRow} data-reveal>
                {socialLinks.map((social) => (
                  <li key={social.label} className={styles.socialItem}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      onClick={closeMenu}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: contact card */}
            <div className={styles.contactCard} data-reveal>
              <div className={styles.contactImages}>
                <Image
                  src="/images/business-aerospace.jpg"
                  alt="Aerospace & UAV operations"
                  width={300}
                  height={300}
                  className={styles.contactImage}
                />
                <Image
                  src="/images/business-tactical.jpg"
                  alt="Tactical defence equipment"
                  width={300}
                  height={300}
                  className={styles.contactImage}
                />
                <Image
                  src="/images/business-systems.jpg"
                  alt="Advanced mission systems"
                  width={300}
                  height={300}
                  className={styles.contactImage}
                />
              </div>

              <div className={styles.contactBody}>
                <div className={styles.contactText}>
                  <p className={styles.contactEyebrow}>[ CONTACT US ]</p>
                  <p className={styles.contactDesc}>
                    Start a strategic conversation. Let&apos;s build capability
                    that matters.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className={styles.contactArrow}
                  onClick={closeMenu}
                  aria-label="Contact us"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

