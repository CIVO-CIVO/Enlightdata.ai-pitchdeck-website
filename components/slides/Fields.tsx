import { cn } from "@/lib/cn";
import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { ThermalImage } from "@/components/ThermalImage";
import { Icon } from "@/components/icon";
import { getImage } from "@/lib/images";
import { fields, type Field } from "@/lib/content";

/** 04 — the seven fields, rail as the wide lead card (refs 1, 5, 16 overlay cards). */
export function FieldsSlide() {
  return (
    <Slide id="fields">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[640px]">
          <SlideEyebrow id="fields" />
          <h2 className="t-h2 mt-5">{fields.title}</h2>
          <p className="t-lead mt-4">{fields.lead}</p>
        </div>
        <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label="Kinds of work">
          {fields.kinds.map((k) => (
            <li key={k} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 font-display text-[0.84rem] font-medium">
              {k}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {fields.list.map((f, i) => (
          <FieldCard key={f.key} f={f} feature={i === 0} />
        ))}
      </div>
    </Slide>
  );
}

function FieldCard({ f, feature }: { f: Field; feature?: boolean }) {
  // the title sits on the lower third of the card, so highlight the first subject that stays above it
  const spots = getImage(f.img)?.hotspots ?? [];
  const hs = spots.find((h) => h.y + h.h <= 64) ?? spots[0];
  return (
    <article
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-[10px] bg-night text-white lg:aspect-auto lg:h-[clamp(220px,29vh,300px)]",
        feature && "sm:col-span-2 sm:aspect-[16/8]",
      )}
    >
      <ThermalImage
        fill
        img={f.img}
        spots={hs ? [hs] : "none"}
        sizes={feature ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
      />
      <div aria-hidden className="absolute inset-0 z-[6] bg-[linear-gradient(180deg,rgba(17,17,17,0.35)_0%,rgba(17,17,17,0)_30%,rgba(17,17,17,0)_45%,rgba(17,17,17,0.9)_100%)]" />
      <div className="absolute left-4 top-4 z-[7] flex items-center gap-2">
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-white/75">{f.n}</span>
        {feature ? (
          <span className="rounded-[3px] bg-accent-night px-1.5 py-[3px] font-mono text-[9.5px] font-medium uppercase leading-none tracking-[0.14em] text-ink">
            {fields.main}
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 z-[7] p-4 lg:p-5">
        <h3 className={cn("flex items-center gap-2 text-white", feature ? "t-h3" : "t-h4")}>
          <Icon name={f.icon} className="h-4 w-4 shrink-0 text-white/80" />
          {f.title}
        </h3>
        <p className={cn("mt-1.5 leading-snug text-white/70", feature ? "max-w-[460px] text-[0.88rem]" : "text-[0.8rem]")}>{f.examples}</p>
      </div>
    </article>
  );
}
