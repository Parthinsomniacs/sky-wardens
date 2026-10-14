export interface NewsArticleSection {
  heading: string;
  body: string[];
  quote?: string;
  bulletPoints?: string[];
}

export interface NewsArticle {
  id: string;
  slug: string;
  category: string;
  headline: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  sections: NewsArticleSection[];
  keyHighlights: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: "news-1",
    slug: "aerospace-highlights",
    category: "Aerospace",
    headline: "Aerospace highlights and autonomous flight program positioning",
    excerpt:
      "Precision-engineered sovereign airframes, autonomous flight trials, and tactical unmanned aerial surveillance milestones achieve key flight milestones.",
    date: "March 2026",
    readTime: "4 min read",
    author: "Sovereign Aerospace Systems Division",
    imageSrc: "/images/business-aerospace.jpg",
    imageAlt: "Stealth autonomous aerospace drone in testing hangar",
    summary:
      "Sky Wardens accelerates its autonomous aviation roadmap with milestone validations across advanced flight envelopes, radar cross-section mitigation, and high-altitude station-keeping capabilities.",
    keyHighlights: [
      "Over 240 cumulative autonomous test-flight hours recorded across contested-condition simulations.",
      "Integration of indigenous high-bandwidth telemetry and optical electronic target acquisition modules.",
      "Deployment readiness milestone slated for tactical forces across mountain and maritime surveillance operations.",
    ],
    sections: [
      {
        heading: "Autonomous Envelopes and High-Mach Endurance",
        body: [
          "The aerospace engineering division has successfully concluded high-altitude envelope validation for its flagship autonomous airframe program. Engineered to operate under contested electromagnetic conditions, the platform demonstrated resilient low-altitude terrain following and extended loiter capability during multi-day simulated trials.",
          "Through a proprietary composite airframe architecture, thermal dissipation and acoustic signatures have been significantly mitigated, ensuring optimal stealth profile without compromising structural durability or payload volume.",
        ],
        quote:
          "Our objective is sovereign technological superiority — developing airborne platforms that execute high-stakes surveillance and deterrent missions without reliance on external supply chains.",
      },
      {
        heading: "Domestic Supply Chain and Modular Avionics",
        body: [
          "The avionics bay incorporates modular computational units designed for plug-and-play adaptability. Payload configurations can be transitioned within 45 minutes on the tarmac, enabling rapid shifts from optical surveillance to electronic countermeasures.",
          "Crucially, 100% of the internal processing nodes and structural sub-assemblies are developed and integrated domestically through aligned manufacturing alliances, assuring full strategic autonomy.",
        ],
        bulletPoints: [
          "Rapid-swap payload architecture supporting optical and multispectral pods.",
          "Hardened MIL-STD avionics with built-in electronic counter-countermeasure routines.",
          "Seamless tactical mesh communications linking ground operators with airborne nodes.",
        ],
      },
      {
        heading: "Next-Phase Roadmap",
        body: [
          "Looking forward into Q3 2026, the program will transition toward swarm coordination trials, evaluating distributed intelligence routines where multiple platforms coordinate autonomous surveillance tracks over expansive operational theaters.",
        ],
      },
    ],
  },
  {
    id: "news-2",
    slug: "defence-systems",
    category: "Defence",
    headline: "Defence systems, protective platforms, and readiness updates",
    excerpt:
      "Sovereign tactical systems engineered for extreme operational theaters, mission-critical environments, and multi-domain defense preparedness.",
    date: "February 2026",
    readTime: "5 min read",
    author: "Strategic Defence Technology Directorate",
    imageSrc: "/images/business-systems.jpg",
    imageAlt: "Specialist engineer analyzing tactical defence command telemetry",
    summary:
      "A comprehensive review of upgraded armor protection platforms, automated remote weapon stations, and field-tested tactical readiness enhancements designed for front-line armed forces.",
    keyHighlights: [
      "Ballistic and blast-resistant composite materials tested to highest international STANAG standards.",
      "Sensor-fused automated fire-control systems delivering sub-second target acquisition.",
      "Field validation across extreme desert heat, saline coastal fronts, and sub-zero Himalayan altitudes.",
    ],
    sections: [
      {
        heading: "Hardened Platforms for Contested Battlefields",
        body: [
          "Modern front-line security demands systems that withstand kinetic impacts, shaped charges, and asymmetric drone threats. Sky Wardens has finalized development of next-generation protective armor kits engineered specifically for tactical mobility vehicles and stationary forward posts.",
          "Utilizing lightweight ceramic-metallic composite matrices, the new systems achieve superior multi-hit stopping power while shedding 18% of traditional gross armor weight, preserving vehicle engine lifespan and cross-country maneuvering agility.",
        ],
      },
      {
        heading: "Automated Remote Weapon Stations & Sighting",
        body: [
          "In parallel, trials of the gyro-stabilized Remote Weapon Station (RWS) have registered exceptional hit-probability benchmarks during mobile firings. Equipped with dual thermal observation channels and laser rangefinding, the station maintains target lock while traveling at speeds up to 60 km/h across rugged terrain.",
        ],
        quote:
          "Defence readiness is defined by decisive protection and absolute weapon reliability when fractions of a second decide operational survival.",
        bulletPoints: [
          "Continuous 360-degree panoramic day/night surveillance with automatic motion detection.",
          "Slew-to-cue integration with acoustic gunshot detection sensors.",
          "Remote cabin operation preventing soldier exposure to open-fire environments.",
        ],
      },
      {
        heading: "Force Modernization Alignment",
        body: [
          "These platform upgrades are directly calibrated to national armed forces modernization tenders, demonstrating sovereign manufacturing excellence and accelerated procurement turnaround times.",
        ],
      },
    ],
  },
  {
    id: "news-3",
    slug: "tactical-uav-validation",
    category: "Sovereign Tech",
    headline: "Tactical UAV flight trials validate high-altitude flight envelope",
    excerpt:
      "Autonomous loitering platform successfully completes demanding endurance and optical tracking benchmarks in harsh weather environments.",
    date: "February 2026",
    readTime: "3 min read",
    author: "Tactical Flight Operations Group",
    imageSrc: "/images/cta-mission-theater.jpg",
    imageAlt: "Tactical UAV flight system flying above orbital horizon",
    summary:
      "High-altitude testing proves autonomous endurance, sub-zero engine reliability, and precision optical tracking across challenging mountainous terrain.",
    keyHighlights: [
      "Operating altitude confirmed up to 18,500 feet above sea level.",
      "Continuous endurance exceeding 14 hours in sub-zero alpine conditions.",
      "Encrypted line-of-sight datalink maintaining seamless telemetry beyond 120 km.",
    ],
    sections: [
      {
        heading: "Sub-Zero Alpine Navigation & Thermal Stability",
        body: [
          "Operating at extreme elevations requires specialized engine tuning, anti-icing wing protocols, and high-density battery thermal management. During recent high-altitude trials in northern sectors, the UAV performed flawlessly over continuous multi-hour circuits.",
          "The platform demonstrated instantaneous target lock on moving perimeter vectors, transmitting high-definition infrared telemetry through contested electronic jamming environments without telemetry degradation.",
        ],
        quote:
          "Validating high-altitude performance gives our armed forces an unwavering surveillance eye in frontiers where ground observation is virtually impossible.",
      },
      {
        heading: "Payload Modularity and Rapid Reconfiguration",
        body: [
          "Field personnel can swap the central sensor payload in less than 30 minutes, switching between electronic reconnaissance packages, laser target designators, and synthetic aperture radar (SAR) modules.",
        ],
      },
    ],
  },
  {
    id: "news-4",
    slug: "institutional-partnerships",
    category: "Strategic Alliances",
    headline: "Institutional partnerships accelerate domestic guided weapons integration",
    excerpt:
      "Multi-domain industrial collaborations unite defence engineering depth with precision avionics and next-generation electronic countermeasures.",
    date: "January 2026",
    readTime: "6 min read",
    author: "Strategic Alliances & Capability Bureau",
    imageSrc: "/images/affiliations-strategic-program.jpg",
    imageAlt: "Defence forces and industrial partners marking strategic sovereign capability milestones",
    summary:
      "Collaborative framework brings together premiere research institutions, state defense laboratories, and private engineering leaders to accelerate indigenous precision munitions development.",
    keyHighlights: [
      "Strategic synergy between research labs, tier-1 defense contractors, and specialized manufacturing plants.",
      "Development of anti-jam seeker heads and AI-guided terminal flight corrections.",
      "Establishment of joint qualification and simulated wind-tunnel testing facilities.",
    ],
    sections: [
      {
        heading: "Sovereign Co-Development Frameworks",
        body: [
          "National defense capability depends on deep industrial partnerships that bridge scientific research with rapid manufacturing execution. Sky Wardens has formalized agreements with leading research organizations and aerospace consortiums to co-develop precision-guided ammunition and loitering munition propulsion modules.",
          "By aligning technical competencies across aerodynamic simulation, solid rocket propellant formulation, and seeker miniaturization, the alliance has compressed prototype iteration cycles from years into months.",
        ],
      },
      {
        heading: "Joint Testing & Calibration Milestones",
        body: [
          "Extensive static firings and hardware-in-the-loop (HIL) simulations have demonstrated guidance accuracy with a circular error probable (CEP) of under 1 meter under GPS-denied scenarios.",
        ],
        quote:
          "Institutional alliances turn raw sovereign ambition into deployable, field-tested capability for national defense readiness.",
      },
    ],
  },
  {
    id: "news-5",
    slug: "edge-telemetry-deployment",
    category: "Advanced Systems",
    headline: "AI-enabled edge telemetry deployment for multi-theater command coordination",
    excerpt:
      "Encrypted communication arrays and edge-AI compute units deliver real-time sensor fusion and zero-latency situational awareness.",
    date: "January 2026",
    readTime: "4 min read",
    author: "Cyber & Autonomous Systems Research",
    imageSrc: "/images/business-tactical.jpg",
    imageAlt: "Tactical telemetry and orbital defence mission control tablet",
    summary:
      "Deployable tactical computing arrays fuse satellite imagery, radar feeds, and frontline drone video into an actionable single-pane-of-glass operational picture.",
    keyHighlights: [
      "Sub-millisecond inference time on edge computing clusters running in mobile command centers.",
      "Multi-spectral video automated target identification and track association.",
      "Quantum-resistant encryption safeguarding inter-unit battle-space communications.",
    ],
    sections: [
      {
        heading: "Zero-Latency Signal Routing Under Heavy Jamming",
        body: [
          "Modern warfare takes place as much in the electromagnetic spectrum as on the physical battlefield. Sky Wardens' newly deployed edge telemetry architecture incorporates cognitive frequency hopping to ensure unbroken command connectivity even in heavily jammed electronic warfare sectors.",
          "Local compute nodes process sensor feeds on-site rather than transmitting raw bandwidth over strained satellite uplinks, delivering synthesized threat assessments directly to frontline commanders.",
        ],
      },
      {
        heading: "Predictive Battle-Space Threat Synthesis",
        body: [
          "By employing lightweight neural models trained specifically on military asset profiles, the system automatically detects abnormal movement clusters and highlights potential ambush or artillery staging activities before they materialize.",
        ],
      },
    ],
  },
  {
    id: "news-6",
    slug: "manufacturing-expansion",
    category: "Manufacturing",
    headline: "High-precision manufacturing facility scale-up for loitering munitions",
    excerpt:
      "Expanded domestic aerospace production lines integrate automated robotic calibration for mission-critical electronic components and airframes.",
    date: "December 2025",
    readTime: "5 min read",
    author: "Industrial Manufacturing Operations",
    imageSrc: "/images/affiliations-industrial-partnerships.jpg",
    imageAlt: "Advanced aerospace manufacturing bay assembling precision tactical drone systems",
    summary:
      "New state-of-the-art facility increases annual manufacturing output by 300% to meet growing domestic and allied force defense procurement schedules.",
    keyHighlights: [
      "Cleanroom robotic surface-mount assembly lines certified for aerospace-grade electronics.",
      "High-precision 5-axis CNC machining centers achieving micrometer-level structural tolerances.",
      "Automated quality inspection with 100% radiographic X-ray scanning of composite airframe bonds.",
    ],
    sections: [
      {
        heading: "Robotic Precision & High-Tolerance Fabrication",
        body: [
          "To keep pace with accelerated production quotas, Sky Wardens has commissioned an expanded 85,000 sq ft manufacturing wing equipped with automated optical inspection and automated robotic component placement.",
          "This investment ensures that every loitering munition and tactical drone leaving the facility satisfies uncompromising structural and aerodynamic tolerances, ready for immediate tactical deployment.",
        ],
        quote:
          "Manufacturing depth is the bedrock of sovereign defense. Building at scale with zero margin for error is our core commitment to the armed forces.",
      },
      {
        heading: "Rapid Scalability for Strategic Readiness",
        body: [
          "The modular assembly line is designed to scale production by 3x within 72 hours in response to emergency replenishment demands, backed by strategic domestic supply stockpiles.",
        ],
      },
    ],
  },
];
