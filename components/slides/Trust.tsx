import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { CoverageMap } from "@/components/CoverageMap";
import { Icon } from "@/components/icon";
import { trust } from "@/lib/content";

/** 08 — rights first, with the two capture regions on the dot map (ref 1). */
export function TrustSlide() {
  return (
    <Slide id="trust">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <SlideEyebrow id="trust" />
          <h2 className="t-h2 mt-5">{trust.title}</h2>
          <p className="t-lead mt-5">{trust.lead}</p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {trust.items.map((t) => (
              <li key={t.title} className="flex gap-4 py-3.5">
                <Icon name={t.icon} className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-[0.95rem] leading-snug">
                  <span className="font-display font-semibold tracking-[-0.01em]">{t.title}.</span> <span className="text-muted">{t.text}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <CoverageMap variant="light-heat" />
      </div>
    </Slide>
  );
}
