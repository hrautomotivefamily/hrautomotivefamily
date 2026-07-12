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

  // --- Forecourt stock (prices are estimates — confirm/adjust each in /admin) ---
  {
    slug: "toyota-auris-62",
    make: "Toyota",
    model: "Auris",
    title: "Toyota Auris 1.33 VVT-i",
    year: 2012,
    plateAge: "62 reg",
    price: 4995,
    mileage: null,
    engine: "1.33 VVT-i",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Silver",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "slate",
    images: [],
    summary:
      "Reliable, spacious family hatchback with Toyota dependability. Cheap to run and well looked after.",
    features: ["12 months MOT", "Air conditioning", "Bluetooth", "Alloy wheels", "Service history"],
  },
  {
    slug: "fiat-punto-evo-10",
    make: "Fiat",
    model: "Punto Evo",
    title: "Fiat Punto Evo 1.4",
    year: 2010,
    plateAge: "10 reg",
    price: 1795,
    mileage: null,
    engine: "1.4",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Black",
    doors: 3,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "charcoal",
    images: [],
    summary:
      "Budget-friendly first car — cheap to insure and easy to run. Ideal for a new driver.",
    features: ["12 months MOT", "Air conditioning", "Electric windows", "Alloy wheels"],
  },
  {
    slug: "peugeot-108-red-16",
    make: "Peugeot",
    model: "108",
    title: "Peugeot 108 Active 1.0",
    year: 2016,
    plateAge: "16 reg",
    price: 4795,
    mileage: null,
    engine: "1.0",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Red",
    doors: 3,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "navy",
    images: [],
    summary:
      "Low road tax and low insurance — a perfect city car. Economical and cheap to run.",
    features: ["£0–£20 road tax", "Low insurance group", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "citroen-c1-red-15",
    make: "Citroën",
    model: "C1",
    title: "Citroën C1 Feel 1.0",
    year: 2015,
    plateAge: "15 reg",
    price: 4295,
    mileage: null,
    engine: "1.0",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Red",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "midnight",
    images: [],
    summary:
      "Nippy, economical 5-door city car with cheap running costs. Great first car.",
    features: ["Low road tax", "Low insurance group", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "renault-clio-65",
    make: "Renault",
    model: "Clio",
    title: "Renault Clio 1.2",
    year: 2015,
    plateAge: "65 reg",
    price: 4795,
    mileage: null,
    engine: "1.2",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Black",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "charcoal",
    images: [],
    summary:
      "Stylish and well-equipped supermini. Comfortable, economical and ready to drive away.",
    features: ["Air conditioning", "Bluetooth & media", "Alloy wheels", "12 months MOT"],
  },
  {
    slug: "citroen-c1-red-67",
    make: "Citroën",
    model: "C1",
    title: "Citroën C1 Flair 1.0",
    year: 2017,
    plateAge: "67 reg",
    price: 5295,
    mileage: null,
    engine: "1.0",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Red",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "navy",
    images: [],
    summary:
      "Later-plate C1 with low mileage feel and cheap running costs. Ideal economical runaround.",
    features: ["Low road tax", "Touchscreen & Bluetooth", "Reversing camera", "12 months MOT"],
  },
  {
    slug: "toyota-aygo-automatic",
    make: "Toyota",
    model: "Aygo",
    title: "Toyota Aygo 1.0 Automatic",
    year: 2012,
    plateAge: "",
    price: 2995,
    mileage: null,
    engine: "1.0",
    transmission: "Automatic",
    fuel: "Petrol",
    colour: "Silver",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "slate",
    images: [],
    summary:
      "Automatic city car — easy to drive, cheap to run and cheap to insure. Perfect town car.",
    features: ["Automatic gearbox", "Low road tax", "Low insurance group", "12 months MOT"],
  },
  {
    slug: "audi-a4-s-line-12",
    make: "Audi",
    model: "A4",
    title: "Audi A4 2.0 TDI S line",
    year: 2012,
    plateAge: "12 reg",
    price: 6995,
    mileage: null,
    engine: "2.0 TDI",
    transmission: "Manual",
    fuel: "Diesel",
    colour: "Blue",
    doors: 4,
    bodyStyle: "Saloon",
    status: "available",
    tone: "midnight",
    images: [],
    summary:
      "Smart S line saloon with sporty styling and a punchy, economical diesel engine. A real head-turner.",
    features: ["S line styling", "Alloy wheels", "Air conditioning", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "peugeot-108-white-65",
    make: "Peugeot",
    model: "108",
    title: "Peugeot 108 Active 1.0",
    year: 2015,
    plateAge: "65 reg",
    price: 4495,
    mileage: null,
    engine: "1.0",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "White",
    doors: 3,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "navy",
    images: [],
    summary:
      "Clean white 108 with low running costs — a brilliant, economical first car.",
    features: ["Low road tax", "Low insurance group", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "peugeot-108-black-16",
    make: "Peugeot",
    model: "108",
    title: "Peugeot 108 Active 1.0",
    year: 2016,
    plateAge: "16 reg",
    price: 4795,
    mileage: null,
    engine: "1.0",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Black",
    doors: 5,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "charcoal",
    images: [],
    summary:
      "5-door 108 in black — economical, easy to park and cheap to run. Ideal city car.",
    features: ["Low road tax", "Low insurance group", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "seat-ibiza-12",
    make: "SEAT",
    model: "Ibiza",
    title: "SEAT Ibiza 1.4",
    year: 2012,
    plateAge: "12 reg",
    price: 2995,
    mileage: null,
    engine: "1.4",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "White",
    doors: 3,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "slate",
    images: [],
    summary:
      "Sporty-looking Ibiza with a keen drive. Great value supermini, cheap to run and insure.",
    features: ["Air conditioning", "Alloy wheels", "Bluetooth", "12 months MOT"],
  },
  {
    slug: "ford-fiesta-61",
    make: "Ford",
    model: "Fiesta",
    title: "Ford Fiesta 1.25 Zetec",
    year: 2011,
    plateAge: "61 reg",
    price: 2795,
    mileage: null,
    engine: "1.25",
    transmission: "Manual",
    fuel: "Petrol",
    colour: "Black",
    doors: 3,
    bodyStyle: "Hatchback",
    status: "available",
    tone: "charcoal",
    images: [],
    summary:
      "The UK's favourite supermini — fun to drive, economical and cheap to run. Well looked after.",
    features: ["Air conditioning", "Alloy wheels", "Bluetooth", "12 months MOT"],
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
