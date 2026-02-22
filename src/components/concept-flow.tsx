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
    const [selectedDigit, setSelectedDigit] = React.useState<number>(3);

    const getNodes = (count: number, center: number, spacing: number) =>
        Array.from({ length: count }, (_, i) => center + (i - (count - 1) / 2) * spacing);

    const nodesLevel1 = getNodes(9, 180, 36);
    const nodesLevel2 = getNodes(8, 180, 40);
    const nodesLevel3 = getNodes(8, 180, 40);
    const nodesLevel4 = getNodes(10, 180, 36);

    const featuresL1 = [
        <circle key="0" cx="0" cy="0" r="2.5" fill="currentColor" />,
        <circle key="1" cx="-3" cy="3" r="2" fill="currentColor" />,
        <circle key="2" cx="3" cy="-3" r="3" fill="currentColor" />,
        <circle key="3" cx="0" cy="0" r="4.5" fill="currentColor" opacity="0.4" filter="blur(1.5px)" />,
        <circle key="4" cx="2" cy="2" r="2.5" fill="currentColor" />,
        <circle key="5" cx="-2" cy="-2" r="2" fill="currentColor" />,
        <circle key="6" cx="0" cy="0" r="5" fill="currentColor" opacity="0.3" filter="blur(2px)" />,
        <circle key="7" cx="4" cy="1" r="2" fill="currentColor" />,
        <circle key="8" cx="-1" cy="-4" r="2.5" fill="currentColor" />,
    ];

    const featuresL2 = [
        <line key="0" x1="-5" y1="-5" x2="5" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <line key="1" x1="-6" y1="0" x2="6" y2="0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <line key="2" x1="0" y1="-6" x2="0" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <line key="3" x1="-5" y1="5" x2="5" y2="-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="4" d="M -5 -3 Q 0 -6 5 -3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" filter="blur(1px)" />,
        <path key="5" d="M -5 3 Q 0 6 5 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <line key="6" x1="-4" y1="-6" x2="4" y2="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" filter="blur(2px)" />,
        <path key="7" d="M -3 -5 Q 3 0 -3 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    ];

    const featuresL3 = [
        <path key="0" d="M -6 -4 C 0 -10, 6 -10, 6 -4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="1" d="M -6 4 C 0 10, 6 10, 6 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="2" d="M 2 -6 C 8 -2, 8 2, 2 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="3" d="M -2 -6 C -8 -2, -8 2, -2 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="4" d="M 0 -8 L 0 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="5" d="M -6 0 L 6 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <path key="6" d="M -6 6 L 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
        <line key="7" x1="-5" y1="5" x2="5" y2="-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
    ];

    const digitWeights: Record<number, number[]> = {
        0: [2, 2, 2, 2, 1, 0, 0, 0],
        1: [-1, -1, 0, 0, 3, 0, 1, 0],
        2: [2, -1, 1, -1, 0, 2, 2, 1],
        3: [2, 2, 3, -1, -1, 2, 0, 0],
        4: [0, 0, 1, 1, 2, 2, 0, 0],
        5: [1, 2, 1, -1, 1, 2, 0, 0],
        6: [1, 2, 2, 2, 1, 1, 0, 0],
        7: [1, 0, 0, 0, 0, 0, -1, 3],
        8: [2, 2, 2, 2, 1, 1, 1, 0],
        9: [2, 1, 2, 1, 1, 1, 0, 1],
    };

    const l2_l3_weights = [
        [1, 0, 0, 1, 3, 0, 0, 0],
        [0, 1, 0, 0, 0, 3, 0, 0],
        [1, 0, 0, 1, 0, 0, 0, 3],
        [1, 0, 0, 1, 0, 0, 0, -1],
        [0, 0, 3, 0, 0, 0, 1, 0],
        [0, 3, 0, 0, 0, 0, 0, 0],
        [0, 3, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 0, 1, 0],
    ];

    const l1_l2_weights = [
        [2, 0, 0, 1, 0, 0, 0, 2, 0],
        [0, 2, 0, 0, 2, 0, 0, 0, 1],
        [0, 0, 2, 0, 0, 2, 1, 0, 0],
        [0, 0, 0, 2, 0, 0, 0, 1, 2],
        [1, 0, 1, 2, 0, 0, 2, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 2, 1],
        [0, 0, 1, 2, 0, 1, 2, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 1, 2],
    ];

    const activeL3 = digitWeights[selectedDigit];
    const activeL2 = Array(8).fill(0);
    for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 8; k++) {
            activeL2[j] += l2_l3_weights[k][j] * Math.max(0, activeL3[k]);
        }
    }
    const maxL2 = Math.max(...activeL2, 1);
    for (let j = 0; j < 8; j++) activeL2[j] = (activeL2[j] / maxL2) * 3;

    const activeL1 = Array(9).fill(0);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 8; j++) {
            activeL1[i] += l1_l2_weights[j][i] * Math.max(0, activeL2[j]);
        }
    }
    const maxL1 = Math.max(...activeL1, 1);
    for (let i = 0; i < 9; i++) activeL1[i] = (activeL1[i] / maxL1) * 3;

    const getStrokeProps = (importance: number, baseWeight: number = 1) => {
        if (baseWeight < 0 && importance <= 0) {
            return { strokeWidth: 1, strokeOpacity: 0.2, strokeDasharray: "4 4", className: "text-neutral-300" };
        }
        if (importance > 1.5) {
            return { strokeWidth: Math.min(3, importance), strokeOpacity: 0.7, strokeDasharray: "none", className: "text-neutral-900" };
        }
        if (importance > 0.2) {
            return { strokeWidth: 1.5, strokeOpacity: 0.25, strokeDasharray: "none", className: "text-neutral-500" };
        }
        return { strokeWidth: 1, strokeOpacity: 0.05, strokeDasharray: "none", className: "text-neutral-200" };
    };

    const renderNode = (x: number, y: number, isActive: boolean, content: React.ReactNode, isInteractive = false, onClick?: () => void) => {
        return (
            <g
                transform={`translate(${x}, ${y})`}
                className={`transition-colors duration-300 ${isInteractive ? "cursor-pointer " : ""}${isActive ? "text-neutral-900" : "text-neutral-300"}`}
                onClick={onClick}
            >
                <circle cx="0" cy="0" r="16" fill="white" stroke="currentColor" strokeWidth={isActive ? "2" : "1.5"} className="transition-all duration-300" />
                {content}
            </g>
        );
    };

    return (
        <div className="w-full mt-12 bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col">
            <div className="p-8 pb-4 overflow-x-auto">
                <svg viewBox="0 0 800 390" className="w-full h-auto min-w-[700px]">
                    {/* All lines */}
                    <g fill="none">
                        {/* L1 -> L2 */}
                        {nodesLevel1.map((y1, i1) => {
                            return nodesLevel2.map((y2, i2) => {
                                const baseWeight = l1_l2_weights[i2][i1];
                                if (baseWeight === 0) return null;
                                const importance = baseWeight * Math.max(0, activeL2[i2]) / 2;
                                const props = getStrokeProps(importance, baseWeight);
                                return <line key={`1-2-${i1}-${i2}`} x1="116" y1={y1} x2="284" y2={y2} stroke="currentColor" {...props} className={`transition-all duration-300 ${props.className}`} />;
                            });
                        })}

                        {/* L2 -> L3 */}
                        {nodesLevel2.map((y2, i2) => {
                            return nodesLevel3.map((y3, i3) => {
                                const baseWeight = l2_l3_weights[i3][i2];
                                if (baseWeight === 0) return null;
                                const importance = baseWeight * Math.max(0, activeL3[i3]) / 2;
                                const props = getStrokeProps(importance, baseWeight);
                                return <line key={`2-3-${i2}-${i3}`} x1="316" y1={y2} x2="484" y2={y3} stroke="currentColor" {...props} className={`transition-all duration-300 ${props.className}`} />;
                            });
                        })}

                        {/* L3 -> L4 */}
                        {nodesLevel4.map((y4, digit) => {
                            if (selectedDigit !== digit) return null;
                            return nodesLevel3.map((y3, featIdx) => {
                                const weight = digitWeights[digit][featIdx];
                                if (weight === 0) return null;
                                const importance = Math.max(0, weight);
                                const props = getStrokeProps(importance, weight);
                                return <line key={`3-4-${featIdx}-${digit}`} x1="516" y1={y3} x2="684" y2={y4} stroke="currentColor" {...props} className={`transition-all duration-300 ${props.className}`} />;
                            });
                        })}
                    </g>

                    {/* Nodes Level 1 */}
                    {nodesLevel1.map((y, i) => <React.Fragment key={`1-${i}`}>{renderNode(100, y, activeL1[i] > 1, featuresL1[i])}</React.Fragment>)}
                    {/* Nodes Level 2 */}
                    {nodesLevel2.map((y, i) => <React.Fragment key={`2-${i}`}>{renderNode(300, y, activeL2[i] > 1, featuresL2[i])}</React.Fragment>)}
                    {/* Nodes Level 3 */}
                    {nodesLevel3.map((y, i) => <React.Fragment key={`3-${i}`}>{renderNode(500, y, Math.max(0, activeL3[i]) > 0, featuresL3[i])}</React.Fragment>)}

                    {/* Level 4: Output Digits 0-9 */}
                    {nodesLevel4.map((y, i) => {
                        const isSelected = selectedDigit === i;
                        const content = (
                            <text x="0" y="4" textAnchor="middle" fontSize="13" fontWeight={isSelected ? "600" : "500"} fill="currentColor" className="font-mono">{i}</text>
                        );
                        return <React.Fragment key={`4-${i}`}>{renderNode(700, y, isSelected, content, true, () => setSelectedDigit(i))}</React.Fragment>;
                    })}

                    {/* Labels */}
                    <text x="100" y="375" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 1</text>
                    <text x="300" y="375" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 2</text>
                    <text x="500" y="375" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Depth 3</text>
                    <text x="700" y="375" fill="#111111" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Output (0-9)</text>
                </svg>
            </div>

            {/* Examples building up to the letter 3 */}
            <div className="grid grid-cols-4 border-t border-neutral-200 bg-neutral-50/50">
                <div className="p-6 text-center border-r border-neutral-200">
                    <div className="mb-4 flex items-center justify-center gap-2 h-12">
                        <svg viewBox="0 0 24 24" width="20" height="20" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2">
                            <path d="M4 12 L12 4" />
                        </svg>
                        <svg viewBox="0 0 24 24" width="20" height="20" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2">
                            <path d="M12 4 C 18 4 20 10 20 12" />
                        </svg>
                        <svg viewBox="0 0 24 24" width="20" height="20" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2">
                            <path d="M4 12 C 10 12 12 18 12 20" />
                        </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase font-medium tracking-widest text-neutral-400 mb-1">Depth 1</p>
                    <p className="text-sm font-medium text-neutral-700">Pixels & Dots</p>
                </div>

                <div className="p-6 text-center border-r border-neutral-200">
                    <div className="mb-4 flex items-center justify-center gap-3 h-12">
                        <svg viewBox="0 0 32 32" width="24" height="24" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
                            <path d="M6 10 C 12 6 20 6 26 10" />
                        </svg>
                        <svg viewBox="0 0 32 32" width="24" height="24" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
                            <path d="M26 10 C 30 16 30 24 26 30" />
                        </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase font-medium tracking-widest text-neutral-400 mb-1">Depth 2</p>
                    <p className="text-sm font-medium text-neutral-700">Lines & Short Curves</p>
                </div>

                <div className="p-6 text-center border-r border-neutral-200">
                    <div className="mb-4 flex items-center justify-center gap-4 h-12">
                        <svg viewBox="0 0 32 32" width="28" height="28" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M10 8 C 16 4 26 4 26 12 C 26 18 18 20 14 20" />
                        </svg>
                        <svg viewBox="0 0 32 32" width="28" height="28" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M14 12 C 22 12 28 14 28 22 C 28 30 16 30 10 26" />
                        </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase font-medium tracking-widest text-neutral-400 mb-1">Depth 3</p>
                    <p className="text-sm font-medium text-neutral-700">Complex Loops</p>
                </div>

                <div className="p-6 text-center bg-white">
                    <div className="mb-4 flex items-center justify-center h-12">
                        <svg viewBox="0 0 32 32" width="40" height="40" className="text-neutral-900" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M10 6 C 18 2 26 4 24 12 C 22 16 16 16 14 16 C 22 16 26 20 24 26 C 22 30 14 30 10 26" />
                        </svg>
                    </div>
                    <p className="font-mono text-[10px] uppercase font-medium tracking-widest text-neutral-400 mb-1">High-Level</p>
                    <p className="text-sm font-semibold text-neutral-900">The Number "3"</p>
                </div>
            </div>
        </div>
    );
}

function CapacityBottleneck() {
    return (
        <section className="py-24 border-t border-neutral-100">
            <FadeIn className="mb-16 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                    Capacity Limits & Abstraction
                </h2>
                <div className="space-y-4 text-lg text-neutral-500 leading-relaxed">
                    <p>
                        A neural network cannot afford to memorize every single precise variation of a feature. If it dedicated a separate neuron to a line slanted at 41°, another for 42°, and another for 43°, it would quickly run out of capacity.
                    </p>
                    <p>
                        Instead, it forces data through a <strong>bottleneck</strong>. This forces the network to <em className="text-neutral-900 font-medium">abstract</em>, grouping highly specific variations into a single, fuzzier "bucket" that activates for any loosely related feature.
                    </p>
                </div>
            </FadeIn>

            <FadeIn delay={0.06}>
                <div className="w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col p-8 md:p-12 relative cursor-default">
                    <svg viewBox="0 0 800 300" className="w-full h-auto min-w-[600px] select-none">

                        {/* Bottleneck Area Background */}
                        <g>
                            <rect x="420" y="0" width="80" height="300" fill="#fafafa" />
                            <line x1="420" y1="0" x2="420" y2="300" stroke="#f5f5f5" strokeWidth="1" />
                            <line x1="500" y1="0" x2="500" y2="300" stroke="#f5f5f5" strokeWidth="1" />
                            <text x="460" y="150" fill="#d4d4d4" textAnchor="middle" transform="rotate(-90 460 150)" className="font-mono text-[10px] uppercase font-medium tracking-widest">
                                Capacity Bottleneck
                            </text>
                        </g>

                        <g fill="none">
                            {/* Fusing Lines */}
                            <path d="M 180 50 C 350 50, 400 150, 580 150" stroke="currentColor" strokeWidth="1.5" className="text-neutral-200" />
                            <path d="M 180 100 C 350 100, 400 150, 580 150" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300" />
                            <path d="M 180 150 L 580 150" stroke="currentColor" strokeWidth="2.5" className="text-neutral-900" />
                            <path d="M 180 200 C 350 200, 400 150, 580 150" stroke="currentColor" strokeWidth="1.5" className="text-neutral-300" />
                            <path d="M 180 250 C 350 250, 400 150, 580 150" stroke="currentColor" strokeWidth="1.5" className="text-neutral-200" />
                        </g>

                        <g fill="white" stroke="currentColor" strokeWidth="1.5">
                            {/* High Variance Nodes */}
                            <circle cx="150" cy="50" r="16" className="text-neutral-200" />
                            <circle cx="150" cy="100" r="16" className="text-neutral-300" />
                            <circle cx="150" cy="150" r="16" className="text-neutral-900" strokeWidth="2" />
                            <circle cx="150" cy="200" r="16" className="text-neutral-300" />
                            <circle cx="150" cy="250" r="16" className="text-neutral-200" />

                            {/* Fused Node */}
                            <circle cx="610" cy="150" r="24" className="text-neutral-900" strokeWidth="2" />
                        </g>

                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
                            {/* Specific Slashes */}
                            <line x1="145" y1="58" x2="155" y2="42" className="text-neutral-200" />
                            <line x1="144" y1="106" x2="156" y2="94" className="text-neutral-300" />
                            <line x1="143" y1="157" x2="157" y2="143" className="text-neutral-900" />
                            <line x1="142" y1="204" x2="158" y2="196" className="text-neutral-300" />
                            <line x1="141" y1="252" x2="159" y2="248" className="text-neutral-200" />

                            {/* Fused / Abstracted Slash */}
                            <line x1="601" y1="159" x2="619" y2="141" className="text-neutral-900" strokeWidth="3.5" filter="blur(1px)" opacity="0.8" />
                        </g>

                        {/* Annotations */}
                        <text x="150" y="290" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">High Specificity (Variance)</text>
                        <text x="610" y="290" fill="#111111" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Fused Concept Bucket</text>
                        <text x="610" y="200" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">"Any Slanted Line"</text>
                    </svg>
                </div>
            </FadeIn>
        </section>
    );
}

function ConceptOverlap() {
    const [hoveredConcept, setHoveredConcept] = React.useState<number | null>(1);

    const features = [
        { id: 0, icon: <line x1="-5" y1="-5" x2="5" y2="5" strokeWidth="2" strokeLinecap="round" /> },
        { id: 1, icon: <circle cx="0" cy="0" r="4" fill="currentColor" /> },
        { id: 2, icon: <line x1="-6" y1="0" x2="6" y2="0" strokeWidth="2" strokeLinecap="round" /> },
        { id: 3, icon: <path d="M -5 4 Q 0 -6 5 4" fill="none" strokeWidth="2" strokeLinecap="round" /> },
        { id: 4, icon: <polygon points="0,-5 5,4 -5,4" fill="currentColor" /> },
    ];

    const concepts = [
        { id: 1, y: 140, label: "Concept Alpha", connections: [0, 1, 2, 3] },
        { id: 2, y: 260, label: "Concept Beta", connections: [1, 2, 3, 4] },
    ];

    return (
        <section className="py-24 border-t border-neutral-100">
            <FadeIn className="mb-16 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                    Concepts as Sets
                </h2>
                <div className="space-y-4 text-lg text-neutral-500 leading-relaxed">
                    <p>
                        A neural network rarely dedicates a single neuron to a completely isolated idea. Instead, it relies on <strong className="text-neutral-900 font-medium">distributed representations</strong>, where a complex concept is simply defined by the simultaneous activation of a specific <em>set</em> of smaller feature neurons.
                    </p>
                    <p>
                        Because of this, similar concepts naturally <strong className="text-neutral-900 font-medium">overlap</strong>. They share a large foundational set of neurons, varying only in a few specific activations. Hover over the concepts below to see their underlying sets.
                    </p>
                </div>
            </FadeIn>

            <FadeIn delay={0.06}>
                <div
                    className="w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col p-8 md:p-12 relative cursor-default"
                    onMouseLeave={() => setHoveredConcept(1)}
                >
                    <svg viewBox="0 0 800 400" className="w-full h-auto min-w-[600px] select-none">
                        {/* Headers */}
                        <text x="200" y="40" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">Base Feature Neurons</text>
                        <text x="600" y="40" fill="#a3a3a3" textAnchor="middle" className="font-mono text-[10px] uppercase font-medium tracking-widest">High-Level Concepts</text>

                        {/* Paths */}
                        <g fill="none">
                            {concepts.map((concept) => (
                                concept.connections.map(featId => {
                                    const featY = 100 + featId * 50;
                                    const isActive = hoveredConcept === concept.id;
                                    const pathOpacity = isActive ? 0.6 : 0.05;
                                    const pathStroke = isActive ? "text-neutral-900" : "text-neutral-300";
                                    const strokeWidth = isActive ? 2 : 1;

                                    return (
                                        <path
                                            key={`path-${concept.id}-${featId}`}
                                            d={`M 220 ${featY} C 400 ${featY}, 400 ${concept.y}, 576 ${concept.y}`}
                                            className={`transition-all duration-300 ${pathStroke}`}
                                            stroke="currentColor"
                                            strokeWidth={strokeWidth}
                                            opacity={pathOpacity}
                                        />
                                    );
                                })
                            ))}
                        </g>

                        {/* Feature Nodes */}
                        {features.map((feat, i) => {
                            const featY = 100 + i * 50;
                            const isActive = concepts.some(c => c.id === hoveredConcept && c.connections.includes(feat.id));
                            const isShared = concepts.every(c => c.connections.includes(feat.id));
                            const label = isShared ? "Shared Pattern" : "";

                            return (
                                <g key={`feat-${i}`} transform={`translate(200, ${featY})`} className={`transition-colors duration-300 ${isActive ? "text-neutral-900" : "text-neutral-300"}`}>
                                    <circle cx="0" cy="0" r="16" fill="white" stroke="currentColor" strokeWidth={isActive ? 2 : 1.5} className="transition-all duration-300" />
                                    {feat.icon}
                                    {label && (
                                        <text x="-32" y="3" fill="#a3a3a3" textAnchor="end" className={`font-mono text-[9px] uppercase font-medium tracking-widest transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                                            {label}
                                        </text>
                                    )}
                                </g>
                            );
                        })}

                        {/* Concept Nodes */}
                        {concepts.map((concept) => {
                            const isActive = hoveredConcept === concept.id;

                            return (
                                <g
                                    key={`concept-${concept.id}`}
                                    transform={`translate(600, ${concept.y})`}
                                    className={`transition-all duration-300 cursor-pointer ${isActive ? "text-neutral-900" : "text-neutral-300"}`}
                                    onMouseEnter={() => setHoveredConcept(concept.id)}
                                    // Make it work immediately on touch devices as well
                                    onClick={() => setHoveredConcept(concept.id)}
                                >
                                    <circle cx="0" cy="0" r="24" fill="white" stroke="currentColor" strokeWidth={isActive ? 2.5 : 1.5} className="transition-all duration-300" />
                                    <circle cx="0" cy="0" r="4" fill="currentColor" className={`transition-all duration-300 ${isActive ? "scale-100" : "scale-75 opacity-50"}`} />

                                    <text x="40" y="4" fill="currentColor" textAnchor="start" className="font-sans text-sm font-medium transition-colors duration-300">
                                        {concept.label}
                                    </text>
                                    <text x="40" y="22" fill="#a3a3a3" textAnchor="start" className={`font-mono text-[9px] uppercase tracking-widest transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}>
                                        Hover to Activate
                                    </text>

                                    {/* Interactive hit area */}
                                    <circle cx="0" cy="0" r="40" fill="transparent" />
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </FadeIn>
        </section>
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

            {/* Capacity Bottlenecks */}
            <CapacityBottleneck />

            {/* Concept Overlap & Sets */}
            <ConceptOverlap />

            {/* 4. The Layers */}
            <section className="py-24">
                <FadeIn className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
                        The layers
                    </h2>
                    <p className="text-lg leading-relaxed text-neutral-500">
                        As we go deeper down the layers, neural networks actually condition representation to be <strong className="text-neutral-900 font-medium">concepts at different depth levels</strong>. For example, raw pixels combine into edges, building up to complex loops, and eventually recognizing the abstract number "3".
                    </p>
                </FadeIn>

                <FadeIn delay={0.06}>
                    <LayersDiagram />
                </FadeIn>
            </section>

        </div>
    );
}
