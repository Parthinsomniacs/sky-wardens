import { aerospaceCategories } from "@/app/products/aerospace/data";
import { defenceCategories } from "@/app/products/defence/data";

export interface CountryInfo {
  name: string;
  iso2: string;
  dialCode: string;
}

export const COUNTRIES: CountryInfo[] = [
  { name: "India", iso2: "IN", dialCode: "+91" },
  { name: "United States", iso2: "US", dialCode: "+1" },
  { name: "United Kingdom", iso2: "GB", dialCode: "+44" },
  { name: "United Arab Emirates", iso2: "AE", dialCode: "+971" },
  { name: "Australia", iso2: "AU", dialCode: "+61" },
  { name: "Canada", iso2: "CA", dialCode: "+1" },
  { name: "Germany", iso2: "DE", dialCode: "+49" },
  { name: "France", iso2: "FR", dialCode: "+33" },
  { name: "Singapore", iso2: "SG", dialCode: "+65" },
  { name: "Japan", iso2: "JP", dialCode: "+81" },
  { name: "Saudi Arabia", iso2: "SA", dialCode: "+966" },
  { name: "Qatar", iso2: "QA", dialCode: "+974" },
  { name: "Israel", iso2: "IL", dialCode: "+972" },
  { name: "South Korea", iso2: "KR", dialCode: "+82" },
  { name: "Italy", iso2: "IT", dialCode: "+39" },
  { name: "Spain", iso2: "ES", dialCode: "+34" },
  { name: "Netherlands", iso2: "NL", dialCode: "+31" },
  { name: "Sweden", iso2: "SE", dialCode: "+46" },
  { name: "Switzerland", iso2: "CH", dialCode: "+41" },
  { name: "Brazil", iso2: "BR", dialCode: "+55" },
  { name: "South Africa", iso2: "ZA", dialCode: "+27" },
  { name: "Afghanistan", iso2: "AF", dialCode: "+93" },
  { name: "Albania", iso2: "AL", dialCode: "+355" },
  { name: "Algeria", iso2: "DZ", dialCode: "+213" },
  { name: "Argentina", iso2: "AR", dialCode: "+54" },
  { name: "Austria", iso2: "AT", dialCode: "+43" },
  { name: "Bahrain", iso2: "BH", dialCode: "+973" },
  { name: "Bangladesh", iso2: "BD", dialCode: "+880" },
  { name: "Belgium", iso2: "BE", dialCode: "+32" },
  { name: "Bhutan", iso2: "BT", dialCode: "+975" },
  { name: "Chile", iso2: "CL", dialCode: "+56" },
  { name: "Colombia", iso2: "CO", dialCode: "+57" },
  { name: "Czech Republic", iso2: "CZ", dialCode: "+420" },
  { name: "Denmark", iso2: "DK", dialCode: "+45" },
  { name: "Egypt", iso2: "EG", dialCode: "+20" },
  { name: "Finland", iso2: "FI", dialCode: "+358" },
  { name: "Greece", iso2: "GR", dialCode: "+30" },
  { name: "Hong Kong", iso2: "HK", dialCode: "+852" },
  { name: "Hungary", iso2: "HU", dialCode: "+36" },
  { name: "Indonesia", iso2: "ID", dialCode: "+62" },
  { name: "Ireland", iso2: "IE", dialCode: "+353" },
  { name: "Kuwait", iso2: "KW", dialCode: "+965" },
  { name: "Malaysia", iso2: "MY", dialCode: "+60" },
  { name: "Mexico", iso2: "MX", dialCode: "+52" },
  { name: "Nepal", iso2: "NP", dialCode: "+977" },
  { name: "New Zealand", iso2: "NZ", dialCode: "+64" },
  { name: "Norway", iso2: "NO", dialCode: "+47" },
  { name: "Oman", iso2: "OM", dialCode: "+968" },
  { name: "Philippines", iso2: "PH", dialCode: "+63" },
  { name: "Poland", iso2: "PL", dialCode: "+48" },
  { name: "Portugal", iso2: "PT", dialCode: "+351" },
  { name: "Romania", iso2: "RO", dialCode: "+40" },
  { name: "Sri Lanka", iso2: "LK", dialCode: "+94" },
  { name: "Thailand", iso2: "TH", dialCode: "+66" },
  { name: "Turkey", iso2: "TR", dialCode: "+90" },
  { name: "Vietnam", iso2: "VN", dialCode: "+84" }
];

export const INDIAN_STATES: string[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export const INQUIRY_TYPES = [
  "Product(s) Inquiry",
  "Strategic Partnership / Joint Venture",
  "Procurement / Tender",
  "Distributor / Channel Partnership",
  "Institutional / Government Engagement",
  "Affiliations / Collaboration",
  "Careers / Recruitment",
  "Media / Corporate Communication",
  "General Inquiry"
] as const;

export type InquiryType = typeof INQUIRY_TYPES[number];

export interface InquiryConfig {
  requiresProducts: boolean;
  requiresCompany: boolean;
  requiresCountry: boolean;
  requiresPhone: boolean;
  requiresLastName: boolean;
  requiresTenderReference: boolean;
  requiresDesignation: boolean;
  requiresMediaDeadline: boolean;
  companyLabel: string;
}

const DEFAULT_CONFIG: InquiryConfig = {
  requiresProducts: false,
  requiresCompany: false,
  requiresCountry: false,
  requiresPhone: false,
  requiresLastName: false,
  requiresTenderReference: false,
  requiresDesignation: false,
  requiresMediaDeadline: false,
  companyLabel: "Company"
};

const INQUIRY_CONFIG_MAP: Record<InquiryType, Partial<InquiryConfig>> = {
  "Product(s) Inquiry": {
    requiresProducts: true,
    requiresCountry: true
  },
  "Strategic Partnership / Joint Venture": {
    requiresCompany: true,
    requiresCountry: true,
    requiresPhone: true
  },
  "Procurement / Tender": {
    requiresCompany: true,
    requiresPhone: true,
    requiresTenderReference: true,
    companyLabel: "Organisation / Company"
  },
  "Distributor / Channel Partnership": {
    requiresCompany: true,
    requiresCountry: true,
    requiresPhone: true
  },
  "Institutional / Government Engagement": {
    requiresCompany: true,
    requiresPhone: true,
    requiresDesignation: true,
    companyLabel: "Organisation"
  },
  "Affiliations / Collaboration": {
    requiresCompany: true,
    companyLabel: "Organisation"
  },
  "Careers / Recruitment": {
    requiresLastName: true
  },
  "Media / Corporate Communication": {
    requiresCompany: true,
    requiresMediaDeadline: true,
    companyLabel: "Publication / Organisation"
  },
  "General Inquiry": {}
};

export function getInquiryConfig(type: string): InquiryConfig {
  if (type in INQUIRY_CONFIG_MAP) {
    return { ...DEFAULT_CONFIG, ...INQUIRY_CONFIG_MAP[type as InquiryType] };
  }
  return DEFAULT_CONFIG;
}

export interface ProductCatalogGroup {
  heading: string;
  products: { id: string; name: string }[];
}

export function getGroupedProducts(): ProductCatalogGroup[] {
  const aerospaceProducts = aerospaceCategories.flatMap((cat) =>
    cat.products.map((p) => ({ id: p.id, name: p.name }))
  );
  const defenceProducts = defenceCategories.flatMap((cat) =>
    cat.products.map((p) => ({ id: p.id, name: p.name }))
  );

  return [
    { heading: "Aerospace", products: aerospaceProducts },
    { heading: "Defence", products: defenceProducts }
  ];
}
