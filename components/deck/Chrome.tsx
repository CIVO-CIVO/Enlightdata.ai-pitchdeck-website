"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/Logo";
import { slides, type Tone } from "@/lib/content";

const slideEls = () => Array.from(document.querySelectorAll<HTMLElement>("[data-slide]"));

function scrollToY(top: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

/**
 * Presentation chrome for the one-page deck: a header that follows the tone of
 * the slide beneath it, a progress rail (xl+), keyboard navigation
 * (↓ → Space PageDown = next, ↑ ← Shift+Space PageUp = previous, Home/End) and
 * a full-screen "Present" toggle. Tall slides are paged through before moving on.
 */
export function DeckChrome() {
  const [headerTone, setHeaderTone] = useState<Tone>("dark");
  const [railTone, setRailTone] = useState<Tone>("dark");
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [canFull, setCanFull] = useState(false);
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let head: Tone = "dark";
      let rail: Tone = "dark";
      let idx = 0;
      slideEls().forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const tone = (el.dataset.tone as Tone) ?? "light";
        if (r.top <= 32 && r.bottom > 32) head = tone;
        if (r.top <= mid && r.bottom > mid) {
          rail = tone;
          idx = i;
        }
      });
      setHeaderTone(head);
      setRailTone(rail);
      setActive(idx);
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const list = slideEls();
    const y = window.scrollY;
    const vh = window.innerHeight;
    const tops = list.map((el) => el.getBoundingClientRect().top + y);
    const bottoms = list.map((el, i) => tops[i] + el.offsetHeight);
    let cur = 0;
    tops.forEach((t, i) => {
      if (t <= y + 2) cur = i;
    });
    // overflow smaller than the slides' bottom padding is just padding — don't stop for it
    const SLACK = 72;
    if (dir === 1) {
      if (bottoms[cur] > y + vh + SLACK) return scrollToY(Math.min(y + vh * 0.85, bottoms[cur] - vh));
      if (cur + 1 < list.length) scrollToY(tops[cur + 1]);
    } else {
      if (tops[cur] < y - 4) return scrollToY(Math.max(tops[cur], y - vh * 0.85));
      if (cur > 0) scrollToY(tops[cur - 1]);
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName ?? "";
      if (t?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tag)) return;
      if (e.key === " " && /^(A|BUTTON)$/.test(tag)) return;
      const next = e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const prev = e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        const list = slideEls();
        const el = e.key === "Home" ? list[0] : list[list.length - 1];
        if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY);
        return;
      }
      if (!next && !prev) return;
      e.preventDefault();
      step(next ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  useEffect(() => {
    setCanFull(Boolean(document.fullscreenEnabled));
    const onChange = () => setIsFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFull = () => {
    if (document.fullscreenElement) document.exitFullscreen?.();
    else document.documentElement.requestFullscreen?.();
  };

  const dark = headerTone === "dark";
  const activeId = slides[active]?.id;

  return (
    <>
      <a data-chrome data-chrome-hide href="#gap" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <header
        data-chrome
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300",
          dark ? "text-white" : "text-ink",
          scrolled ? (dark ? "border-b border-white/10 bg-night/75 backdrop-blur-md" : "border-b border-line/70 bg-canvas/85 backdrop-blur-md") : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a href="#top" aria-label="Enlightdata.ai — back to the start" className="inline-flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-[1.15rem] font-semibold leading-none tracking-[-0.03em]">
              Enlightdata<span className={cn("font-normal", dark ? "text-white/55" : "text-ink/45")}>.ai</span>
            </span>
          </a>
          <nav data-chrome-hide aria-label="Sections" className="hidden items-center gap-6 xl:flex">
            {slides
              .filter((s) => s.nav)
              .map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  aria-current={activeId === s.id ? "true" : undefined}
                  className={cn("font-display text-[0.86rem] font-medium tracking-[-0.005em] transition-opacity", activeId === s.id ? "opacity-100" : "opacity-65 hover:opacity-100")}
                >
                  {s.nav}
                </a>
              ))}
          </nav>
          <div data-chrome-hide className="flex items-center gap-2">
            {canFull ? (
              <button
                type="button"
                onClick={toggleFull}
                className={cn("btn btn-sm hidden xl:inline-flex", dark ? "btn-ghost-light" : "btn-outline")}
                aria-pressed={isFull}
              >
                {isFull ? <Minimize2 className="h-3.5 w-3.5" aria-hidden /> : <Maximize2 className="h-3.5 w-3.5" aria-hidden />}
                {isFull ? "Exit" : "Present"}
              </button>
            ) : null}
            <a href="#contact" className={cn("btn btn-sm", dark ? "btn-light" : "btn-solid")}>
              Contact
              <ArrowRight className="arrow h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      <nav data-chrome data-chrome-hide aria-label="Slides" className={cn("fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block", railTone === "dark" ? "text-white" : "text-ink")}>
        <ol className="flex flex-col items-end gap-1">
          {slides.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={i === active ? "step" : undefined}
                aria-label={`${s.n} ${s.label}`}
                className="group flex items-center justify-end gap-2.5 py-[5px]"
              >
                {/* numbers only where the margin beside the content is wide enough for them */}
                <span
                  className={cn(
                    "hidden font-mono text-[10px] tracking-[0.12em] transition-opacity duration-200 min-[1400px]:inline",
                    i === active ? "opacity-85" : "opacity-0 group-hover:opacity-70",
                  )}
                >
                  {s.n}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block h-[2px] rounded-full transition-all duration-300",
                    i === active ? (railTone === "dark" ? "w-6 bg-accent-night" : "w-6 bg-accent") : "w-3 bg-current opacity-35 group-hover:opacity-70",
                  )}
                />
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
