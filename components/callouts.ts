import { getImage, type Box } from "@/lib/images";
import type { Callout } from "./ThermalImage";
import type { IconName } from "@/components/icon";

type Item = { title: string; lines?: Callout["lines"]; icon?: IconName; tone?: Callout["tone"]; width?: number };

const clamp = (v: number, lo = 5, hi = 95) => Math.min(hi, Math.max(lo, v));

/**
 * For heroes (copy on the left): the measured hotspot to highlight. Keeps the
 * first hotspot unless its centre sits left of `minX` and another hotspot lies
 * further right — then the right-most one is used.
 */
export function heroBox(imgKey: string, minX = 45): Box | undefined {
  const hs = getImage(imgKey)?.hotspots ?? [];
  if (!hs.length) return undefined;
  const cx = (b: Box) => b.x + b.w / 2;
  if (cx(hs[0]) >= minX) return hs[0];
  return [...hs].sort((a, b) => cx(b) - cx(a))[0];
}

/** Re-place existing call-outs (keeping their content) around a different box, never towards the copy on the left. */
export function replaceCallouts(imgKey: string, callouts: Callout[], box: Box | undefined): Callout[] {
  if (!box || !callouts.length) return callouts;
  return placeCallouts(
    imgKey,
    callouts.map(({ title, lines, icon, tone, width }) => ({ title, lines, icon, tone, width })),
    { box, avoidLeft: true },
  );
}

type Slot = "right" | "below" | "above";

/** Hero placement: right of the subject if there is room, then below, then above (or `prefer`'s order) — never to its left. */
function placeAwayFromCopy(b: Box, items: Item[], prefer: Slot[] = ["right", "below", "above"]): Callout[] {
  const cx = clamp(b.x + b.w / 2, 30, 82);
  const room: Record<Slot, boolean> = { right: 100 - (b.x + b.w) >= 26, below: 100 - (b.y + b.h) >= 18, above: b.y >= 18 };
  const slots = prefer.filter((s) => room[s]);
  if (!slots.length) slots.push("below");
  return items.slice(0, 3).map((it, i) => {
    const slot = slots[Math.min(i, slots.length - 1)];
    const hideBelow = i === 0 ? ("sm" as const) : i === 1 ? ("md" as const) : ("lg" as const);
    if (slot === "right") {
      const y = clamp(b.y + b.h * (0.3 + 0.35 * i), 10, 88);
      return { ...it, x: clamp(b.x + b.w + 5), y, align: "left" as const, valign: "middle" as const, target: [b.x + b.w, y] as [number, number], hideBelow };
    }
    if (slot === "below") {
      const y = clamp(b.y + b.h + 8, 10, 92);
      return { ...it, x: cx, y, align: "center" as const, valign: "top" as const, target: [cx, b.y + b.h] as [number, number], hideBelow };
    }
    const y = clamp(b.y - 8, 8, 90);
    return { ...it, x: cx, y, align: "center" as const, valign: "bottom" as const, target: [cx, b.y] as [number, number], hideBelow };
  });
}

/**
 * Place up to three call-outs around an image's first measured hotspot:
 * 1st beside it (on the side with more room), 2nd above/below it, 3rd on the
 * far side. Targets land on the hotspot edge. Coordinates are % of the image.
 */
export function placeCallouts(
  imgKey: string,
  items: Item[],
  opts: { box?: Box; mobile?: boolean; avoidLeft?: boolean; prefer?: Slot[] } = {},
): Callout[] {
  const meta = getImage(imgKey);
  const b: Box = opts.box ?? meta?.hotspots[0] ?? { x: 40, y: 35, w: 20, h: 25 };
  if (opts.avoidLeft) return placeAwayFromCopy(b, items, opts.prefer);
  const cx = b.x + b.w / 2;
  const leftSide = cx > 50;
  const out: Callout[] = [];
  const hideBelow = opts.mobile ? undefined : ("md" as const);

  if (items[0]) {
    const y = clamp(b.y + b.h * 0.3, 10, 88);
    const x = leftSide ? clamp(b.x - 7) : clamp(b.x + b.w + 7);
    out.push({ ...items[0], x, y, align: leftSide ? "right" : "left", valign: "middle", target: [leftSide ? b.x : b.x + b.w, y], hideBelow: opts.mobile ? undefined : "sm" });
  }
  if (items[1]) {
    const roomAbove = b.y;
    const roomBelow = 100 - (b.y + b.h);
    if (Math.max(roomAbove, roomBelow) >= 22) {
      const above = roomAbove >= roomBelow;
      const y = above ? clamp(b.y - 9, 6, 90) : clamp(b.y + b.h + 9, 10, 94);
      out.push({ ...items[1], x: clamp(cx), y, align: "center", valign: above ? "bottom" : "top", target: [cx, above ? b.y : b.y + b.h], hideBelow });
    } else {
      // tall subject: no room above or below — use the far side, lower down
      const y = clamp(b.y + b.h * 0.72, 12, 88);
      const x = leftSide ? clamp(b.x + b.w + 6) : clamp(b.x - 6);
      out.push({ ...items[1], x, y, align: leftSide ? "left" : "right", valign: "middle", target: [leftSide ? b.x + b.w : b.x, y], hideBelow });
    }
  }
  if (items[2]) {
    const y = clamp(b.y + b.h * 0.75, 12, 90);
    const x = leftSide ? clamp(b.x + b.w + 6) : clamp(b.x - 6);
    out.push({ ...items[2], x, y, align: leftSide ? "left" : "right", valign: "middle", target: [leftSide ? b.x + b.w : b.x, y], hideBelow: "lg" });
  }
  return out;
}
