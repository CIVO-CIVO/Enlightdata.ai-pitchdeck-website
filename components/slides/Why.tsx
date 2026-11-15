import { Fragment } from "react";
import { Illustrative, Slide, SlideEyebrow } from "@/components/deck/Slide";
import { why } from "@/lib/content";

/** 07 — the thesis: skilled field work branches into trades, tasks and judgement calls, and each job into many versions. */
export function WhySlide() {
  const eq = why.equation;
  return (
    <Slide id="why">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <div>
          <SlideEyebrow id="why" />
          <h2 className="t-h2 mt-5 text-white">{why.title}</h2>
        </div>
        <div>
          <p className="t-lead text-white/75">{why.lead}</p>
          <p className="mt-3 flex gap-3 text-[0.85rem] leading-snug text-white/45">
            <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-white/35" />
            {why.simple}
          </p>
        </div>
      </div>

      <div className="mt-9 lg:short:mt-6">
        <p className="eyebrow text-white/60">{why.tradesTitle}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {why.trades.map((t, k) => (
            <li key={t.trade} className="group relative overflow-hidden rounded-[10px] border border-white/12 bg-night-2 px-5 py-4 lg:short:py-3">
              <span aria-hidden className="heat-gradient absolute inset-y-0 left-0 w-[2px] opacity-70" />
              <div className="flex items-baseline justify-between gap-3">
                <p className="t-h4 text-white">{t.trade}</p>
                <span className="font-mono text-[10px] tracking-[0.14em] text-white/35">{String(k + 1).padStart(2, "0")}</span>
              </div>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-white/60">{t.tasks.join(" · ")} · …</p>
              <p className="mt-2.5 flex items-baseline gap-2 text-[0.85rem] leading-snug text-white">
                <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent-night">{why.callLabel}</span>
                “{t.call}”
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 lg:short:mt-5">
        <div className="flex items-center gap-3">
          <p className="eyebrow text-white/60">{eq.title}</p>
          <Illustrative dark />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:items-stretch">
          <Term top="1 task" main={eq.task} wide />
          {eq.factors.map(([n, label]) => (
            <Fragment key={label}>
              <Op>×</Op>
              <Term top={label} main={n} />
            </Fragment>
          ))}
          <Op>=</Op>
          <div className="relative col-span-2 overflow-hidden rounded-[8px] border border-accent-night/50 bg-night-2 px-4 py-3.5 sm:col-span-1 lg:min-w-[190px]">
            <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[2px]" />
            <p className="text-heat font-display text-[2.4rem] font-semibold leading-none tracking-[-0.04em]">{eq.result[0]}</p>
            <p className="mt-2 text-[0.8rem] leading-snug text-white/75">{eq.result[1]}</p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function Term({ top, main, wide }: { top: string; main: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2 rounded-[8px] border border-white/15 px-4 py-3.5 sm:col-span-1 lg:min-w-[200px] lg:flex-[1.3]" : "rounded-[8px] border border-white/15 px-4 py-3.5 lg:flex-1"}>
      <p className={wide ? "font-display text-[1.35rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white" : "font-display text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white"}>
        {main}
      </p>
      <p className="mt-2 text-[0.8rem] leading-snug text-white/55">{top}</p>
    </div>
  );
}

function Op({ children }: { children: string }) {
  return (
    <span aria-hidden className="hidden items-center justify-center px-1 font-display text-[1.6rem] font-light text-white/35 lg:flex">
      {children}
    </span>
  );
}
