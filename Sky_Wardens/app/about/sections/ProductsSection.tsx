"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./ProductsSection.module.css";

interface Product {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  isCover?: boolean;
}

const productsList: Product[] = [
  {
    id: "aerospace",
    tabLabel: "Aerospace",
    title: "Aerospace",
    description:
      "Autonomous aerial systems, drone platforms, and aerospace-ready engineering developed for precision deployment.",
    ctaText: "Explore Aerospace",
    ctaHref: "/products/aerospace",
    image: "/images/Aerospace%20about1.jpeg",
    isCover: true,
  },
  {
    id: "defence",
    tabLabel: "Defence",
    title: "Defence",
    description:
      "Protective systems, tactical equipment, and defence manufacturing built for operational readiness across demanding field conditions.",
    ctaText: "Explore Defence",
    ctaHref: "/products/defence",
    image: "/images/Defence%20about1.jpeg",
    isCover: true,
  },
  /*
  {
    id: "advanced-systems",
    tabLabel: "Advanced Systems",
    title: "Advanced Systems",
    description:
      "Integrated sensing, electronics, communication, and surveillance capabilities designed for complex operating environments.",
    ctaText: "See Systems",
    ctaHref: "/capabilities#systems",
    image: "/images/Advance%20system%20about1.jpeg",
    isCover: true,
  },
  {
    id: "petrochemical",
    tabLabel: "Petrochemical",
    title: "Petrochemical",
    description:
      "Performance-oriented lubricant and petrochemical products aligned with industrial reliability and endurance.",
    ctaText: "Explore Solutions",
    ctaHref: "/capabilities#petrochemical",
    image: "/images/Petrochemical%20aboutus1.jpeg",
    isCover: true,
  },
  */
  {
    id: "affiliations",
    tabLabel: "Affiliations",
    title: "Affiliations",
    description:
      "Strategic collaborations and aligned institutional relationships that broaden execution depth, capability access, and long-term growth.",
    ctaText: "View Partnerships",
    ctaHref: "/contact",
    image: "/images/Affiliations%20aboutus.jpeg",
    isCover: true,
  },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeProduct = productsList[activeTab];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <section
      id="products"
      className={styles.section}
      aria-label="Our Businesses Section"
    >
      {/* Subtle radial ambient lighting */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Centered Header in Design Theme */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            GROUP OF COMPANIES
          </span>
          <AnimatedTitle className={styles.heading}>
            OUR BUSINESSES
          </AnimatedTitle>
          <p className={styles.subtitle}>
            Engineered for performance and reliability
          </p>
        </div>

        {/* Desktop Tab Controls (>= 900px) */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsList} role="tablist">
            {productsList.map((product, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={product.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabButton} ${
                    isActive ? styles.tabButtonActive : ""
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  {product.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Dropdown (< 900px) */}
        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <button
            type="button"
            className={`${styles.dropdownTrigger} ${
              isDropdownOpen ? styles.dropdownTriggerOpen : ""
            }`}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
            aria-label="Select business sector"
          >
            <span className={styles.dropdownActiveLabel}>
              {activeProduct.tabLabel}
            </span>
            <svg
              className={`${styles.dropdownChevron} ${
                isDropdownOpen ? styles.dropdownChevronOpen : ""
              }`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isDropdownOpen && (
            <ul
              className={styles.dropdownMenu}
              role="listbox"
              aria-label="Business sectors"
            >
              {productsList.map((product, idx) => {
                const isActive = activeTab === idx;
                return (
                  <li key={product.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      className={`${styles.dropdownItem} ${
                        isActive ? styles.dropdownItemActive : ""
                      }`}
                      onClick={() => {
                        setActiveTab(idx);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span>{product.tabLabel}</span>
                      {isActive && (
                        <span
                          className={styles.dropdownCheckmark}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Product Showcase */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.imageStage}>
            <div
              className={
                activeProduct.isCover
                  ? styles.imageCard
                  : styles.imageTransparentWrap
              }
            >
              <Image
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.tabLabel}
                fill
                priority
                className={
                  activeProduct.isCover
                    ? styles.productImgCover
                    : styles.productImg
                }
              />
            </div>
          </div>

          {/* Details Row: Description & CTA Button */}
          <div className={styles.detailsRow}>
            <div className={styles.textBlock}>
              <p className={styles.productDescription}>
                {activeProduct.description}
              </p>
            </div>

            <div className={styles.actionBlock}>
              <Link href={activeProduct.ctaHref} className={styles.ctaButton}>
                <span>{activeProduct.ctaText}</span>
                <svg
                  className={styles.ctaIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
