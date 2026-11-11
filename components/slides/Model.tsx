import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { LogoMark } from "@/components/Logo";
import { Icon, type IconName } from "@/components/icon";
import { model } from "@/lib/content";

/** 06 — the middleman model: supply ⇄ Enlightdata.ai ⇄ demand, and how we earn. */
export function ModelSlide() {
  const f = model.flows;
  return (
    <Slide id="model">
      <div className="max-w-[760px]">
        <SlideEyebrow id="model" />
        <h2 className="t-h1 mt-5 text-white lg:short:mt-4">{model.title}</h2>
        <p className="t-lead mt-5 text-white/75">{model.lead}</p>
      </div>

      <div className="mt-10 grid items-stretch gap-0 lg:short:mt-7 lg:grid-cols-[minmax(0,1fr)_128px_minmax(0,1.05fr)_128px_minmax(0,1fr)]">
        <Party {...model.supply} />
        <Flows right={f.toUs} left={f.toSupplier} />
        <div className="relative overflow-hidden rounded-[10px] border border-accent-night/75 bg-night-3 p-6 text-white lg:p-7">
          <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[3px]" />
          <p className="flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" />
            <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em]">{model.us.title}</span>
          </p>
          <ol className="mt-5 space-y-2.5">
            {model.us.steps.map((s, i) => (
              <li key={s} className="flex items-baseline gap-3 text-[0.95rem] text-white/85">
                <span className="font-mono text-[10.5px] text-accent-night">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <Flows right={f.toBuyer} left={f.fromBuyer} />
        <Party {...model.demand} />
      </div>

      <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 lg:short:mt-7 lg:short:pt-5 md:grid-cols-3 lg:grid-cols-[170px_repeat(3,minmax(0,1fr))] lg:gap-8">
        <p className="eyebrow text-white/70 md:col-span-3 lg:col-span-1 lg:pt-1">{model.earnTitle}</p>
        {model.earn.map((e) => (
          <div key={e.title} className="flex gap-3.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-white/15 bg-white/5">
              <Icon name={e.icon} className="h-[18px] w-[18px] text-white" />
            </span>
            <div>
              <p className="t-h4 text-white">{e.title}</p>
              <p className="mt-1 text-[0.875rem] leading-normal text-white/60">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function Party({ icon, title, who, gets }: { icon: IconName; title: string; who: string; gets: string }) {
  return (
    <div className="card-night flex flex-col p-6 lg:p-7">
      <span className="flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/15 bg-white/5">
        <Icon name={icon} className="h-5 w-5 text-white" />
      </span>
      <h3 className="t-h3 mt-4 text-white">{title}</h3>
      <p className="mt-1.5 text-[0.875rem] leading-normal text-white/60">{who}</p>
      <div className="mt-auto pt-5">
        <p className="border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">They get</p>
        <p className="mt-1.5 text-[0.93rem] leading-snug text-white/85">{gets}</p>
      </div>
    </div>
  );
}

/** Two opposing flows between columns: goods to the right on top, money to the left below. Vertical on phones. */
function Flows({ right, left }: { right: string; left: string }) {
  return (
    <div className="flex items-center justify-center py-3 lg:py-0">
      <div className="hidden w-full flex-col gap-5 px-3 lg:flex">
        <div>
          <p className="text-center font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-white/70">{right}</p>
          <div className="mt-1.5 flex items-center text-white/55">
            <span className="h-px flex-1 bg-current" />
            <ArrowRight className="-ml-1.5 h-3.5 w-3.5" aria-hidden />
          </div>
        </div>
        <div>
          <div className="flex items-center text-accent-night">
            <ArrowLeft className="-mr-1.5 h-3.5 w-3.5" aria-hidden />
            <span className="h-px flex-1 bg-current" />
          </div>
          <p className="mt-1.5 text-center font-mono text-[9.5px] uppercase leading-tight tracking-[0.12em] text-accent-night">{left}</p>
        </div>
      </div>
      <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.12em] lg:hidden">
        <span className="flex items-center gap-1.5 text-white/70">
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
          {right}
        </span>
        <span className="flex items-center gap-1.5 text-accent-night">
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          {left}
        </span>
      </div>
    </div>
  );
}
