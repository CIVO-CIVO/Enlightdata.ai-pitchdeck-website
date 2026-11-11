import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { slides, type Tone } from "@/lib/content";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

/**
 * One "slide": a full-viewport section on desktop (content centred, so the page
 * can be presented like a deck), natural height on phones. Tone drives the
 * header colour and the progress rail.
 */
export function Slide({
  id,
  className,
  children,
  bleed,
}: {
  id: string;
  className?: string;
  children: ReactNode;
  /** full-bleed slides (hero, closing) handle their own padding */
  bleed?: boolean;
}) {
  const meta = slides.find((s) => s.id === id);
  const tone: Tone = meta?.tone ?? "light";
  return (
    <section
      id={id}
      data-slide
      data-tone={tone}
      aria-label={meta?.label}
      className={cn(
        "relative flex flex-col justify-center lg:min-h-[var(--slide-h)]",
        tone === "dark" ? "bg-night text-on-night" : "bg-canvas text-ink",
        className,
      )}
    >
      {bleed ? children : <Container className="pb-16 pt-24 lg:pb-20 lg:pt-28 lg:short:pb-8 lg:short:pt-20">{children}</Container>}
    </section>
  );
}

/** "02 — THE GAP ——" numbered eyebrow, as on the references' section labels. */
export function SlideEyebrow({ id, children, className }: { id: string; children?: ReactNode; className?: string }) {
  const meta = slides.find((s) => s.id === id);
  return (
    <p className={cn("eyebrow", meta?.tone === "dark" ? "text-white/75" : "text-ink/70", className)}>
      <span className="font-mono font-medium tracking-[0.08em]">{meta?.n}</span>
      <span aria-hidden className="-mx-1 opacity-50">
        /
      </span>
      {children ?? meta?.label}
    </p>
  );
}

export function Illustrative({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-1.5 py-[3px] font-mono text-[9.5px] uppercase leading-none tracking-[0.14em]",
        dark ? "border-white/25 text-white/60" : "border-ink/20 text-muted",
        className,
      )}
    >
      Illustrative
    </span>
  );
}
