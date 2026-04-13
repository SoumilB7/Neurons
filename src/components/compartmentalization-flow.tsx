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

// --- Illustrations ---

// Brain with soft region divisions
function BrainRegions() {
    return (
        <svg viewBox="0 0 320 200" className="w-full h-auto max-w-md" fill="none">
            <path d="M60 100 Q60 50 120 45 Q160 30 200 45 Q260 50 260 100 Q270 140 230 165 Q180 180 160 170 Q140 180 90 165 Q50 140 60 100 Z"
                stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" fillOpacity="0.4" />
            {/* division lines (sulci) */}
            <path d="M120 50 Q135 110 125 165" stroke="#78716c" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M200 50 Q195 110 205 165" stroke="#78716c" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M160 45 Q160 110 160 175" stroke="#78716c" strokeWidth="1" strokeDasharray="2 3" />
            {/* labels */}
            <text x="90" y="110" fontSize="8" fill="#78716c" fontFamily="monospace">VISION</text>
            <text x="138" y="110" fontSize="8" fill="#78716c" fontFamily="monospace">LANG</text>
            <text x="172" y="110" fontSize="8" fill="#78716c" fontFamily="monospace">MOTOR</text>
            <text x="215" y="110" fontSize="8" fill="#78716c" fontFamily="monospace">MEM</text>
        </svg>
    );
}

// Monolithic MLP: one fat block lighting up entirely
function MonolithicMLP() {
    const nodes: { x: number; y: number }[] = [];
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 8; c++) {
            nodes.push({ x: 40 + c * 30, y: 30 + r * 28 });
        }
    }
    return (
        <svg viewBox="0 0 320 200" className="w-full h-auto max-w-md" fill="none">
            <rect x="20" y="15" width="280" height="160" rx="8" stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" fillOpacity="0.3" />
            {nodes.map((n, i) => (
                <circle key={i} cx={n.x} cy={n.y} r="4" fill="#44403c" fillOpacity="0.85" />
            ))}
            <text x="160" y="192" fontSize="9" fill="#78716c" fontFamily="monospace" textAnchor="middle">
                every neuron fires for every token
            </text>
        </svg>
    );
}

// Attention vs MLP as a hard-coded split of responsibilities
function AttentionMLPSplit() {
    // left: one tangled block trying to do both jobs
    // right: two clean blocks — attention (mix across tokens), MLP (transform each token)
    const tokens = [0, 1, 2, 3];
    return (
        <svg viewBox="0 0 420 240" className="w-full h-auto max-w-xl" fill="none">
            {/* LEFT: tangled monolith */}
            <g>
                <rect x="15" y="30" width="150" height="160" rx="8" stroke="#78716c" strokeWidth="1.2" strokeDasharray="3 3" fill="#fafafa" />
                <text x="90" y="22" fontSize="9" fill="#78716c" fontFamily="monospace" textAnchor="middle">one block, both jobs</text>
                {/* tangled paths */}
                <path d="M30 60 Q 90 90 150 70 Q 60 110 150 130 Q 40 150 140 170" stroke="#a3a3a3" strokeWidth="1" fill="none" />
                <path d="M30 100 Q 120 80 140 140 Q 50 130 140 90 Q 90 170 30 150" stroke="#a3a3a3" strokeWidth="1" fill="none" />
                <path d="M30 140 Q 80 60 150 100 Q 60 180 140 160" stroke="#a3a3a3" strokeWidth="1" fill="none" />
                {tokens.map((t, i) => (
                    <circle key={t} cx="30" cy={60 + i * 30} r="3" fill="#44403c" />
                ))}
                {tokens.map((t, i) => (
                    <circle key={`r${t}`} cx="150" cy={60 + i * 30} r="3" fill="#44403c" />
                ))}
                <text x="90" y="205" fontSize="8" fill="#78716c" fontFamily="monospace" textAnchor="middle">mixing + transform</text>
                <text x="90" y="216" fontSize="8" fill="#78716c" fontFamily="monospace" textAnchor="middle">tangled in same weights</text>
            </g>

            {/* arrow */}
            <path d="M180 110 L 210 110" stroke="#44403c" strokeWidth="1.2" />
            <path d="M204 105 L 210 110 L 204 115" stroke="#44403c" strokeWidth="1.2" fill="none" />

            {/* RIGHT: hard-coded split */}
            <g>
                {/* Attention block */}
                <rect x="225" y="30" width="180" height="70" rx="6" stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" fillOpacity="0.6" />
                <text x="315" y="48" fontSize="10" fill="#44403c" fontFamily="monospace" textAnchor="middle">ATTENTION</text>
                <text x="315" y="60" fontSize="8" fill="#78716c" fontFamily="monospace" textAnchor="middle">mix across tokens</text>
                {/* cross-token arrows inside attention */}
                {tokens.map((t, i) => (
                    <circle key={`at${t}`} cx={250 + i * 43} cy="82" r="3" fill="#44403c" />
                ))}
                <path d="M250 82 Q 293 70 336 82" stroke="#78716c" strokeWidth="0.8" fill="none" />
                <path d="M293 82 Q 336 72 379 82" stroke="#78716c" strokeWidth="0.8" fill="none" />
                <path d="M250 82 Q 315 95 379 82" stroke="#78716c" strokeWidth="0.8" fill="none" />

                {/* MLP block */}
                <rect x="225" y="120" width="180" height="70" rx="6" stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" fillOpacity="0.6" />
                <text x="315" y="138" fontSize="10" fill="#44403c" fontFamily="monospace" textAnchor="middle">MLP</text>
                <text x="315" y="150" fontSize="8" fill="#78716c" fontFamily="monospace" textAnchor="middle">transform each token alone</text>
                {/* per-token vertical arrows — no cross talk */}
                {tokens.map((t, i) => (
                    <g key={`mlp${t}`}>
                        <circle cx={250 + i * 43} cy="172" r="3" fill="#44403c" />
                        <line x1={250 + i * 43} y1="163" x2={250 + i * 43} y2="181" stroke="#78716c" strokeWidth="0.8" />
                    </g>
                ))}

                <text x="315" y="212" fontSize="8" fill="#78716c" fontFamily="monospace" textAnchor="middle">
                    two jobs, two blocks, hard-coded
                </text>
            </g>
        </svg>
    );
}

// MoE: MLP split into experts with a router
function MoEDiagram({ active = [false, true, false, true] }: { active?: boolean[] }) {
    const experts = [0, 1, 2, 3];
    return (
        <svg viewBox="0 0 380 240" className="w-full h-auto max-w-lg" fill="none">
            {/* token */}
            <rect x="10" y="105" width="60" height="30" rx="4" stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" />
            <text x="40" y="124" fontSize="9" fill="#44403c" fontFamily="monospace" textAnchor="middle">token</text>

            {/* router */}
            <circle cx="120" cy="120" r="22" stroke="#44403c" strokeWidth="1.5" fill="#e7e5e4" fillOpacity="0.7" />
            <text x="120" y="117" fontSize="8" fill="#44403c" fontFamily="monospace" textAnchor="middle">router</text>
            <text x="120" y="128" fontSize="8" fill="#44403c" fontFamily="monospace" textAnchor="middle">gate</text>
            <line x1="70" y1="120" x2="98" y2="120" stroke="#44403c" strokeWidth="1.2" />

            {/* experts */}
            {experts.map((e, i) => {
                const y = 30 + i * 46;
                const isActive = active[i];
                return (
                    <g key={e}>
                        <line
                            x1="142" y1="120" x2="210" y2={y + 17}
                            stroke={isActive ? "#44403c" : "#a3a3a3"}
                            strokeWidth={isActive ? "1.5" : "1"}
                            strokeDasharray={isActive ? "none" : "2 3"}
                        />
                        <rect x="210" y={y} width="110" height="34" rx="4"
                            stroke="#44403c" strokeWidth={isActive ? "1.5" : "1"}
                            fill={isActive ? "#e7e5e4" : "#fafafa"}
                            opacity={isActive ? 1 : 0.6}
                        />
                        <text x="265" y={y + 21} fontSize="9"
                            fill={isActive ? "#44403c" : "#a3a3a3"}
                            fontFamily="monospace" textAnchor="middle">
                            expert {e + 1}{isActive ? "  ●" : ""}
                        </text>
                    </g>
                );
            })}

            <text x="190" y="225" fontSize="9" fill="#78716c" fontFamily="monospace" textAnchor="middle">
                router picks 2 of N experts per token
            </text>
        </svg>
    );
}

// Meaningful vs trivial separation
function SeparationContrast() {
    return (
        <svg viewBox="0 0 360 200" className="w-full h-auto max-w-lg" fill="none">
            {/* left: meaningful */}
            <g>
                <rect x="15" y="30" width="70" height="50" rx="4" stroke="#44403c" strokeWidth="1.2" fill="#e7e5e4" fillOpacity="0.6" />
                <text x="50" y="58" fontSize="8" fill="#44403c" fontFamily="monospace" textAnchor="middle">syntax</text>
                <rect x="95" y="30" width="70" height="50" rx="4" stroke="#44403c" strokeWidth="1.2" fill="#e7e5e4" fillOpacity="0.6" />
                <text x="130" y="58" fontSize="8" fill="#44403c" fontFamily="monospace" textAnchor="middle">math</text>
                <rect x="55" y="100" width="70" height="50" rx="4" stroke="#44403c" strokeWidth="1.2" fill="#e7e5e4" fillOpacity="0.6" />
                <text x="90" y="128" fontSize="8" fill="#44403c" fontFamily="monospace" textAnchor="middle">code</text>
                <text x="90" y="175" fontSize="9" fill="#44403c" fontFamily="monospace" textAnchor="middle">meaningful</text>
            </g>

            {/* divider */}
            <line x1="185" y1="20" x2="185" y2="185" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="2 3" />

            {/* right: trivial split — blobs of noise */}
            <g>
                <rect x="205" y="30" width="70" height="50" rx="4" stroke="#78716c" strokeWidth="1" strokeDasharray="3 2" fill="#fafafa" />
                <circle cx="225" cy="50" r="2.5" fill="#a3a3a3" />
                <circle cx="245" cy="60" r="2.5" fill="#a3a3a3" />
                <circle cx="260" cy="45" r="2.5" fill="#a3a3a3" />
                <text x="240" y="74" fontSize="7" fill="#a3a3a3" fontFamily="monospace" textAnchor="middle">?</text>

                <rect x="285" y="30" width="70" height="50" rx="4" stroke="#78716c" strokeWidth="1" strokeDasharray="3 2" fill="#fafafa" />
                <circle cx="305" cy="55" r="2.5" fill="#a3a3a3" />
                <circle cx="325" cy="45" r="2.5" fill="#a3a3a3" />
                <circle cx="340" cy="62" r="2.5" fill="#a3a3a3" />
                <text x="320" y="74" fontSize="7" fill="#a3a3a3" fontFamily="monospace" textAnchor="middle">?</text>

                <rect x="245" y="100" width="70" height="50" rx="4" stroke="#78716c" strokeWidth="1" strokeDasharray="3 2" fill="#fafafa" />
                <circle cx="265" cy="120" r="2.5" fill="#a3a3a3" />
                <circle cx="285" cy="130" r="2.5" fill="#a3a3a3" />
                <circle cx="300" cy="115" r="2.5" fill="#a3a3a3" />
                <text x="280" y="144" fontSize="7" fill="#a3a3a3" fontFamily="monospace" textAnchor="middle">?</text>

                <text x="280" y="175" fontSize="9" fill="#78716c" fontFamily="monospace" textAnchor="middle">arbitrary</text>
            </g>
        </svg>
    );
}

export function CompartmentalizationFlow() {
    return (
        <div className="w-full max-w-5xl mx-auto px-6 font-sans space-y-32 pb-40">
            {/* Intro */}
            <section className="min-h-[70vh] flex flex-col justify-center items-center text-center pt-20">
                <FadeIn>
                    <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-400">
                        Compartmentalization
                    </span>
                    <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900">
                        Don&apos;t make one big brain. <br className="hidden md:block" />
                        <span className="text-neutral-500">Make many small ones.</span>
                    </h1>
                    <p className="mt-8 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                        At some point the field stopped scaling monolithic networks and started carving them into pieces. Here is why, and how.
                    </p>
                </FadeIn>
            </section>

            {/* 1. Brain analogy */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        The brain is not a blob.
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        Your visual cortex does not help you conjugate verbs. Your motor cortex does not store childhood memories. Evolution did not build one giant pile of neurons that does everything. It built regions, each tuned to a job.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="flex justify-center mt-10">
                    <BrainRegions />
                </FadeIn>
                <FadeIn delay={0.12} className="text-center mt-8 max-w-2xl mx-auto">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        Specialization is cheap. A region that only does vision can be wired for vision. Everything else stays quiet.
                    </p>
                </FadeIn>
            </section>

            {/* 2. Monolithic problem */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        A dense MLP does the opposite.
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        In a standard transformer, every MLP neuron runs for every token. The word <i className="not-italic text-neutral-700">the</i> wakes up the same billions of weights as a calculus equation.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="flex justify-center mt-10">
                    <MonolithicMLP />
                </FadeIn>
                <FadeIn delay={0.12} className="text-center mt-8 max-w-2xl mx-auto">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        You pay full compute for every input, whether it needed it or not. Capacity and cost are glued together. Want the model to know more? Make it denser, and pay more each forward pass.
                    </p>
                </FadeIn>
            </section>

            {/* 3. Attention as the first hard-coded split */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Attention was the first split we made by hand.
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        Before attention existed, an MLP had to do two jobs inside the same pile of weights. It had to transform each token <i className="not-italic text-neutral-700">and</i> carry information across tokens. Those are completely different kinds of work, but the weights did not know that. They had to discover the separation on their own, and they mostly failed.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="flex justify-center mt-10">
                    <AttentionMLPSplit />
                </FadeIn>
                <FadeIn delay={0.12} className="text-center mt-8 max-w-2xl mx-auto space-y-4">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        The attention block is the fix. It is a separate module whose only job is to move information between tokens. The MLP stays behind and does what it is actually good at, transforming a single token in isolation.
                    </p>
                    <p className="text-base text-neutral-400 leading-relaxed">
                        That split was not learned. We decided it was useful and wired it into the architecture. The model never has to figure out that cross-token mixing and per-token transform are different problems. The building blocks already say so.
                    </p>
                </FadeIn>
            </section>

            {/* 4. MoE */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Do the same thing to the MLP.
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        This is what Mixture of Experts is. Take the one fat MLP block. Replace it with N smaller MLPs, called experts. For each token, only a few of them fire. The rest sleep.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="flex justify-center mt-10">
                    <MoEDiagram />
                </FadeIn>
                <FadeIn delay={0.12} className="text-center mt-8 max-w-2xl mx-auto">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        Total parameters go up. Active parameters per token stay small. The model <i className="not-italic text-neutral-700">knows</i> more than it <i className="not-italic text-neutral-700">computes</i>.
                    </p>
                </FadeIn>
            </section>

            {/* 5. The router */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Who decides which expert?
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        A tiny network called the router. It looks at the incoming token, produces a score for each expert, and sends the token to the top-k. That is it. No rules, no hand-labeled categories.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="text-center mt-8 max-w-2xl mx-auto">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        The router trains with the rest of the model. If expert 3 is good at code, the router learns to send code there, because that is what lowers the loss. The division of labor is not designed, it is discovered.
                    </p>
                </FadeIn>
            </section>

            {/* 6. Why now */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Why this works at today&apos;s scale.
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        Dense scaling hit a wall. Doubling parameters doubles the compute bill on every token, even the easy ones. Compartmentalization breaks that link. You can hold a trillion parameters in memory and only touch tens of billions per token.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="text-center mt-8 max-w-2xl mx-auto">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        At current hardware budgets, sparse activation is the only way to keep scaling capacity without the compute curve eating you alive. That is why almost every frontier model now ships with experts inside.
                    </p>
                </FadeIn>
            </section>

            {/* 7. Meaningful separation */}
            <section className="py-12 border-t border-neutral-100">
                <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        But is the split <i className="not-italic text-neutral-500">meaningful</i>?
                    </h2>
                    <p className="text-lg text-neutral-500 leading-relaxed">
                        Here is the uncomfortable question. We can see the model is using different experts for different tokens. We cannot always see <i className="not-italic text-neutral-700">why</i>.
                    </p>
                </FadeIn>
                <FadeIn delay={0.08} className="flex justify-center mt-10">
                    <SeparationContrast />
                </FadeIn>
                <FadeIn delay={0.12} className="text-center mt-8 max-w-2xl mx-auto space-y-4">
                    <p className="text-base text-neutral-400 leading-relaxed">
                        Sometimes the separation looks like the brain version — one expert loves code, another leans into math, another handles rare languages. That is the hope.
                    </p>
                    <p className="text-base text-neutral-400 leading-relaxed">
                        Sometimes it looks like arbitrary load balancing. The router found <i className="not-italic text-neutral-600">a</i> way to spread tokens evenly, and the experts became interchangeable. The compartments exist on paper but they are not carving the problem at its joints.
                    </p>
                </FadeIn>
            </section>

            {/* Closing */}
            <section className="py-16 border-t border-neutral-100">
                <FadeIn className="text-center max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
                        Compartmentalization is how we afford the next order of magnitude. Whether it is also how we <i className="not-italic text-neutral-900">understand</i> the model is still open.
                    </p>
                </FadeIn>
            </section>
        </div>
    );
}
