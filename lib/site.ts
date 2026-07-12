export const site = {
  name: "HR Automotive",
  tagline: "Family Run. Professionally Done.",
  email: "HRautomotivefamily@gmail.com",
  // TODO: replace with your real number — used for the click-to-call buttons
  phone: "+44 0000 000000",
  phoneDisplay: "Call us today",
  facebook: "https://www.facebook.com/share/1CuheSyDLS/",
  website: "www.hrautomotive.co.uk",
  locality: "Halifax",
  region: "West Yorkshire",
  address: "Halifax, West Yorkshire",
  description:
    "Halifax's family-run bodyshop. Expert accident repairs, bodywork and paint restoration completed with pride, precision and honest workmanship — professional results without dealership prices.",
};

// Local areas served — powers copy and local SEO
export const areaServed = [
  "Halifax",
  "Calderdale",
  "Brighouse",
  "Elland",
  "Sowerby Bridge",
  "Hebden Bridge",
  "Huddersfield",
  "Bradford",
];

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Our Work", href: "/#work" },
  { label: "Cars for Sale", href: "/stock" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export const services = [
  {
    title: "Accident Repairs",
    description:
      "Complete collision repair restoring your vehicle to pre-accident condition and factory safety standards.",
    icon: "shield",
  },
  {
    title: "Bodywork",
    description:
      "Precision panel work and structural repair carried out by time-served craftsmen.",
    icon: "panel",
  },
  {
    title: "Dent Removal",
    description:
      "Paintless and filled dent removal that leaves surfaces flawlessly smooth.",
    icon: "dent",
  },
  {
    title: "Scratch Repairs",
    description:
      "Invisible scratch correction with expertly blended, colour-matched paint.",
    icon: "scratch",
  },
  {
    title: "Panel Replacement",
    description:
      "Genuine and quality panel replacement fitted and finished to OEM tolerances.",
    icon: "swap",
  },
  {
    title: "Paintwork",
    description:
      "Show-quality paint applied in a controlled, dust-free spray environment.",
    icon: "spray",
  },
  {
    title: "Resprays",
    description:
      "Full and partial resprays that renew your vehicle's finish end to end.",
    icon: "car",
  },
  {
    title: "Insurance Repairs",
    description:
      "Approved insurance work handled directly, with honest, transparent updates.",
    icon: "doc",
  },
  {
    title: "Alloy Wheel Repairs",
    description:
      "Kerb damage, corrosion and refinishing to bring wheels back to new.",
    icon: "wheel",
  },
  {
    title: "Oil Changes & Servicing",
    description:
      "Affordable oil changes and routine servicing — quality parts and honest prices to keep you moving.",
    icon: "oil",
  },
  {
    title: "Vehicle Restoration",
    description:
      "Careful, meticulous restoration that honours the character of every vehicle.",
    icon: "sparkle",
  },
];

export const processStages = [
  {
    number: "01",
    title: "Initial Assessment",
    description:
      "We listen first, then evaluate your vehicle and talk you through honest options — no pressure, no surprises.",
  },
  {
    number: "02",
    title: "Damage Inspection",
    description:
      "A detailed inspection identifies every affected area, seen and unseen, before any work begins.",
  },
  {
    number: "03",
    title: "Panel Repair",
    description:
      "Skilled panel work restores form and structure with meticulous attention to every line.",
  },
  {
    number: "04",
    title: "Preparation",
    description:
      "Surfaces are cleaned, sanded and primed to create the perfect foundation for paint.",
  },
  {
    number: "05",
    title: "Paint Matching",
    description:
      "Computerised colour matching ensures a seamless, factory-accurate finish every time.",
  },
  {
    number: "06",
    title: "Professional Spray Finish",
    description:
      "Paint is applied in a controlled booth for a deep, even and durable result.",
  },
  {
    number: "07",
    title: "Polishing",
    description:
      "Hand and machine polishing brings the finish to a flawless, mirror-like shine.",
  },
  {
    number: "08",
    title: "Quality Inspection",
    description:
      "Every repair is checked against our exacting standards before it leaves us.",
  },
  {
    number: "09",
    title: "Customer Collection",
    description:
      "We hand your vehicle back proudly — cleaned, finished and done right.",
  },
];

export const testimonials = [
  {
    quote:
      "The finish on my car is genuinely better than the dealership quoted, and at a fraction of the price. Honest, friendly and clearly proud of their work.",
    name: "Sarah M.",
    detail: "Accident repair • Halifax",
  },
  {
    quote:
      "You would never know there was ever any damage. The colour match is perfect. A proper family business that treats you like a person, not a number.",
    name: "James T.",
    detail: "Bodywork & respray • Brighouse",
  },
  {
    quote:
      "Kept me updated the whole way through and the paintwork is immaculate. I wouldn't trust anyone else with my car now.",
    name: "Priya K.",
    detail: "Scratch & panel repair • Huddersfield",
  },
  {
    quote:
      "Fair pricing, exceptional workmanship and no hard sell. They fixed exactly what was needed and the result is showroom quality.",
    name: "Daniel R.",
    detail: "Alloy & bodywork • Sowerby Bridge",
  },
];

export const openingHours = [
  { day: "Monday – Friday", hours: "8:00 – 18:00" },
  { day: "Saturday", hours: "9:00 – 14:00" },
  { day: "Sunday", hours: "Closed" },
];

// Structured opening hours for schema.org (search engines).
export const hoursSpec = [
  {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  { days: ["Saturday"], opens: "09:00", closes: "14:00" },
];

// Approximate Halifax town-centre coordinates for local map/search.
// TODO: replace with your exact workshop location.
export const geo = { latitude: 53.7247, longitude: -1.8577 };

