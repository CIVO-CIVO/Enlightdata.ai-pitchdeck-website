import { ArrowDown, ArrowRight } from "lucide-react";
import { Container, Slide } from "@/components/deck/Slide";
import { PovHud } from "@/components/deck/PovHud";
import { ThermalImage, type Callout } from "@/components/ThermalImage";
import { heroBox, placeCallouts } from "@/components/callouts";
import { Icon } from "@/components/icon";
import { hero } from "@/lib/content";

const IMG = "pov-hero";

/** 01 — dark hero: copy left, the helmet-cam frame bleeding in from the right (refs 2, 8, 12). */
export function HeroSlide() {
  const box = heroBox(IMG, 52);
  const callouts: Callout[] = box
    ? placeCallouts(IMG, [{ title: "Point of work", lines: ["What physical AI learns from"], icon: "hand" }], { box, avoidLeft: true, prefer: ["above", "below", "right"] })
    : [];
  return (
    <Slide id="top" bleed className="overflow-hidden">
      <div className="relative flex flex-1 flex-col lg:min-h-[var(--slide-h)]">
        <div className="relative mt-16 aspect-[4/3] w-full sm:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[66%]">
          {/* on short screens the proof strip covers the bottom of the hands' box, so its brackets are dropped there (the glow stays) */}
          <ThermalImage
            fill
            img={IMG}
            spots={box ? [box] : "none"}
            callouts={callouts}
            fade="lg-left"
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="lg:short:[&_[data-brackets]]:hidden"
          />
          {/* keeps the header links legible where the photo is bright (the helmet) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 hidden h-36 bg-linear-to-b from-night/85 to-transparent lg:block" />
          {/* viewfinder over the visible part of the photo, clear of the header and the proof strip */}
          <div className="absolute inset-0 lg:bottom-[132px] lg:left-[30%] lg:top-16">
            <PovHud />
          </div>
        </div>

        <Container className="relative z-10 flex flex-1 flex-col justify-center pb-10 pt-10 lg:pb-12 lg:pt-28 lg:short:pt-20">
          <div className="max-w-[600px]">
            <p className="eyebrow text-white/75">{hero.eyebrow}</p>
            <h1 className="t-h1-xl mt-6 text-white">{hero.title}</h1>
            <p className="t-lead mt-6 max-w-[540px] text-white/80">{hero.lead}</p>
            <div data-chrome-hide className="mt-8 flex flex-wrap gap-3">
              <a href="#gap" className="btn btn-lg btn-light">
                See the pitch
                <ArrowDown className="arrow h-4 w-4" aria-hidden />
              </a>
              <a href="#contact" className="btn btn-lg btn-ghost-light">
                Contact
                <ArrowRight className="arrow h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </Container>

        <Container className="relative z-10 pb-8">
          <ul className="grid gap-px overflow-hidden rounded-[10px] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {hero.proof.map((p) => (
              <li key={p.title} className="flex items-start gap-3.5 bg-[#141414]/90 px-4 py-4 backdrop-blur-sm lg:px-5 lg:py-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-white/15 bg-white/5">
                  <Icon name={p.icon} className="h-[18px] w-[18px] text-white" />
                </span>
                <div className="min-w-0">
                  <p className="t-h4 text-white">{p.title}</p>
                  <p className="mt-0.5 text-[0.82rem] leading-snug text-white/60">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </Slide>
  );
}
