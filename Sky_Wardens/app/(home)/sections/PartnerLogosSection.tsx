import Image from "next/image";
import styles from "./PartnerLogosSection.module.css";

interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

const partnerLogos: PartnerLogo[] = [
  {
    name: "DRDO",
    src: "/images/partners/cropped/DRDO-bright.png",
    width: 140,
    height: 140,
  },
  {
    name: "ISRO",
    src: "/images/partners/cropped/ISRO-bright.png",
    width: 140,
    height: 135,
  },
  {
    name: "Indian Air Force",
    src: "/images/partners/cropped/Indian_Air_Force-bright.png",
    width: 130,
    height: 143,
  },
  {
    name: "Indian Army",
    src: "/images/partners/cropped/Indian_Army-bright.png",
    width: 140,
    height: 124,
  },
  {
    name: "CSIR - NAL",
    src: "/images/partners/cropped/CSIR-NAL-light.png",
    width: 135,
    height: 130,
  },
  {
    name: "Integrated Defence Staff",
    src: "/images/partners/cropped/IDS-bright.png",
    width: 135,
    height: 135,
  },
  {
    name: "CSIR - CSIO",
    src: "/images/partners/cropped/csir-csio-light.png",
    width: 125,
    height: 143,
  },
  {
    name: "Bharat Forge Kalyani",
    src: "/images/partners/cropped/bharat-forge-kalyani-light.png",
    width: 190,
    height: 41,
  },
  {
    name: "Centum Electronics",
    src: "/images/partners/cropped/centum-light.png",
    width: 180,
    height: 52,
  },
  {
    name: "Throttle Aerospace Systems",
    src: "/images/partners/cropped/throttle-aerospace-systems.png",
    width: 160,
    height: 80,
  },
  {
    name: "Airblades",
    src: "/images/partners/cropped/airblades-light.png",
    width: 145,
    height: 110,
  },
  {
    name: "Andura Expeditions",
    src: "/images/partners/cropped/andura-expeditions.png",
    width: 180,
    height: 90,
  },
  {
    name: "Sky Wardens",
    src: "/images/partners/cropped/sky-wardens-light.png",
    width: 140,
    height: 118,
  },
  {
    name: "Pagariya Group",
    src: "/images/partners/cropped/pagariya-group-light.png",
    width: 170,
    height: 61,
  },
  {
    name: "PSGL Group",
    src: "/images/partners/cropped/psgl-group.png",
    width: 185,
    height: 59,
  },
];

export default function PartnerLogosSection() {
  return (
    <section
      className={styles.section}
      aria-label="Strategic Partners and Sovereign Alliances"
    >
      <div className={styles.inner}>
        {/* Seamless Infinite Auto-Scroll Track */}
        <div className={styles.marqueeContainer}>
          <div className={styles.marqueeTrack}>
            {partnerLogos.map((logo, index) => (
              <div
                key={`logo-primary-${index}`}
                className={styles.logoCard}
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  width={logo.width}
                  height={logo.height}
                  className={styles.logoImage}
                />
              </div>
            ))}
            {partnerLogos.map((logo, index) => (
              <div
                key={`logo-dup-${index}`}
                className={styles.logoCard}
                title={logo.name}
                aria-hidden="true"
              >
                <Image
                  src={logo.src}
                  alt=""
                  width={logo.width}
                  height={logo.height}
                  className={styles.logoImage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
