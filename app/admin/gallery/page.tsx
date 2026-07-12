import type { Metadata } from "next";
import Link from "next/link";
import { getGallery } from "@/lib/db";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Gallery",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: { saved?: string; deleted?: string; error?: string };
}) {
  const items = await getGallery();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-subtle)" }}>
      <div className="container-px py-10">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
        >
          <Icon name="arrow" width={16} height={16} className="rotate-180" />
          Back to listings
        </Link>

        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="mt-1 text-muted">
            Photos shown in the homepage gallery. {items.length}{" "}
            {items.length === 1 ? "photo" : "photos"}.
          </p>
        </div>

        {(searchParams.saved || searchParams.deleted) && (
          <p className="mb-6 flex items-center gap-2 rounded-xl2 bg-success/10 px-4 py-3 text-sm text-success">
            <Icon name="check" width={16} height={16} />
            {searchParams.saved ? "Saved." : "Photo deleted."}
          </p>
        )}
        {searchParams.error && (
          <p className="mb-6 flex items-start gap-2 rounded-xl2 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
            <Icon name="close" width={16} height={16} className="mt-0.5 shrink-0" />
            {searchParams.error}
          </p>
        )}

        <div className="max-w-5xl">
          <GalleryManager items={items} />
        </div>
      </div>
    </div>
  );
}
