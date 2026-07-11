/**
 * Images for the Before & After slider and the Gallery.
 *
 * To use real photos: upload them into public/showcase/ (via GitHub → Add file
 * → Upload files) and put the path in the matching `before` / `after` / `src`
 * field below. Any field left blank falls back to the branded placeholder, so
 * the site always looks complete.
 *
 * Example:
 *   before: "/showcase/aygo-before.jpg",
 *   after:  "/showcase/aygo-after.jpg",
 */

export type Tone = "navy" | "charcoal" | "midnight" | "slate";

export type BeforeAfterItem = {
  id: string;
  label: string;
  tone: Tone;
  before?: string; // damaged / pre-repair photo
  after?: string; // finished / repaired photo
};

export const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "bodywork",
    label: "Bodywork repair",
    tone: "navy",
    // Photos live in public/showcase/. Upload before.jpg and after.jpg there.
    before: "/showcase/before.jpg", // damaged / mid-repair
    after: "/showcase/after.jpg", //  finished
  },
];

export type GalleryItem = {
  id: string;
  title: string;
  tone: Tone;
  span: string;
  src?: string;
};

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: "Executive saloon — full respray", tone: "navy", span: "row-span-2" },
  { id: "g2", title: "Alloy refinishing", tone: "charcoal", span: "" },
  { id: "g3", title: "Rear quarter panel repair", tone: "slate", span: "" },
  { id: "g4", title: "Bumper restoration", tone: "midnight", span: "row-span-2" },
  { id: "g5", title: "Colour-matched blend", tone: "navy", span: "" },
  { id: "g6", title: "Insurance collision repair", tone: "charcoal", span: "" },
  { id: "g7", title: "Classic restoration", tone: "slate", span: "row-span-2" },
  { id: "g8", title: "Scratch correction", tone: "midnight", span: "" },
];
