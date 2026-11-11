import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { Explainer } from "@/components/deck/Explainers";
import { buyers } from "@/lib/content";

/** 08 — what buyers build with the footage: four drawn explainers (ref 21's capability cards). */
export function BuyersSlide() {
  return (
    <Slide id="buyers">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
        <div>
          <SlideEyebrow id="buyers" />
          <h2 className="t-h2 mt-5">{buyers.title}</h2>
        </div>
        <p className="t-lead lg:pb-1">{buyers.lead}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:short:mt-7">
        {buyers.cards.map((c) => (
          <article key={c.title} className="card overflow-hidden">
            <div className="aspect-[16/10] bg-night">
              <Explainer kind={c.visual} />
            </div>
            <div className="p-5">
              <h3 className="t-h4">{c.title}</h3>
              <p className="t-small mt-1.5">{c.text}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 lg:flex-row lg:items-center lg:gap-8 lg:short:mt-6">
        <p className="eyebrow shrink-0 text-ink/70">{buyers.whoTitle}</p>
        <ul className="flex flex-wrap gap-2">
          {buyers.who.map((w) => (
            <li key={w} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 font-display text-[0.84rem] font-medium">
              {w}
            </li>
          ))}
        </ul>
      </div>
    </Slide>
  );
}
