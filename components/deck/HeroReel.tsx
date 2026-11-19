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
      {/* keeps the header links readable over bright frames (sky, windows) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-36 bg-[linear-gradient(180deg,rgba(17,17,17,0.85),rgba(17,17,17,0))]" />
      {/* the push-in moves the left fade partly out of frame; this keeps the photo's left edge soft over bright frames (open sea) */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[3] hidden w-[14%] bg-[linear-gradient(90deg,rgba(17,17,17,1),rgba(17,17,17,0))] lg:block" />
      <div className="pointer-events-none absolute bottom-[150px] left-[34%] z-[6] hidden items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/85 lg:flex lg:short:bottom-[140px]">
        <span className="whitespace-nowrap rounded-[3px] bg-accent-night px-1.5 py-[3px] text-on-accent">Scenario {String(i + 1).padStart(2, "0")}/{String(scenes.length).padStart(2, "0")}</span>
        {/* dark backing so the line stays readable over bright frames (open sea, sky) */}
        <span key={i} className="anim-fade rounded-[3px] bg-night/70 px-1.5 py-[3px] leading-[1.9] [box-decoration-break:clone]">{labels[i]}</span>
        <span className="ml-1 flex gap-1">
          {scenes.map((_, k) => (
            <span key={k} className={k === i ? "h-[3px] w-5 rounded-full bg-accent-night" : "h-[3px] w-2.5 rounded-full bg-white/35"} />
          ))}
        </span>
      </div>
    </>
  );
}
