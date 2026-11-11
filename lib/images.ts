import generated from "./images.generated.json";

export type Box = { x: number; y: number; w: number; h: number };
export type Hotspot = Box & { label?: string };
export type ImageCredit = {
  attribution?: string;
  edits?: string[];
  title?: string;
  creator?: string;
  creatorUrl?: string | null;
  source?: string;
  sourceUrl?: string;
  license?: string;
  licenseUrl?: string;
};
export type ImageMeta = {
  key: string;
  w: number;
  h: number;
  alt: string;
  focal: [number, number];
  hotspots: Hotspot[];
  credit: ImageCredit;
};

const table = generated as unknown as Record<string, Omit<ImageMeta, "key">>;

/** Missing keys return null, and ThermalImage shows a "photograph pending" panel instead. */
export function getImage(key: string): ImageMeta | null {
  const hit = table[key];
  return hit ? { key, ...hit } : null;
}

export const allImages = (): ImageMeta[] => Object.entries(table).map(([key, v]) => ({ key, ...v }));

export const src = (key: string, size: 640 | 1200 | 2400 = 1200) =>
  size === 2400 ? `/img/${key}.webp` : `/img/${key}-${size}.webp`;
export const srcSet = (key: string) => `/img/${key}-640.webp 640w, /img/${key}-1200.webp 1200w, /img/${key}.webp 2400w`;
export const thermalSrc = (key: string) => `/img/${key}-t.webp`;
/** soft heat layer for hotspot i (see scripts/process-images.mjs) */
export const heatSrc = (key: string, i: number) => `/img/${key}-h${i}.webp`;
