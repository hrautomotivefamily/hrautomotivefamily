"use client";

import { useState } from "react";

/**
 * The hero background. Once you upload public/brand/logo-white.png it shows your
 * real logo as a large, subtle watermark. Until then it renders a clean, premium
 * brand wash (no illustrated car).
 */
export function HeroBackdrop() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/brand/logo-white.png"
          alt=""
          aria-hidden
          onError={() => setFailed(true)}
          className="pointer-events-none absolute right-[-4%] top-1/2 w-[62%] max-w-3xl -translate-y-1/2 object-contain opacity-[0.08]"
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
