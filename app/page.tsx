import { DeckChrome } from "@/components/deck/Chrome";
import { HeroSlide } from "@/components/slides/Hero";
import { GapSlide } from "@/components/slides/Gap";
import { DataSlide } from "@/components/slides/Data";
import { PipelineSlide } from "@/components/slides/Pipeline";
import { JobsSlide } from "@/components/slides/Jobs";
import { FieldsSlide } from "@/components/slides/Fields";
import { WhySlide } from "@/components/slides/Why";
import { BuyersSlide } from "@/components/slides/Buyers";
import { ModelSlide } from "@/components/slides/Model";
import { OptionsSlide } from "@/components/slides/Options";
import { ProcessSlide } from "@/components/slides/Process";
import { TrustSlide } from "@/components/slides/Trust";
import { ContactSlide } from "@/components/slides/Contact";

/** The pitch: thirteen slides on one page. Order and labels live in lib/content.ts. */
export default function PitchPage() {
  return (
    <>
      <DeckChrome />
      <main id="main">
        <HeroSlide />
        <GapSlide />
        <DataSlide />
        <PipelineSlide />
        <JobsSlide />
        <FieldsSlide />
        <WhySlide />
        <BuyersSlide />
        <ModelSlide />
        <OptionsSlide />
        <ProcessSlide />
        <TrustSlide />
        <ContactSlide />
      </main>
    </>
  );
}
