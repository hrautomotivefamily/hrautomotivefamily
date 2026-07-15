import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const map: Record<string, JSX.Element> = {
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    panel: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M12 6v12M3 12h18" />
      </>
    ),
    dent: (
      <>
        <path d="M4 14c2-6 14-6 16 0" />
        <path d="M9 13c1-2 5-2 6 0" />
        <path d="M4 18h16" />
      </>
    ),
    scratch: (
      <>
        <path d="M4 16 20 6" />
        <path d="M7 18l3-2M11 16l3-2M15 14l3-2" />
      </>
    ),
    swap: (
      <>
        <path d="M4 8h11l-3-3M20 16H9l3 3" />
      </>
    ),
    spray: (
      <>
        <rect x="8" y="9" width="7" height="11" rx="1.5" />
        <path d="M8 9V6h7v3M15 7h3M18 5v4M20 6h.01M20 9h.01" />
      </>
    ),
    car: (
      <>
        <path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5" />
        <path d="M3 13h18v4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1M6 18H5a1 1 0 0 1-1-1v-4" />
        <circle cx="7.5" cy="16.5" r="1.5" />
        <circle cx="16.5" cy="16.5" r="1.5" />
      </>
    ),
    doc: (
      <>
        <path d="M7 3h7l4 4v14a0 0 0 0 1 0 0H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
        <path d="M14 3v4h4M9 12h6M9 16h6" />
      </>
    ),
    wheel: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
      </>
    ),
    sparkle: (
      <>
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
      </>
    ),
    phone: (
      <>
        <path d="M5 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
      </>
    ),
    moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12 4 4 10-10" />,
    quote: (
      <path d="M9 7H5v6h4v-2H7c0-1 .5-2 2-2V7ZM19 7h-4v6h4v-2h-2c0-1 .5-2 2-2V7Z" />
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    star: (
      <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8L12 4Z" />
    ),
    facebook: <path d="M15 5h-1.5A2.5 2.5 0 0 0 11 7.5V21M8.5 11.5H15" />,
    oil: (
      <>
        <path d="M12 3c3.2 4.2 5 6.7 5 9.2a5 5 0 0 1-10 0C7 9.7 8.8 7.2 12 3Z" />
        <path d="M10 13a2 2 0 0 0 2 2" />
      </>
    ),
    van: (
      <>
        <path d="M2 7h10v9H2z" />
        <path d="M12 10h4.5l3 3.5V16H12z" />
        <circle cx="6.5" cy="16.5" r="1.6" />
        <circle cx="16.5" cy="16.5" r="1.6" />
        <path d="M2 16h2.9M8.1 16H15" />
      </>
    ),
  };

  return (
    <svg
      {...base}
      width={props.width ?? 22}
      height={props.height ?? 22}
      aria-hidden="true"
      {...props}
    >
      {map[name] ?? null}
    </svg>
  );
}
