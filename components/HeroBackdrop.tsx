"use client";

import { useState } from "react";

/**
 * The hero background. Once you upload public/brand/hero.jpg it shows that photo
 * as the full-bleed hero background (the navy gradient overlays in Hero.tsx keep
 * the white text readable on top). Until then it falls back to a large, subtle
 * "HR" brand wash.
 */
export function HeroBackdrop() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/hero.jpg"
          alt=""
          aria-hidden
          onError={() => setFailed(true)}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute right-[2%] top-1/2 -translate-y-1/2 select-none font-heading text-[26vw] font-extrabold leading-none tracking-tighter text-white lg:text-[20rem]"
          style={{ opacity: 0.05 }}
        >
          HR
        </span>
      )}
    </div>
  );
}
