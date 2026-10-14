export type SocialIcon = "instagram" | "facebook" | "linkedin" | "youtube";

export type NavLink = {
  label: string;
  href: string;
  /** Optional sub-menu items (e.g. sections within a page). */
  children?: NavLink[];
  /** External link (opens in a new tab). */
  external?: boolean;
  /** Brand icon key (used for social links). */
  icon?: SocialIcon;
};

/**
 * Single source of truth for site navigation.
 * Used by both the Header (drawer) and the Footer.
 */

// Primary navigation
export const pageLinks: NavLink[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about#mission-vision" },
      { label: "Group of Companies", href: "/about#group-of-companies" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Aerospace", href: "/products/aerospace" },
      { label: "Defence", href: "/products/defence" },
      // { label: "Advanced Systems", href: "/products/advanced-systems" },
      // { label: "Petrochemical", href: "/products/petrochemical" },
    ],
  },
  { label: "Affiliations", href: "/affiliations" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
  { label: "News", href: "/news" },
];

// Focus / sector areas (derived from the Products sub-menu).
export const focusLinks: NavLink[] =
  pageLinks.find((item) => item.label === "Products")?.children ?? [];

// Social profiles
export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
];
