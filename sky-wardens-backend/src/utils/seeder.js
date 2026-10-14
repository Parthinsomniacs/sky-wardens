const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Role = require("../models/Role");
const User = require("../models/User");
const Division = require("../models/Division");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Lead = require("../models/Lead");

dotenv.config();

const INITIAL_DIVISIONS = [
  {
    name: "Aerospace",
    slug: "aerospace",
    description: "Aeronautical systems, tactical UAVs, ISR reconnaissance, and flight avionics.",
    status: "Active",
    badgeColor: "bg-sky-600",
  },
  {
    name: "Defence",
    slug: "defence",
    description: "Frontline ballistic protection, tactical helmets, combat body armor, and riot gear.",
    status: "Active",
    badgeColor: "bg-emerald-600",
  },
  {
    name: "Advanced Systems",
    slug: "advanced-systems",
    description: "Next-gen autonomous drone swarms, tactical electronic warfare, and counter-UAS grids.",
    status: "Inactive",
    badgeColor: "bg-purple-600",
  },
  {
    name: "Petrochemicals",
    slug: "petrochemicals",
    description: "MIL-SPEC aviation fuels, high-impact ballistic polymers, and aerospace lubricants.",
    status: "Inactive",
    badgeColor: "bg-amber-600",
  },
];

const INITIAL_CATEGORIES = [
  // Aerospace Systems Categories
  {
    id: "surveillance-systems",
    number: "01",
    name: "Surveillance Systems",
    division: "Aerospace",
    tagline: "Reconnaissance, ISR, and persistent observation platforms.",
    order: 1,
    status: "Active",
  },
  {
    id: "tactical-fpv-platforms",
    number: "02",
    name: "Tactical FPV Platforms",
    division: "Aerospace",
    tagline: "Agile, high-speed tactical visual and payload deployment platforms.",
    order: 2,
    status: "Active",
  },
  {
    id: "strike-systems",
    number: "03",
    name: "Strike Systems",
    division: "Aerospace",
    tagline: "Precision-guided tactical engagement airframes and payload delivery.",
    order: 3,
    status: "Active",
  },
  {
    id: "loitering-munitions",
    number: "04",
    name: "Loitering Munitions",
    division: "Aerospace",
    tagline: "Autonomous hovering deterrence and rapid tactical strike assets.",
    order: 4,
    status: "Active",
  },
  {
    id: "heavy-tactical-platforms",
    number: "05",
    name: "Heavy Tactical Platforms",
    division: "Aerospace",
    tagline: "High-endurance heavy-payload long-range military UAV systems.",
    order: 5,
    status: "Active",
  },
  {
    id: "special-mission-systems",
    number: "06",
    name: "Special Mission Systems",
    division: "Aerospace",
    tagline: "Custom-tailored airframes for electronic warfare and signals intelligence.",
    order: 6,
    status: "Active",
  },
  {
    id: "support-infrastructure",
    number: "07",
    name: "Support Infrastructure",
    division: "Aerospace",
    tagline: "Ground control telemetry stations, tactical launch rails, and avionics.",
    order: 7,
    status: "Active",
  },

  // Defence Systems Categories
  {
    id: "helmets",
    number: "01",
    name: "Helmets",
    division: "Defence",
    tagline: "Ballistic and tactical head protection systems for field deployment.",
    order: 1,
    status: "Active",
  },
  {
    id: "shoes-boots",
    number: "02",
    name: "Shoes & Boots",
    division: "Defence",
    tagline: "Anti-spike, shock-absorbent military combat footwear for rough terrain.",
    order: 2,
    status: "Active",
  },
  {
    id: "gloves",
    number: "03",
    name: "Gloves",
    division: "Defence",
    tagline: "Stun shock proof, heat-resistant tactical combat gloves.",
    order: 3,
    status: "Active",
  },
  {
    id: "jackets-outerwear",
    number: "04",
    name: "Jackets & Outerwear",
    division: "Defence",
    tagline: "High-impact ballistic body armor, tactical vests, and combat outerwear.",
    order: 4,
    status: "Active",
  },
  {
    id: "riot-control",
    number: "05",
    name: "Riot Control",
    division: "Defence",
    tagline: "Frontline crowd management suits, tactical shields, and non-lethal gear.",
    order: 5,
    status: "Active",
  },
  {
    id: "impact-tools",
    number: "06",
    name: "Impact Tools",
    division: "Defence",
    tagline: "Tactical defense mechanisms, stun batons, and specialized tactical gear.",
    order: 6,
    status: "Active",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("[MongoDB Connected for Seeding]");

    // 1. Clear existing collections
    await User.deleteMany();
    await Role.deleteMany();
    await Division.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Lead.deleteMany();

    console.log("[Old records cleared]");

    // 2. Seed Single Role: "Super Admin"
    const superAdminRole = await Role.create({
      name: "Super Admin",
      slug: "super-admin",
      description: "Full System Operational & Defense Clearance Access",
      permissions: ["*"],
      isActive: true,
    });
    console.log(`[Role Seeded]: 1 Role created -> '${superAdminRole.name}' (${superAdminRole._id})`);

    // 3. Seed Single User: "Super Admin" referencing the Role collection
    const superAdminUser = await User.create({
      id: "USR-001",
      name: "Super Admin",
      email: "admin@skywardens.com",
      password: "SuperAdmin@Sky2026#",
      role: superAdminRole._id,
      avatar: "SA",
      status: "Active",
      lastLogin: "Active Now",
    });
    console.log(`[User Seeded]: 1 User created -> '${superAdminUser.email}' as Super Admin`);

    // 4. Seed Divisions
    await Division.insertMany(INITIAL_DIVISIONS);
    console.log(`[Divisions Seeded]: ${INITIAL_DIVISIONS.length} divisions`);

    // 5. Seed Sub-Categories for Aerospace & Defence
    await Category.insertMany(INITIAL_CATEGORIES);
    console.log(`[Categories Seeded]: ${INITIAL_CATEGORIES.length} official subcategories (7 Aerospace, 6 Defence)`);

    console.log("==================================================");
    console.log(" DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log(" Active Role       : Super Admin");
    console.log(" Super Admin Email : admin@skywardens.com");
    console.log(" Super Admin Pass  : SuperAdmin@Sky2026#");
    console.log(` Active Divisions  : Aerospace (7 Subcategories), Defence (6 Subcategories)`);
    console.log("==================================================");

    process.exit(0);
  } catch (error) {
    console.error(`[Seeder Error]: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
