# Car photos

Drop each car's photos into a folder named after its `slug` (see `lib/stock.ts`),
then list them in that car's `images` array. The first image is the cover.

```
public/stock/
  toyota-aygo-x-play-68/
    1.jpg   ← cover
    2.jpg
    3.jpg
```

```ts
// lib/stock.ts
images: [
  "/stock/toyota-aygo-x-play-68/1.jpg",
  "/stock/toyota-aygo-x-play-68/2.jpg",
  "/stock/toyota-aygo-x-play-68/3.jpg",
],
```

If `images` is empty, a branded placeholder is shown automatically.

## Number plates

Blur or pixelate any visible number plate before adding a photo (privacy). If you
send the originals, they can be redacted and optimised (WebP/AVIF) as part of
adding them here.
