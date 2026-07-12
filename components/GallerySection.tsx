import { getGallery } from "@/lib/db";
import { Gallery } from "./Gallery";

/**
 * Server wrapper: shows ONLY the photos managed in /admin/gallery. If none have
 * been added, the whole gallery section is hidden (no placeholder tiles).
 */
export async function GallerySection() {
  const items = await getGallery();
  if (items.length === 0) return null;
  return <Gallery items={items} />;
}
