"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/Icons";

export function ImageUploader({
  name = "images",
  initial = [],
  folder,
}: {
  name?: string;
  initial?: string[];
  folder: string;
}) {
  const [images, setImages] = useState<string[]>(initial);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("folder", folder);
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImages((prev) => [...prev, ...(data.urls as string[])]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function remove(url: string) {
    setImages((prev) => prev.filter((u) => u !== url));
  }

  function makeCover(url: string) {
    setImages((prev) => [url, ...prev.filter((u) => u !== url)]);
  }

  return (
    <div>
      <input type="hidden" name={name} value={images.join("\n")} />

      {/* thumbnails */}
      {images.length > 0 && (
        <ul className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((url, i) => (
            <li
              key={url}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-hair"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Photo ${i + 1}`}
                className="h-full w-full object-cover"
              />
              {i === 0 && (
                <span className="absolute left-1.5 top-1.5 rounded-full bg-navy/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Cover
                </span>
              )}
              <div className="absolute inset-0 flex items-end justify-between gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeCover(url)}
                    className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-navy hover:bg-white"
                  >
                    Make cover
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(url)}
                  aria-label="Remove photo"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-red-600 hover:bg-white"
                >
                  <Icon name="close" width={13} height={13} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* dropzone / picker */}
      <label
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl2 border-2 border-dashed border-hair px-6 py-8 text-center transition-colors hover:border-accent ${
          uploading ? "opacity-60" : ""
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={uploading}
          onChange={(e) => onFiles(e.target.files)}
        />
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy/5 text-navy dark:bg-white/10 dark:text-white">
          <Icon name={uploading ? "clock" : "spray"} width={22} height={22} />
        </span>
        <span className="text-sm font-semibold">
          {uploading ? "Uploading…" : "Tap to upload photos"}
        </span>
        <span className="text-xs text-muted">
          JPG, PNG or WebP · up to 12 MB each · first photo is the cover
        </span>
      </label>

      {error && (
        <p className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
          <Icon name="close" width={14} height={14} />
          {error}
        </p>
      )}
    </div>
  );
}
