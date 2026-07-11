# HR Automotive

> Family Run. Professionally Done.

A premium, modern, fully responsive marketing website for **HR Automotive** — a
family-run vehicle repair and bodywork business. The design language draws on
Apple, Porsche, BMW, Audi and Volvo: minimalist, elegant, trustworthy and
premium, with generous white space and refined motion.

## ✨ Features

- **Full-screen hero** with layered brand artwork and staggered fade-in.
- **Interactive Before & After slider** — drag the glass-style handle (mouse,
  touch and keyboard supported) across multiple repair examples.
- **Scroll-animated repair process timeline** — nine stages with an animated
  progress line and alternating cards.
- **Premium service cards** with smooth hover states.
- **Masonry gallery** with a full-screen lightbox (keyboard + swipe navigation).
- **Testimonial cards** focused on trust and craftsmanship.
- **Contact section** — click-to-call, email, contact form, opening hours and a
  Google Map placeholder.
- **Business cards page** (`/business-cards`) — front & back designs plus the
  brand palette, using the exact brand colours and a scannable QR placeholder.
- **Dark mode**, sticky glassmorphism navigation, smooth scrolling and reduced-
  motion support.
- **SEO-ready** — metadata, Open Graph, JSON-LD (`AutoRepair`), sitemap & robots.

## 🎨 Brand

| Token        | Hex       |
| ------------ | --------- |
| Navy         | `#0F2D52` |
| Charcoal     | `#2E3135` |
| White        | `#FFFFFF` |
| Light BG     | `#F6F7F8` |
| Accent Blue  | `#1E88E5` |
| Success      | `#2E7D32` |
| Text         | `#1B1B1B` |

- **Headings:** Montserrat (Bold)
- **Body:** Inter

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- next-themes (dark mode)

All imagery is crafted as in-brand, optimisation-free inline SVG, so the site
has no external image dependencies and loads fast with a high Lighthouse score.

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

## 📁 Structure

```
app/
  layout.tsx            # fonts, metadata, theme provider
  page.tsx              # home page (assembles all sections)
  business-cards/       # business card designs
  globals.css           # design tokens & component classes
  sitemap.ts, robots.ts # SEO
components/              # Hero, BeforeAfter, ProcessTimeline, Services,
                         # Gallery, Testimonials, Contact, Footer, etc.
lib/site.ts             # all copy & data (single source of truth)
```

## 🔐 Admin — managing car listings

Listings are managed from a password-protected dashboard at **`/admin`**
(create, edit, delete and mark **Available · Reserved · Sold**). The public
`Cars for Sale` pages read from the same store automatically.

**Storage**

- **Production (Vercel / Render):** set `DATABASE_URL` to a Postgres connection
  string — a free database from [neon.tech](https://neon.tech) works well. The
  `cars` table is created and seeded automatically on first run.
- **Development / local:** no database needed. Listings are saved to a local
  file at `.data/stock.json` (git-ignored).

**Environment variables** (see `.env.example`):

| Variable               | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `ADMIN_PASSWORD`       | Password to sign in to `/admin` (**required**).    |
| `ADMIN_SESSION_SECRET` | Optional secret for the session cookie.            |
| `DATABASE_URL`         | Postgres connection string for production storage. |

For local development, copy `.env.example` to `.env.local` and set at least
`ADMIN_PASSWORD`, then visit `http://localhost:3000/admin`.

## 🔌 Wiring up before launch

A few placeholders are ready to be connected:

- **Phone number** — set in `lib/site.ts` (`phone`).
- **Contact form** — `components/Contact.tsx` currently shows a success state on
  submit; connect it to an email service or API route.
- **Google Map** — replace the map placeholder in `components/Contact.tsx` with
  an embedded iframe.
- **QR code** — `components/QRCode.tsx` is decorative; swap for a generated code
  pointing at the quote form before printing business cards.

---

© HR Automotive. All rights reserved.
