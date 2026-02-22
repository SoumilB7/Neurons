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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, delay, ease: E }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Visual Concept Components (Monochrome, sleek)
function ConceptSun({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="50" cy="50" r="14" />
            <line x1="50" y1="14" x2="50" y2="24" />
            <line x1="50" y1="76" x2="50" y2="86" />
            <line x1="14" y1="50" x2="24" y2="50" />
            <line x1="76" y1="50" x2="86" y2="50" />
            <line x1="24.5" y1="24.5" x2="31.5" y2="31.5" />
            <line x1="68.5" y1="68.5" x2="75.5" y2="75.5" />
            <line x1="24.5" y1="75.5" x2="31.5" y2="68.5" />
            <line x1="68.5" y1="31.5" x2="75.5" y2="24.5" />
        </svg>
    );
}

function ConceptCrosshair({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="34" />
            <line x1="50" y1="16" x2="50" y2="84" />
            <line x1="16" y1="50" x2="84" y2="50" />
        </svg>
    );
}

function ConceptTriangle({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <polygon points="50,24 80,76 20,76" />
        </svg>
    );
}

function ConceptGrid({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="24,76 40,40 86,40 70,76" strokeLinejoin="round" />
            <line x1="29" y1="64" x2="75" y2="64" />
            <line x1="34.5" y1="52" x2="80.5" y2="52" />
            <line x1="45" y1="76" x2="55" y2="40" />
            <line x1="60" y1="76" x2="70" y2="40" />
        </svg>
    );
}

function ConceptBlob({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor">
            <path d="M41.5 15.5C49.5 9 60.5 12 66 19C72.5 16 82 22 81.5 30C88 33 87 43 81 48C84 55 79 64 71 65C70 73 60 78 53 72C46 76 36 71 34 64C26 63 21 54 25 47C19 41 23 31 30 29C28 21 34 13 41.5 15.5Z" strokeWidth="1.5" />
            <circle cx="53" cy="46" r="4" className="fill-current" />
            <path d="M34 64 Q 25 80 15 85" className="stroke-current" fill="none" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M81.5 30 Q 95 25 95 10" className="stroke-current" fill="none" strokeWidth="1.5" />
        </svg>
    );
}

function ActivationDemo() {
    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto py-10">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Core neuron body - hover interaction */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group w-28 h-28 rounded-full border border-neutral-200 bg-white hover:bg-neutral-900 transition-colors duration-200 flex items-center justify-center cursor-crosshair z-10"
                >
                    <span className="font-mono text-[10px] font-medium tracking-widest uppercase text-neutral-400 group-hover:opacity-0 transition-opacity duration-200">Absent</span>
                    <span className="absolute font-mono text-[10px] font-medium tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">Present</span>
                </motion.div>
            </div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-neutral-400">Hover to activate</p>
        </div>
    );
}

function LayersDiagram() {
    const getNodes = (count: number, center: number, spacing: number) =>
        Array.from({ length: count }, (_, i) => center + (i - (count - 1) / 2) * spacing);

    const nodesLevel1 = getNodes(10, 130, 22);
    const nodesLevel2 = getNodes(8, 130, 22);
    const nodesLevel3 = getNodes(10, 130, 22);
    const nodesLevel4 = getNodes(6, 130, 22);

    const connectedL1 = nodesLevel1.slice(2, 7); // middle 5
    const connectedL2 = nodesLevel2.slice(2, 5); // middle 3
    const connectedL3 = nodesLevel3.slice(3, 7); // middle 4
    const connectedL4 = nodesLevel4.slice(2, 3); // middle 1

    return (
        <div className="w-full overflow-hidden mt-12 bg-white rounded-2xl p-8 border border-neutral-200">
            <svg viewBox="0 0 800 280" className="w-full h-auto">
                <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.15" fill="none" className="text-neutral-900">
                    {connectedL1.map(y1 => connectedL2.map(y2 => <line key={`1-2-${y1}-${y2}`} x1="110" y1={y1} x2="290" y2={y2} />))}
                    {connectedL2.map(y1 => connectedL3.map(y2 => <line key={`2-3-${y1}-${y2}`} x1="312" y1={y1} x2="488" y2={y2} />))}
                    {connectedL3.map(y1 => connectedL4.map(y2 => <line key={`3-4-${y1}-${y2}`} x1="514" y1={y1} x2="686" y2={y2} />))}
                </g>

                <g fill="currentColor">
                    {/* Level 1: Pixels / Raw */}
                    {nodesLevel1.map((y, i) => <circle key={`1-${i}`} cx="100" cy={y} r="4" className={connectedL1.includes(y) ? "text-neutral-400 pointer-events-none" : "text-neutral-200 pointer-events-none"} />)}

                    {/* Level 2: Edges */}
                    {nodesLevel2.map((y, i) => <circle key={`2-${i}`} cx="300" cy={y} r="5" className={connectedL2.includes(y) ? "text-neutral-500 pointer-events-none" : "text-neutral-200 pointer-events-none"} />)}

                    {/* Level 3: Textures / Parts */}
                    {nodesLevel3.map((y, i) => <circle key={`3-${i}`} cx="500" cy={y} r="6" className={connectedL3.includes(y) ? "text-neutral-600 pointer-events-none" : "text-neutral-200 pointer-events-none"} />)}

                    {/* Level 4: Objects / Concepts */}
                    {nodesLevel4.map((y, i) => <motion.circle
                        key={`4-${i}`}
                        cx="700"
                        cy={y}
                        r={connectedL4.includes(y) ? 8 : 6}
                        className={connectedL4.includes(y) ? "text-neutral-900 cursor-pointer" : "text-neutral-200 cursor-pointer"}
                        whileHover={{ scale: connectedL4.includes(y) ? 1.15 : 1 }}
                    />)}
                </g>

                {/* Labels */}
                <text x="100" y="270" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 1</text>
                <text x="300" y="270" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 2</text>
                <text x="500" y="270" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 3</text>
                <text x="700" y="270" fill="#111111" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">High-Level Concepts</text>
            </svg>
        </div>
    );
}

function AttentionDiagram() {
    return (
        <div className="w-full mt-12 bg-white rounded-2xl p-8 border border-neutral-200">
            <svg viewBox="0 0 800 200" className="w-full h-auto text-neutral-300">
                <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#111111" />
                    </marker>
                    <marker id="arrowhead-gray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="#a3a3a3" />
                    </marker>
                </defs>

                {/* Connections */}
                <g strokeWidth="1.5" fill="none">
                    {/* Main attention arc */}
                    <path d="M 600 110 Q 375 0 160 110" markerEnd="url(#arrowhead)" stroke="#111111" strokeDasharray="3 3" />

                    {/* Fainter attention arcs */}
                    <path d="M 600 110 Q 525 60 460 110" markerEnd="url(#arrowhead)" stroke="#111111" strokeOpacity="0.2" />
                    <path d="M 450 110 Q 375 70 310 110" markerEnd="url(#arrowhead-gray)" stroke="#a3a3a3" strokeOpacity="0.3" />
                </g>

                {/* Nodes representing concepts at the same depth level */}
                <g fill="currentColor">
                    <circle cx="150" cy="120" r="8" className="text-neutral-900" />
                    <circle cx="300" cy="120" r="6" className="text-neutral-300" />
                    <circle cx="450" cy="120" r="6" className="text-neutral-300" />
                    <circle cx="600" cy="120" r="8" className="text-neutral-900" />
                    <circle cx="750" cy="120" r="4" className="text-neutral-200" />
                </g>

                {/* Text labels */}
                <text x="150" y="155" fill="#111111" textAnchor="middle" className="font-mono text-xs font-medium tabular-nums">The dog</text>
                <text x="300" y="155" fill="#a3a3a3" textAnchor="middle" className="font-mono text-xs font-medium tabular-nums">chased</text>
                <text x="450" y="155" fill="#a3a3a3" textAnchor="middle" className="font-mono text-xs font-medium tabular-nums">the ball</text>
                <text x="600" y="155" fill="#111111" textAnchor="middle" className="font-mono text-xs font-medium tabular-nums">because he</text>
                <text x="750" y="155" fill="#d4d4d4" textAnchor="middle" className="font-mono text-xs font-medium tabular-nums">...</text>
            </svg>
        </div>
    );
}

export function ConceptFlow() {
    return (
        <div className="w-full max-w-6xl mx-auto px-6 font-sans space-y-40 pb-40">

            {/* 1. Intro */}
            <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative pt-20">
                <FadeIn className="z-10 relative">
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-neutral-900 mb-6">
                        A neuron is <br className="hidden md:block" />a <span className="text-neutral-500">concept</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed mt-8">
                        Not just circles and math. In advanced networks, a neuron fundamentally learns to represent any identifiable <i className="text-neutral-700 not-italic font-medium">thing</i>.
                    </p>
                </FadeIn>

                {/* Scattered SVG Concept representations */}
                <div className="absolute inset-0 pointer-events-none hidden lg:block">
                    <motion.div className="absolute top-[20%] left-[10%]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1, ease: E }}>
                        <ConceptSun className="w-16 h-16 text-neutral-400 opacity-60" />
                    </motion.div>

                    <motion.div className="absolute top-[35%] right-[8%]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: E }}>
                        <ConceptCrosshair className="w-24 h-24 text-neutral-400 opacity-60" />
                    </motion.div>

                    <motion.div className="absolute bottom-[20%] left-[18%]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: E }}>
                        <ConceptTriangle className="w-16 h-16 text-neutral-600 opacity-80" />
                    </motion.div>

                    <motion.div className="absolute bottom-[25%] right-[22%]"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25, ease: E }}>
                        <ConceptGrid className="w-28 h-28 text-neutral-300 opacity-80" />
                    </motion.div>

                    {/* Centered Blob */}
                    <motion.div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 0.4, ease: E }}>
                        <ConceptBlob className="w-[440px] h-[440px] text-neutral-300" />
                    </motion.div>
                </div>
            </section>

            {/* 2. Tangible / Intangible */}
            <section className="py-20">
                <FadeIn className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Any <i className="text-neutral-500 not-italic">thing</i>
                    </h2>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-4 items-stretch">
                    <FadeIn>
                        <div className="bg-white rounded-2xl p-10 lg:p-12 border border-neutral-200 h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-shadow duration-200">
                            <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center mb-8">
                                <div className="w-3 h-3 bg-neutral-900 rounded-[2px]"></div>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-neutral-900 tracking-tight">Tangible</h3>
                            <p className="text-sm leading-relaxed text-neutral-500">
                                Concepts we can easily name and point to. A golden retriever, a chair, a red Stop sign, or the shape of a perfect triangle.
                            </p>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.06}>
                        <div className="bg-white rounded-2xl p-10 lg:p-12 border border-neutral-200 h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-shadow duration-200">
                            <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center mb-8">
                                <div className="w-4 h-4 bg-neutral-400 rounded-full opacity-60 blur-[2px]"></div>
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-neutral-900 tracking-tight">Non-Tangible</h3>
                            <p className="text-sm leading-relaxed text-neutral-500">
                                Abstract patterns and heuristics. Syntax rules in language, subtler emotional tones, and fuzzy patterns that human language lacks words to describe.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 3. Activation */}
            <section className="py-24 flex flex-col items-center">
                <FadeIn className="text-center mb-12 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Activation = Presence
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        When a neuron fires, it is simply signaling the <span className="text-neutral-900 font-medium">presence or absence</span> of its corresponding concept in the real world snippet it is looking at.
                    </p>
                </FadeIn>

                <FadeIn delay={0.06} className="w-full flex justify-center">
                    <ActivationDemo />
                </FadeIn>
            </section>

            {/* 4. The Layers */}
            <section className="py-24">
                <FadeIn className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        The layers
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        As we go deeper down the layers, neural networks actually condition representation to be <strong className="text-neutral-900 font-medium">concepts at different depth levels</strong>. Low layers are edges; deep layers are complex, complete thoughts.
                    </p>
                </FadeIn>

                <FadeIn delay={0.06}>
                    <LayersDiagram />
                </FadeIn>
            </section>

            {/* 5. Attention */}
            <section className="py-24">
                <FadeIn className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        Attention
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        Attention is actually the part that inhabits the ability to make neural nets have intra-layer communication. <br className="hidden md:block" /><span className="text-neutral-900 font-medium">Concepts of the same level can finally apply and talk to each other.</span>
                    </p>
                </FadeIn>

                <FadeIn delay={0.06}>
                    <AttentionDiagram />
                </FadeIn>
            </section>

        </div>
    );
}
