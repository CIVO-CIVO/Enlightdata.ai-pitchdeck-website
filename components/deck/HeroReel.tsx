"use client";

import { Children, useEffect, useState, type ReactNode } from "react";

/** Banner reel: the scenes cross-fade every few seconds, each with a slow push-in, like a cut sequence of helmet-cam footage. */
export function HeroReel({ children, labels, every = 6000 }: { children: ReactNode; labels: string[]; every?: number }) {
  const scenes = Children.toArray(children);
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (setPrev(n), (n + 1) % scenes.length)), every);
    return () => clearInterval(t);
  }, [scenes.length, every]);
  return (
    <>
      {scenes.map((s, k) => (
        <div key={k} aria-hidden={k !== i} className="reel-scene absolute inset-0" data-on={k === i || undefined} data-prev={k === prev || undefined}>
          <div className="reel-push absolute inset-0">{s}</div>
        </div>
      ))}
      <div className="pointer-events-none absolute bottom-[150px] left-[34%] z-[6] hidden items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/85 lg:flex lg:short:bottom-[140px]">
        <span className="rounded-[3px] bg-accent-night px-1.5 py-[3px] text-on-accent">Scenario {String(i + 1).padStart(2, "0")}/{String(scenes.length).padStart(2, "0")}</span>
        <span key={i} className="anim-fade">{labels[i]}</span>
        <span className="ml-1 flex gap-1">
          {scenes.map((_, k) => (
            <span key={k} className={k === i ? "h-[3px] w-5 rounded-full bg-accent-night" : "h-[3px] w-2.5 rounded-full bg-white/35"} />
          ))}
        </span>
      </div>
    </>
  );
}
