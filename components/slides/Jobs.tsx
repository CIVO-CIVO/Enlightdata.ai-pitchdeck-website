import { Illustrative, Slide, SlideEyebrow } from "@/components/deck/Slide";
import { ThermalImage } from "@/components/ThermalImage";
import { placeCallouts } from "@/components/callouts";
import { getImage } from "@/lib/images";
import { jobs } from "@/lib/content";

/** 05 — one job broken down as data: annotated frame + clip record, two more examples (ref 20's field-notes rows). */
export function JobsSlide() {
  const main = jobs.main;
  const callouts = placeCallouts(main.img, main.callouts);
  return (
    <Slide id="jobs">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[760px]">
          <SlideEyebrow id="jobs" />
          <h2 className="t-h2 mt-5 text-white">{jobs.title}</h2>
        </div>
        <Illustrative dark />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:short:mt-6">
        <figure className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-white/10 lg:aspect-auto">
          <ThermalImage fill img={main.img} callouts={callouts} sizes="(min-width: 1024px) 58vw, 100vw" />
          <figcaption className="absolute left-3 top-3 z-[6] rounded-[4px] border border-white/20 bg-[#121212]/85 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-[3px]">
            {main.tag}
          </figcaption>
        </figure>

        <div className="flex flex-col gap-3">
          <div className="card-night p-5 lg:short:p-4">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-night" />
              {jobs.recordTitle}
            </p>
            <dl className="mt-3 divide-y divide-white/10 lg:short:mt-2">
              {jobs.record.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-[7px] text-[0.85rem] lg:short:py-[5px]">
                  <dt className="shrink-0 text-white/50">{k}</dt>
                  <dd className="text-right text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {jobs.more.map((m) => {
            const hs = getImage(m.img)?.hotspots[0];
            return (
              <div key={m.img} className="flex items-center gap-3.5 rounded-[10px] border border-white/10 bg-night-2 p-2.5 pr-4">
                <div className="relative h-[68px] w-[104px] shrink-0 overflow-hidden rounded-[6px] lg:short:h-[52px] lg:short:w-[80px]">
                  <ThermalImage fill img={m.img} spots={hs ? [{ ...hs, brackets: false }] : "none"} sizes="120px" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/50">{m.tag}</p>
                  <p className="t-h4 mt-1 text-white">{m.title}</p>
                  <p className="mt-1.5 flex flex-wrap gap-1.5 lg:short:hidden">
                    {m.chips.map((c) => (
                      <span key={c} className="rounded-full border border-white/15 px-2 py-[2px] text-[0.72rem] text-white/70">
                        {c}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}
