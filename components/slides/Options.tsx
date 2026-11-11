import { Slide, SlideEyebrow } from "@/components/deck/Slide";
import { Icon } from "@/components/icon";
import { options } from "@/lib/content";

/** 10 — both sides of the market, three ways in for each. */
export function OptionsSlide() {
  return (
    <Slide id="options">
      <div className="max-w-[760px]">
        <SlideEyebrow id="options" />
        <h2 className="t-h1 mt-5">{options.title}</h2>
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:short:mt-7">
        {options.sides.map((side) => (
          <div key={side.title} className="card p-6 lg:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-line bg-canvas">
                <Icon name={side.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="t-h3">{side.title}</h3>
                <p className="t-small mt-1">{side.who}</p>
              </div>
            </div>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {side.items.map((it, i) => (
                <li key={it.title} className="grid grid-cols-[36px_minmax(0,1fr)] gap-2 py-4">
                  <span className="pt-[3px] font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="t-h4">{it.title}</p>
                    <p className="t-small mt-1">{it.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Slide>
  );
}
