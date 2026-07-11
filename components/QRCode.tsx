import type { SVGProps } from "react";

/**
 * A decorative, deterministic QR-style placeholder. Swap for a real generated
 * QR code (e.g. pointing to the quote form) before print.
 */
export function QRCode({
  size = 200,
  fg = "#0F2D52",
  bg = "#FFFFFF",
  ...props
}: { size?: number; fg?: string; bg?: string } & SVGProps<SVGSVGElement>) {
  const n = 21; // modules per side (QR v1 style)
  const cell = 100 / n;

  // deterministic pseudo-random pattern
  const filled = (r: number, c: number) => {
    const inFinder = (fr: number, fc: number) =>
      r >= fr && r < fr + 7 && c >= fc && c < fc + 7;
    if (inFinder(0, 0) || inFinder(0, n - 7) || inFinder(n - 7, 0)) return false;
    const v = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
    return v - Math.floor(v) > 0.55;
  };

  const finder = (x: number, y: number) => (
    <g key={`f-${x}-${y}`}>
      <rect x={x * cell} y={y * cell} width={cell * 7} height={cell * 7} fill={fg} />
      <rect
        x={(x + 1) * cell}
        y={(y + 1) * cell}
        width={cell * 5}
        height={cell * 5}
        fill={bg}
      />
      <rect
        x={(x + 2) * cell}
        y={(y + 2) * cell}
        width={cell * 3}
        height={cell * 3}
        fill={fg}
      />
    </g>
  );

  const modules = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (filled(r, c)) {
        modules.push(
          <rect
            key={`${r}-${c}`}
            x={c * cell}
            y={r * cell}
            width={cell}
            height={cell}
            fill={fg}
            rx={cell * 0.18}
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="QR code placeholder — scan to get a free quote"
      {...props}
    >
      <rect width="100" height="100" fill={bg} rx="6" />
      <g transform="translate(4 4) scale(0.92)">
        {modules}
        {finder(0, 0)}
        {finder(n - 7, 0)}
        {finder(0, n - 7)}
      </g>
    </svg>
  );
}
