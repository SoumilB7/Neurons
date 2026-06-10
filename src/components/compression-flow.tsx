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

// ── Interactive 1 — Pay only for surprise (the dash game) ────────────────────────
// A sentence where each word carries a predictability. As your model gets stronger,
// it guesses more of them — those collapse to blanks (free), and the message shrinks.
function PredictabilityCompressor() {
    const [strength, setStrength] = React.useState(0.4);

    const words = React.useMemo(
        () => [
            { t: "A", p: 0.55 },
            { t: "heavy", p: 0.14 },
            { t: "ball", p: 0.34 },
            { t: "is", p: 0.86 },
            { t: "harder", p: 0.42 },
            { t: "to", p: 0.93 },
            { t: "stop", p: 0.5 },
            { t: "than", p: 0.82 },
            { t: "a", p: 0.88 },
            { t: "light", p: 0.46 },
            { t: "one", p: 0.8 },
        ],
        []
    );

    const guessed = (p: number) => p >= 1 - strength;
    const kept = words.filter((w) => !guessed(w.p)).length;
    const pct = Math.round((kept / words.length) * 100);

    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8 md:p-12">
            {/* The message */}
            <div className="mb-10 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-4 text-2xl md:text-3xl">
                {words.map((w, i) => {
                    const isGuessed = guessed(w.p);
                    return (
                        <span key={i} className="relative inline-flex flex-col items-center">
                            <span className="flex h-[1.2em] items-center tracking-tight transition-all duration-300">
                                {isGuessed ? (
                                    <span
                                        className="inline-block rounded-full transition-all duration-300"
                                        style={{ width: 22, height: 3, background: "#d4d4d4" }}
                                    />
                                ) : (
                                    <span style={{ color: "#111111", fontWeight: 500 }}>{w.t}</span>
                                )}
                            </span>
                            {/* surprise tick under each word */}
                            <span
                                className="mt-2 h-[3px] rounded-full transition-all duration-300"
                                style={{
                                    width: 22,
                                    background: "#111111",
                                    opacity: isGuessed ? 0.06 : 0.15 + (1 - w.p) * 0.7,
                                    transform: `scaleY(${isGuessed ? 0.4 : 1})`,
                                }}
                            />
                        </span>
                    );
                })}
            </div>

            {/* Control */}
            <div className="mx-auto max-w-md">
                <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        Your friend&apos;s guessing
                    </span>
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        {strength < 0.2 ? "weak" : strength > 0.75 ? "strong" : "fair"}
                    </span>
                </div>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={strength}
                    onChange={(e) => setStrength(parseFloat(e.target.value))}
                    className="slider-input w-full"
                    aria-label="How well your friend guesses"
                />

                <div className="mt-8 flex items-center justify-center gap-8">
                    <div className="text-center">
                        <div className="font-mono text-3xl font-medium tabular-nums text-neutral-900">
                            {kept}
                            <span className="text-neutral-300">/{words.length}</span>
                        </div>
                        <div className="mt-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                            words you must send
                        </div>
                    </div>
                    <div className="h-10 w-px bg-neutral-200" />
                    <div className="text-center">
                        <div className="font-mono text-3xl font-medium tabular-nums text-neutral-900">
                            {pct}
                            <span className="text-neutral-300">%</span>
                        </div>
                        <div className="mt-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                            of the original size
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Interactive 2 — At scale, you cannot look it up ──────────────────────────────
// Slide the context length. A lookup table grows as (vocab^n) — astronomically.
// Past the size of the universe, it can't exist. A model stays one fixed size.
function LookupExplosion() {
    const [n, setN] = React.useState(8);
    const VOCAB = 27;

    // log10 of the table size = n * log10(27)
    const log10Table = n * Math.log10(VOCAB);
    const ATOMS = 80; // ~10^80 atoms in the observable universe
    const SEEN = 13; // ~10^13 tokens of text humanity has ever produced (generous)

    const exceeds = log10Table > ATOMS;
    // coverage = fraction of possible contexts you've actually seen = 10^(SEEN - log10Table)
    const log10Coverage = SEEN - log10Table;
    const coverageLabel =
        log10Coverage >= 0 ? "≈ 100%" : log10Coverage > -2 ? `≈ ${Math.round(10 ** log10Coverage * 100)}%` : "≈ 0%";

    const tableBarPct = Math.min(100, (log10Table / ATOMS) * 100);

    return (
        <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8 md:p-12">
            {/* Memorize row */}
            <div className="mb-10">
                <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        Memorize · a lookup table
                    </span>
                    <span className="font-mono text-xs font-medium tabular-nums text-neutral-700">
                        10<sup className="text-[9px]">{Math.round(log10Table)}</sup> rows
                    </span>
                </div>
                <div className="relative h-7 w-full overflow-hidden rounded-lg bg-neutral-100">
                    <motion.div
                        className="absolute inset-y-0 left-0 rounded-lg"
                        style={{ background: exceeds ? "#111111" : "#404040" }}
                        animate={{ width: `${tableBarPct}%` }}
                        transition={{ duration: 0.3, ease: E }}
                    />
                    {/* universe marker */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="font-mono text-[9px] font-medium uppercase tracking-widest text-neutral-400">
                            atoms in the universe
                        </span>
                    </div>
                </div>
                {exceeds && (
                    <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-900">
                        ✕ bigger than the universe. this table can&apos;t exist.
                    </p>
                )}
            </div>

            {/* Model row */}
            <div className="mb-10">
                <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        Understand · one model
                    </span>
                    <span className="font-mono text-xs font-medium tabular-nums text-neutral-700">fixed size</span>
                </div>
                <div className="relative h-7 w-full overflow-hidden rounded-lg bg-neutral-100">
                    <div className="absolute inset-y-0 left-0 rounded-lg bg-neutral-300" style={{ width: "7%" }} />
                </div>
            </div>

            {/* Control */}
            <div className="mx-auto max-w-md">
                <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        How much you look back
                    </span>
                    <span className="font-mono text-xs font-medium tabular-nums text-neutral-700">{n} chars</span>
                </div>
                <input
                    type="range"
                    min={1}
                    max={70}
                    step={1}
                    value={n}
                    onChange={(e) => setN(parseInt(e.target.value))}
                    className="slider-input w-full"
                    aria-label="How much context you look back on"
                />
                <div className="mt-6 text-center">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        contexts this long you&apos;ve ever actually seen:{" "}
                    </span>
                    <span className="font-mono text-xs font-medium tabular-nums text-neutral-900">{coverageLabel}</span>
                </div>
            </div>
        </div>
    );
}

// ── Interactive 3 — A model is the smallest description ──────────────────────────
// Click between storing every point and storing the rule that regenerates them.
function GeneratorDemo() {
    const [mode, setMode] = React.useState<"store" | "rule">("store");

    // sample points on a parabola, in an 800×300 viewbox
    const pts = React.useMemo(() => {
        const arr: { x: number; y: number }[] = [];
        for (let i = 0; i <= 40; i++) {
            const t = i / 40; // 0..1
            const x = 80 + t * 640;
            const norm = (t - 0.5) * 2; // -1..1
            const y = 250 - norm * norm * 200; // parabola
            arr.push({ x, y });
        }
        return arr;
    }, []);

    const curvePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const isRule = mode === "rule";

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="p-8 md:p-10">
                <svg viewBox="0 0 800 300" className="h-auto w-full">
                    {/* the regenerating rule */}
                    <path
                        d={curvePath}
                        fill="none"
                        stroke="#111111"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="transition-opacity duration-500"
                        style={{ opacity: isRule ? 1 : 0 }}
                    />
                    {/* the stored points */}
                    {pts.map((p, i) => (
                        <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={isRule ? 2 : 3.5}
                            fill="#111111"
                            className="transition-all duration-500"
                            style={{ opacity: isRule ? 0.18 : 0.85 }}
                        />
                    ))}
                </svg>
            </div>

            {/* footer: the two representations */}
            <div className="grid grid-cols-2 border-t border-neutral-200">
                <button
                    onClick={() => setMode("store")}
                    className="group border-r border-neutral-200 p-6 text-left transition-colors"
                    style={{ background: !isRule ? "#fafafa" : "#ffffff" }}
                >
                    <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        Keep every point
                    </div>
                    <div
                        className="font-mono text-2xl font-medium tabular-nums transition-colors"
                        style={{ color: !isRule ? "#111111" : "#a3a3a3" }}
                    >
                        41 numbers
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                        Faithful, but it grows with the data and knows nothing you didn&apos;t hand it.
                    </p>
                </button>
                <button
                    onClick={() => setMode("rule")}
                    className="group p-6 text-left transition-colors"
                    style={{ background: isRule ? "#fafafa" : "#ffffff" }}
                >
                    <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                        Keep the rule
                    </div>
                    <div
                        className="font-mono text-2xl font-medium tabular-nums transition-colors"
                        style={{ color: isRule ? "#111111" : "#a3a3a3" }}
                    >
                        y = x²
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                        Tiny, and it draws every point back, including ones you never measured.
                    </p>
                </button>
            </div>
        </div>
    );
}

// ── Interactive 4 — the unsurprised mind ─────────────────────────────────────────
// Two readers, same stream. The one who holds the model is rarely surprised.
function SurpriseTrace({
    label,
    sub,
    heights,
    dashed = false,
}: {
    label: string;
    sub: string;
    heights: number[];
    dashed?: boolean;
}) {
    const W = 360,
        H = 120,
        base = 100,
        gap = W / (heights.length + 1);
    return (
        <div
            className={`rounded-2xl border bg-white p-6 ${dashed ? "border-dashed border-neutral-200" : "border-neutral-200"}`}
        >
            <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                {label}
            </div>
            <p className="mb-4 text-sm font-medium tracking-tight text-neutral-800">{sub}</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
                <line x1={0} y1={base} x2={W} y2={base} stroke="#e5e5e5" strokeWidth="1" />
                {heights.map((h, i) => {
                    const x = gap * (i + 1);
                    return (
                        <g key={i}>
                            <line
                                x1={x}
                                y1={base}
                                x2={x}
                                y2={base - h}
                                stroke="#111111"
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity={0.25 + (h / 90) * 0.6}
                            />
                            <circle cx={x} cy={base - h} r="2.5" fill="#111111" opacity={0.3 + (h / 90) * 0.6} />
                        </g>
                    );
                })}
            </svg>
            <div className="mt-2 text-center font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                surprise, move by move
            </div>
        </div>
    );
}

export function CompressionFlow() {
    return (
        <div className="mx-auto w-full max-w-5xl px-6 pb-40 font-sans">
            {/* 1. Hero */}
            <section className="flex min-h-[78vh] flex-col items-center justify-center pt-20 text-center">
                <FadeIn>
                    <span className="font-mono text-xs font-medium uppercase tracking-widest text-neutral-400">
                        Compression &amp; Intelligence
                    </span>
                    <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-900 md:text-7xl">
                        You only pay <br className="hidden md:block" />
                        for <span className="text-neutral-500">surprise</span>.
                    </h1>
                    <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-neutral-500 md:text-xl">
                        Say you want to make something smaller. The trick is to keep only the parts the other side
                        couldn&apos;t have guessed. Anything predictable, you leave out, because they can fill it back in
                        themselves. So making data smaller and predicting it turn out to be the same job.
                    </p>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-400">
                        Stay with that idea long enough and it stops being about file sizes. It starts being about
                        understanding.
                    </p>
                </FadeIn>
            </section>

            {/* 2. The dash game */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        Predictable means free.
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Picture a friend who is good at finishing your sentences. Every time she guesses the next word
                        right, you don&apos;t have to send it. You leave a blank, and a copy of her fills it back in. The
                        only words you actually pay to send are the ones that{" "}
                        <em className="text-neutral-700 not-italic">caught her off guard</em>.
                    </p>
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-neutral-400">
                        Try it. Drag her from a weak guesser up to a strong one. The better she predicts, the more of the
                        message turns to blanks, and the smaller it gets. That shrinking is all that compression ever is.
                    </p>
                </FadeIn>

                <FadeIn delay={0.08}>
                    <PredictabilityCompressor />
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mt-12 max-w-2xl border-l-2 border-neutral-200 pl-6">
                    <p className="text-base leading-relaxed text-neutral-400">
                        Notice what this does to the word <strong className="text-neutral-700">information</strong>. The
                        information in something is just how much it{" "}
                        <em className="text-neutral-600 not-italic">surprises</em> you. Something you were sure of tells
                        you nothing. Something you didn&apos;t see coming tells you a lot. The smallest a message can ever
                        get is the total of its surprises, and no clever trick gets you under that. Shannon gave that
                        floor a name: <strong className="text-neutral-700">entropy</strong>.
                    </p>
                </FadeIn>
            </section>

            {/* 3. Perfect compression looks like noise */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        Done perfectly, it looks like noise.
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Here is the strange part. Suppose there is still some pattern left in your squeezed-down file. A
                        pattern is something predictable, which means there was surprise you forgot to take out. So if you
                        really did the job perfectly, what is left has no pattern at all. It looks exactly like a random
                        coin flip.
                    </p>
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-neutral-400">
                        That flips your gut feeling around. Structure in the output isn&apos;t a sign you did well. It is
                        money you left on the table. Noise is what a finished job looks like.
                    </p>
                </FadeIn>

                <FadeIn delay={0.08}>
                    <div className="mx-auto flex max-w-3xl items-center justify-center gap-6 rounded-2xl border border-neutral-200 bg-white p-8 md:gap-10 md:p-12">
                        {/* structured input */}
                        <svg viewBox="0 0 120 120" className="h-28 w-28 md:h-36 md:w-36">
                            {Array.from({ length: 36 }).map((_, i) => {
                                const r = Math.floor(i / 6),
                                    c = i % 6;
                                const on = (r + c) % 2 === 0;
                                return (
                                    <rect
                                        key={i}
                                        x={c * 20 + 2}
                                        y={r * 20 + 2}
                                        width={16}
                                        height={16}
                                        rx={2}
                                        fill={on ? "#111111" : "#f3f3f3"}
                                    />
                                );
                            })}
                        </svg>
                        <div className="flex flex-col items-center text-neutral-300">
                            <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                                compress
                            </span>
                            <svg
                                className="my-1 h-5 w-12"
                                viewBox="0 0 48 16"
                                fill="none"
                                stroke="#a3a3a3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M4 8 H42" />
                                <path d="M34 2 L42 8 L34 14" />
                            </svg>
                        </div>
                        {/* noise output */}
                        <svg viewBox="0 0 120 120" className="h-28 w-28 md:h-36 md:w-36">
                            {Array.from({ length: 36 }).map((_, i) => {
                                const r = Math.floor(i / 6),
                                    c = i % 6;
                                // deterministic pseudo-random so it renders identically each time
                                const on = (i * 2654435761) % 7 > 3;
                                return (
                                    <rect
                                        key={i}
                                        x={c * 20 + 2}
                                        y={r * 20 + 2}
                                        width={16}
                                        height={16}
                                        rx={2}
                                        fill={on ? "#111111" : "#f3f3f3"}
                                    />
                                );
                            })}
                        </svg>
                    </div>
                </FadeIn>
            </section>

            {/* 4. The turn — where do the predictions come from */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        So where do the guesses come from?
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Fair question. For something small, you just count. Take a robot that moves up half the time,
                        down a quarter, left and right the rest. Tally how often each one happens and you are done. The
                        guesses live in a tiny table, and you didn&apos;t have to understand a thing to build it.
                    </p>
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-neutral-400">
                        Now try the same thing for language, or for the world. The table doesn&apos;t just get big. It
                        hits a wall you can never get around.
                    </p>
                </FadeIn>

                <FadeIn delay={0.08}>
                    <LookupExplosion />
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mt-12 max-w-2xl">
                    <p className="text-base leading-relaxed text-neutral-500">
                        To guess the next word from any context, your table would need one row for every context that
                        could ever come up. That is already more rows than there are atoms in the universe. And here is
                        the part that really stings: almost every sentence you will ever meet has{" "}
                        <em className="text-neutral-700 not-italic">never been written before, and never will be again.</em>{" "}
                        You couldn&apos;t have looked it up. Yet those long sentences are the{" "}
                        <em className="text-neutral-700 not-italic">easiest</em> ones to predict. &ldquo;I was born in
                        Paris, so my first language is&rdquo; has an almost certain ending, on a sentence that has never
                        existed.
                    </p>
                </FadeIn>
            </section>

            {/* 5. The model is the smallest description */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        To predict the unseen, you model what makes it.
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        So how do you guess something you have never seen? You can&apos;t remember it, so you do the only
                        thing left. You run the rules underneath it: a birthplace points to a language, this slot wants a
                        noun. You stop keeping the surface and start keeping the{" "}
                        <em className="text-neutral-700 not-italic">thing that produces</em> the surface.
                    </p>
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-neutral-400">
                        And the thing that produces it is just its <strong className="text-neutral-700">shortest
                        description</strong>. A thousand measured dots, or one small rule that draws all of them, plus
                        every dot you never measured. Click between the two.
                    </p>
                </FadeIn>

                <FadeIn delay={0.08}>
                    <GeneratorDemo />
                </FadeIn>

                <FadeIn delay={0.04} className="mx-auto mt-12 max-w-2xl border-l-2 border-neutral-200 pl-6">
                    <p className="text-base leading-relaxed text-neutral-400 italic">
                        This is what a physical law is. <span className="not-italic">F = ma</span> stands in for endless
                        tables of pushes and motions, one rule that draws them all back. The law is a compressed version
                        of the world, and finding it is exactly what we mean by understanding the world.
                    </p>
                </FadeIn>
            </section>

            {/* 6. The certificate + caveat */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-10 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        Which is why you can&apos;t fake it.
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Put the pieces together. Compression only charges you for surprise. The one way to lower your
                        surprise about things you have never seen is to actually understand what made them. So a
                        compressor that stays small on genuinely new data has to be carrying a working{" "}
                        <em className="text-neutral-700 not-italic">model of the world</em> that produced it. That is not
                        something like intelligence. It is a receipt for it.
                    </p>
                </FadeIn>

                <FadeIn delay={0.06} className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed text-neutral-500">
                    <p>
                        There is one honest catch, and it is worth saying out loud. Compression rewards{" "}
                        <em className="text-neutral-600 not-italic">any</em> regularity at all, including cheap ones. You
                        can always rig a compressor to ace a single file it has quietly memorized. The idea only has
                        teeth when you ask the one thing memory can&apos;t do: stay unsurprised on data from the same
                        world that it has never seen before.
                    </p>
                    <p>
                        That part is <strong className="text-neutral-700">generalization</strong>, and a lookup table can
                        never fake it. So the careful version isn&apos;t &ldquo;compression is intelligence.&rdquo; It is:{" "}
                        <em className="text-neutral-700 not-italic">compression that generalizes is intelligence.</em>
                    </p>
                </FadeIn>
            </section>

            {/* 7. The unsurprised mind */}
            <section className="border-t border-neutral-100 py-20">
                <FadeIn className="mx-auto mb-6 max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        From the inside, it feels like not being surprised.
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Sit a chess master and a beginner in front of the same strong game. The master is hardly ever
                        surprised. To her the moves look obvious, low in information, easy to compress, because she is
                        holding the model that produces them. The beginner is startled at every turn, stuck memorizing a
                        surface he can&apos;t squeeze.
                    </p>
                </FadeIn>

                <FadeIn delay={0.06}>
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
                        <SurpriseTrace
                            label="01 · holds the model"
                            sub="The master. Rarely surprised."
                            heights={[14, 8, 18, 10, 6, 16, 9, 12, 7, 14]}
                        />
                        <SurpriseTrace
                            label="02 · memorizing the surface"
                            sub="The beginner. Surprised at every turn."
                            heights={[62, 48, 78, 40, 70, 55, 84, 46, 72, 60]}
                            dashed
                        />
                    </div>
                </FadeIn>

                <FadeIn delay={0.1} className="mx-auto mt-12 max-w-2xl border-l-2 border-neutral-200 pl-6">
                    <p className="text-base leading-relaxed text-neutral-400 italic">
                        Not being surprised by the world is what understanding feels like from the inside. Intelligence
                        is low surprise, paid for with a small model instead of a giant memory.
                    </p>
                </FadeIn>
            </section>

            {/* 8. Quiet close */}
            <section className="border-t border-neutral-100 py-24">
                <FadeIn className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                        To compress the world, you have to understand it.
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-neutral-500">
                        That is the whole arc. Making data smaller means predicting it. Predicting what you have never
                        seen means modelling whatever makes it. And the smallest model that keeps you from being
                        surprised <em className="text-neutral-700 not-italic">is</em> an understanding of the thing
                        itself.
                    </p>
                    <p className="text-base leading-relaxed text-neutral-400">
                        The push to be small is what forces you to be smart. It is the same push a brain is under, and the
                        same push a network gets trained against, which is right where the next pieces pick up.
                    </p>
                </FadeIn>
            </section>
        </div>
    );
}
