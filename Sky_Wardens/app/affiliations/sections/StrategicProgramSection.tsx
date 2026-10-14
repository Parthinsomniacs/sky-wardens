import Image from "next/image";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./StrategicProgramSection.module.css";

interface StrategicProgram {
  id: string;
  eyebrow: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
}

const strategicPrograms: StrategicProgram[] = [
  {
    id: "government-aligned",
    eyebrow: "SOVEREIGN STRATEGIC INITIATIVE",
    title: "Government Aligned Strategic Program",
    imageSrc: "/images/affiliations-strategic-program.jpg",
    imageAlt:
      "Indian Army soldiers hoisting the national flag on a mountain summit, representing sovereign defence preparedness",
    paragraphs: [
      "Anuvyom works in alignment with government entities, national bodies, and mission-critical sectors to ensure that every capability we support is relevant, dependable, and operationally meaningful. Our engagement model is shaped around sovereign requirements, regional priorities, and the practical demands of modern defence and security environments.",
      "We support programs where performance, reliability, and deployment relevance are non-negotiable. This includes collaboration across strategic segments tied to national defence preparedness, force modernisation, infrastructure protection, and long-term capability development. Our role is defined by disciplined execution, confidentiality, and an understanding that defence systems must ultimately serve real operational needs under demanding conditions.",
      "By working closely with government stakeholders and aligned institutions, Anuvyom helps ensure that technologies are not only advanced in concept, but productive, useful, and calibrated to the utmost requirements of the country and region they are intended to serve.",
    ],
  },
  {
    id: "industrial-capability",
    eyebrow: "DEFENCE & STRATEGIC MANUFACTURING",
    title: "Industrial Capability Partnerships",
    imageSrc: "/images/affiliations-industrial-partnerships.jpg",
    imageAlt:
      "Advanced defence manufacturing facility integrating guided missiles and tactical aerospace systems",
    paragraphs: [
      "Anuvyom maintains industrial technology collaborations and alliances with leading engineering companies operating across advanced defence and strategic manufacturing domains. Through these partnerships, we engage in the development, integration, and advancement of capabilities across a focused set of mission areas.",
      "These areas include artillery and missile systems, AI-enabled guided shells, drones and loitering munitions, and battlefield mapping supported by predictive AI frameworks. Our collaboration model brings together industrial engineering depth, systems integration experience, and technology specialization to support scalable and future-relevant defence capability.",
      "We approach these partnerships as long-term industrial relationships rather than isolated project engagements. The objective is to build enduring technical competence, resilient supply alignment, and integrated development pathways that can support evolving operational requirements while maintaining appropriate discretion around program-level detail.",
    ],
  },
  {
    id: "aerospace-advanced-systems",
    eyebrow: "PRECISION ENGINEERING & AVIONICS",
    title: "Aerospace and Advanced System Alliances",
    imageSrc: "/images/affiliations-aerospace-alliances.jpg",
    imageAlt:
      "Aerospace avionics engineering facility testing optical electronic targeting and airborne radar systems",
    paragraphs: [
      "Anuvyom works with specialized engineering and technology partners across aerospace and airborne systems, supporting advanced capability domains where stability, sensing, targeting, and processing performance are critical.",
      "Our aerospace-aligned engagements include aircraft systems such as optical electronic systems, stabilized guided weapons, image processing modules, air target lock-on and tracking modules, and stabilized suspension systems for radar antennas used on helicopters and UAV platforms. In parallel, our broader systems exposure also extends into naval and cross-domain defence technologies, including remote weapon station architectures, optical electronic systems, radar channel antenna posts, instrument TOI, visual observation channels, GPAP hardware and software systems, angular deformation measurement systems, and TAD-configured subsystems.",
      "These alliances are built around precision engineering, integration discipline, and mission adaptability. We deliberately maintain a low-signature communication posture around platform specifics, while continuing to deepen our role in the ecosystem of advanced air, naval, and multi-domain defence technologies.",
    ],
  },
  {
    id: "global-capability",
    eyebrow: "MULTI-THEATER DEFENCE INTEGRATION",
    title: "Global Capability Integration",
    imageSrc: "/images/affiliations-global-capability.jpg",
    imageAlt:
      "Global strategic defence operations center with commanders reviewing international tactical connectivity across India, Middle East, and Africa",
    paragraphs: [
      "Anuvyom operates with active status in India, West Africa, and the Middle East, with further expansion planned as we continue to develop strategic relationships across emerging and established defence markets. This presence enables us to engage across multiple operational environments, understand diverse security requirements, and align capability development with regional realities.",
      "Our international posture is not defined by scale alone, but by selective integration with the right institutional, industrial, and technical ecosystems. This allows Anuvyom to connect local requirement understanding with broader engineering collaboration, industrial partnerships, and advanced capability access.",
      "As our footprint grows, our focus remains consistent: build discreetly, collaborate selectively, and strengthen defence-relevant capability where it matters most. We believe meaningful expansion in this sector comes not from visibility, but from trust, technical seriousness, and sustained strategic relevance.",
    ],
  },
];

export default function StrategicProgramSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="strategic-program-title"
    >
      <div className={styles.inner}>
        {/* Centered Section Header */}
        <div className={styles.header}>
          <span className={styles.headerEyebrow}>STRATEGIC ALLIANCES</span>
          <AnimatedTitle
            id="strategic-program-title"
            className={styles.sectionTitle}
            as="h2"
          >
            <span className={styles.titleLine}>Industrial Relationships.</span>
            <span className={styles.titleLine}>Global Capability</span>
          </AnimatedTitle>
        </div>

        {/* Programs List */}
        <div className={styles.programsList}>
          {strategicPrograms.map((program) => (
            <article key={program.id} className={styles.itemWrapper}>
              <div className={styles.grid}>
                {/* Left Column: Cinematic Visual */}
                <div className={styles.imageWrap}>
                  <Image
                    src={program.imageSrc}
                    alt={program.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                </div>

                {/* Right Column: Strategic Narrative */}
                <div className={styles.content}>
                  <span className={styles.eyebrow}>{program.eyebrow}</span>
                  <AnimatedTitle className={styles.title} as="h3">
                    {program.title}
                  </AnimatedTitle>

                  <div className={styles.textList}>
                    {program.paragraphs.map((p, idx) => (
                      <p key={idx} className={styles.paragraph}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
