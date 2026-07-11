"use client";

import { useState } from "react";
import { Logo } from "./Logo";

/**
 * Shows the real HR Automotive logo image when it has been uploaded to
 * public/brand/, otherwise falls back to the SVG car mark + wordmark so the
 * site always looks complete.
 *
 * Upload BOTH of these (via GitHub → Add file → Upload files):
 *   public/brand/logo.png        — full-colour logo (for light backgrounds)
 *   public/brand/logo-white.png  — white/knockout logo (for the navy header/footer)
 *
 * When the image is present it replaces the "HR Automotive" text automatically.
 */
export function BrandLogo({
  dark = false,
  heightClass = "h-9",
  markClass,
  textClass,
}: {
  /** true on a dark background (navy hero / footer) — uses the white logo. */
  dark?: boolean;
  heightClass?: string;
  markClass?: string;
  textClass?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = dark ? "/brand/logo-white.png" : "/brand/logo.png";

  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="HR Automotive"
        onError={() => setFailed(true)}
        className={`${heightClass} w-auto`}
      />
    );
  }

  // Fallback: SVG car mark + wordmark
  return (
    <span className="flex items-center gap-3">
      <Logo className={`h-7 w-auto ${markClass ?? (dark ? "text-white" : "text-accent")}`} />
      <span
        className={`font-heading text-lg font-bold tracking-tight ${
          textClass ?? (dark ? "text-white" : "text-[color:var(--fg)]")
        }`}
      >
        HR Automotive
      </span>
    </span>
  );
}
