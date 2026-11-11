import type { ReactNode } from "react";
import map from "@/lib/map-dots.json";
import { cn } from "@/lib/cn";

const REGIONS = [
  { title: "North America", sub: "United States · Canada" },
  { title: "Europe", sub: "EU-27 · EEA · UK · Switzerland" },
];

/**
 * Dot-matrix map of the two collection regions (after ref 1's dark map; points
 * in the accent colour). Shows target sourcing regions only — never coverage claims.
 * Labels sit on the map from sm up; on phones they move below it.
 */
export function CoverageMap({
  variant = "dark",
  labels = true,
  className,
  children,
}: {
  variant?: "dark" | "light" | "light-heat";
  labels?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const dark = variant === "dark";
  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full" style={{ aspectRatio: `${map.w} / ${map.h}` }}>
        <img
          src={`/img/map-${variant}.svg`}
          alt="Dot map highlighting Enlightdata's two collection regions: Europe and North America"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
          loading="lazy"
        />
        {labels ? (
          <div className="hidden sm:block">
            <MapLabel x={map.labels.NA[0]} y={map.labels.NA[1] + 6} {...REGIONS[0]} dark={dark} />
            <MapLabel x={map.labels.EU[0] - 2} y={map.labels.EU[1] + 14} {...REGIONS[1]} dark={dark} />
          </div>
        ) : null}
        {children}
      </div>
      {labels ? (
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
          {REGIONS.map((r) => (
            <li key={r.title} className={cn("rounded-[6px] border px-3 py-2", dark ? "border-white/20 text-white" : "border-black/10 bg-white/95 text-ink")}>
              <p className="flex items-center gap-1.5 font-display text-[0.78rem] font-semibold leading-tight">
                <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full", dark ? "bg-accent-night" : "bg-accent")} />
                {r.title}
              </p>
              <p className={cn("mt-0.5 text-[0.66rem] leading-tight", dark ? "text-white/65" : "text-muted")}>{r.sub}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function MapLabel({ x, y, title, sub, dark }: { x: number; y: number; title: string; sub: string; dark: boolean }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
      <div
        className={cn(
          "whitespace-nowrap rounded-[6px] border px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)]",
          dark ? "border-white/20 bg-[#121212]/85 text-white backdrop-blur-[2px]" : "border-black/10 bg-white/95 text-ink",
        )}
      >
        <p className="font-display text-[0.8rem] font-semibold leading-tight">{title}</p>
        <p className={cn("mt-0.5 text-[0.68rem] leading-tight", dark ? "text-white/65" : "text-muted")}>{sub}</p>
      </div>
    </div>
  );
}
