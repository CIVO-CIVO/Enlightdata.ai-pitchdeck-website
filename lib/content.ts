import type { IconName } from "@/components/icon";

/**
 * Every word on the pitch site lives here, so the copy can be edited without
 * touching layout. Keep it short: one idea per slide, one line per point.
 * Nothing here may claim customers, partners, volumes, prices or traction
 * that the founders haven't confirmed.
 */

export const site = {
  name: "Enlightdata.ai",
  url: "https://enlightdata.ai",
  /** placeholder — confirm the real inbox before sharing the site */
  email: "contact@enlightdata.ai",
  tagline: "POV data of skilled manual work, for humanoid robotics",
  description:
    "Enlightdata.ai collects, curates and brokers first-person video of highly skilled manual work across Europe and North America — the data humanoid robots and physical AI will need next.",
  sister: "Enlightlayer.com",
};

export type Tone = "dark" | "light";

/** Slide order — drives the header links, the progress rail and keyboard navigation. */
export const slides: { id: string; n: string; label: string; tone: Tone; nav?: string }[] = [
  { id: "top", n: "01", label: "Enlightdata.ai", tone: "dark" },
  { id: "gap", n: "02", label: "The gap", tone: "light", nav: "The gap" },
  { id: "data", n: "03", label: "What we broker", tone: "dark", nav: "What we broker" },
  { id: "pipeline", n: "04", label: "Inside the data", tone: "light" },
  { id: "jobs", n: "05", label: "Example capture", tone: "dark" },
  { id: "fields", n: "06", label: "Seven fields", tone: "light", nav: "Fields" },
  { id: "why", n: "07", label: "Why skilled work", tone: "dark" },
  { id: "buyers", n: "08", label: "Use cases", tone: "light", nav: "Use cases" },
  { id: "model", n: "09", label: "Our role", tone: "dark", nav: "Model" },
  { id: "options", n: "10", label: "Ways to work with us", tone: "light" },
  { id: "process", n: "11", label: "How a deal works", tone: "dark" },
  { id: "trust", n: "12", label: "Rights first", tone: "light", nav: "Trust" },
  { id: "contact", n: "13", label: "Contact", tone: "dark" },
];

export const hero = {
  eyebrow: "POV data for humanoid robotics · Europe & North America",
  title: "Expert hands, on camera.",
  lead: "We collect, curate and broker real-world first-person video of highly skilled manual work — helmet cams and bodycams on real jobs — for the teams building humanoid robots. The most valuable data, and almost nobody is gathering it.",
  proof: [
    { icon: "video", title: "Helmet cams & bodycams", text: "First-person footage, worn on the job." },
    { icon: "hard-hat", title: "Highly skilled work", text: "Maintenance, repair, checks, inspections." },
    { icon: "globe", title: "Europe & North America", text: "Captured where the infrastructure is." },
    { icon: "shield-check", title: "Rights-cleared", text: "Consent and a licence for every clip." },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const gap = {
  eyebrow: "The gap",
  title: "Asia is filming simple work. Nobody is filming the experts.",
  lead: "Low- and medium-skill labour is already filmed at scale in Asia. High-skill manual work in Europe and North America isn't, and the people who know it are retiring.",
  scarce: { label: "Very little footage", text: "Welders, linemen, rail and marine technicians" },
  points: [
    { icon: "trend", title: "A supply shock is coming", text: "Experienced tradespeople in Europe and North America are retiring faster than they're replaced. Their know-how leaves with them." },
    { icon: "lock", title: "Supply is locked away", text: "Skilled field work happens on live sites, behind safety rules, permits and contracts." },
    { icon: "ban", title: "It can't be staged", text: "Nobody can rebuild a rail yard, a sewer or a substation in a studio." },
  ] satisfies { icon: IconName; title: string; text: string }[],
  spectrum: {
    title: "Who is filming first-person work today",
    note: "Qualitative",
    ours: "Our focus",
    items: [
      { label: "Everyday & household", level: "Plenty", fill: 1 },
      { label: "Low-skill labour · Asia", level: "Plenty", fill: 0.9 },
      { label: "Medium-skill labour · Asia", level: "Growing", fill: 0.55 },
      { label: "High-skill manual · EU & NA", level: "Scarce", fill: 0.1, ours: true },
    ],
  },
};

export const data = {
  eyebrow: "What we broker",
  title: "First-person footage of real, skilled jobs.",
  lead: "Real crews on real sites, filmed from their own point of view — then cleared, cleaned and labelled for licensing.",
  cameras: [
    { icon: "hard-hat", label: "Helmet cams" },
    { icon: "video", label: "Bodycams" },
    { icon: "glasses", label: "Smart glasses" },
  ] satisfies { icon: IconName; label: string }[],
  includesTitle: "Every dataset includes",
  includes: [
    "First-person video of the whole job, start to finish",
    "The worker's own commentary, when they give it",
    "Labels: trade, task, steps, tools, equipment, country",
    "Consent and a licence for every clip",
    "Faces, names and number plates blurred",
  ],
  not: ["Not fixed cameras — that's our sister company, Enlightlayer.com", "Not studio shoots", "Not consumer data"],
  steps: ["Brief", "Isolate", "Inspect", "Repair", "Test", "Sign off"],
  activeStep: 2,
};

export const pipeline = {
  eyebrow: "Inside the data",
  title: "Raw footage in. Licensed, labelled data out.",
  lead: "Crews film normal jobs. We turn what they film into data AI teams can buy.",
  inputsTitle: "From the job",
  inputs: [
    { icon: "hard-hat", label: "Helmet-cam video", img: "capture" },
    { icon: "video", label: "Bodycam video", img: "pov-data" },
    { icon: "mic", label: "Worker commentary", visual: "wave" },
    { icon: "clipboard", label: "Job & site details", visual: "meta" },
  ] as { icon: IconName; label: string; img?: string; visual?: "wave" | "meta" }[],
  hub: { title: "Enlightdata.ai", steps: ["Consent", "Clean", "Label", "License"] },
  outputsTitle: "To the buyer",
  outputs: [
    { icon: "file-check", label: "Licensed POV dataset" },
    { icon: "list-checks", label: "Step-by-step task labels" },
    { icon: "signature", label: "Consent & rights records" },
    { icon: "eye-off", label: "Privacy-safe footage" },
  ] satisfies { icon: IconName; label: string }[],
  note: { title: "What we are", text: "A broker. We find, clear and prepare footage — we don't build AI models, run fixed cameras or trade consumer data." },
};

export const jobs = {
  eyebrow: "Example capture",
  title: "What one job looks like as data.",
  main: {
    img: "job-rail",
    tag: "Rail · Track work · Switzerland",
    callouts: [
      { title: "Step 4 of 6", lines: ["Measure at the rail"], icon: "list-checks" },
      { title: "Commentary", lines: ["“Gauge is good — next sleeper.”"], icon: "mic" },
    ] as { title: string; lines: string[]; icon: IconName }[],
  },
  recordTitle: "Clip record",
  record: [
    ["Trade", "Rail · track maintenance"],
    ["Task", "Gauge and fastening check"],
    ["Steps", "6, each labelled"],
    ["Cameras", "Helmet cam, whole crew"],
    ["Commentary", "Worker's own words"],
    ["Site", "Open line · Switzerland"],
    ["Rights", "Company contract · worker consent"],
    ["Privacy", "Faces and names blurred"],
  ] as [string, string][],
  more: [
    { img: "job-water", tag: "Water · Pump station · USA", title: "Overhauling a water pump", chips: ["Bodycams", "Step labels"] },
    { img: "job-grid", tag: "Grid · Line work · USA", title: "Lineworker training at height", chips: ["Helmet cam", "Training site"] },
  ],
};

export type Field = { n: string; key: string; img: string; icon: IconName; title: string; examples: string };

export const fields = {
  eyebrow: "Where we work",
  title: "Seven fields. Rail first.",
  lead: "Broad, complex, hands-on work that is never the same twice.",
  kinds: ["Maintenance", "Repair", "Checks", "Inspections"],
  main: "Main focus",
  list: [
    { n: "01", key: "rail", img: "field-rail", icon: "train", title: "Rail & railroads", examples: "Track and switches · brakes, bogies, wheelsets · overhead lines · depot inspections" },
    { n: "02", key: "water", img: "field-water", icon: "droplets", title: "Water, sewage & tunnels", examples: "Sewers and tunnels under cities · pump stations · pipe and valve work" },
    { n: "03", key: "marine", img: "field-marine", icon: "ship", title: "Shipyards & marine", examples: "Welding and hull building · dry-dock inspection · ship systems maintenance" },
    { n: "04", key: "machinery", img: "field-machinery", icon: "cog", title: "Industrial machinery", examples: "Engine and motor repair, incl. inside boats · stationary pumps, compressors, gearboxes" },
    { n: "05", key: "oilgas", img: "field-oilgas", icon: "fuel", title: "Oil & gas rigs", examples: "Platform maintenance · valves and pipework · inspection rounds" },
    { n: "06", key: "grid", img: "field-grid", icon: "zap", title: "Grid, substations & telecom", examples: "Substations · power lines · telecom towers · industrial electrical" },
    { n: "07", key: "construction", img: "field-construction", icon: "construction", title: "Construction & heavy equipment", examples: "Excavators, loaders, cranes · hydraulics · on-site repair" },
  ] satisfies Field[],
};

export const why = {
  eyebrow: "Why skilled work",
  title: "Skilled field work isn't one task. It's thousands.",
  lead: "Every trade splits into many jobs, every job into steps, and every step into judgement calls that take people years to learn. A robot can't pick that up from one video.",
  simple: "Repeatable tasks — same station, same motion — are already filmed at scale.",
  tradesTitle: "One field, many trades",
  trades: [
    { trade: "Rail", tasks: ["Gauge checks", "Rail grinding", "Switch repair"], call: "Is this crack within limits?" },
    { trade: "Grid", tasks: ["Live-line work", "Pole replacement", "Fault finding"], call: "Work it live, or isolate first?" },
    { trade: "Water & sewer", tasks: ["Pump overhaul", "Valve swaps", "Pipe inspection"], call: "Repair now, or schedule it?" },
    { trade: "Marine", tasks: ["Hull surveys", "Engine fitting", "Weld repair"], call: "Is the plate thick enough to pass?" },
    { trade: "Oil & gas", tasks: ["Rigging & lifting", "Flange bolting", "Leak testing"], call: "Is that lift safe in this wind?" },
    { trade: "Machinery", tasks: ["Bearing changes", "Alignment", "Diagnostics"], call: "Just noise, or a failure coming?" },
  ],
  callLabel: "Judgement call",
  equation: {
    title: "One job, many versions",
    task: "Brake inspection",
    factors: [
      ["4", "equipment generations"],
      ["5", "manufacturers"],
      ["2", "rulebooks · EU / NA"],
      ["4", "conditions · day, night, cold, wet"],
    ] as [string, string][],
    result: ["160", "different jobs to learn"] as [string, string],
    note: "Illustrative",
  },
};

export const buyers = {
  eyebrow: "Use cases",
  title: "What AI teams build with skilled POV footage.",
  lead: "First-person video of expert work teaches machines how real jobs are done.",
  cards: [
    { visual: "hands", title: "Robot learning", text: "Teach robots to handle tools and parts from expert demonstrations." },
    { visual: "frames", title: "World models", text: "Learn how real work unfolds, step by step, in real conditions." },
    { visual: "assist", title: "Work assistants", text: "AI and AR copilots that guide technicians through a job." },
    { visual: "inspect", title: "Inspection AI", text: "Spot wear, leaks and damage the way experienced crews do." },
  ] as { visual: "hands" | "frames" | "assist" | "inspect"; title: string; text: string }[],
  whoTitle: "Typical buyers",
  who: ["Robotics & humanoid companies", "Physical-AI labs", "World-model teams", "AI training-data brokers", "Industrial AI vendors"],
};

export type Service = { icon: IconName; title: string; text: string };

export const model = {
  eyebrow: "Our role",
  title: "We work for both sides.",
  lead: "Field companies get help turning their expertise into value. Data brokers and AI teams get the data, deals and partners they can't find elsewhere.",
  supply: {
    icon: "hard-hat" as IconName,
    title: "For field companies",
    who: "Rail operators, utilities, shipyards, contractors",
    services: [
      { icon: "handshake", title: "Lease or sell your data", text: "We find the buyers and arrange the lease or sale, on your terms." },
      { icon: "user-check", title: "Specialists to curate it", text: "We bring in consultants to organise and curate your footage." },
      { icon: "trend", title: "For sale, for value, or your own AI", text: "Curated data ready to sell, worth more, or to train your own AI in-house." },
    ] satisfies Service[],
  },
  demand: {
    icon: "bot" as IconName,
    title: "For data brokers & AI teams",
    who: "AI training-data brokers, robotics and physical-AI teams",
    services: [
      { icon: "search", title: "The data you're looking for", text: "Footage by trade, task and region — leased, bought or captured to order." },
      { icon: "signature", title: "Deals and contracts", text: "We help sign the deals and contracts, and find the right companies." },
      { icon: "scan-eye", title: "Curation partners & rare niches", text: "Partners to curate data, and very specific, in-demand fields others can't reach." },
    ] satisfies Service[],
  },
  us: "Enlightdata.ai",
  earnTitle: "What we bring",
  earn: [
    { icon: "shield-check", title: "Trust on both sides", text: "Consent, contracts and clean rights, so every deal is safe to sign." },
    { icon: "repeat", title: "A network of specialists", text: "Consultants and curation partners, matched to each company and field." },
    { icon: "refresh", title: "Fresh, in-demand data", text: "Equipment and methods keep changing — we keep the supply up to date." },
  ] satisfies Service[],
};

export const options = {
  eyebrow: "Ways to work with us",
  title: "Two sides. One partner.",
  sides: [
    {
      icon: "hard-hat" as IconName,
      title: "Field companies",
      who: "Rail operators, utilities, shipyards, contractors",
      items: [
        { title: "Lease or sell your data", text: "We find buyers and arrange leases or sales of footage from work your crews already do — contracts and quality handled." },
        { title: "Curate it with specialists", text: "We bring in consultants to organise and curate your data — for sale, for its value, or to train your own AI in-house." },
        { title: "Hybrid", text: "Keep what's sensitive in-house for your own use, and license the rest." },
      ],
    },
    {
      icon: "bot" as IconName,
      title: "AI teams & data brokers",
      who: "AI training-data brokers, robotics and physical-AI teams, world-model builders",
      items: [
        { title: "The data you're looking for", text: "Licensed footage by trade, task and region — leased, bought or captured to order." },
        { title: "Deals and contracts", text: "We help sign deals, set up contracts and find the right companies, including partners to curate data." },
        { title: "Hard-to-find niches", text: "We seek out partners in very specific, in-demand fields and niches you struggle to find elsewhere." },
      ],
    },
  ],
};

export const deal = {
  eyebrow: "How a deal works",
  title: "From job site to dataset in five steps.",
  lead: "Normal jobs, filmed by the people doing them. Nothing is staged.",
  steps: [
    { icon: "search", title: "Match", text: "A buyer names a trade, task and region. We find crews who do that work." },
    { icon: "signature", title: "Agree", text: "A company contract and worker consent: who owns what, who may use it, for how long." },
    { icon: "video", title: "Capture", text: "Crews wear helmet cams or bodycams on normal jobs. Safety rules always come first." },
    { icon: "scan-eye", title: "Check", text: "We review quality, blur faces and names, and label each step of the task." },
    { icon: "file-check", title: "License", text: "The buyer gets the footage under clear terms. The company gets paid." },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const trust = {
  eyebrow: "Rights first",
  title: "Built for Europe's and North America's rules.",
  lead: "Here, footage without consent and a licence can't be used. Clearing the rights is the product.",
  items: [
    { icon: "user-check", title: "Consent from every worker", text: "Every worker agrees before anything is filmed." },
    { icon: "signature", title: "A contract with every company", text: "Clear terms for ownership, use and revenue." },
    { icon: "eye-off", title: "Private by default", text: "Faces, names and number plates blurred before delivery." },
    { icon: "hard-hat", title: "Safety first", text: "The camera never changes how the job is done." },
    { icon: "file-check", title: "Clear licences", text: "What the buyer may do, where, and for how long." },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const contact = {
  eyebrow: "Let's talk",
  title: "Real-world POV data of skilled work. Brokered.",
  lead: "Enlightdata.ai connects skilled field crews with the teams building physical AI — across Europe and North America.",
  cta: "Email us",
  pdf: "Download the deck (PDF)",
  back: "Back to the start",
  sisterLine: "Fixed-camera monitoring is our sister company, Enlightlayer.com.",
};
