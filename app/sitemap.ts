import type { MetadataRoute } from "next";
import { getStock } from "@/lib/db";
import { getBaseUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  let carPages: MetadataRoute.Sitemap = [];
  try {
    const cars = await getStock();
    carPages = cars.map((car) => ({
      url: `${base}/stock/${car.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    /* keep the core pages even if listings can't be loaded */
  }

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
      priority: 0.3,
    },
    ...carPages,
  ];
}
