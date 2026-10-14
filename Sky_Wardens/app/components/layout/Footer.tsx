import Link from "next/link";
import Image from "next/image";
import { pageLinks, focusLinks, socialLinks } from "@/app/config/navigation";
import AnimatedButton from "@/app/components/ui/AnimatedButton";
import SocialIcon from "@/app/components/ui/SocialIcon";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.inner}>
        {/* Top Section: Brand + NAVIGATION, FOCUS, SOCIAL columns */}
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo} aria-label="Sky Wardens Home">
              <Image
                src="/images/New Logo s/Icon.png"
                alt="Sky Wardens Icon"
                width={48}
                height={45}
                className={styles.logoIcon}
              />
              <Image
                src="/images/New Logo s/Text.png"
                alt="Sky Wardens"
                width={188}
                height={19}
                className={styles.logoText}
              />
            </Link>

            <p className={styles.brandDescription}>
              Building strategic industrial capability across aerospace and defence
              {/* , advanced systems, and petrochemical */} sectors — engineered for the
              missions that matter.
            </p>

            <div className={styles.brandCta}>
              <AnimatedButton href="/contact" size="sm">
                GET A QUOTE
              </AnimatedButton>
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>NAVIGATION</h2>
            <ul className={styles.linkList}>
              {pageLinks.map((item) =>
                item.external ? (
                  <li key={item.label} className={styles.linkItem}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.navLink}
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label} className={styles.linkItem}>
                    <Link href={item.href} className={styles.navLink}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Focus Column */}
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>FOCUS</h2>
            <ul className={styles.linkList}>
              {focusLinks.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className={`${styles.column} ${styles.socialCol}`}>
            <h2 className={styles.columnHeading}>SOCIAL</h2>
            <ul className={styles.socialList}>
              {socialLinks.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={item.label}
                  >
                    {item.icon ? (
                      <SocialIcon name={item.icon} className={styles.socialIcon} />
                    ) : null}
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Info Row: Address on Left, Legal & Copyright on Right */}
        <div className={styles.middleRow}>
          <div className={styles.locationBlock}>
            <div className={styles.locationIconWrapper} aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <p className={styles.addressText}>
              Address -<br />
              Add your registered office address here
            </p>
          </div>

          <div className={styles.metaBlock}>
            <div className={styles.legalLinks}>
              <Link href="#style-guide" className={styles.metaLink}>
                Style guide
              </Link>
              <span className={styles.metaDivider} aria-hidden="true">
                /
              </span>
              <Link href="#licenses" className={styles.metaLink}>
                Licenses
              </Link>
            </div>

            <p className={styles.creditsLine}>
              &copy; {new Date().getFullYear()} Sky Wardens Private Limited. All
              rights reserved.
            </p>
          </div>
        </div>

        {/* Single Divider Line */}
        <hr className={styles.divider} aria-hidden="true" />

        {/* Bottom Section: Giant SKY WARDENS typography */}
        <div className={styles.bottom}>
          <div className={styles.studioDisplay}>
            <span className={styles.studioText}>SKY WARDENS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

