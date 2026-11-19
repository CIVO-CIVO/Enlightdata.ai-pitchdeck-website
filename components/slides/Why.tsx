import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { TaskReel } from "@/components/deck/TaskReel";
import { why } from "@/lib/content";

/** 03: skilled field work is thousands of tasks and judgement calls: three task reels and an endless line of checks. */
export function WhySlide() {
  const starts = why.reels.map((_, r) => 1 + why.reels.slice(0, r).reduce((n, x) => n + x.length, 0));
  const line = [...why.ticker, ...why.ticker];
  return (
    <Slide id="why">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <div>
          <SlideEyebrow id="why" />
          <h2 className="t-h2 mt-5 text-white">{why.title}</h2>
        </div>
        <p className="t-lead text-white/75">{why.lead}</p>
      </div>

      <div className="mt-9 grid gap-2 sm:grid-cols-3 lg:short:mt-6">
        {why.reels.map((scenes, r) => (
          <div key={r} className="aspect-[4/5] sm:aspect-auto sm:h-[clamp(300px,44vh,430px)]">
            <TaskReel scenes={scenes} start={starts[r]} offset={r * 1700} />
          </div>
        ))}
      </div>

      <div className="relative mt-4 overflow-hidden" aria-label={why.more}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-night to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-night to-transparent" />
        <ul className="task-ticker flex w-max gap-2">
          {line.map((t, k) => (
            <li key={k} aria-hidden={k >= why.ticker.length} className="whitespace-nowrap rounded-full border border-white/15 px-3 py-1 text-[0.78rem] text-white/65">
              {t}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{why.more}</p>
    </Slide>
  );
}
