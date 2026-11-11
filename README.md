# Enlightdata.ai — investor pitch site (v2)

A short, presentable website for investors: what Enlightdata.ai does, in thirteen slides on one page.

**The business in one line:** Enlightdata.ai brokers first-person video from the helmet cams and bodycams of highly skilled field workers across Europe and North America — licensed to the teams building physical AI. We are the middlemen between the companies whose crews do the work and the AI teams and AI training-data brokers who need the footage. (Fixed cameras are the sister company, Enlightlayer.com.)

The full v1 website — 15 concepts, the 176-task dataset and the business plan — is saved in `../website` and in `../Enlightdata-v1-full-website-2026-11-11.zip`.

## The thirteen slides

| # | Slide | Says |
|---|---|---|
| 01 | Hero | Skilled work, seen through the worker's eyes: helmet cams, bodycams, Europe + North America, rights-cleared |
| 02 | The gap | AI has watched people cook, not fix a railway. Demand is rising, supply is locked away, the work can't be staged. Plus a scale of where first-person footage exists today (qualitative) |
| 03 | What we broker | First-person footage of real jobs: helmet cams, bodycams, smart glasses; what every dataset includes |
| 04 | Inside the data | Diagram: from the job (helmet-cam video, bodycam video, commentary, job details) → Enlightdata.ai (consent, clean, label, license) → to the buyer. Note: we're a broker, not a model builder |
| 05 | Example capture | One rail job as data: annotated frame + clip record, plus two more examples (illustrative) |
| 06 | Seven fields | Rail first; water/sewage/tunnels, shipyards & marine, industrial machinery, oil & gas, grid/telecom, construction & heavy equipment |
| 07 | Why skilled work | Simple tasks get filmed everywhere; field work multiplies into variants (illustrative 1 × 4 × 5 × 2 × 4 = 160) |
| 08 | Use cases | What buyers build: robot learning, world models, work assistants, inspection AI (drawn explainers); typical buyers |
| 09 | Our role | We're the middlemen: field companies ⇄ Enlightdata.ai ⇄ AI teams & brokers; how we earn |
| 10 | Ways to work with us | Two sides, three ways in each (license / build your own / hybrid; buy or lease / source to order / advise) |
| 11 | How a deal works | Match → Agree → Capture → Check → License |
| 12 | Rights first | Consent, contracts, privacy, safety, clear licences; Europe + North America map |
| 13 | Contact | Email, PDF download, sister-company line, photo credits |

## Run it

```bash
npm install
npm run dev                      # http://localhost:3160
# production preview
NEXT_DIST_DIR=.next-build npm run build && NEXT_DIST_DIR=.next-build PORT=3170 npm start
```

## Deploy

The code is in GitHub at `CIVO-CIVO/Enlightdata.ai-pitchdeck-website`. The repo is connected to Vercel, so every push to `main` builds and publishes the site. Vercel runs a plain `next build`; the images, the PDF and `lib/images.generated.json` are committed, so the build needs no photo processing. `vercel.json` pins functions to Stockholm (`arn1`), as on the other CIVO projects. The fonts (Inter, Inter Tight, JetBrains Mono; SIL OFL) are self-hosted from `app/fonts`, so the build never fetches Google Fonts; a Google Fonts hiccup broke the first deploy. Link previews use Vercel's production domain until `enlightdata.ai` is live.

The repo is public, so a few things stay on the Mac only (see `.gitignore`):

- the owner's design references in `docs/references/` (mockups of other brands, not part of the site);
- the rejected photos in `assets/src/rejected/`;
- one alternate without recorded credits.

After changing photos or slides, run `npm run pdf` against a local production server before pushing, so the PDF matches the site.

## Presenting

Open the site in a browser and click **Present** (top right, large screens) for full screen. Then move slide by slide:

- **→ ↓ Space PageDown**: next slide
- **← ↑ Shift+Space PageUp**: previous slide
- **Home / End**: first / last slide

Every slide fits on one screen from 1280×720 up (checked at 1280×720, 1366×768 and 1440×900). On smaller screens, the keys page through a tall slide before moving on. Each slide also has its own link (`/#fields`, `/#model`…).

## Editing

- **All text** — `lib/content.ts`, including slide order, labels and header links. Layout lives in `components/slides/`.
- **Photos** — `assets/photo-manifest.json`, then `npm run images`. That rebuilds the greyscale images, the heat layers and the data in `lib/images.generated.json`. Each hotspot box (hands + tool) gets its own soft heat layer (`public/img/<key>-h<n>.webp`). It is hottest on the bright parts of the subject at the centre, cools through violet, and fades into the photo, never a hard infrared square (owner's rule, 11 Nov 2026). The photo rules are in `docs/PHOTO-BRIEF.md`; alternates are listed in `assets/photo-candidates-*.md`. `/credits` is generated from the manifest. A grainy photo can take `"soften": 0.7`, which halves the file size without a visible change (used on the hero).
- **Design** — tokens in `app/globals.css`. They come only from the owner's reference images in `docs/references/` (ref-01 to ref-22; ref-23 is a purple swatch from an earlier accent trial). The small solid accents (numbers, dots, active bars, tags, map points) were orange in the references. The owner is trying a very dark purple (11 Nov 2026), and the rest of the design is unchanged. `accent` (#3a1070, the darkest thermal purple) is used on light slides and for fills with white text. `accent-night` (#7e22ce) is used on the black slides, where #3a1070 disappears. To go back to the original orange, use `heat-5` (numbers on dark: `heat-6`), the `#f57a24` square in `public/icon.svg` and `app/opengraph-image.tsx`, and the map files from `../website/public/img/`. The thermal effect never animates.
- **PDF deck** — `npm run pdf` captures every slide (one per page) into `public/Enlightdata-pitch.pdf` (the "Download the deck" button on the last slide). Run it against a production server (`BASE=http://localhost:3170 npm run pdf`) and again after any change.
- **Checks** — `npm run typecheck`, `npm run lint`, `node scripts/slides.mjs <prefix> 1440 900` (one screenshot per slide in `scripts/.shots/`; it reports slides taller than the screen and sideways overflow).

## Photos

All 16 photos show skilled people at work, mostly hands and tools at the point of work. All are openly licensed (CC BY, CC BY-SA or public domain), and `/credits` lists creator, licence, source and our edits.

| Slide | Shows | Where |
|---|---|---|
| 01 Hero | Shotfirer with a cap lamp checking the charge wiring at the rock face with gloved hands (mirrored) | Stuttgart 21 rail tunnel, Germany |
| 02 The gap | Kitchen first-person (the footage AI already has) vs rope-access technicians on an offshore platform | — / Troll field, Norway |
| 03 What we broker | First-person hand + wrench at an engine | Europe (Serbia-based photographer) |
| 04 Inside the data | Thumbnails reuse the photos from slides 03 and 11 | — |
| 05 Example capture | Track crew at the rail (crane lettering blurred) · pump overhaul · line-crew training at height | Eastern Switzerland · Yellowstone, Wyoming · Boulder City, Nevada |
| 06 Fields | Subway bogie maintainer (NYC) · pump-station grinding (New Orleans) · hull thickness survey (NL) · engine replacement in a vessel's engine room (Virginia) · North Sea deck crew (Norway) · line workers (New Jersey) · road crew at a paver (Wyoming) | Europe + North America |
| 11 How a deal works | Over-the-shoulder view between two hard hats onto gloved hands at a bogie | Brooklyn, NY |
| 13 Contact | Night rail-grinding crew, sparks | Nièvre, France |

- The hero was replaced on 11 Nov 2026: the owner rejected the thermite-weld photo (now in `assets/src/rejected/`). The other five candidates from that search are in `assets/src/hero-candidates/`, with notes in `assets/hero-candidates.json` and the contact sheet `assets/contact-sheet-hero.jpg`.
- No openly licensed photo exists of a worker wearing a helmet camera on an industrial job (the only one found was NASCAR; it's in `assets/src/rejected/`). The camera look comes from the "REC / helmet cam" overlay, which is marked "Illustrative frame".
- The paver photo's CAT branding and the crane lettering on slide 05 are blurred (listed on `/credits`).
- Alternates for the other slots are in `assets/src/alt/`, with notes in `assets/photo-candidates-*.md` and contact sheets `assets/contact-sheet-*.jpg`. The searches' raw manifests are in `assets/archive/`.

## Before sharing

- **Email**: `contact@enlightdata.ai` is a placeholder (`lib/content.ts`).
- **Search engines**: the site is set to `noindex` because it's an investor site. Change `robots` in `app/layout.tsx` if it becomes the public site.
- **Numbers**: there are none on purpose — no market size, prices, traction, team or ask. Add them only once they are real and confirmed.
- **Photos**: they are openly licensed stand-ins, marked "Illustrative frame" where shown as camera footage. None of them is Enlightdata footage.
