import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./GroupSection.module.css";

interface Sector {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc: string;
  logoAlt: string;
  specs: string[];
  href: string;
}

const sectors: Sector[] = [
  {
    id: "aerospace",
    number: "Sector 01",
    title: "AEROSPACE",
    description:
      "Indigenously engineered UAV platforms, high-altitude surveillance airframes, and sovereign avionics systems built for relentless operational endurance.",
    imageSrc: "/images/business-aerospace.jpg",
    imageAlt: "Advanced aerospace defence aircraft platform",
    logoSrc: "/images/aerospace.png",
    logoAlt: "Sky Wardens Aerospace Division",
    specs: [
      "Tactical UAV Platforms",
      "Composite Airframe Engineering",
      "Autonomous Navigation & Telemetry",
    ],
    href: "/capabilities",
  },
  {
    id: "defence",
    number: "Sector 02",
    title: "DEFENCE",
    description:
      "Precision weapon platforms, combat-grade hardware integration, and sovereign ballistic protection apparatus engineered for frontline reliability.",
    imageSrc: "/images/business-systems.jpg",
    imageAlt: "Tactical defence workstation and engineer operations",
    logoSrc: "/images/defence.png",
    logoAlt: "Sky Wardens Defence Division",
    specs: [
      "Sovereign Tactical Hardware",
      "Precision Ordnance Systems",
      "Combat Armor & Electro-Optics",
    ],
    href: "/capabilities",
  },
  /*
  {
    id: "advanced-systems",
    number: "Sector 03",
    title: "ADVANCED SYSTEMS",
    description:
      "C4ISR multi-domain command structures, sovereign electronic counter-measures, encrypted telemetry, and edge-compute situational awareness systems.",
    imageSrc: "/images/business-tactical.jpg",
    imageAlt: "Tactical telemetry and advanced defence interface",
    logoSrc: "/images/advanced-systems.png",
    logoAlt: "Sky Wardens Advanced Systems Division",
    specs: [
      "C4ISR Command Architecture",
      "Tactical Electronic Defense",
      "Secure Edge Computing & Sensors",
    ],
    href: "/capabilities",
  },
  {
    id: "petrochemical",
    number: "Sector 04",
    title: "PETROCHEMICAL",
    description:
      "Resilient industrial catalysts, specialized polymers, and critical processing infrastructures supporting defense readiness and national energy sovereignty.",
    imageSrc: "/images/business-energy.jpg",
    imageAlt: "Industrial petrochemical and energy infrastructure",
    logoSrc: "/images/petrochem.png",
    logoAlt: "Sky Wardens Petrochemical Division",
    specs: [
      "Critical Energy Infrastructure",
      "High-Performance Industrial Polymers",
      "Process Engineering & Catalysis",
    ],
    href: "/capabilities",
  },
  */
];

export default function GroupSection() {
  return (
    <section
      id="group-of-companies"
      className={styles.section}
      aria-label="Group of Companies"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            Strategic Divisions
          </span>
          <AnimatedTitle className={styles.heading}>
            GROUP OF COMPANIES
          </AnimatedTitle>
          <p className={styles.subHeading}>
            {/* Four */} Tightly integrated industrial pillars operating in unison to
            deliver complete sovereign capability from raw material synthesis to
            tactical frontline deployment.
          </p>
        </div>

        <div className={styles.grid}>
          {sectors.map((sector) => (
            <article key={sector.id} className={styles.sectorCard}>
              <div className={styles.imageWrap}>
                <Image
                  src={sector.imageSrc}
                  alt={sector.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
                <span className={styles.sectorNumber}>{sector.number}</span>
                <div className={styles.logoBadge}>
                  <Image
                    src={sector.logoSrc}
                    alt={sector.logoAlt}
                    width={90}
                    height={26}
                    className={styles.logoImage}
                  />
                </div>
              </div>

              <div className={styles.content}>
                <div className={styles.body}>
                  <h3 className={styles.title}>{sector.title}</h3>
                  <p className={styles.description}>{sector.description}</p>

                  <ul className={styles.specsList}>
                    {sector.specs.map((spec, i) => (
                      <li key={i} className={styles.specItem}>
                        <span className={styles.specDot} aria-hidden="true" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actionRow}>
                  <Link href={sector.href} className={styles.actionLink}>
                    <span>Explore Division</span>
                    <svg
                      className={styles.arrowIcon}
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M1 8h12.17l-4.58-4.59L9.5 2 16 8.5 9.5 15l-.91-1.41L13.17 9H1V8z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
