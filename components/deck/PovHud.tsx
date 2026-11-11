import { cn } from "@/lib/cn";

/**
 * Helmet-cam viewfinder read-out laid over a photograph: REC + camera + time
 * code, an optional task line, and the "illustrative" flag (the photographs are
 * openly licensed stand-ins, not Enlightdata footage). Static — nothing blinks.
 */
export function PovHud({
  cam = "Helmet cam",
  time = "00:14:32",
  task,
  className,
  corners = true,
}: {
  cam?: string;
  time?: string;
  task?: string;
  className?: string;
  /** thin viewfinder corners at the frame edges */
  corners?: boolean;
}) {
  const c = "absolute h-5 w-5 border-white/70";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-[6] font-mono text-[10px] uppercase tracking-[0.14em] text-white", className)}>
      {corners ? (
        <>
          <span className={cn(c, "left-3 top-3 border-l border-t")} />
          <span className={cn(c, "right-3 top-3 border-r border-t")} />
          <span className={cn(c, "bottom-3 left-3 border-b border-l")} />
          <span className={cn(c, "bottom-3 right-3 border-b border-r")} />
        </>
      ) : null}
      <div className="absolute right-6 top-6 flex flex-col items-end gap-1.5">
        <div className="flex items-center gap-2.5 rounded-[4px] bg-black/55 px-2.5 py-1.5 backdrop-blur-[2px]">
          <span className="flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-alert" />
            Rec
          </span>
          <span className="text-white/60">{cam}</span>
          <span className="tabular-nums">{time}</span>
        </div>
        <span className="rounded-[3px] bg-black/45 px-1.5 py-[3px] text-[9px] text-white/65">Illustrative frame</span>
      </div>
      {task ? (
        <div className="absolute bottom-6 left-6 rounded-[4px] bg-black/55 px-2.5 py-1.5 text-white/90 backdrop-blur-[2px]">{task}</div>
      ) : null}
    </div>
  );
}
