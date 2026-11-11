import Link from "next/link";
import { ArrowUp, Download, Mail } from "lucide-react";
import { Container, Slide, SlideEyebrow } from "@/components/deck/Slide";
import { ThermalImage } from "@/components/ThermalImage";
import { heroBox } from "@/components/callouts";
import { contact, site } from "@/lib/content";

const IMG = "close";

/** 09 — closing slide: copy left, photograph bleeding in from the right (same build as the hero), footer line. */
export function ContactSlide() {
  const box = heroBox(IMG, 50);
  return (
    <Slide id="contact" bleed className="overflow-hidden">
      <div className="relative flex flex-1 flex-col lg:min-h-[var(--slide-h)]">
        <div className="relative mt-16 aspect-[16/10] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:aspect-auto lg:w-[62%]">
          <ThermalImage fill img={IMG} spots={box ? [box] : "none"} fade="lg-left" sizes="(min-width: 1024px) 62vw, 100vw" />
        </div>

        <Container className="relative z-10 flex flex-1 flex-col justify-center pb-12 pt-10 lg:pt-28 lg:short:pt-20">
          <div className="max-w-[640px]">
            <SlideEyebrow id="contact">{contact.eyebrow}</SlideEyebrow>
            <h2 className="t-h1-xl mt-6 text-white">{contact.title}</h2>
            <p className="t-lead mt-6 max-w-[540px] text-white/80">{contact.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className="btn btn-lg btn-light">
                <Mail className="h-4 w-4" aria-hidden />
                {contact.cta}
                <span className="font-normal text-ink/55">{site.email}</span>
              </a>
              <a data-chrome-hide href="/Enlightdata-pitch.pdf" download className="btn btn-lg btn-ghost-light">
                <Download className="h-4 w-4" aria-hidden />
                {contact.pdf}
              </a>
            </div>
            <a data-chrome-hide href="#top" className="link-arrow mt-8 text-white/70 hover:text-white">
              {contact.back}
              <ArrowUp className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </Container>

        <Container className="relative z-10 pb-7">
          <div className="flex flex-col gap-2 border-t border-white/15 pt-5 text-[0.8rem] text-white/55 md:flex-row md:items-center md:justify-between">
            <p>
              © 2026 {site.name} · {contact.sisterLine}
            </p>
            <Link href="/credits" className="underline-offset-4 hover:text-white hover:underline">
              Photo credits
            </Link>
          </div>
        </Container>
      </div>
    </Slide>
  );
}
