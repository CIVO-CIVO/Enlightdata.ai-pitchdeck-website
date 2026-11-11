import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { PovHud } from "@/components/deck/PovHud";
import { ThermalImage } from "@/components/ThermalImage";
import { placeCallouts } from "@/components/callouts";
import { Icon } from "@/components/icon";
import { data } from "@/lib/content";

const IMG = "pov-data";

/** 03 — what we broker: worn cameras, what a dataset contains, one illustrative labelled frame. */
export function DataSlide() {
  const callouts = placeCallouts(IMG, [
    { title: "Point of work", lines: ["Hands, tool, part"], icon: "hand" },
    { title: `Step ${data.activeStep + 1} of ${data.steps.length}`, lines: [data.steps[data.activeStep]], icon: "scan-eye" },
  ]);
  return (
    <Slide id="data">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <SlideEyebrow id="data" />
          <h2 className="t-h2 mt-5 text-white">{data.title}</h2>
          <p className="t-lead mt-5 text-white/75">{data.lead}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Cameras">
            {data.cameras.map((c) => (
              <li key={c.label} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[0.85rem] font-medium text-white">
                <Icon name={c.icon} className="h-4 w-4" />
                {c.label}
              </li>
            ))}
          </ul>
          <p className="mt-9 lg:short:mt-6 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/55">{data.includesTitle}</p>
          <ul className="mt-3 space-y-2.5">
            {data.includes.map((i) => (
              <li key={i} className="flex gap-3 text-[0.95rem] leading-snug text-white/85">
                <Check className="mt-[3px] h-4 w-4 shrink-0 text-accent-night" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[10px] border border-white/10">
            <ThermalImage img={IMG} ratio="16 / 10" callouts={callouts} sizes="(min-width: 1024px) 56vw, 100vw" />
            <PovHud cam="Bodycam" time="00:06:18" />
          </div>
          <ol className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6" aria-label="Task steps in this clip">
            {data.steps.map((s, i) => (
              <li key={s} className="min-w-0">
                <span
                  aria-hidden
                  className={cn("block h-[3px] rounded-full", i < data.activeStep ? "bg-white/45" : i === data.activeStep ? "heat-gradient" : "bg-white/12")}
                />
                <p className={cn("mt-2 font-mono text-[9.5px] uppercase tracking-[0.12em]", i === data.activeStep ? "text-accent-night" : "text-white/40")}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className={cn("truncate text-[0.8rem] font-medium", i === data.activeStep ? "text-white" : "text-white/55")}>{s}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/10 pt-4 text-[0.8rem] text-white/50">
            {data.not.map((n) => (
              <li key={n} className="flex items-center gap-2">
                <span aria-hidden className="h-px w-2.5 bg-white/40" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  );
}
