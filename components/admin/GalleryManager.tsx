"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addGalleryImages,
  renameGalleryImage,
  removeGalleryImage,
} from "@/app/admin/actions";
import { Icon } from "@/components/Icons";
import { ConfirmButton } from "./ConfirmButton";
import type { GalleryItem } from "@/lib/showcase";

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("folder", "gallery");
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      const result = await addGalleryImages(
        (data.urls as string[]).map((src) => ({ src }))
      );
      if (result?.error) throw new Error(result.error);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {/* uploader */}
      <label
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-hair px-6 py-10 text-center transition-colors hover:border-accent ${
          uploading ? "opacity-60" : ""
        }`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onFiles(e.target.files)}
        />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy dark:bg-white/10 dark:text-white">
          <Icon name={uploading ? "clock" : "sparkle"} width={24} height={24} />
        </span>
        <span className="font-heading font-semibold">
          {uploading ? "Uploading…" : "Add photos to the gallery"}
        </span>
        <span className="text-xs text-muted">
          Select one or more images · JPG, PNG or WebP
        </span>
      </label>

      {error && (
        <p className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <Icon name="close" width={14} height={14} />
          {error}
        </p>
      )}

      {/* existing images */}
      {items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="card-surface overflow-hidden rounded-xl2 shadow-soft">
              <div className="relative aspect-[16/10] bg-navy/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="space-y-3 p-4">
                <form action={renameGalleryImage} className="flex gap-2">
                  <input type="hidden" name="id" value={item.id} />
                  <input
                    name="title"
                    defaultValue={item.title}
                    placeholder="Caption"
                    className="min-w-0 flex-1 rounded-lg border border-hair bg-transparent px-3 py-1.5 text-sm outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="rounded-lg border border-hair px-3 text-sm font-semibold hover:border-accent hover:text-accent"
                  >
                    Save
                  </button>
                </form>
                <form action={removeGalleryImage}>
                  <input type="hidden" name="id" value={item.id} />
                  <ConfirmButton
                    confirm="Delete this photo?"
                    className="text-xs font-semibold text-red-600 hover:underline dark:text-red-400"
                  >
                    Delete
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-surface mt-8 rounded-xl2 p-10 text-center shadow-soft">
          <p className="text-lg font-semibold">No gallery photos yet</p>
          <p className="mt-2 text-muted">
            Add photos above. Until then the homepage shows branded placeholders.
          </p>
        </div>
      )}
    </div>
  );
}
