import type { ReactNode } from "react";

/**
 * Small line-art explainers for the use-case cards: white strokes on the night
 * tile, thermal accents where the "learning" happens. Static, no animation.
 * All drawn in a 320 × 200 viewBox.
 */

const MONO = { fontFamily: "var(--font-jetbrains), ui-monospace, monospace" } as const;
const DISPLAY = { fontFamily: "var(--font-inter-tight), var(--font-inter), sans-serif" } as const;
/** solid accent marks on the night tile (= --color-accent-night); the glows keep the thermal gradient */
const ACCENT = "#7e22ce";

function Frame({ id, children, label }: { id: string; children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${id}-heat`}>
          <stop offset="0%" stopColor="#fff4ce" stopOpacity="0.95" />
          <stop offset="22%" stopColor="#fcba3a" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#f57a24" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#b02684" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6c1a94" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="#fff" opacity="0.09" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill={`url(#${id}-dots)`} />
      {children}
    </svg>
  );
}

const Joint = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r="2.6" fill="#111" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.2" />;

/** Hand-pose skeleton of an expert demonstration → a robot gripper. */
function Hands() {
  const P = {
    W: [118, 172], T1: [95, 155], T2: [78, 138], T3: [68, 122], T4: [62, 108],
    I1: [104, 122], I2: [100, 98], I3: [98, 82], I4: [97, 68],
    M1: [120, 118], M2: [121, 92], M3: [122, 75], M4: [123, 60],
    R1: [135, 121], R2: [140, 98], R3: [144, 83], R4: [147, 70],
    P1: [148, 130], P2: [157, 114], P3: [163, 103], P4: [168, 92],
  } as const;
  type K = keyof typeof P;
  const chains: K[][] = [
    ["W", "T1", "T2", "T3", "T4"],
    ["W", "I1", "I2", "I3", "I4"],
    ["W", "P1", "P2", "P3", "P4"],
    ["I1", "M1", "R1", "P1"],
    ["M1", "M2", "M3", "M4"],
    ["R1", "R2", "R3", "R4"],
  ];
  const tips: K[] = ["T4", "I4", "M4", "R4", "P4"];
  return (
    <Frame id="ex-hands" label="Hand-pose skeleton from an expert demonstration, mapped to a robot gripper">
      {tips.map((k) => (
        <circle key={k} cx={P[k][0]} cy={P[k][1]} r="12" fill="url(#ex-hands-heat)" />
      ))}
      {chains.map((c, i) => (
        <polyline key={i} points={c.map((k) => P[k].join(",")).join(" ")} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" strokeLinejoin="round" />
      ))}
      {(Object.keys(P) as K[]).map((k) => (
        <Joint key={k} x={P[k][0]} y={P[k][1]} />
      ))}
      <line x1="190" y1="112" x2="236" y2="112" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="3 4" />
      <path d="M232 107 L240 112 L232 117" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.3" />
      <text x="213" y="100" textAnchor="middle" fontSize="8" fill="#fff" fillOpacity="0.55" style={MONO} letterSpacing="1">
        DEMO → ROBOT
      </text>
      <circle cx="268" cy="90" r="11" fill="url(#ex-hands-heat)" />
      <circle cx="288" cy="90" r="11" fill="url(#ex-hands-heat)" />
      <path d="M266 128 L262 98 L269 89" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M290 128 L294 98 L287 89" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="270" y="128" width="16" height="12" rx="2" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
      <rect x="260" y="140" width="36" height="34" rx="4" fill="#161616" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
      <text x="16" y="190" fontSize="8" fill="#fff" fillOpacity="0.45" style={MONO} letterSpacing="1">
        HAND POSE · 21 POINTS
      </text>
      <text x="304" y="190" textAnchor="end" fontSize="8" fill="#fff" fillOpacity="0.45" style={MONO} letterSpacing="1">
        GRIPPER
      </text>
    </Frame>
  );
}

/** Observed frames of a job, then the next step predicted. */
function Frames() {
  const xs = [12, 74, 136, 198, 260];
  return (
    <Frame id="ex-frames" label="Four observed frames of a task followed by a predicted next frame">
      <line x1="36" y1="46" x2="222" y2="46" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
      <line x1="222" y1="46" x2="284" y2="46" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.2" strokeDasharray="3 4" />
      {xs.map((x, i) => {
        const pred = i === 4;
        const cx = x + 24;
        const a = ((i * 32 - 70) * Math.PI) / 180;
        return (
          <g key={x}>
            <circle cx={cx} cy="46" r="3" fill={pred ? ACCENT : "#111"} stroke={pred ? ACCENT : "#fff"} strokeOpacity="0.8" strokeWidth="1.2" />
            {pred ? <circle cx={cx} cy="100" r="22" fill="url(#ex-frames-heat)" /> : null}
            <rect
              x={x}
              y="68"
              width="48"
              height="64"
              rx="4"
              fill={pred ? "none" : "#fff"}
              fillOpacity={pred ? 0 : 0.03}
              stroke={pred ? ACCENT : "#fff"}
              strokeOpacity={pred ? 0.9 : 0.5}
              strokeWidth="1.2"
              strokeDasharray={pred ? "4 3" : undefined}
            />
            <polygon
              points={Array.from({ length: 6 }, (_, k) => {
                const t = (Math.PI / 3) * k;
                return `${cx + 8 * Math.cos(t)},${100 + 8 * Math.sin(t)}`;
              }).join(" ")}
              fill="none"
              stroke={pred ? ACCENT : "#fff"}
              strokeOpacity={pred ? 0.95 : 0.65}
              strokeWidth="1.2"
            />
            <line x1={cx} y1="100" x2={cx + 18 * Math.cos(a)} y2={100 + 18 * Math.sin(a)} stroke={pred ? ACCENT : "#fff"} strokeOpacity={pred ? 0.95 : 0.8} strokeWidth="2.4" strokeLinecap="round" />
            <text x={cx} y="150" textAnchor="middle" fontSize="8" fill={pred ? ACCENT : "#fff"} fillOpacity={pred ? 1 : 0.5} style={MONO}>
              {pred ? "t5 ?" : `t${i + 1}`}
            </text>
          </g>
        );
      })}
      <text x="16" y="190" fontSize="8" fill="#fff" fillOpacity="0.45" style={MONO} letterSpacing="1">
        OBSERVED
      </text>
      <text x="304" y="190" textAnchor="end" fontSize="8" fill={ACCENT} style={MONO} letterSpacing="1">
        PREDICTED NEXT STEP
      </text>
    </Frame>
  );
}

const Corner = ({ d }: { d: string }) => <path d={d} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.4" />;

/** A guided step: viewfinder, highlighted bolt, instruction card, progress. */
function Assist() {
  const cx = 104;
  const cy = 100;
  const bolts = Array.from({ length: 6 }, (_, k) => {
    const t = (Math.PI / 3) * k - Math.PI / 2;
    return [cx + 34 * Math.cos(t), cy + 34 * Math.sin(t)] as const;
  });
  const hot = bolts[2];
  return (
    <Frame id="ex-assist" label="Assistant view: a highlighted bolt on a flange with an instruction card for the next step">
      <Corner d="M18 40 V22 H36" />
      <Corner d="M302 40 V22 H284" />
      <Corner d="M18 160 V178 H36" />
      <Corner d="M302 160 V178 H284" />
      <circle cx={hot[0]} cy={hot[1]} r="22" fill="url(#ex-assist-heat)" />
      <circle cx={cx} cy={cy} r="48" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.3" />
      <circle cx={cx} cy={cy} r="18" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
      {bolts.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="5" fill="#111" stroke={k === 2 ? ACCENT : "#fff"} strokeOpacity={k === 2 ? 1 : 0.7} strokeWidth="1.3" />
      ))}
      <line x1={hot[0] + 8} y1={hot[1]} x2="186" y2="84" stroke="#fff" strokeOpacity="0.75" strokeWidth="1" />
      <circle cx={hot[0] + 8} cy={hot[1]} r="2.4" fill="#111" stroke="#fff" strokeWidth="1.2" />
      <rect x="186" y="58" width="112" height="56" rx="6" fill="#121212" stroke="#fff" strokeOpacity="0.25" />
      <text x="196" y="74" fontSize="7.5" fill={ACCENT} style={MONO} letterSpacing="1">
        STEP 4 OF 6
      </text>
      <text x="196" y="90" fontSize="11" fontWeight="600" fill="#fff" style={DISPLAY}>
        Tighten bolt 3
      </text>
      <text x="196" y="104" fontSize="8" fill="#fff" fillOpacity="0.6" style={DISPLAY}>
        Cross pattern, to spec
      </text>
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <rect key={k} x={186 + k * 19} y="128" width="16" height="3" rx="1.5" fill={k === 3 ? ACCENT : "#fff"} fillOpacity={k < 3 ? 0.5 : k === 3 ? 1 : 0.15} />
      ))}
      <text x="186" y="146" fontSize="8" fill="#fff" fillOpacity="0.45" style={MONO} letterSpacing="1">
        GUIDED JOB
      </text>
    </Frame>
  );
}

/** A pipe run with a seam, wear found and boxed. */
function Inspect() {
  return (
    <Frame id="ex-inspect" label="Pipe run with a highlighted area of wear and a detection label">
      <circle cx="232" cy="104" r="34" fill="url(#ex-inspect-heat)" />
      <line x1="14" y1="80" x2="306" y2="80" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.3" />
      <line x1="14" y1="128" x2="306" y2="128" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.3" />
      <rect x="132" y="68" width="16" height="72" rx="2" fill="#151515" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />
      {[74, 92, 110, 128].map((y) => (
        <circle key={y} cx="140" cy={y - 2} r="1.8" fill="#fff" fillOpacity="0.55" />
      ))}
      <line x1="70" y1="80" x2="70" y2="128" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
      <line x1="232" y1="80" x2="232" y2="128" stroke="#fff" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
      <Corner d="M206 88 V80 H214" />
      <Corner d="M258 88 V80 H250" />
      <Corner d="M206 120 V128 H214" />
      <Corner d="M258 120 V128 H250" />
      <line x1="244" y1="80" x2="262" y2="52" stroke="#fff" strokeOpacity="0.75" strokeWidth="1" />
      <circle cx="244" cy="80" r="2.4" fill="#111" stroke="#fff" strokeWidth="1.2" />
      <rect x="196" y="22" width="108" height="32" rx="6" fill="#121212" stroke="#fff" strokeOpacity="0.25" />
      <text x="206" y="35" fontSize="10" fontWeight="600" fill="#fff" style={DISPLAY}>
        Wear found
      </text>
      <text x="206" y="47" fontSize="7.5" fill="#fff" fillOpacity="0.6" style={MONO} letterSpacing="0.5">
        SEAM · SECTION 3
      </text>
      <text x="16" y="190" fontSize="8" fill="#fff" fillOpacity="0.45" style={MONO} letterSpacing="1">
        EXPERT CHECK → MODEL
      </text>
    </Frame>
  );
}

export function Explainer({ kind }: { kind: "hands" | "frames" | "assist" | "inspect" }) {
  if (kind === "hands") return <Hands />;
  if (kind === "frames") return <Frames />;
  if (kind === "assist") return <Assist />;
  return <Inspect />;
}
