/**
 * Photo pipeline — reads assets/photo-manifest.json + assets/src/*, writes:
 *   public/img/<key>.webp        greyscale base, ≤2400 px wide
 *   public/img/<key>-1200.webp   greyscale base, 1200 px
 *   public/img/<key>-640.webp    greyscale base, 640 px
 *   public/img/<key>-t.webp      full-frame thermal map (1200 px), fallback for custom boxes
 *   public/img/<key>-h<i>.webp   heat layer per hotspot (1200 px, transparent): the references'
 *                                soft thermal glow — hottest on the subject, fading into the photo
 *   lib/images.generated.json    dimensions, alt, focal point, hotspots, credit
 *
 *   node scripts/process-images.mjs              # all
 *   node scripts/process-images.mjs field-rail   # one key
 *   MANIFEST=assets/a.json,assets/b.json node scripts/process-images.mjs   # other / several manifests
 *
 * An entry with "flop": true is mirrored left↔right; give its focal point and
 * hotspots as measured on the ORIGINAL photo — they are mirrored here too, and
 * the credit lists the change ("mirrored").
 *
 * "soften": <sigma> (e.g. 0.7) blurs the 2400 px base very slightly — for grainy
 * high-ISO photos, where it halves the file size without a visible change.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPaths = (process.env.MANIFEST ?? "assets/photo-manifest.json").split(",").map((p) => path.resolve(root, p.trim()));
const outDir = path.join(root, "public", "img");
fs.mkdirSync(outDir, { recursive: true });

const manifest = manifestPaths.flatMap((p) => JSON.parse(fs.readFileSync(p, "utf8")));
const only = process.argv.slice(2);

// Thermal palette — sampled from the reference images: indigo → violet → magenta → red-orange → orange → amber → hot white.
const STOPS = [
  [0.0, [22, 8, 48]],
  [0.16, [58, 16, 110]],
  [0.32, [108, 26, 148]],
  [0.48, [176, 38, 132]],
  [0.62, [226, 70, 72]],
  [0.75, [245, 122, 36]],
  [0.88, [252, 186, 58]],
  [1.0, [255, 244, 206]],
];
const LUT = new Uint8Array(256 * 3);
for (let i = 0; i < 256; i++) {
  // bias so the coolest areas read violet rather than black, like the references
  const v = 0.18 + 0.82 * (i / 255);
  let k = 0;
  while (k < STOPS.length - 2 && v > STOPS[k + 1][0]) k++;
  const [t0, c0] = STOPS[k];
  const [t1, c1] = STOPS[k + 1];
  const f = Math.min(1, Math.max(0, (v - t0) / (t1 - t0)));
  for (let c = 0; c < 3; c++) LUT[i * 3 + c] = Math.round(c0[c] + (c1[c] - c0[c]) * f);
}

// Heat layers use the palette directly from violet upwards, so the fading edge of a glow
// reads purple (as in the references), never as a dark shadow.
const HEAT = new Uint8Array(256 * 3);
for (let i = 0; i < 256; i++) {
  const v = i / 255;
  let k = 0;
  while (k < STOPS.length - 2 && v > STOPS[k + 1][0]) k++;
  const [t0, c0] = STOPS[k];
  const [t1, c1] = STOPS[k + 1];
  const f = Math.min(1, Math.max(0, (v - t0) / (t1 - t0)));
  for (let c = 0; c < 3; c++) HEAT[i * 3 + c] = Math.round(c0[c] + (c1[c] - c0[c]) * f);
}
const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/**
 * One transparent heat layer for a hotspot box (coordinates in %). Heat is a
 * Gaussian around the box centre, modulated by the photo's own luminance so the
 * subject's texture survives (bright metal and gloves read hottest); opacity
 * falls off smoothly to nothing at about 1.6× the box, so the colour melts into
 * the black-and-white photograph instead of filling a hard rectangle.
 */
function heatLayer(lum, W, H, ch, box) {
  const cx = ((box.x + box.w / 2) / 100) * W;
  const cy = ((box.y + box.h / 2) / 100) * H;
  const rx = Math.max(10, (box.w / 100) * W * 0.68);
  const ry = Math.max(10, (box.h / 100) * H * 0.68);
  const vals = [];
  for (let y = Math.max(0, Math.floor(cy - ry)); y < Math.min(H, Math.ceil(cy + ry)); y += 2)
    for (let x = Math.max(0, Math.floor(cx - rx)); x < Math.min(W, Math.ceil(cx + rx)); x += 2) vals.push(lum[(y * W + x) * ch]);
  vals.sort((a, b) => a - b);
  const lo = vals[Math.floor(vals.length * 0.05)] ?? 0;
  const span = Math.max(28, (vals[Math.floor(vals.length * 0.95)] ?? 255) - lo);
  const out = Buffer.alloc(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const g = Math.exp(-1.6 * (dx * dx + dy * dy));
      if (g < 0.01) continue;
      const o = (y * W + x) * 4;
      const ln = Math.min(1, Math.max(0, (lum[(y * W + x) * ch] - lo) / span));
      const heat = 0.2 + 0.8 * Math.min(1, Math.pow(g, 0.75) * (0.45 + 0.55 * ln) + 0.04);
      const i = Math.round(heat * 255) * 3;
      out[o] = HEAT[i];
      out[o + 1] = HEAT[i + 1];
      out[o + 2] = HEAT[i + 2];
      out[o + 3] = Math.round(Math.min(0.96, smoothstep(0.015, 0.38, g) * (0.8 + 0.2 * ln)) * 255);
    }
  }
  return out;
}

const generated = {};
const prevPath = path.join(root, "lib", "images.generated.json");
if (only.length && fs.existsSync(prevPath)) Object.assign(generated, JSON.parse(fs.readFileSync(prevPath, "utf8")));

for (const entry of manifest) {
  if (only.length && !only.includes(entry.key)) continue;
  const src = path.join(root, "assets", "src", entry.file);
  if (!fs.existsSync(src)) {
    console.warn(`missing source for ${entry.key}: ${entry.file}`);
    continue;
  }
  const base = () => {
    const s = sharp(src, { failOn: "none" }).rotate();
    return entry.flop ? s.flop() : s;
  };
  const mirrorX = (b) => (entry.flop ? { ...b, x: +(100 - b.x - b.w).toFixed(2) } : b);
  const grade = (s) => s.grayscale().normalise({ lower: 1, upper: 99 }).linear(1.06, -5);

  const big2400 = grade(base().resize({ width: 2400, withoutEnlargement: true }));
  const big = await (entry.soften ? big2400.blur(entry.soften) : big2400).webp({ quality: 74 }).toFile(path.join(outDir, `${entry.key}.webp`));
  await grade(base().resize({ width: 1200, withoutEnlargement: true })).webp({ quality: 72 }).toFile(path.join(outDir, `${entry.key}-1200.webp`));
  await grade(base().resize({ width: 640, withoutEnlargement: true })).webp({ quality: 70 }).toFile(path.join(outDir, `${entry.key}-640.webp`));

  const { data, info } = await base()
    .resize({ width: 1200, withoutEnlargement: true })
    .grayscale()
    .blur(2.4)
    .normalise({ lower: 2, upper: 98 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgb = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0, j = 0; i < data.length; i += info.channels, j += 3) {
    const v = data[i];
    rgb[j] = LUT[v * 3];
    rgb[j + 1] = LUT[v * 3 + 1];
    rgb[j + 2] = LUT[v * 3 + 2];
  }
  await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } })
    .webp({ quality: 70 })
    .toFile(path.join(outDir, `${entry.key}-t.webp`));

  const hotspots = (entry.hotspots ?? []).map(mirrorX);
  const lumRes = await base().resize({ width: 1200, withoutEnlargement: true }).grayscale().blur(1.3).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  for (const f of fs.readdirSync(outDir)) if (f.startsWith(`${entry.key}-h`) && /-h\d+\.webp$/.test(f)) fs.rmSync(path.join(outDir, f));
  for (const [i, box] of hotspots.entries()) {
    const { width: W, height: H, channels: ch } = lumRes.info;
    await sharp(heatLayer(lumRes.data, W, H, ch, box), { raw: { width: W, height: H, channels: 4 } })
      .webp({ quality: 82, alphaQuality: 88 })
      .toFile(path.join(outDir, `${entry.key}-h${i}.webp`));
  }

  generated[entry.key] = {
    w: big.width,
    h: big.height,
    alt: entry.alt,
    focal: entry.focal ? [entry.flop ? 100 - entry.focal[0] : entry.focal[0], entry.focal[1]] : [50, 50],
    hotspots,
    credit: {
      attribution: entry.notes?.match(/Author-requested attribution: "([^"]+)"/)?.[1],
      edits: [
        /\bcropped\b/i.test(entry.notes ?? "") ? "cropped" : null,
        /blurred by us/i.test(entry.notes ?? "") ? "small logo or name blurred" : null,
        entry.flop ? "mirrored" : null,
        ...(entry.edits ?? []),
      ].filter(Boolean),
      title: entry.title,
      creator: entry.creator,
      creatorUrl: entry.creatorUrl,
      source: entry.source,
      sourceUrl: entry.sourceUrl,
      license: entry.license,
      licenseUrl: entry.licenseUrl,
    },
  };
  console.log(`✓ ${entry.key} ${big.width}×${big.height}`);
}

fs.writeFileSync(prevPath, JSON.stringify(generated, null, 1));
console.log(`\nwrote lib/images.generated.json (${Object.keys(generated).length} images)`);
