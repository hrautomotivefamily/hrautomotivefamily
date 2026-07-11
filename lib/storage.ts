import "server-only";
import { promises as fs } from "fs";
import path from "path";

/**
 * Image storage adapter.
 *
 * - Production: set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (and optionally
 *   SUPABASE_BUCKET, default "car-photos"). Uploaded photos are stored in
 *   Supabase Storage and served from its public CDN.
 * - Development: no config needed — files are written to public/uploads/ and
 *   served locally.
 */

const bucket = process.env.SUPABASE_BUCKET || "car-photos";

export const supabaseConfigured = () =>
  !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

function safeName(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^.a-z0-9]/g, "") || ".jpg";
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "photo";
  const rand = Math.random().toString(36).slice(2, 8);
  return `${base}-${rand}${ext}`;
}

/** Uploads one image and returns its public URL. `folder` groups a car's photos. */
export async function uploadImage(folder: string, file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const filename = safeName(file.name || "photo.jpg");
  const key = `${folder}/${filename}`;

  if (supabaseConfigured()) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { error } = await supabase.storage
      .from(bucket)
      .upload(key, bytes, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const { data } = supabase.storage.from(bucket).getPublicUrl(key);
    return data.publicUrl;
  }

  // Dev fallback: write to public/uploads/<folder>/<filename>
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), bytes);
  return `/uploads/${folder}/${filename}`;
}

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_BYTES = 12 * 1024 * 1024; // 12 MB

export function validateImage(file: File): string | null {
  if (file.size === 0) return "Empty file.";
  if (file.size > MAX_BYTES) return "Image is larger than 12 MB.";
  if (file.type && !ALLOWED.includes(file.type)) {
    return "Unsupported format — use JPG, PNG, WebP or AVIF.";
  }
  return null;
}
