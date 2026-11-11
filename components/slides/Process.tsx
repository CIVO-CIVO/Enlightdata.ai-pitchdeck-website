import { Container, Slide, SlideEyebrow } from "@/components/deck/Slide";
import { PovHud } from "@/components/deck/PovHud";
import { ThermalImage } from "@/components/ThermalImage";
import { heroBox } from "@/components/callouts";
import { Icon } from "@/components/icon";
import { getImage } from "@/lib/images";
import { deal } from "@/lib/content";

const IMG = "capture";

/** 07 — five steps from job site to licensed dataset, over a crew-at-work photograph (same build as the hero). */
export function ProcessSlide() {
  const photo = getImage(IMG);
  const box = photo ? heroBox(IMG, 55) : undefined;
  return (
    <Slide id="process" bleed className="overflow-hidden">
      <div className="relative flex flex-1 flex-col lg:min-h-[var(--slide-h)]">
        {photo ? (
          <div className="relative mt-16 aspect-[16/9] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[60%]">
            <ThermalImage fill img={IMG} spots={box ? [box] : "none"} fade="lg-left" sizes="(min-width: 1024px) 60vw, 100vw" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 z-[6] hidden h-[55%] bg-[linear-gradient(180deg,rgba(17,17,17,0),rgba(17,17,17,0.92)_70%)] lg:block" />
            <div className="absolute inset-0 lg:bottom-[46%] lg:left-[30%] lg:top-16">
              <PovHud cam="Helmet cam" time="00:00:12" corners={false} />
            </div>
          </div>
        ) : null}

        <Container className="relative z-10 flex flex-1 flex-col justify-between gap-12 pb-10 pt-10 lg:pb-12 lg:pt-28 lg:short:pt-20">
          <div className="max-w-[560px]">
            <SlideEyebrow id="process" />
            <h2 className="t-h2 mt-5 text-white">{deal.title}</h2>
            <p className="t-lead mt-5 text-white/75">{deal.lead}</p>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-[10px] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {deal.steps.map((s, i) => (
              <li key={s.title} className="bg-[#141414]/92 px-5 py-5 backdrop-blur-sm last:sm:col-span-2 last:lg:col-span-1">
                <p className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] tracking-[0.14em] text-white/50">{String(i + 1).padStart(2, "0")}</span>
                  <Icon name={s.icon} className="h-[18px] w-[18px] text-accent-night" />
                </p>
                <h3 className="t-h3 mt-4 text-white">{s.title}</h3>
                <p className="mt-2 text-[0.86rem] leading-snug text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </Slide>
  );
}
