"use client";

import { useEffect, useState } from "react";

// Local colour tries for the small accents without touching the code: open the dev server at /?accent=8c1a10
// (add &night=… for a different colour on the black slides). The picker bottom right changes it live and keeps
// the address up to date. It renders only on the dev server.

type Colours = { accent: string; night: string };

// colours worth keeping: open them by name (/?accent=orange-main) or with one click in the picker
const SAVED: Record<string, Colours> = {
  "orange-main": { accent: "#cf4622", night: "#cf4622" },
};
const savedName = (c: Colours) => Object.keys(SAVED).find((k) => SAVED[k].accent === c.accent && SAVED[k].night === c.night);

const hex = (v: string | null) => (v && /^#?[0-9a-f]{6}$/i.test(v) ? `#${v.replace("#", "").toLowerCase()}` : null);

// WCAG relative luminance, to put dark or light text on accent fills
function luminance(h: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// the maps are <img> files: show a recoloured copy (each map has one other fill, its grey base)
const maps = new Map<HTMLImageElement, { dark: boolean; svg: Promise<string>; url?: string }>();
function recolourMaps({ accent, night }: Colours) {
  document.querySelectorAll<HTMLImageElement>('img[src^="/img/map-"]').forEach((img) => {
    const src = img.getAttribute("src")!;
    if (!maps.has(img)) maps.set(img, { dark: src.includes("dark"), svg: fetch(src).then((r) => r.text()) });
  });
  maps.forEach(async (map, img) => {
    const svg = (await map.svg).replace(/fill="#(?!3d3d3d|cfcfca)[0-9a-f]{6}"/i, `fill="${map.dark ? night : accent}"`);
    if (map.url) URL.revokeObjectURL(map.url);
    map.url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    img.src = map.url;
  });
}

export function AccentTuner() {
  const [colours, setColours] = useState<Colours | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const name = q.get("accent") ?? "";
    const accent = hex(name);
    if (Object.hasOwn(SAVED, name)) setColours(SAVED[name]);
    else if (accent) setColours({ accent, night: hex(q.get("night")) ?? accent });
  }, []);

  useEffect(() => {
    if (!colours) return;
    const root = document.documentElement.style;
    root.setProperty("--color-accent", colours.accent);
    root.setProperty("--color-accent-night", colours.night);
    root.setProperty("--color-on-accent", luminance(colours.night) > 0.18 ? "var(--color-ink)" : "var(--color-paper)");
    recolourMaps(colours);
    const q = new URLSearchParams(location.search);
    const name = savedName(colours);
    q.set("accent", name ?? colours.accent.slice(1));
    if (name || colours.night === colours.accent) q.delete("night");
    else q.set("night", colours.night.slice(1));
    history.replaceState(null, "", `?${q}${location.hash}`);
  }, [colours]);

  if (!colours || hidden) return null;

  // the two stay linked until the dark-slide colour is picked on its own
  const pick = (key: keyof Colours, value: string) =>
    setColours((c) => c && (key === "accent" && c.night === c.accent ? { accent: value, night: value } : { ...c, [key]: value }));

  return (
    <div className="fixed right-3 bottom-3 z-[100] flex items-center gap-3 rounded-md border border-line bg-paper/95 py-1.5 pr-1.5 pl-2.5 font-mono text-[11px] text-ink shadow-lg">
      <label className="flex cursor-pointer items-center gap-1.5">
        <input type="color" value={colours.accent} onChange={(e) => pick("accent", e.target.value)} className="h-5 w-7 cursor-pointer" />
        light slides
      </label>
      <label className="flex cursor-pointer items-center gap-1.5">
        <input type="color" value={colours.night} onChange={(e) => pick("night", e.target.value)} className="h-5 w-7 cursor-pointer" />
        dark slides
      </label>
      <span className="select-all">{colours.night === colours.accent ? colours.accent : `${colours.accent} / ${colours.night}`}</span>
      {Object.entries(SAVED).map(([name, c]) => (
        <button key={name} type="button" onClick={() => setColours(c)} className="flex items-center gap-1.5 rounded border border-line px-1.5 py-0.5 hover:border-ink">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
          {name.replace("-", " ")}
        </button>
      ))}
      <button type="button" onClick={() => setHidden(true)} aria-label="Hide the colour picker" className="px-1.5 text-[14px] leading-none opacity-50 hover:opacity-100">
        ×
      </button>
    </div>
  );
}
