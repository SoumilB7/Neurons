"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import React from "react";

const E: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const HeavyThingsScene = dynamic(
  () => import("./heavy-things-scene").then((m) => m.HeavyThingsScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[640px] w-full animate-pulse rounded-2xl border border-neutral-200 bg-neutral-50" />
    ),
  }
);

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
            You see the same kind of thing again and again. Before anyone explains it, your brain starts to expect what will happen.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            The feel comes first.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            A small thing carries little motion. A bigger thing carries more. See that enough times, and the feel starts forming.
          </p>
        </FadeIn>

        <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-neutral-400">
            This is still before the explanation. Just repeated moments becoming easier to predict.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative h-[640px] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-[#fafaf8]">
            <HeavyThingsScene />
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
