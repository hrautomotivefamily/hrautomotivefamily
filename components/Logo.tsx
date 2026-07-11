import type { SVGProps } from "react";

/**
 * HR Automotive mark — a sleek sports-car roofline silhouette echoing the
 * brand logo. Monotone (uses currentColor) so it adapts to light/dark and to
 * the transparent hero header.
 *
 * To use the real logo artwork instead, drop it in public/brand/ and swap this
 * component for a next/image (see public/brand/README.md).
 */
export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 60 38"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      {/* main roofline swoosh */}
      <path
        d="M3 24C6 23.2 8 22 11 19.5C16 12.5 24 9 33 10C43 11 51 15.5 57 24"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* lower front accent swoosh */}
      <path
        d="M2 29C7 27.4 13 26.6 20 27"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* headlight / character notch */}
      <path
        d="M20 18.5C22.5 17.4 25.5 16.8 29 16.9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

/**
 * Stacked lockup: the mark above the HR AUTOMOTIVE wordmark. Used where the
 * full identity reads well on a light surface (footer badge, business cards).
 */
export function LogoLockup({
  className = "",
  navy = "#0F2D52",
  charcoal = "#2E3135",
}: {
  className?: string;
  navy?: string;
  charcoal?: string;
}) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="HR Automotive">
      {/* car silhouette */}
      <path
        d="M18 62C30 58 40 52 52 40C74 20 108 12 138 18C168 24 194 40 206 64"
        stroke={navy}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M14 76C40 68 66 66 96 70"
        stroke={charcoal}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* HR */}
      <text
        x="110"
        y="112"
        textAnchor="middle"
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight="800"
        fontSize="58"
        letterSpacing="2"
      >
        <tspan fill={navy}>H</tspan>
        <tspan fill={charcoal}>R</tspan>
      </text>
      {/* AUTOMOTIVE */}
      <text
        x="110"
        y="136"
        textAnchor="middle"
        fontFamily="var(--font-montserrat), sans-serif"
        fontWeight="600"
        fontSize="18"
        letterSpacing="7"
        fill={navy}
      >
        AUTOMOTIVE
      </text>
    </svg>
  );
}
