export interface SpecItem {
  label: string;
  value: string;
  icon?: string;
}

export interface TableRow {
  label: string;
  value: string;
}

export type ProductDetailSection =
  | {
      type: "spec-grid";
      items: SpecItem[];
    }
  | {
      type: "table";
      title?: string;
      rows: TableRow[];
    }
  | {
      type: "list";
      title: string;
      items: string[];
    }
  | {
      type: "text";
      title: string;
      body: string;
    };

export interface ProductCardItem {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  role?: string;
  categoryName?: string;
  details: ProductDetailSection[];
}

export interface DefenceCategory {
  id: string;
  number: string;
  name: string;
  tagline?: string;
  products: ProductCardItem[];
}

export const defenceCategories: DefenceCategory[] = [
  {
    "id": "helmets",
    "number": "01",
    "name": "Helmets",
    "tagline": "Ballistic and tactical head protection systems for field deployment.",
    "products": [
      {
        "id": "abhedya-level-iii-helmet",
        "name": "Abhedya Level III Helmet",
        "description": "Protective headgear solution designed for defence and tactical deployment requirements.",
        "imageSrc": "/images/2. Defence Page/Abhedya-Level-III-Helmet.png",
        "imageAlt": "Abhedya Level III Helmet",
        "categoryName": "Helmets",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Protective headgear solution designed for defence and tactical deployment requirements."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "ballistic-helmet-nij",
        "name": "Ballistic Helmet NIJ",
        "description": "Ballistic helmet platform positioned for operational head protection and readiness.",
        "imageSrc": "/images/2. Defence Page/Ballistic-Helmet-NIJ.png",
        "imageAlt": "Ballistic Helmet NIJ",
        "categoryName": "Helmets",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Ballistic helmet platform positioned for operational head protection and readiness."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "vajra-helmet",
        "name": "Vajra Helmet",
        "description": "Tactical helmet offering structured protection for frontline and response roles.",
        "imageSrc": "/images/2. Defence Page/Vajra-Helmet.png",
        "imageAlt": "Vajra Helmet",
        "categoryName": "Helmets",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Tactical helmet offering structured protection for frontline and response roles."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  },
  {
    "id": "shoes-boots",
    "number": "02",
    "name": "Shoes & Boots",
    "tagline": "Anti-spike and terrain-ready military footwear for varied operating conditions.",
    "products": [
      {
        "id": "canvas-jungle-anti-spike-military-boots",
        "name": "Canvas Jungle Anti-Spike Military Boots",
        "description": "Jungle-oriented anti-spike boots built for demanding terrain and field movement.",
        "imageSrc": "/images/2. Defence Page/Canvas-Jungle-Anti-Spike-Military-Boots.png",
        "imageAlt": "Canvas Jungle Anti-Spike Military Boots",
        "categoryName": "Shoes & Boots",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Jungle-oriented anti-spike boots built for demanding terrain and field movement."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "leather-jungle-anti-spike-military-boots",
        "name": "Leather Jungle Anti-Spike Military Boots",
        "description": "Leather anti-spike jungle boots configured for sustained outdoor defence use.",
        "imageSrc": "/images/2. Defence Page/Leather-Jungle-Anti-Spike-Military-Boots.png",
        "imageAlt": "Leather Jungle Anti-Spike Military Boots",
        "categoryName": "Shoes & Boots",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Leather anti-spike jungle boots configured for sustained outdoor defence use."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "leather-snow-adventure-military-boots",
        "name": "Leather Snow Adventure Military Boots",
        "description": "Cold-condition military boots developed for snow and high-exposure movement.",
        "imageSrc": "/images/2. Defence Page/Leather-Snow-Adventure-Military-Boots.png",
        "imageAlt": "Leather Snow Adventure Military Boots",
        "categoryName": "Shoes & Boots",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Cold-condition military boots developed for snow and high-exposure movement."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  },
  {
    "id": "gloves",
    "number": "03",
    "name": "Gloves",
    "tagline": "Shock-resistant and tactical hand protection for operational use.",
    "products": [
      {
        "id": "stun-shock-proof-dorsal-half-finger-military-gloves",
        "name": "Stun Shock Proof Dorsal Half Finger Military Gloves",
        "description": "Half-finger glove platform shaped for tactical grip and shock-resistant handling.",
        "imageSrc": "/images/2. Defence Page/Stun-Shock-Proof-Dorsal-Half-Finger-Military-Gloves.png",
        "imageAlt": "Stun Shock Proof Dorsal Half Finger Military Gloves",
        "categoryName": "Gloves",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Half-finger glove platform shaped for tactical grip and shock-resistant handling."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "stun-shock-proof-full-finger-military-gloves",
        "name": "Stun Shock Proof Full Finger Military Gloves",
        "description": "Full-finger military gloves built for protected handling and operational comfort.",
        "imageSrc": "/images/2. Defence Page/Stun-Shock-Proof-Full-Finger-Military-Gloves.png",
        "imageAlt": "Stun Shock Proof Full Finger Military Gloves",
        "categoryName": "Gloves",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Full-finger military gloves built for protected handling and operational comfort."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "stun-shock-proof-military-half-finger-gloves",
        "name": "Stun Shock Proof Military Half Finger Gloves",
        "description": "Shock-resistant half-finger gloves intended for fast-response tactical movement.",
        "imageSrc": "/images/2. Defence Page/Stun-Shock-Proof-Military-Half-Finger-Gloves.png",
        "imageAlt": "Stun Shock Proof Military Half Finger Gloves",
        "categoryName": "Gloves",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Shock-resistant half-finger gloves intended for fast-response tactical movement."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "stun-shock-proof-tactical-half-finger-military-glove",
        "name": "Stun Shock Proof Tactical Half Finger Military Glove",
        "description": "Tactical half-finger glove designed for dexterity, grip, and field protection.",
        "imageSrc": "/images/2. Defence Page/Stun-Shock-Proof-Tactical-Half-Finger-Military-Glove.png",
        "imageAlt": "Stun Shock Proof Tactical Half Finger Military Glove",
        "categoryName": "Gloves",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Tactical half-finger glove designed for dexterity, grip, and field protection."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  },
  {
    "id": "jackets-outerwear",
    "number": "04",
    "name": "Jackets & Outerwear",
    "tagline": "Protective outerwear designed for marine, VIP, and field environments.",
    "products": [
      {
        "id": "shakti-marine-jacket",
        "name": "Shakti Marine Jacket",
        "description": "Operational marine outerwear tailored for durable duty use and layered protection.",
        "imageSrc": "/images/2. Defence Page/Shakti-Marine-Jacket.png",
        "imageAlt": "Shakti Marine Jacket",
        "categoryName": "Jackets & Outerwear",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Operational marine outerwear tailored for durable duty use and layered protection."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "shakti-vip-jackets",
        "name": "Shakti VIP Jackets",
        "description": "Protective jacket line intended for discreet defence and VIP movement requirements.",
        "imageSrc": "/images/2. Defence Page/Shakti-VIP-Jackets.png",
        "imageAlt": "Shakti VIP Jackets",
        "categoryName": "Jackets & Outerwear",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Protective jacket line intended for discreet defence and VIP movement requirements."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "shakti-level-iii-bulletproof-jacket",
        "name": "Shakti - Level III bulletproof Jacket",
        "description": "Bulletproof torso protection configured for frontline defence applications.",
        "imageSrc": "/images/2. Defence Page/Shakti-Level-III-bulletproof-Jacket.png",
        "imageAlt": "Shakti - Level III bulletproof Jacket",
        "categoryName": "Jackets & Outerwear",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Bulletproof torso protection configured for frontline defence applications."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "shakti-level-iv-bulletproof-jacket",
        "name": "Shakti Level IV bulletproof Jacket",
        "description": "Higher-protection ballistic jacket platform for demanding threat environments.",
        "imageSrc": "/images/2. Defence Page/Shakti-Level-Iv-bulletproof-Jacket.png",
        "imageAlt": "Shakti Level IV bulletproof Jacket",
        "categoryName": "Jackets & Outerwear",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Higher-protection ballistic jacket platform for demanding threat environments."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "shakti-tactical-jacket",
        "name": "Shakti Tactical Jacket",
        "description": "Tactical protective jacket designed for operational mobility and field readiness.",
        "imageSrc": "/images/2. Defence Page/Shakti-Tactical-Jacket.png",
        "imageAlt": "Shakti Tactical Jacket",
        "categoryName": "Jackets & Outerwear",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Tactical protective jacket designed for operational mobility and field readiness."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  },
  {
    "id": "riot-control",
    "number": "05",
    "name": "Riot Control",
    "tagline": "Protective gear for crowd-control, public-order, and response operations.",
    "products": [
      {
        "id": "riot-shield",
        "name": "Riot Shield",
        "description": "Protective riot shield solution for public-order response and controlled engagement.",
        "imageSrc": "/images/2. Defence Page/Riot-Shield.png",
        "imageAlt": "Riot Shield",
        "categoryName": "Riot Control",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Protective riot shield solution for public-order response and controlled engagement."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "vajra-riot-control-female-suit",
        "name": "Vajra Riot Control Female Suit",
        "description": "Riot-control protective suit tailored for female response personnel.",
        "imageSrc": "/images/2. Defence Page/Vajra-Riot-Control-Female-Suit.png",
        "imageAlt": "Vajra Riot Control Female Suit",
        "categoryName": "Riot Control",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Riot-control protective suit tailored for female response personnel."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "vajra-riot-control-male-suit",
        "name": "Vajra Riot Control Male Suit",
        "description": "Riot-control protective suit configured for male operational response teams.",
        "imageSrc": "/images/2. Defence Page/Vajra-Riot-Control-Male-Suit.png",
        "imageAlt": "Vajra Riot Control Male Suit",
        "categoryName": "Riot Control",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Riot-control protective suit configured for male operational response teams."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "vajra-riot-control-suit",
        "name": "Vajra Riot Control Suit",
        "description": "Protective suit system intended for riot-control and public-order deployment.",
        "imageSrc": "/images/2. Defence Page/Vajra-Riot-Control-Suit.png",
        "imageAlt": "Vajra Riot Control Suit",
        "categoryName": "Riot Control",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Protective suit system intended for riot-control and public-order deployment."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  },
  {
    "id": "impact-tools",
    "number": "06",
    "name": "Impact Tools",
    "tagline": "Stun batons and close-response support tools for field readiness.",
    "products": [
      {
        "id": "dandd-stun-baton",
        "name": "Dandd Stun Baton",
        "description": "Close-response stun baton designed for controlled tactical engagement scenarios.",
        "imageSrc": "/images/2. Defence Page/Dandd-Stun-Baton.png",
        "imageAlt": "Dandd Stun Baton",
        "categoryName": "Impact Tools",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Close-response stun baton designed for controlled tactical engagement scenarios."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      },
      {
        "id": "vajra-stun-baton",
        "name": "Vajra Stun Baton",
        "description": "Response baton platform intended for security, control, and field support use.",
        "imageSrc": "/images/2. Defence Page/Vajra-Stun-Baton.png",
        "imageAlt": "Vajra Stun Baton",
        "categoryName": "Impact Tools",
        "details": [
          {
            "type": "text",
            "title": "Overview",
            "body": "Response baton platform intended for security, control, and field support use."
          },
          {
            "type": "text",
            "title": "Information",
            "body": "Detailed specifications, sizing, and procurement information are available on request."
          }
        ]
      }
    ]
  }
];
