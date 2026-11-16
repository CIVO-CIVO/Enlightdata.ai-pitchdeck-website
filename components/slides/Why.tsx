import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { why } from "@/lib/content";

// each kind of task gets its own weight, so the wall reads as mostly looking and checking, not repairing
const KIND: Record<string, string> = {
  Inspect: "text-white/80",
  Check: "text-white/80",
  Monitor: "text-white/80",
  Fix: "text-white/45",
  Decide: "text-accent-night",
};

/** 07: skilled field work is thousands of tasks, and most of them are inspection, checks and judgement calls. */
export function WhySlide() {
  const c = why.case;
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

      <div className="mt-9 grid gap-4 lg:short:mt-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        {/* the range */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <p className="eyebrow text-white/60">{why.rangeTitle}</p>
            <p className="flex gap-3 font-mono text-[9.5px] uppercase tracking-[0.14em]">
              {why.kinds.map((k) => (
                <span key={k} className={KIND[k]}>{k}</span>
              ))}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {why.trades.map((t) => (
              <div key={t.trade} className="relative overflow-hidden rounded-[10px] border border-white/12 bg-night-2 px-4 py-3 lg:short:py-2.5">
                <span aria-hidden className="heat-gradient absolute inset-y-0 left-0 w-[2px] opacity-70" />
                <p className="t-h4 text-white">{t.trade}</p>
                <ul className="mt-2 space-y-[3px]">
                  {t.tasks.map(([kind, task]) => (
                    <li key={task} className="flex items-baseline gap-2 text-[0.78rem] leading-snug">
                      <span className={`w-[52px] shrink-0 font-mono text-[8.5px] uppercase tracking-[0.12em] ${KIND[kind]} opacity-80`}>{kind}</span>
                      <span className={kind === "Decide" ? "text-white" : "text-white/65"}>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{why.more}</p>
        </div>

        {/* one check, opened up */}
        <div className="relative overflow-hidden rounded-[10px] border border-accent-night/45 bg-night-2 p-5 lg:short:p-4">
          <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[2px]" />
          <p className="eyebrow text-white/60">{c.title}</p>
          <p className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-[-0.02em] text-white">{c.finding}</p>

          <ol className="mt-4 space-y-2">
            {c.questions.map((q, i) => (
              <li key={q} className="flex items-baseline gap-3 text-[0.88rem] leading-snug text-white/80">
                <span className="font-mono text-[10px] text-accent-night">{String(i + 1).padStart(2, "0")}</span>
                {q}
              </li>
            ))}
          </ol>

          <p className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/45">{c.outcomesTitle}</p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {c.outcomes.map((o) => (
              <span
                key={o}
                className={`rounded-[6px] border px-2 py-2 text-center text-[0.76rem] leading-tight border-white/20 text-white/85`}
              >
                {o}
              </span>
            ))}
          </div>

          <p className="mt-5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/45">{c.sensesTitle}</p>
          <p className="mt-2 flex flex-wrap gap-1.5">
            {c.senses.map((s) => (
              <span key={s} className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.74rem] text-white/70">{s}</span>
            ))}
          </p>

          <p className="mt-5 border-t border-white/10 pt-3 text-[0.85rem] leading-snug text-white">{c.note}</p>
        </div>
      </div>
    </Slide>
  );
}
