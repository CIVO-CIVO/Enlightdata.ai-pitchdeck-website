# Photo brief — Enlightdata.ai pitch site

Enlightdata.ai brokers **first-person (POV) video of highly skilled field workers** — footage from helmet cams, bodycams and smart glasses worn on real jobs across **Europe and North America** — to AI teams and AI training-data brokers. We are the middlemen between the companies whose crews do the work and the buyers of the footage.

**Owner's correction (2026-11-11):** "All the machines you have in the pictures are irrelevant. We are brokering high-skilled POV worker data." Every photo on this site must show **skilled people doing hands-on work** — ideally from their own point of view. Machine-only photos are out. Fixed/stationary cameras are a different company (Enlightlayer.com) and must not appear.

## What every photo must be

- **People at work are the subject** — hands, tools and the point of work clearly visible. Best of all: a genuine first-person view (camera at the worker's eye or chest level, looking at their own gloved hands). Next best: a tight over-the-shoulder view. Then: workers clearly mid-task.
- **Europe or North America** — check the location in the description/metadata. A great photo from elsewhere may only be an *alternate*, flagged.
- **Modern** (roughly 2010 or later), sharp, at least **1600 px** on the long side (heroes ≥ 2000 px wide, landscape).
- **Licence**: CC0, Public Domain Mark, US federal government work (public domain), CC BY, CC BY-SA. **No** NC, ND, "editorial use only" or unclear licences. Re-check the licence on the source page itself — Openverse metadata is sometimes wrong.
- Faces not dominant (helmets, from behind, profile, hands) and no big brand logos — small logos are acceptable but note them.
- Safe practice visible: proper PPE for the task; nothing that looks like an unsafe procedure.
- **No** police, military personnel or insignia, no AI-generated images, no staged studio stock that looks fake.

## Slots

| key | what it must show |
|---|---|
| `pov-hero` | **Most important.** True first-person view of gloved hands working with a tool on real equipment — rail preferred (bogie, brake, coupler, track fastening, switch), otherwise any field below. Landscape ≥ 2000 px; hands + tool in the centre-right or right half (copy sits on the left). Fallback: tight over-the-shoulder shot from just behind the head. |
| `pov-data` | A second first-person / over-the-shoulder close view of hands + tool, from a different field than `pov-hero` (electrical panel, valve, engine, welding…). |
| `helmet-cam` | A worker on a job wearing a camera on the helmet/hard hat, a chest bodycam, or industrial smart glasses. Not police, not military. If nothing usable exists, report "not found" — don't force it. |
| `everyday-pov` | First-person view of an everyday household task (chopping vegetables, washing dishes, folding laundry) — the kind of footage AI has already seen plenty of. Any region. |
| `close` | One striking, atmospheric photo of a skilled worker at work for the closing slide (welder with sparks, tower climber against the sky, track crew under floodlights at night…). Darker tones preferred. |
| `field-rail` | **Main niche — get the best one.** Rail maintenance workers hands-on: track or switch maintenance, bogie/brake/wheelset work in a depot, overhead-line work. |
| `field-water` | Workers in sewers, water mains, tunnels under cities, pump stations or treatment plants — maintenance, repair or inspection. |
| `field-marine` | Shipyard and marine maintenance — welding, hull work, dry-dock inspection, ship systems. |
| `field-machinery` | A mechanic repairing an engine or motor — ideally a marine diesel inside a boat's engine room — or stationary industrial machinery (pumps, compressors, gearboxes, motors). |
| `field-oilgas` | Oil & gas rig / platform workers doing maintenance or inspection (offshore or onshore). US federal sources (e.g. BSEE) may have public-domain photos. |
| `field-grid` | Substation electricians, line workers, telecom tower/antenna climbers or industrial electrical installation. If the primary is grid, make one alternate telecom. |
| `field-construction` | Heavy-equipment mechanic servicing an excavator/loader/crane, or construction workers hands-on with heavy equipment. |

Find **one primary and 1–2 alternates** per slot.

## Where to search (keyless only)

- **Openverse**: `https://api.openverse.org/v1/images/?q=<terms>&license=cc0,pdm,by,by-sa&size=large&page_size=20` — returns `url`, `foreign_landing_url`, `creator`, `license`, `license_version`, `title`, `width`, `height`. Respect rate limits (pause between calls).
- **Wikimedia Commons API**: `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=<terms>&prop=imageinfo&iiprop=url|size|extmetadata&iiurlwidth=800` — and category browsing with `list=categorymembers&cmtype=file&cmtitle=Category:<name>`. Send the header `User-Agent: EnlightdataSiteBuilder/1.0 (https://enlightdata.ai)`; never put a personal email in requests.
- Good public-domain pools: US federal agencies (Army Corps of Engineers, Bureau of Reclamation, BPA, DOE/NREL, BSEE, OSHA, FRA, NIOSH) — usually mirrored on Commons/Flickr and indexed by Openverse. (Avoid uniformed military subjects.)
- Do **not** use API keys or credentials found anywhere on this machine (`~/.config/*`, other projects' `.env` files). Owner rule: projects stay separate.

## Already available (fallbacks only)

The v1 site has a few photos with people in them, at `../website/assets/src/<file>` with metadata in `../website/assets/photo-manifest.json`. Their hotspots target machine parts, so re-measure them on the hands/work if you reuse one. Keys: `rail-depot-pit`, `rail-track-workers`, `rail-traction-motor`, `rail-technician-hands`, `pov-hands-tools`, `water-pipe-repair`, `marine-hull-welding`, `marine-hull-inspection`, `energy-technician`, `pov-inspection`, `grid-lineworkers`, `telecom-climber`, `heavy-mechanic`, `weld-arc`. Prefer new, better photos.

## Output format

- Originals at full resolution → `assets/src/<key>.jpg` (convert to JPEG if needed). Alternates → `assets/src/alt/<key>-alt1.jpg`, `-alt2.jpg`.
- Manifest entries — one per chosen slot — in this exact shape (all coordinates are **% of the full image**, x/y = top-left corner):

```json
{
  "key": "field-rail",
  "file": "field-rail.jpg",
  "title": "<original title>",
  "creator": "<name>",
  "creatorUrl": "<url or null>",
  "source": "Wikimedia Commons",
  "sourceUrl": "<file page>",
  "license": "CC BY-SA 4.0",
  "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
  "alt": "<plain description of what is in the photo>",
  "focal": [62, 48],
  "hotspots": [{ "x": 55, "y": 38, "w": 18, "h": 22, "label": "Hands + torque wrench" }],
  "notes": "<location, date, caveats (logos, faces), licence re-checked on source page>. Author-requested attribution: \"…\" (only if the author asks for one)"
}
```

  Hotspot #1 boxes **the hands + tool / point of work** — where the thermal highlight window will sit. Keep it fairly tight (typically 8–30 % wide). A second hotspot is optional. `focal` is the point to keep when the photo is cropped.
- To measure hotspots precisely: draw a labelled 10 % grid over a ≤ 1200 px preview with `sharp` (in `node_modules/sharp`; run node from the project folder) and read coordinates off the grid.
- `assets/photo-candidates.md` — every alternate with source URL, licence, creator, location and why/flags.
- A contact sheet `assets/contact-sheet-<agent>.jpg`: chosen photos in a grid, labelled with their key, hotspot #1 drawn as a rectangle.

Only write inside `assets/` (scratch files in your own scratch folder). Never modify `../website/`. Don't start or stop servers.
