"use client";

import React from "react";
import { Stage, useTime, clamp } from "./stage";

// ── Palette / fonts ────────────────────────────────────────────────────────────
const INK      = "#0a0a0a";
const PAPER    = "#fafaf8";
const HAIRLINE = "rgba(10,10,10,0.18)";
const FAINT    = "rgba(10,10,10,0.5)";
const MUTED    = "rgba(10,10,10,0.35)";
const SANS     = `Helvetica,"Helvetica Neue",Arial,sans-serif`;
const MONO     = `ui-monospace,SFMono-Regular,monospace`;

// ── Layout ─────────────────────────────────────────────────────────────────────
const W = 1440, H = 900, PAD = 64;
const TRACK = { x: PAD, y: PAD + 40, w: 880, h: H - PAD * 2 - 40 };
const CLOUD  = {
  x: TRACK.x + TRACK.w + 56,
  y: PAD + 40,
  w: W - (TRACK.x + TRACK.w + 56) - PAD,
  h: H - PAD * 2 - 40,
};

// ── Object definitions ─────────────────────────────────────────────────────────
type LaneCfg = { y: number; light: string; heavy: string };
const LANES: LaneCfg[] = [
  { y: 0.22, light: "feather", heavy: "boulder" },
  { y: 0.50, light: "leaf",    heavy: "brick"   },
  { y: 0.78, light: "balloon", heavy: "anvil"   },
];

type ShapeSpec = { mass: number; size: number };
const SHAPES: Record<string, ShapeSpec> = {
  feather: { mass: 0.08, size: 36 },
  leaf:    { mass: 0.14, size: 32 },
  balloon: { mass: 0.18, size: 42 },
  brick:   { mass: 0.72, size: 50 },
  boulder: { mass: 0.88, size: 72 },
  anvil:   { mass: 0.96, size: 64 },
};

// ── Launch schedule ────────────────────────────────────────────────────────────
const CROSS_DUR = 1.6;
const CYCLE     = 3.6;
const FIELD_PAD = 80;

type Launch = { laneIdx: number; kind: string; launchT: number };
const LAUNCHES: Launch[] = [];
for (let cycle = 0; cycle < 4; cycle++) {
  LANES.forEach((lane, li) => {
    const base = cycle * CYCLE;
    const off  = li * 0.35;
    LAUNCHES.push({ laneIdx: li, kind: lane.light, launchT: base + off + 0.10 });
    LAUNCHES.push({ laneIdx: li, kind: lane.heavy, launchT: base + off + 1.85 });
  });
}

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// ── Silhouette ─────────────────────────────────────────────────────────────────
function Silhouette({ kind, size: s }: { kind: string; size: number }) {
  const f = INK;
  switch (kind) {
    case "feather":
      return (
        <svg width={s} height={s * 0.4} viewBox={`0 0 ${s} ${s * 0.4}`}>
          <ellipse cx={s / 2}   cy={s * 0.20} rx={s * 0.48} ry={s * 0.11} fill={f} />
          <rect    x={s * 0.04} y={s * 0.19}  width={s * 0.92} height={1.2} fill={f} />
        </svg>
      );
    case "leaf":
      return (
        <svg width={s} height={s * 0.62} viewBox={`0 0 ${s} ${s * 0.62}`}>
          <path
            d={`M${s*.05} ${s*.31}Q${s*.5} ${-s*.05} ${s*.95} ${s*.31}Q${s*.5} ${s*.67} ${s*.05} ${s*.31}Z`}
            fill={f}
          />
        </svg>
      );
    case "balloon":
      return (
        <svg width={s * 0.7} height={s} viewBox={`0 0 ${s * 0.7} ${s}`}>
          <ellipse cx={s*.35} cy={s*.42} rx={s*.32} ry={s*.4} fill={f} />
          <path d={`M${s*.35} ${s*.82}L${s*.32} ${s*.86}L${s*.38} ${s*.86}Z`} fill={f} />
          <path d={`M${s*.35} ${s*.86}Q${s*.42} ${s*.95} ${s*.34} ${s}`} stroke={f} strokeWidth="1" fill="none" />
        </svg>
      );
    case "brick":
      return (
        <svg width={s} height={s * 0.5} viewBox={`0 0 ${s} ${s * 0.5}`}>
          <rect x={0} y={0} width={s} height={s * 0.5} fill={f} />
        </svg>
      );
    case "boulder":
      return (
        <svg width={s} height={s * 0.85} viewBox={`0 0 ${s} ${s * 0.85}`}>
          <path
            d={`M${s*.04} ${s*.62}Q${s*.0} ${s*.32} ${s*.22} ${s*.18}Q${s*.5} ${s*.02} ${s*.78} ${s*.16}Q${s*1.0} ${s*.32} ${s*.96} ${s*.66}Q${s*.86} ${s*.82} ${s*.5} ${s*.84}Q${s*.14} ${s*.82} ${s*.04} ${s*.62}Z`}
            fill={f}
          />
        </svg>
      );
    case "anvil":
      return (
        <svg width={s} height={s * 0.78} viewBox={`0 0 ${s} ${s * 0.78}`}>
          <path
            d={`M${s*.02} ${s*.18}Q${s*.18} ${s*.10} ${s*.32} ${s*.18}L${s*.86} ${s*.18}L${s*.98} ${s*.10}L${s*.98} ${s*.32}L${s*.78} ${s*.32}L${s*.78} ${s*.5}L${s*.92} ${s*.5}L${s*.92} ${s*.7}L${s*.08} ${s*.7}L${s*.08} ${s*.5}L${s*.22} ${s*.5}L${s*.22} ${s*.32}L${s*.02} ${s*.32}Z`}
            fill={f}
          />
        </svg>
      );
    default:
      return null;
  }
}

// ── Trail ──────────────────────────────────────────────────────────────────────
function Trail({ x, y, mass, fieldX }: { x: number; y: number; mass: number; fieldX: number }) {
  const len    = 20 + mass * 140;
  const startX = Math.max(fieldX, x - len);
  const visLen = x - startX;
  if (visLen < 4) return null;
  const opacity = 0.08 + mass * 0.42;
  return (
    <div style={{
      position: "absolute",
      left: startX, top: y - 1,
      width: visLen, height: 2,
      background: `linear-gradient(to right, transparent 0%, rgba(10,10,10,${opacity}) 100%)`,
      pointerEvents: "none",
      transform: "translateY(-50%)",
    }} />
  );
}

// ── MovingObject ───────────────────────────────────────────────────────────────
function MovingObject({ launch, time, fieldW, fieldH }: {
  launch: Launch; time: number; fieldW: number; fieldH: number;
}) {
  const lane   = LANES[launch.laneIdx];
  const spec   = SHAPES[launch.kind];
  const localT = time - launch.launchT;
  if (localT < 0 || localT > CROSS_DUR + 0.9) return null;

  const spawnX  = FIELD_PAD;
  const strikeX = fieldW - FIELD_PAD - 4;
  const yPx     = lane.y * fieldH;

  let x = 0, opacity = 1, strikeT = 0;

  if (localT <= CROSS_DUR) {
    const p = localT / CROSS_DUR;
    x       = spawnX + (strikeX - spawnX) * p;
    opacity = clamp(localT / 0.15, 0, 1);
  } else {
    x       = strikeX;
    strikeT = (localT - CROSS_DUR) / 0.9;
    opacity = 1 - strikeT;
  }

  const m           = spec.mass;
  const ringMaxR    = 14 + m * 110;
  const ringR       = strikeT * ringMaxR;
  const ringOpacity = (1 - strikeT) * (0.15 + m * 0.55);
  const squash      = strikeT > 0 ? (1 - strikeT) * (0.04 + m * 0.18) : 0;

  return (
    <>
      {localT < CROSS_DUR && <Trail x={x} y={yPx} mass={m} fieldX={spawnX} />}

      <div style={{
        position: "absolute",
        left: x, top: yPx,
        transform: `translate(-50%,-50%) scaleX(${1 - squash}) scaleY(${1 + squash * 0.5})`,
        opacity,
        willChange: "transform,opacity",
      }}>
        <Silhouette kind={launch.kind} size={spec.size} />
      </div>

      {strikeT > 0 && strikeT < 1 && (
        <>
          <div style={{
            position: "absolute", left: strikeX, top: yPx,
            width: ringR * 2, height: ringR * 2,
            transform: "translate(-50%,-50%)",
            border: `1px solid ${INK}`,
            borderRadius: "50%",
            opacity: ringOpacity,
            pointerEvents: "none",
          }} />
          {m > 0.5 && (
            <div style={{
              position: "absolute", left: strikeX, top: yPx,
              width: ringR * 1.2, height: ringR * 1.2,
              transform: "translate(-50%,-50%)",
              border: `1px solid ${INK}`,
              borderRadius: "50%",
              opacity: ringOpacity * 0.6,
              pointerEvents: "none",
            }} />
          )}
          {m > 0.4 && [0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i} style={{
              position: "absolute", left: strikeX, top: yPx,
              width: 6 + m * 16, height: 1,
              background: INK,
              opacity: ringOpacity * 0.7,
              transform: `translate(-50%,-50%) rotate(${deg}deg) translateX(${ringR + 4}px)`,
              transformOrigin: "center",
              pointerEvents: "none",
            }} />
          ))}
        </>
      )}
    </>
  );
}

// ── Track panel ────────────────────────────────────────────────────────────────
function Track({ time }: { time: number }) {
  return (
    <div style={{ position: "absolute", left: TRACK.x, top: TRACK.y, width: TRACK.w, height: TRACK.h }}>
      <div style={{ position: "absolute", left: 0, top: -28, fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", color: FAINT }}>
        OBSERVATION · EQUAL VELOCITY
      </div>
      <div style={{ position: "absolute", right: 0, top: -28, fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", color: MUTED }}>
        v = const
      </div>

      <div style={{
        position: "absolute", inset: 0,
        border: `1px solid ${HAIRLINE}`,
        background: PAPER,
        overflow: "hidden",
      }}>
        {LANES.map((lane, i) => (
          <div key={i} style={{
            position: "absolute", left: FIELD_PAD, right: FIELD_PAD,
            top: lane.y * TRACK.h, height: 1,
            borderTop: `1px dashed ${HAIRLINE}`, opacity: 0.7,
          }} />
        ))}

        <div style={{ position: "absolute", left: FIELD_PAD - 1, top: "8%", bottom: "8%", width: 1, background: INK, opacity: 0.25 }} />
        <div style={{
          position: "absolute", left: 16, top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          fontFamily: MONO, fontSize: 9, letterSpacing: "0.28em", color: MUTED,
          transformOrigin: "left center", whiteSpace: "nowrap",
        }}>
          ← LAUNCH
        </div>

        <div style={{ position: "absolute", right: FIELD_PAD - 5, top: "8%", bottom: "8%", width: 4, background: INK }} />
        <svg width="20" height={TRACK.h * 0.84} style={{ position: "absolute", right: FIELD_PAD - 25, top: "8%" }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={i} x1={20} y1={i * 16 + 8} x2={4} y2={i * 16 + 24} stroke={INK} strokeWidth="0.8" opacity="0.45" />
          ))}
        </svg>
        <div style={{
          position: "absolute", right: 8, top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: MONO, fontSize: 9, letterSpacing: "0.28em", color: MUTED,
          transformOrigin: "right center", whiteSpace: "nowrap",
        }}>
          IMPACT →
        </div>

        <div style={{
          position: "absolute", left: FIELD_PAD, top: 8,
          fontFamily: MONO, fontSize: 9, letterSpacing: "0.22em", color: FAINT,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <span style={{ display: "inline-block", width: 36, height: 1, background: INK, opacity: 0.5 }} />
          SAME SPEED, EVERY OBJECT
        </div>

        {LAUNCHES.map((launch, i) => (
          <MovingObject key={i} launch={launch} time={time} fieldW={TRACK.w} fieldH={TRACK.h} />
        ))}
      </div>
    </div>
  );
}

// ── Cloud outline parametric shape ────────────────────────────────────────────
// θ in radians; top of canvas = 3π/2.
// Three large bumps give the cloud its top-heavy identity; layered sinusoids
// add organic waviness around the whole perimeter — negative dips between
// bumps create the separations between puffs.
function cloudPoint(θ: number, cx: number, cy: number, Rx: number, Ry: number) {
  // Main puffs at the top
  const bC = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.50)), 3) * 0.52;
  const bL = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.22)), 5) * 0.30;
  const bR = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.78)), 5) * 0.30;
  // Distributed waviness — multiple frequencies, different phases
  const w1 = 0.11 * Math.cos(5 * θ + 0.40);
  const w2 = 0.07 * Math.cos(7 * θ + 1.10);
  const w3 = 0.05 * Math.cos(3 * θ - 0.60);
  const w4 = 0.03 * Math.cos(9 * θ + 2.30);
  const r  = 1 + bC + bL + bR + w1 + w2 + w3 + w4;
  return { x: cx + r * Rx * Math.cos(θ), y: cy + r * Ry * Math.sin(θ) };
}

// ── Momentum cloud panel ───────────────────────────────────────────────────────
function MomentumCloud({ time, snapProgress }: { time: number; snapProgress: number }) {
  const w = CLOUD.w, h = CLOUD.h;
  const pad   = 56;
  const plotL = pad,      plotR = w - pad;
  const plotT = pad + 16, plotB = h - pad;
  const plotW = plotR - plotL, plotH = plotB - plotT;

  // φ is assigned once per dot from the seeded RNG so it never shifts when new
  // dots arrive — this is what eliminates the per-frame position flicker.
  const dots: { xN: number; yN: number; age: number; mass: number; φ: number }[] = [];
  let seed = 17;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

  LAUNCHES.forEach((launch, idx) => {
    const strikeTime = launch.launchT + CROSS_DUR;
    if (time < strikeTime) return;
    const m       = SHAPES[launch.kind].mass;
    const cluster = 7 + Math.round(m * 10);
    for (let k = 0; k < cluster; k++) {
      const xJ  = (rand() - 0.5) * 0.04;
      const yJ  = (rand() - 0.5) * 0.06;
      const φ   = rand() * 2 * Math.PI; // stable outline position for this dot
      const age = clamp((time - (strikeTime + k * 0.012)) * 4, 0, 1);
      dots.push({ xN: (idx + 0.5) / LAUNCHES.length + xJ, yN: 1 - (m + yJ), age, mass: m, φ });
    }
  });

  // Cloud geometry — wide enough that the label sits comfortably inside
  const cx    = w * 0.5;                // panel center
  const cy    = plotT + plotH * 0.48;
  const Rx    = w * 0.38;
  const Ry    = plotH * 0.155;         // flatter — clouds are wider than tall

  // Rotation only after dots have fully settled
  const snapEnd       = 13.5;
  const rotationAngle = time > snapEnd ? (time - snapEnd) * 0.45 : 0;

  // Cloud top extends further than bottom (top-heavy bumps), so the visual
  // interior centre sits above cy. Shift text up to match.
  const cloudTopExtent = Ry * 1.58;
  const cloudBotExtent = Ry;
  const labelCy = cy - (cloudTopExtent - cloudBotExtent) * 0.5;

  return (
    <div style={{ position: "absolute", left: CLOUD.x, top: CLOUD.y, width: w, height: h }}>
      <div style={{ position: "absolute", inset: 0, border: `1px solid ${HAIRLINE}`, background: PAPER, overflow: "hidden" }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          {/* Axes — fade out as cloud forms */}
          <line x1={plotL} y1={plotT} x2={plotL} y2={plotB} stroke={INK} strokeWidth="1" opacity={0.4 * (1 - snapProgress)} />
          <line x1={plotL} y1={plotB} x2={plotR} y2={plotB} stroke={INK} strokeWidth="1" opacity={0.4 * (1 - snapProgress)} />
          {[0.25, 0.5, 0.75].map((v, i) => (
            <line key={i}
                  x1={plotL} y1={plotB - plotH * v}
                  x2={plotR} y2={plotB - plotH * v}
                  stroke={INK} strokeWidth="0.5" opacity={0.07 * (1 - snapProgress)} />
          ))}

          {/* Dots — each uses its own fixed φ so position is stable frame-to-frame */}
          {dots.map((d, i) => {
            const ox = plotL + d.xN * plotW;
            const oy = plotT + d.yN * plotH;
            const { x: tx, y: ty } = cloudPoint(d.φ + rotationAngle, cx, cy, Rx, Ry);
            const px = ox + (tx - ox) * snapProgress;
            const py = oy + (ty - oy) * snapProgress;
            const r  = (1.6 + d.mass * 0.8) * (1 - snapProgress * 0.2);
            const op = (0.4 + d.mass * 0.35) * d.age;
            return <circle key={i} cx={px} cy={py} r={r} fill={INK} opacity={op} />;
          })}
        </svg>

        {/* Axis labels — fade out */}
        <div style={{ position: "absolute", left: 14, top: plotT + 6, fontFamily: MONO, fontSize: 9, letterSpacing: "0.22em", color: FAINT, opacity: 1 - snapProgress }}>MORE</div>
        <div style={{ position: "absolute", left: 14, bottom: 56, fontFamily: MONO, fontSize: 9, letterSpacing: "0.22em", color: FAINT, opacity: 1 - snapProgress }}>LESS</div>
        <div style={{ position: "absolute", left: plotL, bottom: 22, width: plotW, textAlign: "center", fontFamily: MONO, fontSize: 9, letterSpacing: "0.22em", color: FAINT, opacity: 1 - snapProgress }}>
          → EACH IMPACT
        </div>

        {/* Words centred inside the cloud interior */}
        <div style={{
          position: "absolute",
          left: 0, top: labelCy - 34,
          width: w,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          opacity: snapProgress,
          pointerEvents: "none",
        }}>
          <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em", color: INK, fontStyle: "italic" }}>
            heavy things
          </div>
          <div style={{ fontFamily: SANS, fontSize: 24, fontWeight: 400, letterSpacing: "-0.01em", color: INK, fontStyle: "italic" }}>
            move{" "}
            <span style={{ textDecoration: "underline", textUnderlineOffset: 5, textDecorationThickness: 1 }}>more-ly</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Scene chrome ───────────────────────────────────────────────────────────────
function SceneHeader() {
  return <div style={{ position: "absolute", left: PAD, right: PAD, top: 56, height: 1, background: HAIRLINE }} />;
}

function SceneFooter() {
  return <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 56, height: 1, background: HAIRLINE }} />;
}

function PhaseChip() {
  return (
    <div style={{
      position: "absolute",
      left: TRACK.x, top: TRACK.y + TRACK.h + 12,
      fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em", color: INK,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ display: "inline-block", width: 6, height: 6, background: INK }} />
      01 · OBSERVING IMPACTS
    </div>
  );
}

// ── Inner scene ────────────────────────────────────────────────────────────────
function SceneInner() {
  const time         = useTime();
  const snapStart    = 11.5, snapEnd = 13.5;
  const snapProgress = easeInOutCubic(clamp((time - snapStart) / (snapEnd - snapStart), 0, 1));

  return (
    <div style={{ position: "absolute", inset: 0, background: PAPER, overflow: "hidden" }}>
      <SceneHeader />
      <Track time={time} />
      <MomentumCloud time={time} snapProgress={snapProgress} />
      <SceneFooter />
      <PhaseChip />
    </div>
  );
}

// ── Export ─────────────────────────────────────────────────────────────────────
export function HeavyThingsScene() {
  return (
    <Stage width={W} height={H} duration={16} background={PAPER} persistKey="neurons:heavy-things">
      <SceneInner />
    </Stage>
  );
}
