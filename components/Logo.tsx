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
    <svg viewBox="0 0 124 60" fill="none" aria-hidden="true" {...props}>
      {/* sleek sports-car side silhouette */}
      <path
        fill="currentColor"
        d="M9 47
           C7 44 8 40 12 38
           L22 34
           C30 25 44 19 60 18
           C74 17.2 86 19 97 25
           C104 28.5 110 31 117 33
           C121 34 122 37 121 41
           L120 45
           C119.5 47 118 48 116 48
           L106 48
           A11 11 0 0 0 84 48
           L47 48
           A11 11 0 0 0 25 48
           L14 48
           C11.5 48 9.8 48 9 47 Z"
      />
      {/* wheels */}
      <circle cx="36" cy="47.5" r="7.5" fill="none" stroke="currentColor" strokeWidth="3.4" />
      <circle cx="95" cy="47.5" r="7.5" fill="none" stroke="currentColor" strokeWidth="3.4" />
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
