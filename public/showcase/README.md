# Before/After & Gallery photos

These are the photos in the homepage **Before & After** slider and the
**Gallery**. Upload your images here (GitHub → Add file → Upload files), then
put the paths into `lib/showcase.ts`.

```
public/showcase/
  aygo-before.jpg
  aygo-after.jpg
  respray-1.jpg
  ...
```

## Before & After slider (`beforeAfterItems` in lib/showcase.ts)

```ts
{ id: "ex1", label: "Front wing collision repair", tone: "navy",
  before: "/showcase/aygo-before.jpg",   // damaged photo
  after:  "/showcase/aygo-after.jpg" },  // finished photo
```

## Gallery (`galleryItems` in lib/showcase.ts)

```ts
{ id: "g1", title: "Executive saloon — full respray", tone: "navy",
  span: "row-span-2", src: "/showcase/respray-1.jpg" },
```

Any `before` / `after` / `src` left blank shows the branded placeholder, so the
site never looks empty. Blur any number plates before uploading (or send me the
originals and I'll redact them).
