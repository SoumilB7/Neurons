"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { motion } from "framer-motion";

const E: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-6 py-24 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: E }}
        >
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
              Cognition
            </h1>
            <p className="text-lg text-neutral-500 max-w-2xl">
              Explorations and interactive visualizations decoding the mechanics of intelligence, neural networks, and conceptual representations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Card: Neurons */}
            <Link href="/neurons" className="group block h-full">
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col">
                {/* Card illustration */}
                <div className="w-full bg-neutral-50 border-b border-neutral-100 px-8 py-6 flex items-center justify-center">
                  <svg viewBox="0 0 300 170" className="w-full h-auto" fill="none">
                    <defs>
                      <marker id="c-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#44403c" />
                      </marker>
                    </defs>
                    {/* Connections bottom → mid */}
                    <line x1="50" y1="130" x2="90" y2="95" stroke="#44403c" strokeWidth="1.5" markerEnd="url(#c-arrow)" />
                    <line x1="110" y1="130" x2="100" y2="95" stroke="#44403c" strokeWidth="1.5" markerEnd="url(#c-arrow)" />
                    <line x1="150" y1="130" x2="105" y2="95" stroke="#44403c" strokeWidth="1.2" opacity="0.5" markerEnd="url(#c-arrow)" />
                    <line x1="150" y1="130" x2="195" y2="95" stroke="#44403c" strokeWidth="1.5" markerEnd="url(#c-arrow)" />
                    <line x1="200" y1="130" x2="200" y2="95" stroke="#44403c" strokeWidth="1.5" markerEnd="url(#c-arrow)" />
                    <line x1="250" y1="130" x2="210" y2="95" stroke="#44403c" strokeWidth="1.5" markerEnd="url(#c-arrow)" />
                    {/* Connections mid → top */}
                    <line x1="95" y1="72" x2="148" y2="35" stroke="#44403c" strokeWidth="2" markerEnd="url(#c-arrow)" />
                    <line x1="200" y1="72" x2="168" y2="35" stroke="#44403c" strokeWidth="2" markerEnd="url(#c-arrow)" />
                    {/* Top node */}
                    <rect x="125" y="12" width="65" height="28" rx="5" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.5" />
                    <text x="157" y="31" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1c1917" fontFamily="system-ui">say Austin</text>
                    {/* Middle row */}
                    <rect x="58" y="72" width="80" height="24" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.5" />
                    <text x="98" y="88" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1c1917" fontFamily="system-ui">say capital</text>
                    <rect x="168" y="72" width="65" height="24" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.5" />
                    <text x="200" y="88" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1c1917" fontFamily="system-ui">Texas</text>
                    {/* Bottom row */}
                    <rect x="25" y="130" width="55" height="22" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                    <text x="52" y="145" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1c1917" fontFamily="system-ui">capital</text>
                    <rect x="88" y="130" width="45" height="22" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                    <text x="110" y="145" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1c1917" fontFamily="system-ui">state</text>
                    <rect x="140" y="130" width="24" height="22" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" opacity="0.6" />
                    <text x="152" y="145" textAnchor="middle" fontSize="8" fill="#78716c" fontFamily="system-ui">of</text>
                    <rect x="175" y="130" width="50" height="22" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                    <text x="200" y="145" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1c1917" fontFamily="system-ui">Dallas</text>
                    <rect x="232" y="130" width="50" height="22" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" opacity="0.6" />
                    <text x="257" y="145" textAnchor="middle" fontSize="9" fill="#78716c" fontFamily="system-ui">city</text>
                  </svg>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="mb-8 flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-neutral-900 tracking-tight group-hover:text-black transition-colors">
                      Neurons as Concepts
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-500">
                      Interactive breakdown of how neural networks form abstractions, building up from raw pixels to recognizable thoughts.
                    </p>
                  </div>

                  <div className="flex items-center text-xs font-mono font-medium uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors mt-auto">
                    <span>Explore</span>
                    <svg className="w-3 h-3 ml-2 -translate-x-1 group-hover:translate-x-0 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3.33333 8H12.6667" />
                      <path d="M8 3.33333L12.6667 8L8 12.6667" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
