# Photo candidates — field slots (rail, water, marine, machinery, oil & gas, grid, construction)

Written 2026-11-11 by the field-slots agent. Primaries are in `photo-manifest.fields.json` and `src/<key>.jpg`; alternates are in `src/alt/<key>-alt1.jpg` and `-alt2.jpg` (full-resolution originals). Contact sheet: `contact-sheet-fields.jpg`.

How the photos were found and checked
- Searched with the keyless Wikimedia Commons API (search + category browsing) and the anonymous Openverse API. Openverse returned HTTP 504 on most multi-word queries during this session, so Flickr material was mostly reached through its Commons mirrors.
- Every image below was viewed as a ≤1200 px preview.
- Licences were re-checked on the source page: the Flickr photo page for Flickr originals (licence link in the page), and the Commons file page (licence template and metadata) for everything. Exceptions are noted.
- The other agent's picks (`photo-manifest.pov.json`) were checked for overlap: no shared files.

---

## field-rail (main niche)

**Primary — `src/field-rail.jpg`** "MTA Prepares for Winter Storm" (Flickr 50723589951). Marc A. Hermann / MTA, CC BY 2.0. Coney Island Maintenance Facility, Brooklyn NY, 2020-12-15. 4887 × 3464. A subway car equipment maintainer kneels at a bogie and fits an ice-scraper shoe to the shoe beam. Depot bogie work, gloved hands in the centre, wheel and rail readable. Flags: face mask (COVID era), small "Kawasaki" maker plate, "Princeton Tec" headlamp strap.

**alt1 — `src/alt/field-rail-alt1.jpg`** "MTA Prepares for Winter Storm" (Flickr 50723589861)
- Source: https://www.flickr.com/photos/mtaphotos/50723589861/ (Commons mirror: https://commons.wikimedia.org/wiki/File:MTA_Prepares_for_Winter_Storm_(50723589861).jpg)
- Licence: CC BY 2.0 (re-checked on Flickr and Commons). Creator: Marc A. Hermann / MTA.
- Location and date: Coney Island Maintenance Facility, Brooklyn NY, USA; 2020-12-15. 5384 × 3606.
- Why: over-the-shoulder view between two blue hard hats onto gloved hands at the bogie shoe-beam mount. It is the most POV-like rail frame found, and a possible `pov-hero` or `pov-data` fallback for the other agent.
- Flags: reads less obviously as "rail" at card size; "Princeton Tec" text on both headlamp straps; right worker's face in profile with a mask.

**alt2 — `src/alt/field-rail-alt2.jpg`** "SBB - Track worker" (Flickr 26556739706)
- Source: https://www.flickr.com/photos/kecko/26556739706/ (Commons mirror: https://commons.wikimedia.org/wiki/File:SBB_-_Track_worker_(26556739706).jpg)
- Licence: CC BY 2.0 (re-checked on Flickr and Commons). Creator: Kecko.
- Location and date: SBB line in eastern Switzerland, during a recovery after a ballast-cleaner derailment; 2016-04-20. 5200 × 3467.
- Why: a European track crew working by hand in daylight (measuring, tools at the rail).
- Flags: two faces in profile at mid-distance; a large green "Keller" crane mid-frame; one worker wears a red polo with hi-vis trousers only.

Also considered (not downloaded)
- Kecko, "Altstätten SBB - Track Construction (51327212639)", CC BY 2.0, Switzerland 2021, https://commons.wikimedia.org/wiki/File:Altst%C3%A4tten_SBB_-_Track_Construction_(51327212639).jpg. A Sersa mechanic kneels under a locomotive to examine the bogie. Good European bogie shot, but "sersa.ch", the "BARBARA" name and a Vossloh plate are prominent.
- MTA, "Track Panels (29028992737)", CC BY 2.0, Queens NYC 2018, https://commons.wikimedia.org/wiki/File:Track_Panels_(29028992737).jpg. Switch-machine work on elevated track, hands visible. Large "MTA NYC Transit" vest logo, centre faces looking down, 2500 px.
- MTA, "FASTRACK on the 1-2-3 lines … (38973247232)", CC BY 2.0, NYC 2017, https://commons.wikimedia.org/wiki/File:FASTRACK_on_the_1-2-3_lines_on_Thursday,_November_30,_2017_(38973247232).jpg. Gloved hands on signal relay cabling, very POV-like, but only 2048 px wide and hard to read as rail.
- Cjp24, "Thermite rail welding" series, CC BY-SA 4.0, France 2017 (night, flash). Already used by the other agent (`close` = no. 32; no. 31 is one of its alternates).
- Raimond Spekking's Cologne ICE depot sets, CC BY-SA 4.0. Almost all machine-only; workers appear only as legs.

## field-water

**Primary — `src/field-water.jpg`** "USACE continues repairs at 17th Street Canal PCCP, 6 March 2024 - 1" (Flickr 53572231348). Team New Orleans, U.S. Army Corps of Engineers. Public domain (Flickr Public Domain Mark; Commons PD-USGov-Military-Army-USACE). New Orleans LA, 2024-03-06. 4847 × 3225. A contractor grinds the suction intake inside a pump bay. Flags: "Kiewit" on the hard hat, Nike swoosh; the sparks read as metalwork, so the card label should name pump stations.

**alt1 — `src/alt/field-water-alt1.jpg`** "Rick Sacca, maintenance mechanic, working on a water pump at Lake Village" (Flickr 53087035030)
- Source: https://www.flickr.com/photos/yellowstonenps/53087035030/ (Commons: https://commons.wikimedia.org/wiki/File:Rick_Sacca,_maintenance_mechanic,_working_on_a_water_pump_at_Lake_Village_(53087035030).jpg)
- Licence: public domain (Flickr Public Domain Mark 1.0; Commons PD-USGov-NPS), re-checked on both. Creator: NPS / Jacob W. Frank (Yellowstone National Park).
- Location and date: Lake Village, Yellowstone National Park, Wyoming, USA; 2023-07-26. 6773 × 4518.
- Why: unmistakably water-system maintenance. Two mechanics work on a valve and pump assembly in a pump house, shot over the shoulder of one of them.
- Flags: NPS uniform shirt and cap with arrowhead patch (agency emblem, not police or military); right worker's face partly visible; no hard hats (indoor pump room). The safest swap if the primary reads too much like metalwork.

**alt2 — `src/alt/field-water-alt2.jpg`** "D.C. Water" (Flickr 15674420173)
- Source: https://commons.wikimedia.org/wiki/File:D.C._Water_(15674420173).jpg (the original Flickr page https://www.flickr.com/photos/usepagov/15674420173/ no longer resolves).
- Licence: public domain (PD-USGov-EPA on the Commons file page). Creator: U.S. EPA.
- Location and date: Washington, D.C., USA, DC Water combined-sewer tunnel project; 2013-10-17. 4288 × 2848.
- Why: a "tunnel under the city". Two workers inside the trailing gear of a tunnel boring machine, in a symmetrical composition.
- Flags: construction rather than maintenance; workers at mid-distance; licence evidence rests on Commons only, because the Flickr page is gone.

Also considered (not downloaded)
- USACE, "…Orleans Ave. PCCP, 01.15.2025 - 5", PD, https://commons.wikimedia.org/wiki/File:USACE_New_Orleans_District_continues_repairs_at_Orleans_Ave._PCCP,_01.15.2025_-_5.jpg. A gloved hand on a pump shaft, but the face in profile is prominent and the hard hat carries many logo stickers (MGX, Miller, YETI).
- MTA C&D East Side Access, "CM013 - 12 inch watermain replacement work 50th St north lane (08-28-2013)", CC BY 2.0, https://www.flickr.com/photos/59595815@N03/9621399665/. Clearly a water-main trench, but a phone snapshot (3264 × 2448) with a busy composition.
- Yellowstone water and wastewater operators (Carin Schneider, Brett Thielke series), PD. Mostly posed or standing.
- Joe Mabel, "Chittenden Locks during large lock maintenance 022 - workers in the tunnels", CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Chittenden_Locks_during_large_lock_maintenance_022_-_workers_in_the_tunnels.jpg. Posed, with faces.

## field-marine

**Primary — `src/field-marine.jpg`** "Vlakmeting". S.J. de Waard, CC BY-SA 3.0 (+GFDL). Stella Maris refit, Netherlands, 2013-05-07. 4288 × 2848. An inspector presses an ultrasonic thickness probe against the hull bottom and reads the gauge: a real dry-dock inspection. Flags: no hard hat; face in profile; the author asks for the credit "© S.J. de Waard / CC-BY-SA-4.0 (via Wikimedia Commons)".

**alt1 — `src/alt/field-marine-alt1.jpg`** "welding hull plate" (Flickr 5809202108)
- Source: https://www.flickr.com/photos/39320593@N03/5809202108
- Licence: CC BY 2.0 (re-checked on the Flickr photo page). Creator: NCDOTcommunications (North Carolina Department of Transportation).
- Location and date: NCDOT Ferry Division shipyard, North Carolina, USA (exact yard not stated on the page; NCDOT's ferry shipyard is at Manns Harbor); 2011-05-03. 2816 × 2112.
- Why: a welder seated under a ferry hull in dry dock, welding the bottom plating. Very readable as marine.
- Flags: already used on the v1 site (as `marine-hull-inspection`); older compact camera; welding helmet but no hard hat; sparks repeat the water primary's motif.

**alt2 — `src/alt/field-marine-alt2.jpg`** "Het aanbrengen van een dubbelplaat (04)"
- Source: https://commons.wikimedia.org/wiki/File:Het_aanbrengen_van_een_dubbelplaat_(04).JPG
- Licence: CC BY-SA 3.0 + GFDL, own work (re-checked on Commons). Creator: S.J. de Waard. Author-requested credit: "© S.J. de Waard / CC-BY-SA-4.0 (via Wikimedia Commons)".
- Location and date: Stella Maris refit, Netherlands; 2013-05-06. 4288 × 2848.
- Why: two workers fit and cut a doubler plate under the hull, with sparks and active teamwork.
- Flags: the left worker looks towards the camera (face visible); he wears a cap, not a hard hat; snapshot quality.

Also considered (not downloaded)
- "Greasing roller12", CC BY-SA 3.0, 2012, https://commons.wikimedia.org/wiki/File:Greasing_roller12.jpg. Seamen grease mooring gear on an anchor-handling vessel's foredeck at sea. A good "ship systems" image, but the location is not stated (it may not be Europe or North America).
- "Dekschuitdubbelen", CC BY 3.0, Netherlands 2014, https://commons.wikimedia.org/wiki/File:Dekschuitdubbelen.jpg. A welder pausing under a barge; phone snapshot.
- News Øresund, "Oresund Drydocks Landskrona" sets, CC BY 2.0, Sweden 2014 and 2018. Ships in dock; no hands-on work in frame.
- Openverse searches for shipyard and dry-dock work timed out repeatedly (HTTP 504). This slot would benefit from another pass when Openverse is responsive (for example NCDOT Ferry Division albums or Flickr shipyard sets).

## field-machinery

**Primary — `src/field-machinery.jpg`** "Elizabeth Engine Replacement" (Flickr 8247685778). U.S. Army Corps of Engineers Norfolk District, CC BY 2.0 on Flickr (also PD as a US government work per Commons). Chesapeake VA, 2012-10-25. 5184 × 3456. Contractors install an Iveco marine diesel in the engine room of the Corps vessel Elizabeth; a gloved hand is in the foreground. Flags: "Made in Italy" cast on the manifold; stickers on the hard hat.

**alt1 — `src/alt/field-machinery-alt1.jpg`** "Elizabeth Engine Replacement" (Flickr 8247682490)
- Source: https://www.flickr.com/photos/armyengineersnorfolk/8247682490/ (Commons: https://commons.wikimedia.org/wiki/File:Elizabeth_Engine_Replacement_(8247682490).jpg)
- Licence: CC BY 2.0 on Flickr (re-checked); Commons also tags PD-USGov-Military-Army-USACE. Creator: USACE Norfolk District.
- Location and date: Chesapeake, Virginia, USA; 2012-10-25. 4194 × 2514.
- Why: a high-angle view of four mechanics with gloves and hard hats lowering and positioning the engine in the cramped engine room.
- Flags: busy frame; "AIT" logo on shirts; one face in profile.

**alt2 — `src/alt/field-machinery-alt2.jpg`** "Scheduled Maintenance System at Coney Island Yard" (Flickr 9689839818)
- Source: https://www.flickr.com/photos/mtaphotos/9689839818/ (Commons: https://commons.wikimedia.org/wiki/File:Scheduled_Maintenance_System_at_Coney_Island_Yard_(9689839818).jpg)
- Licence: CC BY 2.0 (re-checked on Flickr and Commons). Creator: Metropolitan Transportation Authority (MTA).
- Location and date: Coney Island Yard, Brooklyn NY, USA; 2013-08-29. 2160 × 1438.
- Why: two technicians guide an electric traction motor on a hoist (motor work).
- Flags: only 2160 px wide; the right worker faces the camera at mid-distance; workers in T-shirts; already used on the v1 site (as `rail-traction-motor`).

Also considered (not downloaded)
- "Elizabeth Engine Replacement (8247682998)", https://commons.wikimedia.org/wiki/File:Elizabeth_Engine_Replacement_(8247682998).jpg. Close-up of hands removing engine bolts, but outdoors on a crate rather than in a boat.
- MTA, "Scheduled Maintenance System at Coney Island Yard (9686603069)", https://commons.wikimedia.org/wiki/File:Scheduled_Maintenance_System_at_Coney_Island_Yard_(9686603069).jpg. Truck and brake rigging assembly; busy, 2160 px.

## field-oilgas

**Primary — `src/field-oilgas.jpg`** "Besøk Troll 18" (Flickr 30149703431). Tommy Ellingsen / Norsk olje og gass (now Offshore Norge), CC BY-SA 2.0. Troll field, Norwegian North Sea, 2016-10-07. 5474 × 3649. Two offshore workers rig chain hoists and a strap on deck. Seen from behind; no logos. The caption credits "Foto: Tommy Ellingsen, Norsk olje og gass".

**alt1 — `src/alt/field-oilgas-alt1.jpg`** "On The Rig Deck" (Flickr 5894085313)
- Source: https://www.flickr.com/photos/lindseygee/5894085313/ (Commons: https://commons.wikimedia.org/wiki/File:Williston_North_Dakota_Oil_Field_On_The_Rig_Deck_(5894085313).jpg)
- Licence: CC BY 2.0 (re-checked on Flickr and Commons). Creator: Lindsey G.
- Location and date: Williston, North Dakota, USA (Bakken); 2011-06-15. 5184 × 3456.
- Why: a driller in coveralls and hard hat works the console levers on a land rig floor, seen from behind. It reads instantly as a drilling rig and has an over-the-shoulder feel.
- Flags: operation rather than maintenance or inspection; a "DANGER STOP – WHERE ARE YOUR BAILS?" sign is legible; small console maker label.

**alt2 — `src/alt/field-oilgas-alt2.jpg`** "Besøk Troll 17" (Flickr 29604991774)
- Source: https://www.flickr.com/photos/olfnorge/29604991774/ (Commons: https://commons.wikimedia.org/wiki/File:Bes%C3%B8k_Troll_17_(29604991774).jpg)
- Licence: CC BY-SA 2.0 (re-checked on Flickr and Commons). Creator: Tommy Ellingsen / Norsk olje og gass.
- Location and date: Troll field, Norwegian North Sea; 2016-10-07. 5760 × 3840.
- Why: rope-access technicians on the platform's outer wall against a deep blue sky. Dramatic, and could also suit `close` (climber against the sky).
- Flags: hands and tools are small in frame.

Also considered (not downloaded)
- "Besøk Troll 24", CC BY-SA 2.0, https://commons.wikimedia.org/wiki/File:Bes%C3%B8k_Troll_24_(29605765153).jpg. A close-up of gloved hands handling chain on the platform. A very POV-like hands-and-tool frame (possible `pov-data` material), but it does not read as oil and gas.
- "Williston North Dakota Oil Worker On The Rig Deck (5894634028)", CC BY 2.0, https://commons.wikimedia.org/wiki/File:Williston_North_Dakota_Oil_Worker_On_The_Rig_Deck_(5894634028).jpg. Over the driller's shoulder onto drilling-data screens: data rather than hands.
- "Work on the drill floor at the semi-submersible rig Polar Pioneer", CC BY-SA 2.0, Tromsø 2011, https://commons.wikimedia.org/wiki/File:Work_on_the_drill_floor_at_the_semi-submersible_rig_Polar_Pioneer.jpg. Atmospheric, but the workers are small behind hoses.
- BSEE inspection photos, e.g. https://commons.wikimedia.org/wiki/File:BSEE_New_Orleans_District_Inspectors_(51012990895).jpg (PD, 2018). Inspectors with drawings and clipboards in agency uniform shirts with patches; little hands-on work.

## field-grid

**Primary — `src/field-grid.jpg`** "2026-04-02 09 50 26 Public Service, Electric and Gas company lineworkers…". Famartin, CC BY-SA 4.0, own work. Ewing Township NJ, 2026-04-02. 4032 × 3024. Two lineworkers in buckets work with rubber gloves and line hoses at the crossarm. Flags: phone telephoto, slightly soft at 100 %.

**alt1 — `src/alt/field-grid-alt1.jpg`** "WAPA trains new crews" (Flickr 31401996996)
- Source: https://www.flickr.com/photos/86561000@N05/31401996996
- Licence: CC BY 2.0 (re-checked on the Flickr photo page). Creator: Western Area Power Administration (US DOE).
- Location and date: Boulder City, Nevada, USA; 2016-11-30 (fall-protection training for new line crews). 8688 × 5792.
- Why: very sharp. Linemen in full harnesses work on a training structure with lattice transmission towers behind.
- Flags: training rather than live work; the left lineman's face is visible (sunglasses).

**alt2 (telecom) — `src/alt/field-grid-alt2.jpg`** "Buxton Mountain radio tower installation" (Flickr 13976835716)
- Source: https://www.flickr.com/photos/28364885@N02/13976835716
- Licence: CC BY 2.0 (re-checked on the Flickr photo page). Creator: Oregon Department of Transportation.
- Location and date: Buxton Mountain, Oregon, USA; 2014-02-25. 2560 × 1920.
- Why: radio-tower technicians in harnesses prepare to place the top section of a new tower.
- Flags: mid-size figures against the sky; faces hidden; already used on the v1 site (as `telecom-climber`).

Also considered (not downloaded)
- MTA C&D, "Electrician connecting control wires to a panel located in a power sub-station in Queens (44655487705)", CC BY 2.0, 2018, https://commons.wikimedia.org/wiki/File:Electrician_connecting_control_wires_to_a_panel_located_in_a_power_sub-station_in_Queens._(CS179,_10-24-18)_(44655487705).jpg. Industrial electrical installation, but it has a burned-in date stamp, a "Five Star Electric" vest and wall posters.
- WAPA, "Working on power lines at Lake Mead (9365)", CC BY 2.0, 2016, https://commons.wikimedia.org/wiki/File:Working_on_power_lines_at_Lake_Mead_(9365).jpg. Linemen on a tower with a helicopter; the workers are small.
- "Billy-Berclau installation of a high voltage line (2)", CC BY-SA 4.0, France 2019, https://commons.wikimedia.org/wiki/File:Billy-Berclau_installation_of_a_high_voltage_line_(2).jpg. A lineman walks a conductor bundle (Europe), but it is portrait with a small figure.
- Telecom: "Climbers carrying out maintenance on an antenna mast for aeronautical radiocommunications…", CC BY 4.0, France, https://commons.wikimedia.org/wiki/File:Climbers_carrying_out_maintenance_on_an_antenna_mast_for_aeronautical_radiocommunications_in_the_VHF_and_UHF_bands.jpg; and "FT Leipzig Antennenmontage 8", CC BY-SA 3.0, Germany 2015, https://commons.wikimedia.org/wiki/File:FT_Leipzig_Antennenmontage_8.jpg. Both are portrait with tiny figures.

## field-construction

**Primary — `src/field-construction.jpg`** "Lemminkäinen Eikemo-utbyggingen". Lemminkäinen Norge AS, CC BY-SA 3.0. Eikemo tunnel works, Norway, 2012-06-13. 4256 × 2832. A tunnel worker in full PPE (helmet with lamp, respirator, ear defenders, gloves, hi-vis) feeds a hose to the rock face. Flags: (1) no heavy machine in frame. (2) Licence: uploaded in 2013 by the account Fbjorlo as part of a batch of the company's own corporate photos, with author and source "Lemminkäinen Norge AS". There is no VRT permission ticket, so licence confidence is medium. Swap to alt1 if a clean licence or visible heavy equipment is required.

**alt1 — `src/alt/field-construction-alt1.jpg`** "Special projects crew repair the road surface at the Mammoth three-way intersection (4)" (Flickr 48015903252)
- Source: https://www.flickr.com/photos/yellowstonenps/48015903252/ (Commons: https://commons.wikimedia.org/wiki/File:Special_projects_crew_repair_the_road_surface_at_the_Mammoth_three-way_intersection_(4)_(48015903252).jpg)
- Licence: public domain (Flickr Public Domain Mark 1.0; Commons PD-USGov-Interior-NPS), re-checked on both. Creator: NPS / Jacob W. Frank (Yellowstone National Park).
- Location and date: Mammoth Hot Springs, Yellowstone National Park, Wyoming, USA; 2019-06-06. 7817 × 5211.
- Why: a crew works hands-on with heavy equipment. The screed operator works the paver controls and a worker shovels at the auger, with a dump truck feeding the paver. Professional and sharp.
- Flags: large "CAT" and "AP500E" branding on the paver (big brand logo; it would need cropping or blurring); NPS uniform patches; one face partly visible.

**alt2 — `src/alt/field-construction-alt2.jpg`** "Track Construction - Scheuchzer B 2001" (Flickr 49058684651)
- Source: https://www.flickr.com/photos/kecko/49058684651/ (Commons: https://commons.wikimedia.org/wiki/File:Track_Construction_-_Scheuchzer_B_2001_(49058684651).jpg)
- Licence: CC BY 2.0 (re-checked on Flickr and Commons). Creator: Kecko.
- Location and date: Switzerland; 2019-11-12. 5472 × 3648.
- Why: at dusk, a specialist in hi-vis prepares and checks the working units of a heavy tamping machine. Heavy equipment being serviced, in a moody look.
- Flags: reads as rail equipment, which overlaps the rail card; the worker's face is hidden.

Also considered (not downloaded)
- Bane NOR / Baneservice road-rail excavator work, CC BY-SA 4.0, Tønsberg, Norway 2023, https://commons.wikimedia.org/wiki/File:Railway_work_Baneservice_(Bane_NOR)_sporarbeid_jernbane_toglinje_skinnegang_Road%E2%80%93rail_vehicle_excavator_Volvo_skinneg%C3%A5ende_gravemaskin_EWR150E_planovergang_crossing_Jernbanegata_T%C3%B8nsberg_Vestfold_Norway_2023-07-27_IMG_8783.jpg. Machine-dominant, with large "VOLVO" lettering.
- Arlington National Cemetery fleet maintenance, PD, 2024, e.g. https://commons.wikimedia.org/wiki/File:Arlington_National_Cemetery_Fleet_Maintenance_in_the_117_Service_Complex_at_Arlington_National_Cemetery,_Arlington,_Virginia_on_February_15,_2024_-_2.jpg. A mechanic on a truck, but it is an Army-administered site with the cemetery seal on the door, so I avoided it.
- "Bob E. (Heavy Mobile Equipment Mechanic) arc welding the rotary blower", PD, Yellowstone 2017, https://commons.wikimedia.org/wiki/File:Bob_E._(Heavy_Mobile_Equipment_Mechanic)_arc_welding_the_rotary_blower_(37192241885).jpg. Two smiling, posed faces; not the welding itself.
- "Ebing Haltepunkt Arbeiter mit Fräse", CC BY-SA 4.0, Bavaria 2016, https://commons.wikimedia.org/wiki/File:Ebing_Haltepunkt_Arbeiter_mit_Fr%C3%A4se-20160831-RM-094244.jpg. A dramatic backlit saw-cut in dust, but no visible respiratory or eye protection (PPE fail).
- Anaconda Job Corps heavy-equipment mechanic (v1 `heavy-mechanic`). Training, portrait original.

---

## Cross-slot notes
- Only one primary shows sparks: water (grinding). The marine primary deliberately avoids them for variety; marine alt1 (welding) and alt2 (cutting) would repeat that motif.
- Faces are not dominant on any primary. Partial faces: rail (mask, profile), marine (profile), machinery (background profile).
- No police or military personnel or insignia on any primary. Three US Army Corps of Engineers photos show civilian contractors only; the licence templates say "Military-Army" only because USACE is part of the Army.
- Credit lines asked for by authors are recorded in the manifest notes in the `Author-requested attribution: "…"` form: MTA (Marc A. Hermann / MTA), S.J. de Waard, Norsk olje og gass (Tommy Ellingsen).
