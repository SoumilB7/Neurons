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

const WordMappingScene = dynamic(
  () => import("./word-mapping-scene").then((m) => m.WordMappingScene),
  {
    ssr: false,
    loading: () => (
      <div className="h-[520px] w-full animate-pulse rounded-2xl border border-neutral-200 bg-neutral-50" />
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

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            The feel for how things move
            <br className="hidden md:block" /> wasn't taught. It was built.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            Before anyone explained gravity to you, you already knew how things fall. Before you heard the word momentum, you knew a heavy bag swings differently than an empty one. That knowledge came from somewhere. Just not from words.
          </p>
        </FadeIn>

        <div className="mx-auto max-w-2xl space-y-14">
          <FadeIn delay={0.04} className="grid grid-cols-[2rem_1fr] gap-x-6">
            <span className="pt-1 font-mono text-xs text-neutral-300">01</span>
            <div>
              <p className="text-xl font-medium tracking-tight text-neutral-800">
                Every surprise the physical world gives you updates the model.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                The ball that bounced higher than you expected. The door that swung faster than you meant. Each time reality doesn't match what you predicted, the relevant neurons adjust. Slightly retuned, so next time the prediction is closer.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="grid grid-cols-[2rem_1fr] gap-x-6">
            <span className="pt-1 font-mono text-xs text-neutral-300">02</span>
            <div>
              <p className="text-xl font-medium tracking-tight text-neutral-800">
                Repetition wears the path in.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                The feel of weight shifting, the arc of a throw, the resistance of something heavy. The same cluster of neurons fires, and fires again. Each time, a little less resistance. What started as a slow guess becomes instant. Your internal physics engine isn't taught. It's worn in, encounter by encounter.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.11} className="pl-14">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-neutral-100" />
              <span className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-neutral-300">
                ~100 trillion synapses · each one adjustable
              </span>
              <div className="h-px flex-1 bg-neutral-100" />
            </div>
          </FadeIn>

          <FadeIn delay={0.14} className="grid grid-cols-[2rem_1fr] gap-x-6">
            <span className="pt-1 font-mono text-xs text-neutral-300">03</span>
            <div>
              <p className="text-xl font-medium tracking-tight text-neutral-800">
                Sleep compresses the day's encounters into permanent structure.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                The brain replays what it experienced. The same paths fire again, faster, moving from temporary to fixed. You wake up with a slightly sharper feel for how the world moves. It happened while you weren't watching.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.18} className="grid grid-cols-[2rem_1fr] gap-x-6">
            <span className="pt-1 font-mono text-xs text-neutral-300">04</span>
            <div>
              <p className="text-xl font-medium tracking-tight text-neutral-800">
                The gaps between encounters are what let it deepen.
              </p>
              <p className="mt-4 text-base leading-relaxed text-neutral-500">
                A path rebuilt after some forgetting sets harder than one that was never interrupted. Time away from an experience isn't waste. It's what turns repeated exposure into instinct.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.22} className="mx-auto mt-16 max-w-2xl border-l-2 border-neutral-200 pl-6">
          <p className="text-base leading-relaxed text-neutral-400 italic">
            You've never solved an equation to catch a ball. But something solves it, in connections worn smooth by a lifetime of things falling, swinging, and landing.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Then the word arrives.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            Someone says <span className="italic">momentum</span>. The word reaches for whatever is already inside. Sometimes it finds something. Sometimes it doesn't.
          </p>
        </FadeIn>

        <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-neutral-400">
            The difference is whether you spent years building the feel beneath it.
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-[#fafaf8]">
            <WordMappingScene />
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            The word is a key to what you already built.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            When you hear <span className="italic">momentum</span>, you don't look up a definition. A network fires across your brain. The felt sense of weight, of push, of things that don't stop when you want them to.
          </p>
        </FadeIn>

        <FadeIn delay={0.06} className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-neutral-500">
          <p>
            The prefrontal cortex is what turns the key. It's the hub that connects sound to sensation, symbol to stored experience. When you hear the word at the same moment you feel the thing, the connection between them strengthens. Over enough repetitions, just hearing the word is enough to fire the whole network. The meaning arrives before you've finished hearing the sentence.
          </p>
          <p>
            This is why language works. A word isn't a container of meaning. It's a trigger for a pattern your brain already built. The word <span className="italic">momentum</span> doesn't tell you what momentum is. It points to a model of momentum you've been growing since the first time something heavy refused to stop.
          </p>
        </FadeIn>
      </section>

      <section className="border-t border-neutral-100 py-20">
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
            Two outcomes.
          </h2>
          <p className="text-lg leading-relaxed text-neutral-500">
            Depending on whether the feel was built first.
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          <FadeIn delay={0.06}>
            <div className="h-full rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
                01 · word meets feel
              </div>
              <p className="mb-4 text-xl font-medium tracking-tight text-neutral-800">
                The feel was already there.
              </p>
              <p className="text-base leading-relaxed text-neutral-500">
                You hear <span className="italic">momentum</span>. Your brain fires the pattern it built from years of throwing, catching, watching things fall. The word fits. You can use it in situations no one labeled for you. You can think with it.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.10}>
            <div className="h-full rounded-2xl border border-dashed border-neutral-200 bg-white p-8">
              <div className="mb-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
                02 · word meets nothing
              </div>
              <p className="mb-4 text-xl font-medium tracking-tight text-neutral-800">
                The feel was never built.
              </p>
              <p className="text-base leading-relaxed text-neutral-500">
                You hear <span className="italic">momentum</span>. The word arrived from a teacher, a textbook, a definition. There's no constellation of past throws beneath it. You can repeat the word. You can pass the test. Ask you to apply it to something new, and there's nothing for it to reach.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.14} className="mx-auto mt-12 max-w-2xl border-l-2 border-neutral-200 pl-6">
          <p className="text-base leading-relaxed text-neutral-400 italic">
            From outside they look identical. Both can answer the question. Inside, one feels the word land on something. The other feels it land on nothing.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
