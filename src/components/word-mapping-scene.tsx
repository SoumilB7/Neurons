"use client";

import React from "react";
import { Stage, useTime, clamp } from "./stage";

const INK   = "#0a0a0a";
const PAPER = "#fafaf8";
const SANS  = `Helvetica,"Helvetica Neue",Arial,sans-serif`;
const MONO  = `ui-monospace,SFMono-Regular,monospace`;

const W = 1440, H = 720, PAD = 80;

function cloudPoint(θ: number, cx: number, cy: number, Rx: number, Ry: number) {
  const bC = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.50)), 3) * 0.52;
  const bL = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.22)), 5) * 0.30;
  const bR = Math.pow(Math.max(0, Math.cos(θ - Math.PI * 1.78)), 5) * 0.30;
  const w1 = 0.11 * Math.cos(5 * θ + 0.40);
  const w2 = 0.07 * Math.cos(7 * θ + 1.10);
  const w3 = 0.05 * Math.cos(3 * θ - 0.60);
  const w4 = 0.03 * Math.cos(9 * θ + 2.30);
  const r  = 1 + bC + bL + bR + w1 + w2 + w3 + w4;
  return { x: cx + r * Rx * Math.cos(θ), y: cy + r * Ry * Math.sin(θ) };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Anchor angles along the cloud's front-facing top curve (the side facing the
// word above). Concentrated near θ = 3π/2 — none wrap around to the back.
// Left has a dense web; right uses fewer, tapering off without landing.
const LEFT_ANCHOR_ANGLES = [
  Math.PI * 1.28,
  Math.PI * 1.32,
  Math.PI * 1.36,
  Math.PI * 1.40,
  Math.PI * 1.44,
  Math.PI * 1.47,
  Math.PI * 1.50,
  Math.PI * 1.53,
  Math.PI * 1.56,
  Math.PI * 1.60,
  Math.PI * 1.64,
  Math.PI * 1.68,
  Math.PI * 1.72,
];
const RIGHT_ANCHOR_ANGLES = [
  Math.PI * 1.30,
  Math.PI * 1.38,
  Math.PI * 1.44,
  Math.PI * 1.50,
  Math.PI * 1.56,
  Math.PI * 1.62,
  Math.PI * 1.70,
];

function SceneInner() {
  const time = useTime();

  const gap    = 80;
  const panelW = (W - PAD * 2 - gap) / 2;
  const panelH = H - PAD * 2;
  const leftX  = PAD;
  const rightX = PAD + panelW + gap;
  const panelY = PAD;

  // Cloud geometry (panel-local)
  const cloudCx = panelW * 0.5;
  const cloudCy = panelH * 0.65;
  const cloudRx = panelW * 0.34;
  const cloudRy = panelH * 0.15;

  // Word position — same in both panels for parallel structure
  const wordX = panelW * 0.5;
  const wordY = panelH * 0.22;

  // Timeline
  // 0.0 – 1.0  : word fades in
  // 1.5 – 3.5  : lines extend toward the cloud
  // 3.5 +      : hold final composition
  const wordOpacity  = clamp(time / 1.0, 0, 1);
  const lineProgress = easeOut(clamp((time - 1.5) / 2.0, 0, 1));

  const N_PERIM = 92;

  return (
    <div style={{ position: "absolute", inset: 0, background: PAPER, overflow: "hidden" }}>
      {/* Section label */}
      <div style={{
        position: "absolute",
        left: PAD, top: 32,
        fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em", color: INK,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ display: "inline-block", width: 6, height: 6, background: INK }} />
        02 · MAPPING WORDS TO FEELING
      </div>

      <svg width={W} height={H} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Center divider */}
        <line
          x1={W / 2} y1={PAD + 24}
          x2={W / 2} y2={H - PAD - 24}
          stroke={INK} strokeWidth={0.5}
          opacity={0.12}
          strokeDasharray="3 5"
        />

        {/* ── LEFT PANEL: word + filled cloud + anchor wires ───────────────── */}
        <g transform={`translate(${leftX}, ${panelY})`}>
          {/* Cloud fill — the "feel" the word is landing on */}
          <path
            d={Array.from({ length: 120 }, (_, i) => {
              const θ = (i / 120) * 2 * Math.PI;
              const p = cloudPoint(θ, cloudCx, cloudCy, cloudRx, cloudRy);
              return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
            }).join(" ") + " Z"}
            fill={INK}
            opacity={0.06}
          />

          {/* Cloud dotted perimeter */}
          {Array.from({ length: N_PERIM }).map((_, i) => {
            const θ = (i / N_PERIM) * 2 * Math.PI;
            const p = cloudPoint(θ, cloudCx, cloudCy, cloudRx, cloudRy);
            return <circle key={i} cx={p.x} cy={p.y} r={1.5} fill={INK} opacity={0.55} />;
          })}

          {/* Anchor wires from the word down to points on the cloud — dense web */}
          {LEFT_ANCHOR_ANGLES.map((θ, i) => {
            const ank = cloudPoint(θ, cloudCx, cloudCy, cloudRx, cloudRy);
            const wx  = wordX;
            const wy  = wordY + 22;
            const tx  = wx + (ank.x - wx) * lineProgress;
            const ty  = wy + (ank.y - wy) * lineProgress;
            return (
              <line
                key={i}
                x1={wx} y1={wy}
                x2={tx} y2={ty}
                stroke={INK}
                strokeWidth={0.9}
                opacity={0.42 * lineProgress}
              />
            );
          })}

          {/* Caption */}
          <text
            x={panelW * 0.5} y={panelH - 6}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={11}
            letterSpacing="0.24em"
            fill={INK}
            opacity={lineProgress * 0.6}
          >
            THE WORD LANDS ON SOMETHING
          </text>
        </g>

        {/* ── RIGHT PANEL: word + hollow cloud outline + tapering wires ────── */}
        <g transform={`translate(${rightX}, ${panelY})`}>
          {/* Hollow cloud — the SHAPE of a feel that was never built */}
          <path
            d={Array.from({ length: 120 }, (_, i) => {
              const θ = (i / 120) * 2 * Math.PI;
              const p = cloudPoint(θ, cloudCx, cloudCy, cloudRx, cloudRy);
              return `${i === 0 ? "M" : "L"}${p.x},${p.y}`;
            }).join(" ") + " Z"}
            stroke={INK}
            strokeWidth={0.8}
            strokeDasharray="2 5"
            fill="none"
            opacity={0.18}
          />

          {/* Wires reach toward the empty outline and trail off — nothing to bind to */}
          {RIGHT_ANCHOR_ANGLES.map((θ, i) => {
            const ank = cloudPoint(θ, cloudCx, cloudCy, cloudRx, cloudRy);
            const wx  = wordX;
            const wy  = wordY + 22;
            const reach = 0.62;
            const tx = wx + (ank.x - wx) * lineProgress * reach;
            const ty = wy + (ank.y - wy) * lineProgress * reach;
            return (
              <line
                key={i}
                x1={wx} y1={wy}
                x2={tx} y2={ty}
                stroke={INK}
                strokeWidth={0.8}
                opacity={0.28 * lineProgress}
                strokeDasharray="2 4"
              />
            );
          })}

          {/* Caption */}
          <text
            x={panelW * 0.5} y={panelH - 6}
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={11}
            letterSpacing="0.24em"
            fill={INK}
            opacity={lineProgress * 0.6}
          >
            THE WORD LANDS ON NOTHING
          </text>
        </g>
      </svg>

      {/* Words rendered as HTML for proper italic / kerning */}
      <div style={{
        position: "absolute",
        left: leftX + wordX,
        top: panelY + wordY,
        transform: "translate(-50%, -50%)",
        fontFamily: SANS,
        fontSize: 34,
        fontStyle: "italic",
        color: INK,
        opacity: wordOpacity,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        momentum
      </div>

      <div style={{
        position: "absolute",
        left: rightX + wordX,
        top: panelY + wordY,
        transform: "translate(-50%, -50%)",
        fontFamily: SANS,
        fontSize: 34,
        fontStyle: "italic",
        color: INK,
        opacity: wordOpacity,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        momentum
      </div>
    </div>
  );
}

export function WordMappingScene() {
  return (
    <Stage
      width={W}
      height={H}
      duration={9}
      background={PAPER}
      persistKey="neurons:word-mapping"
    >
      <SceneInner />
    </Stage>
  );
}
