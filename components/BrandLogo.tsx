"use client";

import { useState } from "react";

/**
 * Shows the real HR Automotive logo image once it has been uploaded to
 * public/brand/, otherwise a clean wordmark. The wordmark is shown by default
 * and only replaced when the image actually loads, so a missing file never
 * flashes a broken image.
 *
 * Upload (via GitHub → Add file → Upload files):
 *   public/brand/logo.png        — full-colour logo (light backgrounds)
 *   public/brand/logo-white.png  — white logo (dark navy header/footer)
 */
export function BrandLogo({
  dark = false,
  heightClass = "h-9",
}: {
  /** true on a dark background (navy hero / footer) — uses the white logo. */
  dark?: boolean;
  heightClass?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const src = dark ? "/brand/logo-white.png" : "/brand/logo.png";

  return (
    <span className="inline-flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="HR Automotive"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        className={`${heightClass} w-auto ${loaded ? "" : "hidden"}`}
      />
      {!loaded && (
        <span
          className={`font-heading text-xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-[color:var(--fg)]"
          }`}
        >
          <span className={dark ? "text-white" : "text-accent"}>HR</span> Automotive
        </span>
      )}
    </span>
  );
}
