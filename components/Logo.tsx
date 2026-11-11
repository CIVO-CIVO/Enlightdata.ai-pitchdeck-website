import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Mark: two corner brackets framing a data point — the bracket motif the
 * references use around every highlighted subject (refs 2, 8, 10, 12, 16–19).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-6 w-6", className)} aria-hidden>
      <path d="M3.2 10.2V3.2h7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
      <path d="M20.8 13.8v7h-7" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square" />
      <rect x="9.2" y="9.2" width="5.6" height="5.6" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <Link href="/" aria-label="Enlightdata — home" className={cn("inline-flex items-center gap-2.5", dark ? "text-white" : "text-ink", className)}>
      <LogoMark />
      <span className="font-display text-[1.2rem] font-semibold leading-none tracking-[-0.03em]">
        Enlightdata<span className={cn("font-normal", dark ? "text-white/55" : "text-ink/45")}>.ai</span>
      </span>
    </Link>
  );
}
