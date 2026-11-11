import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/deck/Slide";
import { LogoMark } from "@/components/Logo";
import { allImages, src } from "@/lib/images";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Sources and licences for the photographs used on the Enlightdata.ai pitch site.",
};

export default function CreditsPage() {
  const images = allImages().sort((a, b) => a.key.localeCompare(b.key));
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <header className="border-b border-line">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Enlightdata.ai — back to the pitch">
            <LogoMark />
            <span className="font-display text-[1.15rem] font-semibold leading-none tracking-[-0.03em]">
              Enlightdata<span className="font-normal text-ink/45">.ai</span>
            </span>
          </Link>
          <Link href="/" className="btn btn-sm btn-outline">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Back to the pitch
          </Link>
        </Container>
      </header>
      <main>
        <Container className="py-14 md:py-20">
          <p className="eyebrow text-ink/70">Credits</p>
          <h1 className="t-h1 mt-5">Photo credits</h1>
          <p className="t-lead mt-5 max-w-[680px]">
            Every photograph on this site is openly licensed and used as an illustration — none of them is Enlightdata footage. We converted each one to black and
            white and added a thermal-colour highlight; any other change is listed with the photo. Our edited versions of CC BY-SA photos are shared under the same
            licence.
          </p>
          <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((im) => {
              const c = im.credit;
              return (
                <li key={im.key}>
                  <img src={src(im.key, 640)} alt={im.alt} loading="lazy" className="aspect-[3/2] w-full rounded-[8px] object-cover" style={{ objectPosition: `${im.focal[0]}% ${im.focal[1]}%` }} />
                  <p className="t-h4 mt-3">{c.title ?? im.key}</p>
                  <p className="t-small mt-1">
                    {c.attribution ?? (
                      <>
                        {c.creatorUrl ? (
                          <a href={c.creatorUrl} className="underline underline-offset-2" rel="noopener" target="_blank">
                            {c.creator}
                          </a>
                        ) : (
                          c.creator
                        )}
                        {c.source ? ` · ${c.source}` : null}
                      </>
                    )}
                  </p>
                  <p className="t-small mt-1">
                    {c.licenseUrl ? (
                      <a href={c.licenseUrl} className="underline underline-offset-2" rel="noopener license" target="_blank">
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}
                    {c.sourceUrl ? (
                      <>
                        {" · "}
                        <a href={c.sourceUrl} className="underline underline-offset-2" rel="noopener" target="_blank">
                          Original
                        </a>
                      </>
                    ) : null}
                    {c.edits?.length ? ` · ${c.edits.join(", ")}` : null}
                  </p>
                </li>
              );
            })}
          </ul>
        </Container>
      </main>
    </div>
  );
}
