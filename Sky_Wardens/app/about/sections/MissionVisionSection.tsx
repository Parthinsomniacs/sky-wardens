import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./MissionVisionSection.module.css";
import OurValuesHub from "./OurValuesHub";

export default function MissionVisionSection() {
  return (
    <section
      id="mission-vision"
      className={styles.section}
      aria-label="Mission and Vision"
    >
      <div className={styles.inner}>
        {/* Centered Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            OUR MISSION &amp; VISION
          </span>
          <AnimatedTitle className={styles.heading}>
            MISSION &amp; VISION
          </AnimatedTitle>
        </div>

        {/* Full Width Content (No Box) */}
        <div className={styles.contentWrap}>
          <h3 className={styles.title}>
            Protection Engineered for the Frontlines
          </h3>

          <div className={styles.textBody}>
            <p className={styles.leadText}>
              We aim to provide innovative, reliable, and high-performance
              defence and industrial solutions that enhance the operational
              capabilities of armed forces, civil authorities and strategic
              industries - with a focus on quality, technology and customer
              satisfaction.
            </p>
            <p className={styles.bodyText}>
              As a global competitor in defence and aerospace innovation, we are
              driving self-reliance and technological advancement by offering
              cutting-edge products and solutions that safeguard nations and
              empower industries.
            </p>
          </div>
        </div>

        {/* Values Interactive Display (Reference Animation & Design) */}
        <OurValuesHub />
      </div>
    </section>
  );
}
