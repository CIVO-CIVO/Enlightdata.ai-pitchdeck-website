import { Fragment } from "react";
import { Illustrative, Slide, SlideEyebrow } from "@/components/deck/Slide";
import { why } from "@/lib/content";

/** 05 — the thesis: repeatable tasks scale anywhere; field work multiplies into variants. */
export function WhySlide() {
  const eq = why.equation;
  return (
    <Slide id="why">
      <div className="max-w-[900px]">
        <SlideEyebrow id="why" />
        <h2 className="t-h2 mt-5 text-white">{why.title}</h2>
      </div>

      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:short:mt-7">
        <div className="card-night p-6 lg:p-8">
          <h3 className="t-h3 text-white/60">{why.simple.title}</h3>
          <ul className="mt-5 space-y-3">
            {why.simple.points.map((p) => (
              <li key={p} className="flex gap-3 text-[0.95rem] leading-snug text-white/50">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-white/35" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-[10px] border border-accent-night/75 bg-night-2 p-6 lg:p-8">
          <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[3px]" />
          <h3 className="t-h3 text-white">{why.skilled.title}</h3>
          <ul className="mt-5 space-y-3">
            {why.skilled.points.map((p) => (
              <li key={p} className="flex gap-3 text-[0.95rem] leading-snug text-white/85">
                <span aria-hidden className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-night" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 lg:short:mt-7">
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
          <div className="relative col-span-2 overflow-hidden rounded-[8px] border border-accent-night/80 bg-night-2 px-4 py-3.5 sm:col-span-1 lg:min-w-[190px]">
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
