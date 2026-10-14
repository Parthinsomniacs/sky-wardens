import type { ReactNode } from "react";
import AnimatedTitle from "./AnimatedTitle";
import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

/**
 * Shared section wrapper: consistent vertical rhythm, max-width and
 * optional heading. Reused by every page's sections.
 */
export default function Section({ id, title, eyebrow, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className={styles.inner}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        {title ? (
          <AnimatedTitle id={headingId} className={styles.title}>
            {title}
          </AnimatedTitle>
        ) : null}
        {children}
      </div>
    </section>
  );
}
