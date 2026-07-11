# Brand assets

The site currently uses an on-brand SVG mark (`components/Logo.tsx`) that echoes
the HR Automotive logo, so nothing depends on an external file.

## Using the real logo artwork

Drop your files here:

```
public/brand/
  logo.png          ← full colour logo (for light backgrounds)
  logo-white.png    ← white/knockout version (for the navy header & footer)
```

High-res PNG (transparent background) or SVG both work. Once added, the header,
footer and business cards can be switched from the SVG mark to your artwork with
a `next/image` in `components/Logo.tsx` — send the files and it'll be wired in.
