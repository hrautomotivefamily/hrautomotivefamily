import type { CSSProperties } from "react";

type Tone = "navy" | "charcoal" | "steel" | "midnight" | "slate";

const palettes: Record<Tone, { body1: string; body2: string; glass: string; ground: string }> = {
  navy: { body1: "#1E4C86", body2: "#0F2D52", glass: "#8FB4D9", ground: "#0B1B30" },
  charcoal: { body1: "#43484E", body2: "#2E3135", glass: "#9AA3AC", ground: "#1A1C1F" },
  steel: { body1: "#5C7A9E", body2: "#2C4766", glass: "#B9CDE2", ground: "#22303F" },
  midnight: { body1: "#16345C", body2: "#0A1D34", glass: "#6E93BE", ground: "#070F1C" },
  slate: { body1: "#4A5A6B", body2: "#28323C", glass: "#A7B6C4", ground: "#161D24" },
};

type CarSceneProps = {
  variant?: "repaired" | "damaged";
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
  /** Unique id seed to avoid gradient collisions when rendered multiple times */
  seed?: string;
};

/**
 * A crafted, brand-accurate SVG of a premium vehicle used across the site.
 * The "damaged" variant adds dents, scratches and a dull finish; "repaired"
 * shows a flawless, glossy showroom result.
 */
export function CarScene({
  variant = "repaired",
  tone = "navy",
  className,
  style,
  seed = "car",
}: CarSceneProps) {
  const p = palettes[tone];
  const repaired = variant === "repaired";
  const uid = `${seed}-${variant}-${tone}`;

  return (
    <svg
      viewBox="0 0 1200 750"
      className={className}
      style={style}
      role="img"
      aria-label={
        repaired
          ? "Professionally repaired vehicle with a flawless finish"
          : "Vehicle before repair showing damage"
      }
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={repaired ? "#12325a" : "#20242a"} />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.body1} />
          <stop offset="0.55" stopColor={p.body2} />
          <stop offset="1" stopColor={p.ground} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.glass} stopOpacity="0.95" />
          <stop offset="1" stopColor={p.body2} stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id={`spot-${uid}`} cx="0.5" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#ffffff" stopOpacity={repaired ? "0.16" : "0.05"} />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0d1b30" />
          <stop offset="1" stopColor="#05101d" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect width="1200" height="750" fill={`url(#sky-${uid})`} />
      <rect width="1200" height="750" fill={`url(#spot-${uid})`} />
      <rect y="560" width="1200" height="190" fill="#060d18" opacity="0.85" />

      {/* soft floor reflection */}
      <ellipse cx="600" cy="612" rx="470" ry="42" fill="#000" opacity="0.45" />

      {/* car group */}
      <g transform="translate(0 8)">
        {/* body shell */}
        <path
          d="M205 470
             C 250 402 300 388 360 384
             C 402 342 470 300 560 290
             C 690 276 812 300 890 350
             C 946 360 992 384 1006 470
             L 1006 512
             C 1006 528 994 540 978 540
             L 236 540
             C 216 540 200 526 200 506
             Z"
          fill={`url(#body-${uid})`}
          stroke={repaired ? "#000" : "#111"}
          strokeOpacity="0.25"
          strokeWidth="2"
        />

        {/* roof + cabin glass */}
        <path
          d="M430 356
             C 470 322 520 306 588 300
             C 690 292 780 312 838 352
             L 792 366
             C 726 336 640 330 574 340
             C 520 348 484 366 470 380
             Z"
          fill={`url(#glass-${uid})`}
          opacity="0.9"
        />
        {/* window pillars */}
        <path d="M604 302 L600 366" stroke={p.body2} strokeWidth="8" opacity="0.7" />
        <path d="M712 306 L720 360" stroke={p.body2} strokeWidth="8" opacity="0.7" />

        {/* highlight sweep along the body (gloss) */}
        <path
          d="M250 452 C 420 420 760 420 966 452"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={repaired ? "0.5" : "0.12"}
          strokeWidth={repaired ? "3" : "2"}
          strokeLinecap="round"
        />
        <path
          d="M300 486 C 480 470 740 470 930 486"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={repaired ? "0.18" : "0.06"}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* door line */}
        <path d="M598 360 L598 528" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />
        <path d="M760 356 L772 528" stroke="#000" strokeOpacity="0.2" strokeWidth="2" />

        {/* headlight */}
        <path
          d="M968 452 q 30 6 34 30 l -40 0 q -6 -22 6 -30 Z"
          fill={repaired ? "#dfeafc" : "#7d848c"}
          opacity="0.95"
        />
        {/* tail light */}
        <rect x="206" y="452" width="26" height="20" rx="6" fill={repaired ? "#3f6ea8" : "#4a4f55"} />

        {/* wheels */}
        {[360, 840].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="540" r="72" fill="#0a0f16" />
            <circle cx={cx} cy="540" r="72" fill="none" stroke="#000" strokeWidth="3" opacity="0.6" />
            <circle cx={cx} cy="540" r="40" fill="#1c222b" />
            <circle cx={cx} cy="540" r="40" fill="none" stroke={p.glass} strokeOpacity="0.5" strokeWidth="2" />
            {Array.from({ length: 5 }).map((_, i) => {
              const a = (i / 5) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={cx}
                  y1="540"
                  x2={cx + Math.cos(a) * 38}
                  y2={540 + Math.sin(a) * 38}
                  stroke={p.glass}
                  strokeOpacity="0.55"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx={cx} cy="540" r="8" fill={p.glass} opacity="0.8" />
          </g>
        ))}

        {/* DAMAGE overlays */}
        {!repaired && (
          <g>
            {/* dull haze */}
            <path
              d="M205 470 C 250 402 300 388 360 384 C 402 342 470 300 560 290 C 690 276 812 300 890 350 C 946 360 992 384 1006 470 L 1006 512 C 1006 528 994 540 978 540 L 236 540 C 216 540 200 526 200 506 Z"
              fill="#0a0d10"
              opacity="0.28"
            />
            {/* crumpled dent on front door */}
            <path
              d="M640 400 q 40 20 20 70 q -30 24 -70 8 q -8 -50 50 -78 Z"
              fill="#000"
              opacity="0.22"
            />
            <path
              d="M648 412 q 26 16 12 52 M636 430 q 20 8 26 34"
              stroke="#000"
              strokeOpacity="0.3"
              strokeWidth="2"
              fill="none"
            />
            {/* scratches */}
            <path d="M470 470 l120 -14" stroke="#cfd6de" strokeOpacity="0.5" strokeWidth="2" />
            <path d="M480 486 l90 -8" stroke="#cfd6de" strokeOpacity="0.35" strokeWidth="1.5" />
            <path d="M820 452 l70 8" stroke="#cfd6de" strokeOpacity="0.4" strokeWidth="2" />
            {/* rust / paint chip */}
            <circle cx="915" cy="474" r="12" fill="#7a5a3a" opacity="0.55" />
            <circle cx="905" cy="486" r="6" fill="#7a5a3a" opacity="0.4" />
            {/* cracked headlight */}
            <path d="M974 460 l16 18 M980 456 l6 30" stroke="#2a2f35" strokeWidth="1.5" />
          </g>
        )}

        {/* REPAIRED sparkle accents */}
        {repaired && (
          <g fill="#ffffff">
            <path d="M700 372 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" opacity="0.85" />
            <path d="M905 420 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" opacity="0.6" />
            <circle cx="520" cy="410" r="2.5" opacity="0.7" />
          </g>
        )}
      </g>
    </svg>
  );
}
