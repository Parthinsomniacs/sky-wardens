import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./AnimatedButton.module.css";

type BaseProps = {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: never;
};

type AnimatedButtonProps = LinkProps | ButtonProps;

/**
 * Reusable button with a layered hover reveal (Uiverse-style).
 * Renders as a Next.js Link, an external anchor, or a native button
 * depending on the props passed. Animation is pure CSS.
 */
export default function AnimatedButton(props: AnimatedButtonProps) {
  const { children, className, size = "md" } = props;
  const sizeClass = size === "sm" ? styles.sizeSm : styles.sizeMd;
  const classes = [styles.button, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.bg} aria-hidden="true">
        <span className={styles.bgLayers}>
          <span className={`${styles.bgLayer} ${styles.layer1}`} />
          <span className={`${styles.bgLayer} ${styles.layer2}`} />
          <span className={`${styles.bgLayer} ${styles.layer3}`} />
        </span>
      </span>

      <span className={styles.inner}>
        <span className={styles.innerStatic}>{children}</span>
        <span className={styles.innerHover} aria-hidden="true">
          {children}
        </span>
      </span>
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={(props as ButtonProps).type ?? "button"} className={classes}>
      {inner}
    </button>
  );
}
