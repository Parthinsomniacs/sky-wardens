"use client";

import { useState } from "react";
import Link from "next/link";
import { careerPositions, CareerPosition } from "../data";
import JobApplicationModal from "../components/JobApplicationModal";
import styles from "./CareersPositionsSection.module.css";

export default function CareersPositionsSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] =
    useState<CareerPosition | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.section} aria-label="Open Positions & Career Opportunities">
      <div className={styles.inner}>
        {/* Header Block matching User Reference */}
        <div className={styles.headerBlock}>
          <span className={styles.eyebrow}>Opportunities &amp; Growth</span>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleLine}>ADVANCING DEFENCE</span>
            <span className={styles.titleLine}>&amp; YOUR CAREER</span>
          </h2>
          <p className={styles.sectionDescription}>
            Anuvyom is designed as a long term industrial platform focused on
            aerospace, defence, advanced systems, and petrochemical sectors. We
            are interested in working with individuals who value technical
            excellence, long term thinking, and meaningful industrial impact.
          </p>
        </div>

        {/* Positions List */}
        <div className={styles.positionsList}>
          {careerPositions.map((pos: CareerPosition) => {
            const isExpanded = expandedId === pos.id;

            return (
              <article key={pos.id} className={styles.positionCard}>
                <div className={styles.cardTop}>
                  <div className={styles.metaBadges}>
                    <span className={styles.departmentBadge}>
                      {pos.department}
                    </span>
                    <span className={styles.infoBadge}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {pos.location}
                    </span>
                    <span className={styles.infoBadge}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      {pos.type}
                    </span>
                    <span className={styles.infoBadge}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {pos.experience}
                    </span>
                  </div>

                  <h3 className={styles.positionTitle}>{pos.title}</h3>
                </div>

                <p className={styles.positionDescription}>{pos.description}</p>

                {/* Key Tags / Skills */}
                <div className={styles.tagsWrap}>
                  {pos.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Details Drawer */}
                {isExpanded && (
                  <div className={styles.detailsDrawer}>
                    <div className={styles.drawerSection}>
                      <h4 className={styles.drawerHeading}>
                        Core Responsibilities
                      </h4>
                      <ul className={styles.bulletList}>
                        {pos.responsibilities.map((resp, i) => (
                          <li key={i} className={styles.bulletItem}>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.drawerSection}>
                      <h4 className={styles.drawerHeading}>
                        Qualifications &amp; Experience
                      </h4>
                      <ul className={styles.bulletList}>
                        {pos.requirements.map((req, i) => (
                          <li key={i} className={styles.bulletItem}>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Actions Footer */}
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={styles.toggleDetailsButton}
                    onClick={() => toggleExpand(pos.id)}
                    aria-expanded={isExpanded}
                  >
                    <span>
                      {isExpanded ? "Hide Responsibilities" : "View Responsibilities & Scope"}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`${styles.toggleIcon} ${
                        isExpanded ? styles.toggleIconExpanded : ""
                      }`}
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className={styles.applyButton}
                    onClick={() => setSelectedPosition(pos)}
                  >
                    <span>Apply for Role</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
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
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Talent Network Inquiry Box */}
        <div className={styles.talentCtaBox}>
          <div className={styles.talentCtaText}>
            <h3 className={styles.talentCtaTitle}>
              Speculative Applications &amp; Research Fellowships
            </h3>
            <p className={styles.talentCtaDesc}>
              Don&apos;t see an exact match for your specific engineering or defense discipline?
              We are constantly seeking exceptional researchers, aerodynamicists, and systems architects.
            </p>
          </div>

          <button
            type="button"
            className={styles.generalApplyButton}
            onClick={() =>
              setSelectedPosition({
                id: "speculative-fellowship",
                title: "Speculative Defense Fellowship & Research",
                department: "All Engineering Disciplines",
                location: "India (On-site / Hybrid)",
                type: "Full-Time / Fellowship",
                experience: "All Experience Levels",
                description:
                  "Speculative dossier submission for researchers and engineers across aerospace, telemetry, advanced metallurgy, and tactical autonomy.",
                responsibilities: [],
                requirements: [],
                tags: ["Research", "Aerodynamics", "Avionics", "Advanced Materials"],
              })
            }
          >
            <span>Submit Credentials</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 10"
              fill="none"
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
          </button>
        </div>
      </div>

      {/* Interactive Next Process & Application Dossier Modal */}
      <JobApplicationModal
        position={selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />
    </section>
  );
}
