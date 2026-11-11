/**
 * node scripts/slides.mjs [prefix] [width] [height]
 * Screenshots every [data-slide] as the viewer would see it (scrolled to the
 * slide top, one viewport), lists slides taller than the viewport and flags
 * horizontal overflow. Output: scripts/.shots/<prefix>-NN-<id>.png
 *   BASE=http://localhost:3170 node scripts/slides.mjs prod 1440 900
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const [, , prefix = "slide", width = "1440", height = "900"] = process.argv;
const base = process.env.BASE ?? "http://localhost:3160";
const only = process.env.ONLY?.split(",");
const outDir = path.resolve("scripts/.shots");
fs.mkdirSync(outDir, { recursive: true });
for (const f of fs.readdirSync(outDir)) if (f.startsWith(`${prefix}-`)) fs.rmSync(path.join(outDir, f));

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: +width, height: +height }, deviceScaleFactor: 1 });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto(base + "/", { waitUntil: "networkidle", timeout: 180000 });
await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });

const slides = await page.$$eval("[data-slide]", (els) => els.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight })));
const tall = [];
for (const [i, s] of slides.entries()) {
  if (only && !only.includes(s.id)) continue;
  await page.evaluate((y) => window.scrollTo(0, y), s.top);
  await page.waitForTimeout(400);
  await page.evaluate(() => Promise.all([...document.images].filter((im) => !im.complete).map((im) => new Promise((r) => { im.onload = im.onerror = r; setTimeout(r, 3000); }))));
  await page.waitForTimeout(150);
  const n = String(i + 1).padStart(2, "0");
  await page.screenshot({ path: path.join(outDir, `${prefix}-${n}-${s.id}.png`) });
  if (s.h > +height + 2) {
    tall.push(`${s.id} ${s.h}px`);
    await page.evaluate((y) => window.scrollTo(0, y), s.top + s.h - +height);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(outDir, `${prefix}-${n}-${s.id}-b.png`) });
  }
}
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
await browser.close();
console.log(`${width}×${height}: ${slides.length} slides → ${outDir}`);
if (tall.length) console.log("taller than the viewport: " + tall.join(", "));
if (overflow) console.log("⚠ horizontal overflow");
if (errors.length) console.log("page errors:\n" + [...new Set(errors)].slice(0, 10).join("\n"));
