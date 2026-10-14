import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { newsArticles } from "../data";
import styles from "./ArticleDetail.module.css";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | Sky Wardens",
    };
  }

  return {
    title: `${article.headline} | Sky Wardens News`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Related articles (excluding current)
  const relatedArticles = newsArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <article className={styles.articlePage}>
      <div className={styles.container}>
        {/* Navigation Breadcrumb */}
        <nav className={styles.navRow} aria-label="Breadcrumb">
          <Link href="/news" className={styles.backLink}>
            <svg
              className={styles.backArrow}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 13L5 8L10 3"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to All News</span>
          </Link>
          <span className={styles.slash} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCategory}>{article.category}</span>
        </nav>

        {/* Article Header */}
        <header className={styles.header}>
          <div className={styles.badgeWrapper}>
            <span className={styles.categoryBadge}>{article.category}</span>
            <span className={styles.readTimeBadge}>{article.readTime}</span>
          </div>

          <h1 className={styles.headline}>{article.headline}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Published</span>
              <span className={styles.metaValue}>{article.date}</span>
            </div>
            <div className={styles.metaDivider} aria-hidden="true" />
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Authority / Directorate</span>
              <span className={styles.metaValue}>{article.author}</span>
            </div>
          </div>
        </header>

        {/* Hero Featured Media */}
        <div className={styles.mediaContainer}>
          <div className={styles.imageWrap}>
            <Image
              src={article.imageSrc}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay} />
          </div>
          <figcaption className={styles.caption}>
            {article.imageAlt}
          </figcaption>
        </div>

        {/* Article Body Content */}
        <div className={styles.contentLayout}>
          <div className={styles.mainColumn}>
            {/* Executive Lead Summary */}
            <div className={styles.executiveLead}>
              <p>{article.summary}</p>
            </div>

            {/* Key Highlights Box */}
            {article.keyHighlights && article.keyHighlights.length > 0 && (
              <aside className={styles.highlightsBox} aria-label="Key Operational Highlights">
                <div className={styles.highlightsHeader}>
                  <span className={styles.highlightsIcon} aria-hidden="true">◈</span>
                  <h2 className={styles.highlightsTitle}>Key Strategic Highlights</h2>
                </div>
                <ul className={styles.highlightsList}>
                  {article.keyHighlights.map((highlight, index) => (
                    <li key={index} className={styles.highlightItem}>
                      <span className={styles.bulletCheck} aria-hidden="true">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Narrative Sections */}
            <div className={styles.bodySections}>
              {article.sections.map((section, sIdx) => (
                <section key={sIdx} className={styles.narrativeSection}>
                  <h2 className={styles.sectionHeading}>{section.heading}</h2>

                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className={styles.paragraph}>
                      {para}
                    </p>
                  ))}

                  {/* Optional Quote */}
                  {section.quote && (
                    <blockquote className={styles.quoteBlock}>
                      <p className={styles.quoteText}>&ldquo;{section.quote}&rdquo;</p>
                      <cite className={styles.quoteAuthor}>— {article.author}</cite>
                    </blockquote>
                  )}

                  {/* Optional Bullet Points */}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className={styles.specsList}>
                      {section.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className={styles.specItem}>
                          <span className={styles.specDot} aria-hidden="true" />
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Back Button CTA */}
            <div className={styles.bottomActions}>
              <Link href="/news" className={styles.backButton}>
                ← Back to News &amp; Insights
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles Section (3-column cards) */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection} aria-label="Related Dispatches">
            <div className={styles.relatedHeader}>
              <span className={styles.relatedEyebrow}>CONTINUE READING</span>
              <h2 className={styles.relatedTitle}>Related Strategic Reports</h2>
            </div>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((rel) => (
                <article key={rel.id} className={styles.relatedCard}>
                  <Link href={`/news/${rel.slug}`} className={styles.relatedCardLink}>
                    <div className={styles.relatedImageWrap}>
                      <Image
                        src={rel.imageSrc}
                        alt={rel.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={styles.relatedImage}
                      />
                      <span className={styles.relatedBadge}>{rel.category}</span>
                    </div>
                    <div className={styles.relatedContent}>
                      <span className={styles.relatedDate}>{rel.date}</span>
                      <h3 className={styles.relatedHeadline}>{rel.headline}</h3>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
