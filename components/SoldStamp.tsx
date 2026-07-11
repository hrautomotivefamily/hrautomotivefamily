/**
 * A large diagonal "SOLD" (or "RESERVED") rubber-stamp overlay for listings.
 * Sits over the car photo. Uses a deep, classic stamp red — not a bright/neon
 * red — so it stays premium while being unmistakable.
 */
export function SoldStamp({
  label = "SOLD",
  size = "md",
}: {
  label?: string;
  size?: "sm" | "md" | "lg";
}) {
  const text =
    size === "lg" ? "text-6xl sm:text-7xl" : size === "sm" ? "text-2xl" : "text-4xl sm:text-5xl";
  const pad = size === "lg" ? "px-10 py-4" : size === "sm" ? "px-4 py-1.5" : "px-7 py-2.5";
  const border = size === "sm" ? "border-2" : "border-[3px]";

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/35" />
      <span
        className={`relative -rotate-[14deg] rounded-xl2 ${border} ${pad} font-heading font-extrabold uppercase tracking-[0.15em] ${text}`}
        style={{
          color: "#C0261E",
          borderColor: "#C0261E",
          backgroundColor: "rgba(255,255,255,0.10)",
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
