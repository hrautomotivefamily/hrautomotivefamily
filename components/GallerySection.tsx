import { getGallery } from "@/lib/db";
import { Gallery } from "./Gallery";
import { Reveal } from "./Reveal";
import { Icon } from "./Icons";
import { site } from "@/lib/site";

/**
 * Server wrapper for the "Our Recent Work" gallery. Shows the photos managed in
 * /admin/gallery. When none have been added yet it shows a tidy placeholder so
 * the section (and its nav anchor) still exists.
 */
export async function GallerySection() {
  const items = await getGallery();
  if (items.length > 0) return <Gallery items={items} />;

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32"
      style={{ backgroundColor: "var(--bg-subtle)" }}
    >
      <div className="container-px">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Our Recent Work</span>
          <h2 className="mt-4 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            The latest out of our workshop
          </h2>
          <p className="mt-5 text-lg text-muted">
            We&apos;re adding photos of our latest jobs here soon. In the
            meantime, see plenty more on our Facebook page.
          </p>
          {site.facebook && (
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-8"
            >
              <Icon name="facebook" width={18} height={18} />
              See our work on Facebook
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
