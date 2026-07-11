export type StockStatus = "available" | "reserved" | "sold";

export type Car = {
  slug: string;
  make: string;
  model: string;
  title: string;
  year: number;
  plateAge: string; // e.g. "68 reg"
  price: number;
  mileage: number | null; // null = "on request"
  engine: string;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  colour: string;
  doors: number;
  bodyStyle: string;
  status: StockStatus;
  // Palette tone used for the placeholder artwork until real photos are added.
  tone: "navy" | "charcoal" | "midnight" | "slate";
  // Real photos live in /public/stock/<slug>/… — leave empty to use the placeholder.
  images: string[];
  summary: string;
  features: string[];
};

/**
 * Seed stock — used to populate the database (or the local JSON file in dev)
 * the first time the app runs. After that, listings are managed from /admin
 * and read through lib/db.ts.
 */
export const seedStock: Car[] = [
  {
    slug: "toyota-aygo-x-play-68",
    make: "Toyota",
    model: "Aygo",
    title: "Toyota Aygo 1.0 VVT-i x-play",
    year: 2018,
    plateAge: "68 reg",
    price: 4395,
    mileage: null,
    engine: "1.0 VVT-i",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Red",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "navy",
    images: [],
    summary:
      "Fully repaired and finished in-house to our own standard. Ideal first car or city runaround — cheap to run, cheap to insure and ready to drive away.",
    features: [
      "£20 a year road tax",
      "Low insurance group",
      "Bluetooth & DAB",
      "Air conditioning",
      "Electric windows",
      "Full service history",
      "12 months MOT",
      "Fresh professional respray",
    ],
  },
];

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatMileage(n: number | null) {
  if (n === null) return "On request";
  return `${new Intl.NumberFormat("en-GB").format(n)} miles`;
}
