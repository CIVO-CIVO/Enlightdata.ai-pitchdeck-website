import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { why } from "@/lib/content";

/** 07: skilled field work is thousands of tasks, and most of them are checks and judgement calls. */
export function WhySlide() {
  const c = why.case;
  return (
    <Slide id="why">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <div>
          <SlideEyebrow id="why" />
          <h2 className="t-h2 mt-5 text-white">{why.title}</h2>
        </div>
        <p className="t-lead text-white/75">{why.lead}</p>
      </div>

      <div className="mt-10 grid gap-4 lg:short:mt-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-6">
        <div>
          <p className="eyebrow text-white/60">{why.rangeTitle}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {why.trades.map((t) => (
              <div key={t.trade} className="relative overflow-hidden rounded-[10px] border border-white/12 bg-night-2 px-4 py-3.5">
                <span aria-hidden className="heat-gradient absolute inset-y-0 left-0 w-[2px] opacity-70" />
                <p className="t-h4 text-white">{t.trade}</p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-white/55">{t.tasks.join(" · ")}</p>
                <p className="mt-2.5 text-[0.88rem] leading-snug text-accent-night">{t.call}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{why.more}</p>
        </div>

        <div className="relative overflow-hidden rounded-[10px] border border-accent-night/45 bg-night-2 p-6 lg:short:p-5">
          <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[2px]" />
          <p className="eyebrow text-white/60">{c.title}</p>
          <p className="mt-3 font-display text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] text-white">{c.finding}</p>
          <ul className="mt-4 space-y-2">
            {c.questions.map((q) => (
              <li key={q} className="flex items-baseline gap-3 text-[0.92rem] leading-snug text-white/80">
                <span aria-hidden className="text-accent-night">?</span>
                {q}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-4 gap-1.5">
            {c.outcomes.map((o) => (
              <span key={o} className="rounded-[6px] border border-white/20 px-2 py-2 text-center text-[0.78rem] leading-tight text-white/85">{o}</span>
            ))}
          </div>
          <p className="mt-6 border-t border-white/10 pt-4 text-[0.9rem] leading-snug text-white">{c.note}</p>
        </div>
      </div>
    </Slide>
  );
}
