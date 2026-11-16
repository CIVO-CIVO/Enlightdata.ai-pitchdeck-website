"use client";

import { useEffect, useState } from "react";
import { ThermalImage } from "@/components/ThermalImage";
import { getImage } from "@/lib/images";
import type { TaskScene } from "@/lib/content";

/** One tile of the task wall: its scenes cross-fade with the banner's slow push-in, offset so the tiles never cut together. */
export function TaskReel({ scenes, start, offset = 0, every = 5200 }: { scenes: TaskScene[]; start: number; offset?: number; every?: number }) {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t: ReturnType<typeof setInterval>;
    const d = setTimeout(() => {
      const step = () => setI((n) => (setPrev(n), (n + 1) % scenes.length));
      step();
      t = setInterval(step, every);
    }, every + offset);
    return () => (clearTimeout(d), clearInterval(t));
  }, [scenes.length, every, offset]);
  const s = scenes[i];
  return (
    <figure className="relative h-full overflow-hidden rounded-[10px] bg-night">
      {scenes.map((sc, k) => {
        const spot = getImage(sc.img)?.hotspots[0];
        return (
          <div key={sc.img} aria-hidden={k !== i} className="reel-scene absolute inset-0" data-on={k === i || undefined} data-prev={k === prev || undefined}>
            <div className="reel-push absolute inset-0">
              <ThermalImage fill img={sc.img} spots={spot ? [spot] : "none"} sizes="(min-width: 1024px) 30vw, 100vw" />
            </div>
          </div>
        );
      })}
      <div className="pointer-events-none absolute left-3 top-3 z-[6] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/90">
        <span className="rounded-[3px] bg-accent-night px-1.5 py-[3px] text-on-accent">Task {String(start + i).padStart(2, "0")}</span>
        <span key={i} className="anim-fade">{s.trade}</span>
      </div>
      <figcaption key={i} className="anim-fade absolute inset-x-0 bottom-0 z-[6] bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.92)_50%)] px-4 pb-4 pt-14">
        <p className="text-[0.8rem] text-white/65">{s.task}</p>
        <p className="mt-1 font-display text-[1.1rem] font-semibold leading-tight tracking-[-0.01em] text-white">“{s.call}”</p>
      </figcaption>
    </figure>
  );
}
