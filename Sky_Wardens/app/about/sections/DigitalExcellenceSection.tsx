"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./DigitalExcellenceSection.module.css";

interface DetailContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
}

interface CapabilityItem {
  id: string;
  title: string;
  pill: string;
  image: string;
  details: DetailContent;
}

const capabilities: CapabilityItem[] = [
  {
    id: "precision-protect-progress",
    title: "PRECISION, PROTECT & PROGRESS",
    pill: "Precision, Protect & Progress",
    image: "/images/business-aerospace.jpg",
    details: {
      eyebrow: "ABOUT SKY WARDENS GROUP",
      heading: "Precision, Protect & Progress",
      paragraphs: [
        "As a dynamic and forward-looking company, Sky Wardens Private Limited is redefining the standards of the defence and industrial sectors. With innovation and quality at the core of our operations, we specialise in the manufacturing and supply of advanced military, tactical, and industrial solutions designed to meet the highest standards of performance, reliability, and operational excellence.",
        "Driven by a vision to address the evolving needs of defence and civil organisations, we have expanded our capabilities into aerospace systems and advanced electronic solutions. Our Aerospace division focuses on drone development and space-oriented technologies.", // while our Advanced Systems division delivers cutting-edge electronic equipment for both defence and civilian applications, including communication systems and electronic warfare support.
        "Further strengthening our capabilities, our growing range of products, together with the expertise and offerings of our affiliates, has significantly expanded our portfolio. This enables us to provide a broader, more advanced, and highly diversified range of solutions tailored to the complex requirements of modern industries and strategic sectors.",
        "The company remains committed to excellence at every stage, delivering more than just products by providing dependable solutions that protect, empower, and drive progress for every client. Each offering is developed under stringent quality control standards, ensuring superior performance, durability, and operational readiness.",
      ],
    },
  },
  {
    id: "indigenous-defence-solutions",
    title: "INDIGENOUS DEFENCE SOLUTIONS",
    pill: "An Indigenous Defence Solutions Partner",
    image: "/images/business-tactical.jpg",
    details: {
      eyebrow: "ABOUT SKY WARDENS GROUP",
      heading: "An Indigenous Defence Solutions Partner",
      paragraphs: [
        "Sky Wardens Private Limited is an indigenous defence and industrial solutions company focused on innovation, precision, and manufacturing excellence. As part of the Sky Wardens Group, we are committed to supporting the evolving requirements of defence forces and allied sectors through reliable, future-ready solutions.",
        "Our core manufacturing line includes drones, tactical defence products, electronic warfare support systems, and communication systems. We are continuously expanding our portfolio to offer more advanced, diversified, and strategically relevant solutions across defence, aerospace, and industrial domains in which every product is developed under stringent quality control standards to ensure consistent performance, durability, and operational readiness.", // , and high-end petrochem lubricant oils.
      ],
    },
  },
  {
    id: "innovation-certifications",
    title: "INNOVATION, CERTIFICATIONS",
    pill: "Built on innovation, certifications, and strategic partnerships",
    image: "/images/business-systems.jpg",
    details: {
      eyebrow: "ABOUT SKY WARDENS GROUP",
      heading: "Built on innovation, certifications, and strategic partnerships",
      paragraphs: [
        "Our commitment to innovation and impact has enabled us to develop over 10+ proprietary product blueprints and file multiple patents across key areas of defence and advanced technology. Furthermore, we have several more patents underway, including 3 patents in ballistics, 1 patent in chemical technologies, and 2 patents in advanced electronics, with additional innovations in progress. Our pioneering achievements also include the launch of India's first drone-dropped fire suppression unit, which is currently in the pilot stage and many more still under testing and review.",
        "Our strategic partnerships with leading government agencies, DRDO, CSIR (Council of Scientific and Industrial Research), and private-sector leaders continue to strengthen our growth and technological advancement in defence and tactical domains. Sky Wardens is also coordinating with Tri-Service Headquarters, including the Army, Navy, and Air Force. Backed by ISO-certified facilities, we are proud to be officially registered vendors with DRDO, the Indian Army (Procurement Trials), and multiple State Police Forces, reinforcing our position as a trusted partner in national security, innovation, and indigenous capability development.",
      ],
    },
  },
];

export default function DigitalExcellenceSection() {
  const [activeHoverId, setActiveHoverId] = useState<string>("precision-protect-progress");
  const [expandedId, setExpandedId] = useState<string | null>("precision-protect-progress");
  const detailPanelRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setActiveHoverId(id);
      setTimeout(() => {
        detailPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  };

  const activeExpandedItem = capabilities.find((c) => c.id === expandedId);

  return (
    <section
      className={styles.section}
      aria-label="About Sky Wardens Group Capabilities"
    >
      <div className={styles.inner}>
        {/* Eyebrow */}
        <div className={styles.eyebrow}>
          <span className={styles.eyebrowLine}>ABOUT SKY WARDENS GROUP</span>
        </div>

        {/* Stack of large typography with focus-depth pill badge */}
        <div className={styles.list} role="list">
          {capabilities.map((item) => {
            const isHovered = activeHoverId === item.id;
            const isExpanded = expandedId === item.id;
            const isSelected = isExpanded || (expandedId === null && isHovered);

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                className={`${styles.itemWrapper} ${
                  isExpanded ? styles.itemExpanded : ""
                }`}
                onMouseEnter={() => setActiveHoverId(item.id)}
                onClick={() => handleItemClick(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleItemClick(item.id);
                  }
                }}
              >
                <h2
                  className={`${styles.title} ${
                    isSelected ? styles.titleBlurred : ""
                  }`}
                >
                  {item.title}
                </h2>

                <div
                  className={`${styles.pillBadge} ${
                    isSelected ? "" : styles.pillBadgeHidden
                  }`}
                  aria-hidden={!isSelected}
                >
                  {item.pill}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expandable Detail Panel (Left: Image, Right: Heading + Content) */}
        {activeExpandedItem && (
          <div
            ref={detailPanelRef}
            className={styles.detailPanel}
            aria-live="polite"
          >
            <div className={styles.detailGrid}>
              {/* Left Column: Capability Image */}
              <div className={styles.detailLeftCol}>
                <div className={styles.imageCard}>
                  <Image
                    src={activeExpandedItem.image}
                    alt={activeExpandedItem.details.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className={styles.detailImage}
                  />
                  <div className={styles.imageOverlay} />
                </div>
              </div>

              {/* Right Column: Heading on top + Paragraphs underneath */}
              <div className={styles.detailRightCol}>
                <div className={styles.headingBlock}>
                  <span className={styles.detailEyebrow}>
                    {activeExpandedItem.details.eyebrow}
                  </span>
                  <h3 className={styles.detailHeading}>
                    {activeExpandedItem.details.heading}
                  </h3>
                </div>

                <div className={styles.paragraphsBlock}>
                  {activeExpandedItem.details.paragraphs.map((pText, pIdx) => (
                    <p key={pIdx} className={styles.detailParagraph}>
                      {pText}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
