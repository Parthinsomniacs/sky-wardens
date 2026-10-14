import TextLoop from "../../components/ui/TextLoop";
import styles from "./TextLoopSection.module.css";

export default function TextLoopSection() {
  return (
    <section className={styles.section} aria-label="Sky Wardens highlights">
      <TextLoop
        className={styles.loop}
        text="Spotlight: Sky Wardens Making Headlines"
        shape="line"
        viewHeight={60}
        speed={50}
        direction="forward"
        separator="✦"
        curviness={0}
        fontSize={22}
        fontWeight={600}
        letterSpacing={2}
        uppercase
        color="#ffffff"
        ribbon
        ribbonColor="var(--color-accent)"
        ribbonWidth={50}
        pauseOnHover
      />
    </section>
  );
}
