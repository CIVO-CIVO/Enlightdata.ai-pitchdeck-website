import { cn } from "@/lib/cn";
import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { Photo, ThermalImage } from "@/components/ThermalImage";
import { Icon } from "@/components/icon";
import { getImage } from "@/lib/images";
import { gap } from "@/lib/content";

/** 02 — the gap: everyday first-person footage is plentiful, skilled field work is not. */
export function GapSlide() {
  const skilled = getImage("gap-skilled")?.hotspots[0];
  return (
    <Slide id="gap">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div>
          <SlideEyebrow id="gap" />
          <h2 className="t-h2 mt-5 lg:short:mt-4">{gap.title}</h2>
          <p className="t-lead mt-5 lg:short:mt-3">{gap.lead}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line lg:short:mt-5">
            {gap.points.map((p) => (
              <li key={p.title} className="flex gap-4 py-4 lg:short:py-2.5">
                <Icon name={p.icon} className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <div>
                  <p className="t-h4">{p.title}</p>
                  <p className="t-small mt-1">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-mist">
            <Photo fill img="everyday-pov" className="opacity-75 grayscale" sizes="(min-width: 1024px) 26vw, 50vw" />
            <Chip tone="light" label={gap.plenty.label} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(240,240,237,0),rgba(240,240,237,0.92)_55%)] px-4 pb-4 pt-12 font-display text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] text-ink">
              {gap.plenty.text}
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[10px] bg-night">
            <ThermalImage fill img="gap-skilled" spots={skilled ? [skilled] : "none"} sizes="(min-width: 1024px) 26vw, 50vw" />
            <Chip tone="dark" label={gap.scarce.label} />
            <figcaption className="absolute inset-x-0 bottom-0 z-[6] bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.9)_55%)] px-4 pb-4 pt-12 font-display text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] text-white">
              {gap.scarce.text}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="mt-8 border-t border-line pt-5 lg:short:mt-4 lg:short:pt-4">
        <div className="flex items-center gap-3">
          <p className="eyebrow text-ink/70">{gap.spectrum.title}</p>
          <span className="rounded-[3px] border border-ink/20 px-1.5 py-[3px] font-mono text-[9.5px] uppercase leading-none tracking-[0.14em] text-muted">
            {gap.spectrum.note}
          </span>
        </div>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:short:mt-3">
          {gap.spectrum.items.map((it) => (
            <li key={it.label} className={cn("rounded-[8px] border px-4 py-3 lg:short:py-2.5", it.ours ? "border-accent/60 bg-paper" : "border-line bg-paper/60")}>
              <div className="flex items-baseline justify-between gap-3">
                <p className="t-h4">{it.label}</p>
                <span className={cn("font-mono text-[10px] uppercase tracking-[0.14em]", it.ours ? "text-accent" : "text-muted")}>{it.level}</span>
              </div>
              <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-mist lg:short:mt-2.5">
                <div className={cn("h-full rounded-full", it.ours ? "bg-accent" : "bg-ink/60")} style={{ width: `${it.fill * 100}%` }} />
              </div>
              {it.ours ? <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-accent lg:short:mt-1.5">● {gap.spectrum.ours}</p> : null}
            </li>
          ))}
        </ol>
      </div>
    </Slide>
  );
}

function Chip({ tone, label }: { tone: "light" | "dark"; label: string }) {
  return (
    <span
      className={
        tone === "light"
          ? "absolute left-3 top-3 z-[6] inline-flex items-center gap-2 rounded-[4px] border border-black/10 bg-white/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink"
          : "absolute left-3 top-3 z-[6] inline-flex items-center gap-2 rounded-[4px] border border-white/20 bg-[#121212]/85 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-[3px]"
      }
    >
      <span aria-hidden className={tone === "light" ? "h-1.5 w-1.5 rounded-full bg-faint" : "h-1.5 w-1.5 rounded-full bg-accent-night"} />
      {label}
    </span>
  );
}
