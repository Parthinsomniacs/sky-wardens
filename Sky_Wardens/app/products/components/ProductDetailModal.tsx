"use client";

import { useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardItem, ProductDetailSection } from "../defence/data";
import styles from "./ProductDetailModal.module.css";

interface ProductDetailModalProps {
  product: ProductCardItem | null;
  categoryName?: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function ProductDetailModal({
  product,
  categoryName,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}: ProductDetailModalProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasPrev && onPrev) {
        onPrev();
      } else if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Allow immediate keyboard / mouse scroll without needing a click
    scrollAreaRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [product, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!product) return null;

  const inquiryUrl = `/contact?inquiryType=${encodeURIComponent(
    "Product(s) Inquiry"
  )}&products=${encodeURIComponent(product.name)}`;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-modal-title"
      data-lenis-prevent="true"
    >
      <div
        className={styles.modalDialog}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        onWheel={(e) => {
          if (
            scrollAreaRef.current &&
            !scrollAreaRef.current.contains(e.target as Node)
          ) {
            scrollAreaRef.current.scrollTop += e.deltaY;
          }
        }}
      >
        {/* ================================================================
            HEADER BAR
            ================================================================ */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.eyebrow}>
              {product.categoryName || categoryName || "Product Dossier"}
            </span>
            <h2 id="product-detail-modal-title" className={styles.modalTitle}>
              {product.name}
            </h2>
          </div>

          <div className={styles.headerControls}>
            {onPrev && (
              <button
                type="button"
                className={styles.navArrowBtn}
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label="Previous product"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {onNext && (
              <button
                type="button"
                className={styles.navArrowBtn}
                onClick={onNext}
                disabled={!hasNext}
                aria-label="Next product"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}

            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close dialog"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================================================================
            MODAL BODY (2-COLUMNS: IMAGE + SCROLLABLE DETAILS)
            ================================================================ */}
        <div className={styles.modalBody}>
          {/* Left Column: Image */}
          <div className={styles.imageColumn}>
            <div className={styles.imageWell}>
              <Image
                src={product.imageSrc}
                alt={product.imageAlt || product.name}
                fill
                sizes="(max-width: 900px) 100vw, 420px"
                className={styles.productImage}
              />
            </div>
          </div>

          {/* Right Column: Scrollable Rich Details */}
          <div className={styles.detailsColumn}>
            <div
              ref={scrollAreaRef}
              className={styles.scrollArea}
              data-lenis-prevent="true"
              tabIndex={0}
            >
              {product.details && product.details.length > 0 ? (
                product.details.map(
                  (section: ProductDetailSection, sIdx: number) => {
                    switch (section.type) {
                      case "spec-grid":
                        return (
                          <div
                            key={`spec-${sIdx}`}
                            className={styles.detailSection}
                          >
                            <h3 className={styles.sectionHeading}>
                              Key Specifications
                            </h3>
                            <div className={styles.specGrid}>
                              {section.items.map((it, itIdx) => (
                                <div
                                  key={`item-${itIdx}`}
                                  className={styles.specItem}
                                >
                                  <div className={styles.specContent}>
                                    <p className={styles.specLabel}>
                                      {it.label}
                                    </p>
                                    <p className={styles.specValue}>
                                      {it.value}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );

                      case "table":
                        return (
                          <div
                            key={`table-${sIdx}`}
                            className={styles.detailSection}
                          >
                            {section.title && (
                              <h3 className={styles.sectionHeading}>
                                {section.title}
                              </h3>
                            )}
                            <div className={styles.detailTable}>
                              {section.rows.map((row, rIdx) => (
                                <div
                                  key={`row-${rIdx}`}
                                  className={styles.tableRow}
                                >
                                  <p className={styles.tableLabel}>
                                    {row.label}
                                  </p>
                                  <p className={styles.tableValue}>
                                    {row.value}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );

                      case "list":
                        return (
                          <div
                            key={`list-${sIdx}`}
                            className={styles.detailSection}
                          >
                            <h3 className={styles.sectionHeading}>
                              {section.title}
                            </h3>
                            <ul className={styles.detailList}>
                              {section.items.map((itemText, lIdx) => (
                                <li
                                  key={`li-${lIdx}`}
                                  className={styles.detailListItem}
                                >
                                  <span className={styles.listDot} />
                                  <span>{itemText}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );

                      case "text":
                        return (
                          <div
                            key={`text-${sIdx}`}
                            className={styles.detailSection}
                          >
                            <h3 className={styles.sectionHeading}>
                              {section.title}
                            </h3>
                            <p className={styles.detailBodyText}>
                              {section.body}
                            </p>
                          </div>
                        );

                      default:
                        return null;
                    }
                  }
                )
              ) : (
                <div className={styles.detailSection}>
                  <h3 className={styles.sectionHeading}>Specifications</h3>
                  <p className={styles.detailBodyText}>
                    Detailed platform dossiers and specifications available on
                    request.
                  </p>
                </div>
              )}

              {/* Request Information Action */}
              <div className={styles.actionRow}>
                <Link
                  href={inquiryUrl}
                  className={styles.inquireButton}
                  onClick={onClose}
                >
                  <span>Request Information</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
