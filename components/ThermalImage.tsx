import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { getImage, heatSrc, src, srcSet, thermalSrc, type Box, type ImageMeta } from "@/lib/images";
import { Icon, type IconName } from "@/components/icon";

/**
 * The reference images' signature treatment: a monochrome photograph with a
 * soft thermal glow on the point of work (hottest on the subject, fading through
 * violet into the photo — never a hard-edged infrared square), white corner
 * brackets, and dark call-out labels joined to the target by a hairline and a dot.
 * The glow for each measured hotspot is pre-rendered by scripts/process-images.mjs.
 *
 * All coordinates (spots, callouts, targets) are percentages of the IMAGE, not
 * of the frame. The image is laid out on a "stage" that covers the frame like
 * object-fit: cover (using container-query units), so overlays stay on target
 * at every crop and breakpoint.
 *
 * The frame needs a size: pass `ratio`, or `fill` inside a sized relative parent.
 */

export type Spot = Box & {
  brackets?: boolean;
};

export type Callout = {
  /** anchor point of the label, % of image */
  x: number;
  y: number;
  /** which edge of the label sits on the anchor */
  align?: "left" | "right" | "center";
  valign?: "top" | "middle" | "bottom";
  /** draw a hairline + dot from the anchor to this point (% of image) */
  target?: [number, number];
  icon?: IconName;
  title: string;
  lines?: (string | [string, string])[];
  tone?: "dark" | "light" | "alert";
  hideBelow?: "sm" | "md" | "lg";
  width?: number;
};

type Props = {
  img: string;
  alt?: string;
  spots?: Spot[] | "auto" | "none";
  callouts?: Callout[];
  ratio?: string;
  fill?: boolean;
  focal?: [number, number];
  fade?: "none" | "left" | "left-soft" | "bottom" | "lg-left";
  tint?: "none" | "left" | "left-strong" | "bottom" | "full";
  className?: string;
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  badge?: ReactNode;
  children?: ReactNode;
};

const hide = { sm: "hidden sm:block", md: "hidden md:block", lg: "hidden lg:block" } as const;

export function ThermalImage({
  img,
  alt,
  spots = "auto",
  callouts = [],
  ratio,
  fill,
  focal,
  fade = "none",
  tint = "none",
  className,
  sizes = "(min-width: 1024px) 62vw, 100vw",
  priority,
  rounded,
  badge,
  children,
}: Props) {
  const meta = getImage(img);
  const r = meta ? meta.w / meta.h : 16 / 9;
  const [fx, fy] = focal ?? meta?.focal ?? [50, 50];
  const list: Spot[] = spots === "none" ? [] : spots === "auto" ? (meta?.hotspots ?? []).slice(0, 1) : spots;

  const frame: CSSProperties = {
    containerType: "size",
    ...(fill ? {} : { aspectRatio: ratio ?? `${meta?.w ?? 16} / ${meta?.h ?? 9}` }),
  };
  const stage = {
    "--r": r,
    "--fx": fx / 100,
    "--fy": fy / 100,
    width: "max(100cqw, calc(100cqh * var(--r)))",
    height: "max(100cqh, calc(100cqw / var(--r)))",
    left: "calc((100cqw - max(100cqw, calc(100cqh * var(--r)))) * var(--fx))",
    top: "calc((100cqh - max(100cqh, calc(100cqw / var(--r)))) * var(--fy))",
  } as CSSProperties;

  const fadeCls = {
    none: "",
    left: "fade-left",
    "left-soft": "fade-left-soft",
    bottom: "fade-bottom",
    "lg-left": "lg:fade-left",
  }[fade];

  return (
    <div
      className={cn("isolate overflow-hidden bg-[#1a1a1a]", fill ? "absolute inset-0" : "relative", rounded && "rounded-[10px]", fadeCls, className)}
      style={frame}
    >
      {meta ? (
        <div className="absolute" style={stage}>
          <img
            src={src(meta.key, 1200)}
            srcSet={srcSet(meta.key)}
            sizes={sizes}
            alt={alt ?? meta.alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            className="absolute inset-0 h-full w-full select-none"
            draggable={false}
          />

          {list.map((s, i) => (
            <HeatGlow key={i} meta={meta} spot={s} priority={priority} />
          ))}

          {/* overlays in image coordinates */}
          <div className="pointer-events-none absolute inset-0 z-[3]">
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {callouts
                .filter((c) => c.target)
                .map((c, i) => (
                  <line
                    key={`${i}-${c.title}`}
                    x1={c.x}
                    y1={c.y}
                    x2={c.target![0]}
                    y2={c.target![1]}
                    stroke={c.tone === "light" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.85)"}
                    strokeWidth={1.1}
                    vectorEffect="non-scaling-stroke"
                    className={c.hideBelow ? hide[c.hideBelow] : undefined}
                  />
                ))}
            </svg>
            {list
              .filter((s) => s.brackets !== false)
              .map((s, i) => (
                <Brackets key={i} box={s} />
              ))}
            {callouts
              .filter((c) => c.target)
              .map((c, i) => (
                <span
                  key={`${i}-${c.title}`}
                  aria-hidden
                  className={cn("anim-fade absolute h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white bg-[#151515] shadow-[0_0_0_1px_rgba(0,0,0,0.35)]", c.hideBelow && hide[c.hideBelow])}
                  style={{ left: `${c.target![0]}%`, top: `${c.target![1]}%` }}
                />
              ))}
          </div>
          <div className="absolute inset-0 z-[4]">
            {callouts.map((c, i) => (
              <CalloutLabel key={`${i}-${c.title}`} c={c} />
            ))}
            {children}
          </div>
        </div>
      ) : (
        <PhotoPending />
      )}

      {tint !== "none" ? <Tint kind={tint} /> : null}
      {badge ? <div className="absolute left-3 top-3 z-[5]">{badge}</div> : null}
    </div>
  );
}

const near = (a: number, b: number) => Math.abs(a - b) < 0.05;

/**
 * Pre-rendered heat layer for a measured hotspot; any other box falls back to the
 * full-frame thermal map under a soft radial mask (same fade, less subject-aware).
 */
function HeatGlow({ meta, spot, priority }: { meta: ImageMeta; spot: Spot; priority?: boolean }) {
  const idx = meta.hotspots.findIndex((h) => near(h.x, spot.x) && near(h.y, spot.y) && near(h.w, spot.w) && near(h.h, spot.h));
  if (idx >= 0)
    return (
      <img
        src={heatSrc(meta.key, idx)}
        alt=""
        aria-hidden
        className="absolute inset-0 z-[1] h-full w-full select-none"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    );
  const { x, y, w, h } = spot;
  const mask = `radial-gradient(ellipse ${w * 0.75}% ${h * 0.75}% at ${x + w / 2}% ${y + h / 2}%, #000 0%, rgba(0,0,0,0.8) 35%, rgba(0,0,0,0.3) 70%, transparent 100%)`;
  return (
    <div aria-hidden className="absolute inset-0 z-[1]" style={{ WebkitMaskImage: mask, maskImage: mask }}>
      <img src={thermalSrc(meta.key)} alt="" className="absolute inset-0 h-full w-full" draggable={false} loading="lazy" decoding="async" />
    </div>
  );
}

function Brackets({ box }: { box: Box }) {
  const c = "absolute border-white/95 h-[clamp(9px,22%,26px)] w-[clamp(9px,22%,26px)]";
  return (
    <div
      data-brackets
      className="absolute"
      style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
    >
      <span className={cn(c, "-left-[3px] -top-[3px] border-l-2 border-t-2")} />
      <span className={cn(c, "-right-[3px] -top-[3px] border-r-2 border-t-2")} />
      <span className={cn(c, "-bottom-[3px] -left-[3px] border-b-2 border-l-2")} />
      <span className={cn(c, "-bottom-[3px] -right-[3px] border-b-2 border-r-2")} />
    </div>
  );
}

function CalloutLabel({ c }: { c: Callout }) {
  const tx = { left: "0%", right: "-100%", center: "-50%" }[c.align ?? "left"];
  const ty = { top: "0%", middle: "-50%", bottom: "-100%" }[c.valign ?? "middle"];
  const tone = c.tone ?? "dark";
  return (
    <div
      className={cn(
        "anim-fade absolute rounded-[6px] px-3 py-2 text-left shadow-[0_8px_28px_rgba(0,0,0,0.28)]",
        tone === "light" && "border border-black/10 bg-white/95 text-ink",
        tone === "dark" && "border border-white/25 bg-[#121212]/85 text-white backdrop-blur-[3px]",
        tone === "alert" && "border border-alert/80 bg-[#141010]/88 text-white backdrop-blur-[3px]",
        c.hideBelow && hide[c.hideBelow],
      )}
      style={{ left: `${c.x}%`, top: `${c.y}%`, transform: `translate(${tx}, ${ty})`, width: c.width, minWidth: c.width ? undefined : 120 }}
    >
      <div className="flex items-start gap-2.5">
        {c.icon ? (
          <Icon
            name={c.icon}
            className={cn("mt-[1px] h-4 w-4 shrink-0", tone === "alert" ? "text-alert" : tone === "light" ? "text-ink" : "text-white")}
            strokeWidth={1.6}
          />
        ) : null}
        <div className="min-w-0">
          <p className="font-display text-[12.5px] font-semibold leading-[1.2] tracking-[-0.005em]">{c.title}</p>
          {c.lines?.length ? (
            <div className={cn("mt-1 space-y-[2px] text-[11px] leading-[1.3]", tone === "light" ? "text-muted" : "text-white/70")}>
              {c.lines.map((l, i) =>
                Array.isArray(l) ? (
                  <p key={i} className="flex gap-3">
                    <span className="min-w-[4.5rem]">{l[0]}</span>
                    <span className={cn("font-medium", tone === "light" ? "text-ink" : "text-white")}>{l[1]}</span>
                  </p>
                ) : (
                  <p key={i}>{l}</p>
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Tint({ kind }: { kind: NonNullable<Props["tint"]> }) {
  const bg = {
    left: "linear-gradient(90deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.62) 34%, rgba(17,17,17,0.1) 68%, rgba(17,17,17,0) 100%)",
    "left-strong": "linear-gradient(90deg, rgba(17,17,17,0.97) 0%, rgba(17,17,17,0.82) 40%, rgba(17,17,17,0.25) 75%, rgba(17,17,17,0.1) 100%)",
    bottom: "linear-gradient(180deg, rgba(17,17,17,0) 35%, rgba(17,17,17,0.85) 100%)",
    full: "rgba(17,17,17,0.45)",
    none: "",
  }[kind];
  return <div aria-hidden className="pointer-events-none absolute inset-0 z-[2]" style={{ background: bg }} />;
}

function PhotoPending() {
  return (
    <div className="absolute inset-0 flex items-end bg-[linear-gradient(135deg,#2a2a2a,#161616)] p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Photograph pending</span>
    </div>
  );
}

/** Plain monochrome photo (no overlays) with focal-point cropping. */
export function Photo({
  img,
  alt,
  ratio,
  fill,
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  size = 1200,
}: {
  img: string;
  alt?: string;
  ratio?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  size?: 640 | 1200 | 2400;
}) {
  const meta = getImage(img);
  if (!meta)
    return (
      <div className={cn("overflow-hidden", fill ? "absolute inset-0" : "relative", className)} style={fill ? undefined : { aspectRatio: ratio ?? "4 / 3" }}>
        <PhotoPending />
      </div>
    );
  return (
    <img
      src={src(meta.key, size)}
      srcSet={srcSet(meta.key)}
      sizes={sizes}
      alt={alt ?? meta.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("block h-full w-full object-cover", fill && "absolute inset-0", className)}
      style={{ aspectRatio: fill ? undefined : ratio, objectPosition: `${meta.focal[0]}% ${meta.focal[1]}%` }}
    />
  );
}
