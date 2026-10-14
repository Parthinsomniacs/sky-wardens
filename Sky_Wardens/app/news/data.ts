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
    slug: "anuvyom-psgl-aerospace-collaboration",
    category: "Company News",
    headline:
      "Anuvyom and PSGL Explore Deeper Collaboration in UAV and Aerospace Technologies",
    excerpt:
      "Discussions centre on unmanned systems, technical collaboration and opportunities to develop long-term aerospace manufacturing capability in Nigeria.",
    date: "",
    readTime: "2 min read",
    author: "Anuvyom Alliance",
    imageSrc: "/images/anuvyom-psgl-aerospace-defence-collaboration-v2.webp",
    imageAlt:
      "Anuvyom and PSGL aerospace and defence technology collage featuring a UAV, protective equipment, satellite communications and a command centre",
    summary:
      "Discussions centre on unmanned systems, technical collaboration and opportunities to develop long-term aerospace manufacturing capability in Nigeria.",
    keyHighlights: [
      "Exploration of strategic collaboration in unmanned aerial systems, aerospace technologies and advanced defence capabilities.",
      "Comprehensive UAV lifecycle coverage spanning concept design, simulation, flight testing, production and deployment.",
      "Focus on developing sustainable local engineering, systems integration and aerospace manufacturing capability in Nigeria.",
    ],
    sections: [
      {
        heading: "Engineering a Shared Direction",
        body: [
          "Anuvyom Aerospace has engaged with PSGL Group, the Nigerian industrial and technology group, to explore opportunities for collaboration in unmanned aerial systems, aerospace technologies and advanced defence capabilities.",
          "The discussions brought together Anuvyom's engineering capabilities and PSGL's ambition to develop local industrial capacity in Nigeria. Areas of interest included UAV development, systems integration and the potential for future manufacturing initiatives.",
        ],
      },
      {
        heading: "A Focus on the UAV Lifecycle",
        body: [
          "Anuvyom's aerospace capabilities span concept design, simulation, flight testing, production and deployment, with a focus on intelligence, surveillance and reconnaissance platforms, mission-specific drones and autonomous systems.",
          "These capabilities offer areas of potential collaboration with PSGL's work in software, cybersecurity, UAV technologies, surveillance and systems integration. Applications discussed in the wider partnership context include border monitoring, logistics and critical infrastructure protection.",
        ],
      },
      {
        heading: "From Technology Access to Local Capability",
        body: [
          "A central theme of the engagement was the opportunity to move beyond conventional procurement towards sustainable local capability. PSGL is pursuing an approach that connects international engineering expertise with Nigerian investment, institutions and industrial stakeholders.",
          "For the collaboration, this means exploring how technical relationships could support local engineering, systems integration and future manufacturing opportunities. The emphasis is on developing the technical relationships and industrial foundations needed to support this work over time.",
        ],
      },
      {
        heading: "A Long-Term Industrial Perspective",
        body: [
          "The engagement sits within PSGL's broader effort to build a technology and industrial ecosystem across defence, aerospace, logistics and infrastructure. It also reflects Anuvyom's focus on developing durable engineering and industrial capabilities through strategic collaboration.",
          "Further cooperation is expected to focus on strengthening technical relationships, exploring manufacturing opportunities and understanding the requirements of Nigeria and other African markets. The shared opportunity is to connect international technology with local engineering expertise and sustainable industrial capacity.",
        ],
      },
    ],
  },
  {
    id: "news-2",
    slug: "psgl-bharat-electronics-industrial-cooperation",
    category: "Partner News",
    headline:
      "PSGL Engages Bharat Electronics Limited on Defence Technology and Industrial Cooperation",
    excerpt:
      "Our partner PSGL Group explores defence electronics, systems integration and opportunities for local capability development through engagement with BEL.",
    date: "",
    readTime: "2 min read",
    author: "Anuvyom Alliance",
    imageSrc: "/images/psgl-bharat-electronics-industrial-cooperation.jpg",
    imageAlt:
      "PSGL Engages Bharat Electronics Limited on Defence Technology and Industrial Cooperation",
    summary:
      "Our partner PSGL Group explores defence electronics, systems integration and opportunities for local capability development through engagement with BEL.",
    keyHighlights: [
      "Exploration of defence electronics, communications, and surveillance technologies.",
      "Partnership framework for long-term technology transfer and industrial capability development in Nigeria.",
      "Strengthening Nigeria-India industrial cooperation across physical and digital defence systems.",
    ],
    sections: [
      {
        heading: "An Update from Our Partner Network",
        body: [
          "PSGL Group has engaged with Bharat Electronics Limited (BEL) in India as part of its efforts to develop defence, aerospace and advanced technology capabilities in Nigeria and across Africa.",
          "The engagement brought together representatives of PSGL and BEL for discussions on defence technology, industrial cooperation, systems integration and opportunities for long-term technology transfer. This is a separate PSGL-BEL engagement within PSGL's wider international partnership programme.",
        ],
      },
      {
        heading: "Exploring Industrial Cooperation",
        body: [
          "Discussions focused on areas of mutual interest including defence electronics, communications systems, surveillance technologies and industrial technology development.",
          "PSGL's approach is to connect international engineering expertise with Nigerian investment, industrial capacity and the requirements of government and strategic institutions. The objective extends beyond importing finished systems towards developing sustainable technical capability.",
        ],
      },
      {
        heading: "Building Capacity Beyond Procurement",
        body: [
          "The engagement placed emphasis on local engineering, integration, maintenance and manufacturing. PSGL views these capabilities as foundations for a more sustainable defence and aerospace ecosystem.",
          "Through PSGL Technology Limited, the Group is developing capabilities in software engineering, cybersecurity, UAV technologies, surveillance and systems integration. Its international engagements are intended to complement this work and connect digital technologies with physical defence and aerospace systems.",
        ],
      },
      {
        heading: "The Wider Nigeria-India Opportunity",
        body: [
          "PSGL sees stronger Nigeria-India industrial cooperation as an opportunity to develop domestic technical competence and support longer-term industrial growth. Its discussions with BEL form part of continuing engagement with international technology companies and equipment manufacturers.",
          "For Anuvyom's partner network, the update provides context on PSGL's wider ambition: to build local engineering expertise and increase participation in the integration, production and lifecycle support of strategic technologies.",
        ],
      },
    ],
  },
];
