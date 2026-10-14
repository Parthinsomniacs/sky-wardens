"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  aerospaceCategories,
  AerospaceCategory,
  ProductCardItem,
} from "../data";
import ProductDetailModal from "../../components/ProductDetailModal";
import styles from "./AerospaceCatalogSection.module.css";

export default function AerospaceCatalogSection() {
  const [categoriesList, setCategoriesList] =
    useState<AerospaceCategory[]>(aerospaceCategories);
  const [activeId, setActiveId] = useState<string>(aerospaceCategories[0].id);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveProducts = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiUrl}/products?division=Aerospace`);
        if (!res.ok) return;
        const data = await res.json();
        if (
          isMounted &&
          data.success &&
          Array.isArray(data.products) &&
          data.products.length > 0
        ) {
          const categoryMap = new Map<string, AerospaceCategory>();

          // Pre-populate with predefined structure for order & taglines
          aerospaceCategories.forEach((cat) => {
            categoryMap.set(cat.id, {
              ...cat,
              products: [],
            });
          });

          data.products.forEach((p: any) => {
            const catId = p.categoryId || "surveillance-systems";
            if (!categoryMap.has(catId)) {
              categoryMap.set(catId, {
                id: catId,
                number: String(categoryMap.size + 1).padStart(2, "0"),
                name: p.categoryTitle || p.categoryName || catId,
                tagline: `${p.categoryTitle || p.categoryName} tactical aerospace systems.`,
                products: [],
              });
            }
            categoryMap.get(catId)!.products.push({
              id: p.id,
              name: p.name,
              description: p.description,
              imageSrc: p.imageSrc,
              imageAlt: p.imageAlt || p.name,
              details: p.details || [],
            });
          });

          const populated = Array.from(categoryMap.values()).filter(
            (c) => c.products.length > 0
          );
          if (populated.length > 0) {
            setCategoriesList(populated);
          }
        }
      } catch (err) {
        // Fallback to static data
      }
    };

    fetchLiveProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryClick = (
    id: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setActiveId(id);
    if (e?.currentTarget) {
      e.currentTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  const activeCategory =
    categoriesList.find((cat) => cat.id === activeId) || categoriesList[0];

  const totalProducts = activeCategory.products.length;
  const currentIndex = selectedProduct
    ? activeCategory.products.findIndex((p) => p.id === selectedProduct.id)
    : -1;
  const hasMoreThanOne = totalProducts > 1;

  const handlePrev = () => {
    if (totalProducts <= 1) return;
    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    setSelectedProduct(activeCategory.products[prevIndex]);
  };

  const handleNext = () => {
    if (totalProducts <= 1) return;
    const nextIndex = (currentIndex + 1) % totalProducts;
    setSelectedProduct(activeCategory.products[nextIndex]);
  };

  return (
    <section className={styles.section} aria-label="Aerospace Products Catalog">
      <div className={styles.inner}>
        {/* ========================================
            LEFT STICKY SIDEBAR
            ======================================== */}
        <aside className={styles.sidebarWrapper}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarEyebrow}>Product Index</span>
              <h3 className={styles.sidebarTitle}>Aerospace Systems</h3>
            </div>

            <nav aria-label="Aerospace Platforms Navigation">
              <ul className={styles.navList}>
                {categoriesList.map((cat: AerospaceCategory) => {
                  const isActive = activeId === cat.id;

                  return (
                    <li key={cat.id} className={styles.navItem}>
                      <button
                        type="button"
                        className={`${styles.navButton} ${
                          isActive ? styles.navButtonActive : ""
                        }`}
                        onClick={(e) => handleCategoryClick(cat.id, e)}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <span className={styles.navNumber}>{cat.number}.</span>
                        <span className={styles.navName}>{cat.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* ========================================
            RIGHT PRODUCT CATEGORY SECTION (ACTIVE ONLY)
            ======================================== */}
        <div className={styles.contentArea}>
          <article
            key={activeCategory.id}
            id={activeCategory.id}
            className={styles.categorySection}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryEyebrow}>
                {activeCategory.number} / AEROSPACE DIVISION
              </span>
              <h2 className={styles.categoryTitle}>{activeCategory.name}</h2>
              {activeCategory.tagline && (
                <p className={styles.categoryTagline}>
                  {activeCategory.tagline}
                </p>
              )}
            </div>

            {/* Product Cards Grid */}
            {activeCategory.products && activeCategory.products.length > 0 ? (
              <div className={styles.productsGrid}>
                {activeCategory.products.map((product: ProductCardItem) => (
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.productImageWell}>
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1500px) 50vw, 33vw"
                        className={styles.productImage}
                      />
                    </div>

                    <div className={styles.productBody}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                      <button
                        type="button"
                        className={styles.viewDetailsButton}
                        onClick={() => setSelectedProduct(product)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Fallback / empty state for unpopulated categories */
              <div className={styles.emptyStateCard}>
                <h3 className={styles.emptyStateTitle}>
                  Platform Dossiers Under Classification
                </h3>
                <p className={styles.emptyStateDesc}>
                  Specifications and technical documentation for this division are available upon strategic institutional inquiry.
                </p>
                <Link href="/contact" className={styles.viewDetailsButton}>
                  Inquire With Aerospace Division
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>

      {/* ========================================
          PRODUCT DETAILS MODAL
          ======================================== */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          categoryName={activeCategory.name}
          onClose={() => setSelectedProduct(null)}
          onPrev={hasMoreThanOne ? handlePrev : undefined}
          onNext={hasMoreThanOne ? handleNext : undefined}
          hasPrev={hasMoreThanOne}
          hasNext={hasMoreThanOne}
        />
      )}
    </section>
  );
}
