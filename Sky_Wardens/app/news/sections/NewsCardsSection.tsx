"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsArticles } from "../data";
import styles from "./NewsCardsSection.module.css";

const categories = [
  "All",
  "Aerospace",
  "Defence",
  "Sovereign Tech",
  "Strategic Alliances",
  "Advanced Systems",
  "Manufacturing",
];

export default function NewsCardsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles =
    selectedCategory === "All"
      ? newsArticles
      : newsArticles.filter(
          (article) =>
            article.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section className={styles.section} aria-label="News and Insights Articles">
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>LATEST DISPATCHES</span>
            <h2 className={styles.sectionTitle}>
              News, Insights &amp; Operational Reports
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filters} role="tablist" aria-label="News filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`${styles.filterButton} ${
                  selectedCategory === category ? styles.filterButtonActive : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 3 * n Cards Grid */}
        <div className={styles.grid}>
          {filteredArticles.map((article) => (
            <article key={article.id} className={styles.card}>
              <Link
                href={`/news/${article.slug}`}
                className={styles.cardLink}
                aria-label={article.headline}
              >
                {/* Card Media */}
                <div className={styles.imageWrap}>
                  <Image
                    src={article.imageSrc}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.categoryBadge}>{article.category}</span>
                </div>

                {/* Card Content */}
                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.date}>{article.date}</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>

                  <h3 className={styles.headline}>{article.headline}</h3>

                  <p className={styles.excerpt}>{article.excerpt}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.readMore}>
                      Read Article
                      <svg
                        className={styles.arrowIcon}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10L10 4M10 4H5M10 4V9"
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
    </section>
  );
}
