import { ArrowDown, Info } from "lucide-react";
import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { LogoMark } from "@/components/Logo";
import { Photo } from "@/components/ThermalImage";
import { Icon } from "@/components/icon";
import { pipeline } from "@/lib/content";

const ROW = 64; // px — row height and gap fix the connector geometry
const GAP = 10;
const N = 4;
const LIST_H = N * ROW + (N - 1) * GAP;
const centres = Array.from({ length: N }, (_, i) => i * (ROW + GAP) + ROW / 2);

/** 04 — inputs from the job → Enlightdata.ai → what the buyer receives (the references' "platform" diagram). */
export function PipelineSlide() {
  return (
    <Slide id="pipeline">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
        <div>
          <SlideEyebrow id="pipeline" />
          <h2 className="t-h2 mt-5">{pipeline.title}</h2>
        </div>
        <p className="t-lead lg:pb-1">{pipeline.lead}</p>
      </div>

      <div className="mt-10 grid gap-x-0 gap-y-3 lg:grid-cols-[minmax(0,1fr)_88px_220px_88px_minmax(0,0.85fr)] lg:short:mt-7">
        <ColumnLabel className="lg:col-start-1">{pipeline.inputsTitle}</ColumnLabel>
        <ColumnLabel className="hidden lg:col-start-5 lg:block">{pipeline.outputsTitle}</ColumnLabel>

        <ul className="space-y-2.5 lg:col-start-1 lg:row-start-2" style={{ ["--row" as string]: `${ROW}px` }}>
          {pipeline.inputs.map((it) => (
            <li key={it.label} className="flex h-[var(--row)] items-center gap-3 rounded-[8px] border border-line bg-paper pl-3.5 pr-1.5">
              <Icon name={it.icon} className="h-[18px] w-[18px] shrink-0" />
              <span className="min-w-0 flex-1 font-display text-[0.95rem] font-medium leading-tight tracking-[-0.01em]">{it.label}</span>
              <Thumb {...it} />
            </li>
          ))}
        </ul>

        <Connectors dir="in" />

        <ArrowDown className="mx-auto my-1 h-4 w-4 text-muted lg:hidden" aria-hidden />
        <div className="relative overflow-hidden rounded-[12px] bg-night px-5 py-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:col-start-3 lg:row-start-2 lg:self-center">
          <span aria-hidden className="heat-gradient absolute inset-x-0 top-0 h-[3px]" />
          <p className="flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" />
            <span className="font-display text-[1.08rem] font-semibold tracking-[-0.02em]">{pipeline.hub.title}</span>
          </p>
          <ol className="mt-4 space-y-2">
            {pipeline.hub.steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-[0.92rem] text-white/85">
                <span className="font-mono text-[10px] text-accent-night">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        <Connectors dir="out" />

        <ArrowDown className="mx-auto my-1 h-4 w-4 text-muted lg:hidden" aria-hidden />
        <ColumnLabel className="mt-2 lg:hidden">{pipeline.outputsTitle}</ColumnLabel>
        <ul className="space-y-2.5 lg:col-start-5 lg:row-start-2" style={{ ["--row" as string]: `${ROW}px` }}>
          {pipeline.outputs.map((it) => (
            <li key={it.label} className="flex h-[var(--row)] items-center gap-3 rounded-[8px] border border-line bg-paper px-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-canvas">
                <Icon name={it.icon} className="h-4 w-4" />
              </span>
              <span className="font-display text-[0.95rem] font-medium leading-tight tracking-[-0.01em]">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-[8px] border border-line bg-paper px-4 py-3.5 lg:short:mt-6">
        <Info className="mt-0.5 h-[18px] w-[18px] shrink-0" aria-hidden />
        <p className="text-[0.92rem] leading-snug">
          <span className="font-display font-semibold tracking-[-0.01em]">{pipeline.note.title}:</span> <span className="text-ink-2">{pipeline.note.text}</span>
        </p>
      </div>
    </Slide>
  );
}

function ColumnLabel({ children, className }: { children: string; className?: string }) {
  return <p className={`font-mono text-[10px] uppercase tracking-[0.16em] text-muted ${className ?? ""}`}>{children}</p>;
}

/** Curved hairlines from every row to the hub's centre (desktop only). */
function Connectors({ dir }: { dir: "in" | "out" }) {
  const mid = LIST_H / 2;
  return (
    <svg
      aria-hidden
      className={`hidden lg:row-start-2 lg:block ${dir === "in" ? "lg:col-start-2" : "lg:col-start-4"}`}
      width="88"
      height={LIST_H}
      viewBox={`0 0 88 ${LIST_H}`}
    >
      {centres.map((y) => (
        <g key={y}>
          <path
            d={dir === "in" ? `M0 ${y} C44 ${y} 44 ${mid} 88 ${mid}` : `M0 ${mid} C44 ${mid} 44 ${y} 88 ${y}`}
            fill="none"
            stroke="#9a9a95"
            strokeWidth="1.2"
          />
          <circle cx={dir === "in" ? 0 : 88} cy={y} r="2.6" fill="#f0f0ed" stroke="#9a9a95" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

function Thumb({ img, visual }: { img?: string; visual?: "wave" | "meta" }) {
  const box = "relative h-[50px] w-[112px] shrink-0 overflow-hidden rounded-[6px] bg-night";
  if (img)
    return (
      <span className={box}>
        <Photo fill img={img} sizes="120px" size={640} />
      </span>
    );
  if (visual === "wave")
    return (
      <span className={`${box} flex items-center justify-center gap-[3px] px-2`} aria-hidden>
        {[5, 9, 14, 8, 18, 24, 13, 20, 28, 16, 10, 22, 12, 7, 15, 9, 5].map((h, i) => (
          <span key={i} className={i === 8 ? "w-[3px] rounded-full bg-accent-night" : "w-[3px] rounded-full bg-white/70"} style={{ height: h }} />
        ))}
      </span>
    );
  return (
    <span className={`${box} flex flex-col justify-center gap-[3px] px-2.5 font-mono text-[7.5px] uppercase leading-none tracking-[0.08em] text-white/75`} aria-hidden>
      <span>
        <span className="text-accent-night">●</span> Rail · brake check
      </span>
      <span>Step 3 of 6 · tools 4</span>
      <span className="text-white/45">Site · depot · EU</span>
    </span>
  );
}
