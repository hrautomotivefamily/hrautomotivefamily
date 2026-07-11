import type { Tone } from "@/lib/showcase";

const grad: Record<Tone, string> = {
  navy: "linear-gradient(135deg,#16335c 0%,#0b1c33 100%)",
  charcoal: "linear-gradient(135deg,#3a4047 0%,#202327 100%)",
  midnight: "linear-gradient(135deg,#102a4d 0%,#060f1d 100%)",
  slate: "linear-gradient(135deg,#3c4855 0%,#20272f 100%)",
};

/**
 * A clean, premium branded placeholder shown wherever a real photo hasn't been
 * added yet. Replaces the old illustrated cars with a subtle gradient panel and
 * a faint "HR" watermark, so empty states look intentional rather than fake.
 */
export function Placeholder({
  tone = "navy",
  label,
  className = "",
  dim = false,
}: {
  tone?: Tone;
  label?: string;
  className?: string;
  dim?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{ background: grad[tone] }}
    >
      {/* soft sheen */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 28% 18%, rgba(255,255,255,0.10), transparent 60%)",
        }}
      />
      {/* faint monogram watermark */}
      <span
        className="select-none font-heading text-6xl font-extrabold tracking-tight text-white sm:text-7xl"
        style={{ opacity: 0.1, lineHeight: 1 }}
        aria-hidden
      >
        HR
      </span>
      {dim && <div className="absolute inset-0 bg-black/25" />}
      {label && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/30 px-3 py-1 text-[11px] font-medium tracking-wide text-white/85 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
