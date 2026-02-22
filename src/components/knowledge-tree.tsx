"use client";

import { motion } from "framer-motion";

const E: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function JourneyRail() {
  return (
    <svg viewBox="0 0 120 760" className="h-full w-full" aria-hidden="true">
      <line x1="60" y1="24" x2="60" y2="736" stroke="#d4d4d4" strokeWidth="2" />
      <circle cx="60" cy="92" r="8" fill="#111111" />
      <circle cx="60" cy="254" r="8" fill="#111111" />
      <circle cx="60" cy="416" r="8" fill="#111111" />
      <circle cx="60" cy="578" r="8" fill="#111111" />
      <circle cx="60" cy="700" r="8" fill="#111111" />
    </svg>
  );
}

function PresenceDiagram() {
  return (
    <svg viewBox="0 0 340 130" className="w-full" role="img" aria-label="Concept presence curve">
      <line x1="24" y1="104" x2="320" y2="104" stroke="#d4d4d4" strokeWidth="1.5" />
      <line x1="24" y1="20" x2="24" y2="104" stroke="#d4d4d4" strokeWidth="1.5" />
      <path d="M34 97 C84 97 105 92 125 78 C150 58 178 40 312 32" fill="none" stroke="#111111" strokeWidth="2.2" />
      <line x1="128" y1="104" x2="128" y2="32" stroke="#a3a3a3" strokeDasharray="4 4" strokeWidth="1.3" />
      <text x="128" y="120" fill="#a3a3a3" fontSize="10" textAnchor="middle">activation threshold</text>
      <text x="320" y="120" fill="#a3a3a3" fontSize="10" textAnchor="end">evidence</text>
      <text x="8" y="20" fill="#a3a3a3" fontSize="10">presence</text>
    </svg>
  );
}

function TangibleIntangibleDiagram() {
  return (
    <svg viewBox="0 0 340 130" className="w-full" role="img" aria-label="Tangible and intangible concept examples">
      <rect x="18" y="18" width="144" height="94" rx="10" fill="#ffffff" stroke="#e5e5e5" />
      <rect x="178" y="18" width="144" height="94" rx="10" fill="#ffffff" stroke="#e5e5e5" />

      <circle cx="90" cy="60" r="22" fill="#111111" />
      <circle cx="250" cy="60" r="22" fill="#111111" />

      <text x="90" y="64" textAnchor="middle" fill="#ffffff" fontSize="9">chair</text>
      <text x="250" y="64" textAnchor="middle" fill="#ffffff" fontSize="9">"aahui"</text>

      <text x="90" y="94" textAnchor="middle" fill="#737373" fontSize="10">tangible / explainable</text>
      <text x="250" y="94" textAnchor="middle" fill="#737373" fontSize="10">intangible / unexplainable</text>
    </svg>
  );
}

function ConjunctionDiagram() {
  return (
    <svg viewBox="0 0 340 130" className="w-full" role="img" aria-label="Conjoined concept firing">
      <circle cx="70" cy="62" r="21" fill="#ffffff" stroke="#111111" strokeWidth="2" />
      <circle cx="145" cy="62" r="21" fill="#ffffff" stroke="#111111" strokeWidth="2" />
      <circle cx="255" cy="62" r="24" fill="#111111" stroke="#111111" strokeWidth="2" />
      <line x1="91" y1="62" x2="124" y2="62" stroke="#d4d4d4" strokeWidth="2" />
      <line x1="166" y1="62" x2="228" y2="62" stroke="#d4d4d4" strokeWidth="2" />
      <text x="70" y="66" textAnchor="middle" fill="#111111" fontSize="9">stripe</text>
      <text x="145" y="66" textAnchor="middle" fill="#111111" fontSize="9">orange</text>
      <text x="255" y="66" textAnchor="middle" fill="#ffffff" fontSize="9">tiger</text>
      <text x="255" y="101" textAnchor="middle" fill="#a3a3a3" fontSize="10">co-activation creates a higher concept</text>
    </svg>
  );
}

type StepProps = {
  index: string;
  title: string;
  children: React.ReactNode;
  diagram?: React.ReactNode;
  delay: number;
};

function Step({ index, title, children, diagram, delay }: StepProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: E }}
      className="rounded-2xl border border-neutral-200 bg-white px-5 py-5"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="font-mono text-[10px] text-neutral-400">{index}</span>
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      </div>
      <div className="text-sm leading-relaxed text-neutral-600">{children}</div>
      {diagram && <div className="mt-4">{diagram}</div>}
    </motion.section>
  );
}

export function KnowledgeTree() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: E }}
        className="mb-5 rounded-2xl border border-neutral-200 bg-white px-5 py-5"
      >
        <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Neuron Journey</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900">From signal to concept</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
          This page frames a neuron as a concept sensor. The journey starts with raw input, then tracks how activation
          represents concept presence, and ends with higher-level meaning formed from conjunctions.
        </p>
      </motion.section>

      <div className="grid grid-cols-[74px_1fr] gap-4">
        <div className="hidden rounded-2xl border border-neutral-200 bg-white/80 p-2 shadow-sm backdrop-blur-xl md:block">
          <JourneyRail />
        </div>

        <div className="space-y-4">
          <Step index="01" title="Raw Signal" delay={0.08}>
            Inputs arrive as patterns, not meanings. A neuron receives mixed evidence from many upstream signals.
            At this stage, there is no label yet, only structure in the input.
          </Step>

          <Step index="02" title="Activation = Concept Presence" delay={0.14} diagram={<PresenceDiagram />}>
            Activation is the degree to which a concept is present in the current input. Above threshold, the concept
            is considered present enough to influence downstream representations.
          </Step>

          <Step index="03" title="Tangible vs Intangible Concepts" delay={0.2} diagram={<TangibleIntangibleDiagram />}>
            Tangible concepts are explainable entities with concrete references. Intangible concepts are not directly
            explainable in simple words, more like abstract tokens such as <span className="font-medium text-neutral-900">"aahui"</span>.
            Both can still be represented by activation patterns.
          </Step>

          <Step index="04" title="Concepts in Conjunction" delay={0.26} diagram={<ConjunctionDiagram />}>
            A single neuron may represent a conjunction. When lower-level concepts co-occur in the right pattern,
            a higher-level concept activates.
          </Step>

          <Step index="05" title="Meaning as a Path" delay={0.32}>
            Meaning emerges as a path through many activations, not one isolated neuron. This is why representation is
            distributed, layered, and context-dependent.
          </Step>
        </div>
      </div>
    </div>
  );
}
