"use client";

import { motion } from "framer-motion";
import React from "react";

const E: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function UnnamedCloud() {
  // Each scene: a ball (size = mass) resting on a ground line, arrow (length = speed)
  // Big ball + short arrow = heavy and slow. Small ball + long arrow = light and fast.
  const instances = [
    { cy: 62,  ballR: 5, arrowLen: 32 },
    { cy: 104, ballR: 7, arrowLen: 23 },
    { cy: 146, ballR: 9, arrowLen: 13 },
    { cy: 188, ballR: 6, arrowLen: 27 },
    { cy: 230, ballR: 8, arrowLen: 17 },
  ];

  const ballBaseX = 44;
  const feelCx = 430;
  const feelCy = 146;
  const feelR  = 52;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <svg viewBox="0 0 800 288" className="h-auto w-full min-w-[600px]" fill="none" aria-hidden="true">

        {/* Column labels */}
        <text x="55" y="22" textAnchor="middle" fill="#a3a3a3" fontFamily="monospace" fontSize="9" letterSpacing="0.12em" fontWeight="500">SEEN AGAIN</text>
        <text x={feelCx} y="22" textAnchor="middle" fill="#a3a3a3" fontFamily="monospace" fontSize="9" letterSpacing="0.12em" fontWeight="500">FEEL FOR IT</text>
        <text x="682" y="22" textAnchor="middle" fill="#a3a3a3" fontFamily="monospace" fontSize="9" letterSpacing="0.12em" fontWeight="500">WORD COMES LATER</text>

        {/* Converging paths: scenes → feel node */}
        {instances.map((inst, i) => {
          const exitX = ballBaseX + inst.ballR + 4 + inst.arrowLen + 8;
          const exitY = inst.cy - inst.ballR;
          return (
            <path
              key={i}
              d={`M ${exitX} ${exitY} C 230 ${exitY}, 250 ${feelCy}, ${feelCx - feelR} ${feelCy}`}
              stroke="#d4d4d4"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Path: feel node → word box */}
        <path d={`M ${feelCx + feelR} ${feelCy} L 614 ${feelCy}`} stroke="#d4d4d4" strokeWidth="1.2" />
        <path d={`M 608 ${feelCy - 4} L 614 ${feelCy} L 608 ${feelCy + 4}`} stroke="#d4d4d4" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Instance scenes — no container, bare illustration */}
        {instances.map((inst, i) => {
          const ballCy = inst.cy - inst.ballR;
          const arrowX1 = ballBaseX + inst.ballR + 4;
          const arrowX2 = arrowX1 + inst.arrowLen;
          return (
            <g key={i}>
              {/* ground line */}
              <line x1="18" y1={inst.cy} x2="100" y2={inst.cy} stroke="#e5e5e5" strokeWidth="1" strokeLinecap="round" />
              {/* ball */}
              <circle cx={ballBaseX} cy={ballCy} r={inst.ballR} fill="#44403c" opacity="0.68" />
              {/* velocity arrow */}
              <line x1={arrowX1} y1={ballCy} x2={arrowX2} y2={ballCy} stroke="#44403c" strokeWidth="1.3" strokeLinecap="round" />
              <path d={`M ${arrowX2 - 5} ${ballCy - 3} L ${arrowX2} ${ballCy} L ${arrowX2 - 5} ${ballCy + 3}`} stroke="#44403c" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </g>
          );
        })}

        {/* Feel node — large, dashed, unnamed */}
        <circle cx={feelCx} cy={feelCy} r={feelR} fill="#fafafa" stroke="#d4d4d4" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x={feelCx} y={feelCy - 4} textAnchor="middle" fill="#a8a29e" fontFamily="system-ui" fontSize="11" fontStyle="italic">unnamed</text>
        <text x={feelCx} y={feelCy + 13} textAnchor="middle" fill="#c8c8c8" fontFamily="monospace" fontSize="8" letterSpacing="0.1em">~feel</text>

        {/* Word box */}
        <rect x="618" y={feelCy - 38} width="130" height="76" rx="12" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
        <text x="683" y={feelCy + 2} textAnchor="middle" fill="#111111" fontFamily="system-ui" fontSize="14" fontWeight="600">momentum</text>
        <text x="683" y={feelCy + 20} textAnchor="middle" fill="#a3a3a3" fontFamily="monospace" fontSize="8" letterSpacing="0.1em">the word</text>

        {/* Bottom annotation */}
        <text x="400" y="277" textAnchor="middle" fill="#737373" fontFamily="system-ui" fontSize="12">
          The word works because you already know what it feels like.
        </text>
      </svg>
    </div>
  );
}

export function HumanLearningFlow() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-40 font-sans">
      <section className="flex min-h-[72vh] flex-col items-center justify-center pt-20 text-center">
        <FadeIn>
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">
            Human Learning
          </span>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
            First, you get <br className="hidden md:block" />
            a <span className="text-neutral-500">feel for it</span>.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-500 md:text-xl">
            You see the same kind of thing again and again. Before anyone gives you the word, it starts to feel familiar.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            The feel comes first.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            Each moment is a little different. But something stays the same. After enough times, you can sense it without naming it.
          </p>
        </FadeIn>

        <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-neutral-400">
            Later, someone gives it a name. The word helps because the feel is already there.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <UnnamedCloud />
        </FadeIn>
      </section>
    </div>
  );
}
