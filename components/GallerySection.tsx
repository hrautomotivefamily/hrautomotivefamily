import { getGallery } from "@/lib/db";
import { galleryItems as seedGallery } from "@/lib/showcase";
import { Gallery } from "./Gallery";

/**
 * Server wrapper: loads gallery images managed in /admin. If none have been
 * added yet, it shows the branded placeholder tiles so the section still looks
 * complete.
 */
export async function GallerySection() {
  const stored = await getGallery();
  const items = stored.length > 0 ? stored : seedGallery;
  return <Gallery items={items} />;
}
