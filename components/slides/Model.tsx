import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { LogoMark } from "@/components/Logo";
import { Icon } from "@/components/icon";
import { model, type Service } from "@/lib/content";

/** 09 — our role: what we do for field companies and for data brokers & AI teams, with Enlightdata.ai between them. */
export function ModelSlide() {
  return (
    <Slide id="model">
      <div className="max-w-[820px]">
        <SlideEyebrow id="model" />
        <h2 className="t-h1 mt-5 text-white lg:short:mt-4">{model.title}</h2>
        <p className="t-lead mt-5 text-white/75 lg:short:mt-4">{model.lead}</p>
      </div>

      <div className="relative mt-8 grid gap-3 lg:short:mt-6 lg:grid-cols-2 lg:gap-5">
        <Side {...model.supply} />
        <Side {...model.demand} />
        {/* Enlightdata.ai in the middle, serving both panels */}
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-accent-night/60 bg-night px-3.5 py-2 shadow-[0_0_40px_rgba(207,70,34,0.25)] lg:flex">
          <LogoMark className="h-4 w-4" />
          <span className="font-display text-[0.9rem] font-semibold tracking-[-0.01em] text-white">{model.us}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 lg:short:mt-5 lg:short:pt-4 md:grid-cols-3 lg:grid-cols-[170px_repeat(3,minmax(0,1fr))] lg:gap-8">
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

function Side({ icon, title, who, services }: { icon: Service["icon"]; title: string; who: string; services: Service[] }) {
  return (
    <div className="relative overflow-hidden rounded-[12px] border border-accent-night/40 bg-night-2 p-6 lg:p-7 lg:short:py-5">
      <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[3px]" />
      <div className="flex items-center gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/15 bg-white/5">
          <Icon name={icon} className="h-5 w-5 text-white" />
        </span>
        <div>
          <h3 className="t-h3 text-white">{title}</h3>
          <p className="mt-0.5 text-[0.82rem] text-white/55">{who}</p>
        </div>
      </div>
      <ul className="mt-5 divide-y divide-white/10 border-t border-white/10 lg:short:mt-4">
        {services.map((s, i) => (
          <li key={s.title} className="flex gap-4 py-3.5 lg:short:py-2.5">
            <span className="mt-0.5 font-mono text-[10.5px] text-accent-night">{String(i + 1).padStart(2, "0")}</span>
            <Icon name={s.icon} className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white/80" />
            <div>
              <p className="t-h4 text-white">{s.title}</p>
              <p className="mt-1 text-[0.875rem] leading-snug text-white/65">{s.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
