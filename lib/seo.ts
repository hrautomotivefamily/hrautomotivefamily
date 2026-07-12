/**
 * Canonical site URL used for metadata, canonical tags, sitemap and JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL in your host to your real public domain, e.g.
 *   NEXT_PUBLIC_SITE_URL=https://hrautomotive.co.uk
 * Otherwise it auto-detects Render / Vercel, then falls back to a default.
 */
export function getBaseUrl(): string {
  const clean = (u: string) => u.replace(/\/+$/, "");
  if (process.env.NEXT_PUBLIC_SITE_URL) return clean(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.RENDER_EXTERNAL_URL) return clean(process.env.RENDER_EXTERNAL_URL);
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://hrautomotive.co.uk";
}
