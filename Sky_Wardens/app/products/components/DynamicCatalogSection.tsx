"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCardItem } from "../defence/data";
import ProductDetailModal from "./ProductDetailModal";
import styles from "../defence/sections/DefenceCatalogSection.module.css";

interface CategoryItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  products: ProductCardItem[];
}

export default function DynamicCatalogSection({
  divisionName,
  divisionSlug,
}: {
  divisionName: string;
  divisionSlug: string;
}) {
  const [categoriesList, setCategoriesList] = useState<CategoryItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [selectedProduct, setSelectedProduct] =
    useState<ProductCardItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLiveCatalog = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

        const [catRes, prodRes] = await Promise.all([
          fetch(`${apiUrl}/categories?division=${encodeURIComponent(divisionName)}`).catch(() => null),
          fetch(`${apiUrl}/products?division=${encodeURIComponent(divisionName)}`).catch(() => null),
        ]);

        const catData = catRes && catRes.ok ? await catRes.json() : null;
        const prodData = prodRes && prodRes.ok ? await prodRes.json() : null;

        if (!isMounted) return;

        let dynamicCategories: CategoryItem[] = [];

        // 1. Process Categories from Admin DB
        if (
          catData &&
          catData.success &&
          Array.isArray(catData.categories) &&
          catData.categories.length > 0
        ) {
          const activeCats = catData.categories.filter(
            (c: any) => c.status !== "Inactive"
          );
          activeCats.sort((a: any, b: any) => {
            const orderA = a.order ?? parseInt(a.number, 10) ?? 999;
            const orderB = b.order ?? parseInt(b.number, 10) ?? 999;
            return orderA - orderB;
          });

          dynamicCategories = activeCats.map((c: any, idx: number) => ({
            id: c.id || c.slug || String(c._id),
            number: c.number || String(idx + 1).padStart(2, "0"),
            name: c.name,
            tagline: c.tagline || `${c.name} ${divisionName} equipment.`,
            products: [],
          }));
        }

        // 2. Populate live active products from DB into their respective category
        if (prodData && prodData.success && Array.isArray(prodData.products)) {
          prodData.products.forEach((p: any) => {
            if (p.status === "Inactive") return;

            const rawCatId = (p.categoryId || "").toLowerCase().trim();
            const normalizedCatId = rawCatId.replace(/^[0-9]+-/, "");
            const cleanTitle = (p.categoryTitle || p.categoryName || "")
              .replace(/^[0-9]+\.\s*/, "")
              .trim()
              .toLowerCase();

            // Find matching category
            let matchedCat = dynamicCategories.find(
              (c) =>
                c.id.toLowerCase() === rawCatId ||
                c.id.toLowerCase() === normalizedCatId ||
                c.name.toLowerCase() === cleanTitle
            );

            // If not found, dynamically append category
            if (!matchedCat) {
              const newCat: CategoryItem = {
                id: normalizedCatId || `cat-${dynamicCategories.length + 1}`,
                number: String(dynamicCategories.length + 1).padStart(2, "0"),
                name: p.categoryTitle || p.categoryName || "General Equipment",
                tagline: `${p.categoryTitle || p.categoryName || divisionName} systems.`,
                products: [],
              };
              dynamicCategories.push(newCat);
              matchedCat = newCat;
            }

            matchedCat.products.push({
              id: p.id || p._id,
              name: p.name,
              description: p.description,
              imageSrc:
                p.imageSrc ||
                "/images/business-systems.jpg",
              imageAlt: p.imageAlt || p.name,
              details: p.details || [],
            });
          });
        }

        // 3. Filter categories with products, or show all valid categories if none have products yet
        const populatedCategories = dynamicCategories
          .filter((cat) => cat.products && cat.products.length > 0)
          .map((cat, idx) => ({
            ...cat,
            number: String(idx + 1).padStart(2, "0"),
          }));

        if (populatedCategories.length > 0) {
          setCategoriesList(populatedCategories);
          setActiveId((prev) => {
            if (populatedCategories.some((c) => c.id === prev)) return prev;
            return populatedCategories[0]?.id || "";
          });
        } else {
          const fallbackCats = dynamicCategories.map((cat, idx) => ({
            ...cat,
            number: String(idx + 1).padStart(2, "0"),
          }));
          setCategoriesList(fallbackCats);
          setActiveId((prev) => {
            if (fallbackCats.some((c) => c.id === prev)) return prev;
            return fallbackCats[0]?.id || "";
          });
        }
      } catch (err) {
        console.error(`Error fetching live ${divisionName} catalog:`, err);
      }
    };

    fetchLiveCatalog();
    return () => {
      isMounted = false;
    };
  }, [divisionName]);

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

  const totalProducts = activeCategory?.products?.length || 0;
  const currentIndex =
    selectedProduct && activeCategory?.products
      ? activeCategory.products.findIndex((p) => p.id === selectedProduct.id)
      : -1;
  const hasMoreThanOne = totalProducts > 1;

  const handlePrev = () => {
    if (totalProducts <= 1 || !activeCategory) return;
    const prevIndex = (currentIndex - 1 + totalProducts) % totalProducts;
    setSelectedProduct(activeCategory.products[prevIndex]);
  };

  const handleNext = () => {
    if (totalProducts <= 1 || !activeCategory) return;
    const nextIndex = (currentIndex + 1) % totalProducts;
    setSelectedProduct(activeCategory.products[nextIndex]);
  };

  return (
    <section className={styles.section} aria-label={`${divisionName} Products Catalog`}>
      <div className={styles.inner}>
        {/* LEFT STICKY SIDEBAR */}
        <aside className={styles.sidebarWrapper}>
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarEyebrow}>Product Index</span>
              <h3 className={styles.sidebarTitle}>{divisionName} Systems</h3>
            </div>

            <nav aria-label={`${divisionName} Categories Navigation`}>
              {categoriesList.length > 0 ? (
                <ul className={styles.navList}>
                  {categoriesList.map((cat: CategoryItem) => {
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
              ) : (
                <div className="p-4 text-center">
                  <p className="text-xs text-gray-400">
                    No products currently available
                  </p>
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* RIGHT PRODUCT CATEGORY SECTION */}
        <div className={styles.contentArea}>
          {activeCategory ? (
            <article
              key={activeCategory.id}
              id={activeCategory.id}
              className={styles.categorySection}
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryEyebrow}>
                  {activeCategory.number} / {divisionName.toUpperCase()} DIVISION
                </span>
                <h2 className={styles.categoryTitle}>{activeCategory.name}</h2>
                {activeCategory.tagline && (
                  <p className={styles.categoryTagline}>{activeCategory.tagline}</p>
                )}
              </div>

              {/* Products Grid */}
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
                          unoptimized={Boolean(product.imageSrc?.startsWith("data:"))}
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
                <div className={styles.emptyStateCard}>
                  <h3 className={styles.emptyStateTitle}>
                    No products currently available
                  </h3>
                  <p className={styles.emptyStateDesc}>
                    Platform specifications and technical documentation will be published shortly, or you may inquire directly.
                  </p>
                  <Link href="/contact" className={styles.viewDetailsButton}>
                    Inquire With {divisionName} Division
                  </Link>
                </div>
              )}
            </article>
          ) : (
            <div className={styles.emptyStateCard}>
              <h3 className={styles.emptyStateTitle}>
                No products currently available
              </h3>
              <p className={styles.emptyStateDesc}>
                Platform specifications and technical documentation will be published shortly, or you may inquire directly.
              </p>
              <Link href="/contact" className={styles.viewDetailsButton}>
                Inquire With {divisionName} Division
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && activeCategory && (
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
