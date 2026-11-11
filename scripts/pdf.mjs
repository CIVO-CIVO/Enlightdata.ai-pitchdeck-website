/**
 * node scripts/pdf.mjs  →  public/Enlightdata-pitch.pdf
 * Builds the downloadable deck: every slide captured at 1440 × 900 (2× pixels,
 * JPEG) exactly as it looks on screen, one slide per page. Run it against a
 * production server so the dev overlay isn't captured:
 *   BASE=http://localhost:3170 node scripts/pdf.mjs
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const base = process.env.BASE ?? "http://localhost:3160";
const out = path.resolve(process.env.OUT ?? "public/Enlightdata-pitch.pdf");
const W = 1440;
const H = 900;

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.goto(base + "/", { waitUntil: "networkidle", timeout: 180000 });
// keep the logo on every page; drop links and buttons that do nothing in a PDF
await page.addStyleTag({ content: "html{scroll-behavior:auto!important} [data-chrome-hide]{display:none!important}" });
await page.evaluate(async () => {
  document.querySelectorAll("img[loading=lazy]").forEach((im) => (im.loading = "eager"));
  await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; setTimeout(r, 10000); }))));
});

const slides = await page.$$eval("[data-slide]", (els) => els.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + window.scrollY, h: el.offsetHeight })));
const shots = [];
for (const s of slides) {
  if (s.h > H + 2) console.warn(`⚠ ${s.id} is ${s.h}px tall — only the first ${H}px fit on its page`);
  await page.evaluate((y) => window.scrollTo(0, y), s.top);
  await page.waitForTimeout(350);
  const buf = await page.screenshot({ type: "jpeg", quality: 84 });
  shots.push(buf.toString("base64"));
}

const html = `<!doctype html><html><head><meta charset="utf-8"><title>Enlightdata.ai — investor pitch</title>
<style>@page{size:${W}px ${H}px;margin:0}html,body{margin:0;background:#111}img{display:block;width:${W}px;height:${H}px;break-after:page}img:last-child{break-after:auto}</style>
</head><body>${shots.map((b, i) => `<img alt="Slide ${i + 1}" src="data:image/jpeg;base64,${b}">`).join("")}</body></html>`;
await page.setViewportSize({ width: W, height: H });
await page.setContent(html, { waitUntil: "load" });
await page.pdf({ path: out, width: `${W}px`, height: `${H}px`, printBackground: true, preferCSSPageSize: true });
await browser.close();

const pages = (fs.readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`wrote ${path.relative(process.cwd(), out)} — ${pages} pages, ${(fs.statSync(out).size / 1e6).toFixed(1)} MB`);
