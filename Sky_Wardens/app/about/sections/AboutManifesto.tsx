import Image from "next/image";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./AboutManifesto.module.css";

export default function AboutManifesto() {
  return (
    <section className={styles.section} aria-label="About Sky Wardens">
      <div className={styles.inner}>
        {/* Header & Narrative Block with Image on Right */}
        <div className={styles.headerBlock}>
          <div className={styles.leftColumn}>
            <div className={styles.titleArea}>
              <span className={styles.eyebrow}>
                ABOUT US
              </span>
              <AnimatedTitle className={styles.heading}>
                <span className={styles.headingLine}>ABOUT</span>
                <span className={styles.headingLine}>SKY WARDENS</span>
                <span className={styles.headingLine}>GROUP</span>
              </AnimatedTitle>
            </div>

            <div className={styles.narrativeBlock}>
              <span className={styles.identityTag}>IDENTITY</span>
              <h3 className={styles.leadText}>
                A COMPANY BUILT AROUND CAPABILITY AND TRUST
              </h3>
              <p className={styles.bodyText}>
                Sky Wardens combines engineering focus, manufacturing depth, and
                disciplined execution to support high-stakes defence and
                industrial environments.
              </p>
            </div>
          </div>

          <div className={styles.imageBlock}>
            <Image
              src="/images/aboutus%20page%201.jpg"
              alt="Sky Wardens strategic aerospace and defence capabilities"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className={styles.manifestoImage}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </div>
    </section>
  );
}
