import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero} aria-label="Contact Information">
      <div className={styles.inner}>
        <div className={styles.mainGrid}>
          {/* Left Column: Heading, Follow us bar, and Corporate Office Details */}
          <div className={styles.leftCol}>
            <div className={styles.topBlock}>
              <AnimatedTitle className={styles.title}>
                GET IN TOUCH
              </AnimatedTitle>

              <div className={styles.socialBar}>
                <span className={styles.followLabel}>Follow us :</span>
                <div className={styles.socialLinks}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Instagram
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Linkedin
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Facebook
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    X
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate Office Card */}
            <div className={styles.corporateCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headingGroup}>
                  <h3 className={styles.corporateHeading}>Corporate Office</h3>
                  <span className={styles.regionBadge}>UP, INDIA</span>
                </div>
              </div>

              {/* Address Item */}
              <div className={styles.addressBlock}>
                <div className={styles.iconBadge} aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.addressContent}>
                  <span className={styles.itemLabel}>Location</span>
                  <p className={styles.addressText}>
                    Ground Floor, Industrial Unit No. D-11/1, Site-V, UPSIDA Industrial Area, District Greater Noida, G.B. Nagar,
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className={styles.divider} aria-hidden="true" />

              {/* Details 2x2 Grid */}
              <div className={styles.gridDetails}>
                {/* Email Item */}
                <div className={styles.detailItem}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.itemLabel}>Email</span>
                    <a
                      href="mailto:info@skywardens.com"
                      className={styles.detailLink}
                    >
                      info@skywardens.com
                    </a>
                    <a
                      href="mailto:sales@skywardens.com"
                      className={styles.detailLink}
                    >
                      sales@skywardens.com
                    </a>
                  </div>
                </div>

                {/* Phone Number Item */}
                <div className={styles.detailItem}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.itemLabel}>Phone Number</span>
                    <a href="tel:+918700776284" className={styles.detailLink}>
                      +91 8700776284
                    </a>
                  </div>
                </div>

                {/* Working Hours Item */}
                <div className={styles.detailItemFull}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className={styles.detailContent}>
                    <span className={styles.itemLabel}>Working Hours</span>
                    <div className={styles.hoursRow}>
                      <span className={styles.detailText}>
                        Monday to Saturday:
                      </span>
                      <span className={styles.detailTextHighlight}>
                        10 a.m. to 6 p.m.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className={styles.actionRow}>
                <a href="#contact-form" className={styles.pillButton}>
                  CONTACT US
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Interactive Location Map */}
          <div className={styles.rightCol}>
            <p className={styles.narrativeText}>
              Please feel free to contact us, and we will be in touch shortly.
              Together, we can determine if there is a mutual fit and explore
              potential opportunities for collaboration.
            </p>

            <div className={styles.mapCard}>
              <iframe
                title="Sky Wardens Corporate Office Location"
                src="https://maps.google.com/maps?q=UPSIDA+Industrial+Area+Site-V+Greater+Noida+Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
