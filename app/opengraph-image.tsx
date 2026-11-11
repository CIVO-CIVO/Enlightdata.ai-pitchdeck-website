import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Enlightdata.ai — first-person video of skilled field work, brokered";

export default async function OpenGraphImage() {
  // Inter Tight (SIL OFL) — the site's heading face, vendored because next/og needs a TTF
  const interTight = await readFile(path.join(process.cwd(), "assets/fonts/InterTight-SemiBold.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#111111", color: "#f2f2ef", padding: "64px 72px", fontFamily: "Inter Tight" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="44" height="44" viewBox="0 0 24 24">
            <path d="M3.2 10.2V3.2h7" fill="none" stroke="#ffffff" strokeWidth="2.6" />
            <path d="M20.8 13.8v7h-7" fill="none" stroke="#ffffff" strokeWidth="2.6" />
            <rect x="9.2" y="9.2" width="5.6" height="5.6" fill="#7e22ce" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: -1 }}>
            Enlightdata<span style={{ color: "#8e8e89" }}>.ai</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 20, letterSpacing: 5, color: "#a1a19c", marginBottom: 26 }}>REAL-WORLD POV DATA · EUROPE & NORTH AMERICA</div>
          <div style={{ fontSize: 84, letterSpacing: -3.4, lineHeight: 1.0 }}>Skilled work, seen through</div>
          <div style={{ fontSize: 84, letterSpacing: -3.4, lineHeight: 1.0 }}>the worker&apos;s eyes.</div>
        </div>
        <div style={{ display: "flex", height: 8, width: "100%", borderRadius: 4, background: "linear-gradient(90deg, #3a1070, #6c1a94, #b02684, #e24648, #f57a24, #fcba3a, #fff4ce)" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Inter Tight", data: interTight, weight: 600, style: "normal" }] },
  );
}
