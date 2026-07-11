import type { MetadataRoute } from "next";
import { stock } from "@/lib/stock";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hrautomotive.co.uk";
  const now = new Date();

  const carPages: MetadataRoute.Sitemap = stock.map((car) => ({
    url: `${base}/stock/${car.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/stock`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${base}/business-cards`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...carPages,
  ];
}
