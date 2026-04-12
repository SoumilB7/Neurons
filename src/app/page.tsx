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

          {/* ——— Section: Understand ——— */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-400">Understand</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card: Neurons as Concepts */}
              <Link href="/neurons" className="group block h-full">
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col">
                  <div className="w-full bg-neutral-50 border-b border-neutral-100 px-5 py-5 flex items-center justify-center h-[160px]">
                    <svg viewBox="0 0 300 200" className="w-full h-auto" fill="none">
                      <defs>
                        <clipPath id="left-half">
                          <rect x="70" y="20" width="80" height="160" />
                        </clipPath>
                        <clipPath id="right-half">
                          <rect x="150" y="20" width="80" height="160" />
                        </clipPath>
                      </defs>
                      <g clipPath="url(#left-half)">
                        <circle cx="150" cy="100" r="72" fill="white" stroke="#d4d4d4" strokeWidth="1.5" />
                        <line x1="90" y1="55" x2="150" y2="55" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="90" y1="78" x2="150" y2="78" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="90" y1="100" x2="150" y2="100" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="90" y1="122" x2="150" y2="122" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="90" y1="145" x2="150" y2="145" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="100" y1="30" x2="100" y2="170" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="120" y1="30" x2="120" y2="170" stroke="#ececec" strokeWidth="0.6" />
                        <line x1="140" y1="30" x2="140" y2="170" stroke="#ececec" strokeWidth="0.6" />
                        <circle cx="120" cy="100" r="3" fill="#e5e5e5" />
                      </g>
                      <g clipPath="url(#right-half)">
                        <circle cx="150" cy="100" r="72" fill="white" stroke="#1c1917" strokeWidth="2" />
                        <path d="M150 100 C155 90, 158 75, 162 55 C164 42, 168 34, 175 28" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
                        <path d="M150 100 C156 95, 165 88, 180 78 C190 72, 200 65, 210 55" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M150 100 C158 105, 172 108, 188 108 C198 108, 208 105, 215 98" stroke="#1c1917" strokeWidth="2.2" strokeLinecap="round" />
                        <path d="M150 100 C155 112, 158 128, 162 142 C164 150, 168 156, 175 162" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
                        <path d="M150 100 C153 108, 155 118, 152 130" stroke="#44403c" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M175 28 C178 22, 184 18, 192 16" stroke="#44403c" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M175 28 C172 20, 168 15, 165 10" stroke="#44403c" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M162 55 C170 50, 178 52, 184 48" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M210 55 C216 48, 218 40, 222 35" stroke="#44403c" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M210 55 C218 58, 222 54, 228 50" stroke="#44403c" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M180 78 C188 80, 194 76, 200 78" stroke="#44403c" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M215 98 C220 92, 224 88, 230 86" stroke="#44403c" strokeWidth="1.4" strokeLinecap="round" />
                        <path d="M215 98 C222 102, 226 108, 228 115" stroke="#44403c" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M188 108 C194 115, 198 122, 200 130" stroke="#44403c" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M175 162 C180 165, 186 164, 192 160" stroke="#44403c" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M162 142 C168 145, 176 144, 182 140" stroke="#44403c" strokeWidth="1.2" strokeLinecap="round" />
                        <path d="M152 130 C148 140, 152 148, 155 155" stroke="#44403c" strokeWidth="1.1" strokeLinecap="round" />
                        <path d="M192 16 C196 12, 200 10, 205 10" stroke="#78716c" strokeWidth="1" strokeLinecap="round" />
                        <path d="M192 16 C194 20, 198 22, 203 21" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M184 48 C190 44, 196 45, 200 42" stroke="#78716c" strokeWidth="0.9" strokeLinecap="round" />
                        <path d="M222 35 C226 30, 230 28, 234 28" stroke="#78716c" strokeWidth="0.9" strokeLinecap="round" />
                        <path d="M228 50 C232 46, 236 46, 238 44" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M200 78 C204 82, 208 80, 212 78" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M230 86 C234 82, 236 80, 240 80" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M200 130 C204 136, 208 138, 212 136" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M192 160 C196 156, 200 155, 204 156" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" />
                        <path d="M182 140 C186 138, 190 140, 194 138" stroke="#78716c" strokeWidth="0.7" strokeLinecap="round" />
                        <circle cx="205" cy="10" r="3" fill="#1c1917" opacity="0.7" />
                        <circle cx="203" cy="21" r="2.2" fill="#44403c" opacity="0.6" />
                        <circle cx="165" cy="10" r="2.5" fill="#44403c" opacity="0.6" />
                        <circle cx="200" cy="42" r="2.5" fill="#44403c" opacity="0.6" />
                        <circle cx="234" cy="28" r="2.8" fill="#1c1917" opacity="0.65" />
                        <circle cx="238" cy="44" r="2" fill="#78716c" opacity="0.5" />
                        <circle cx="212" cy="78" r="2" fill="#78716c" opacity="0.5" />
                        <circle cx="240" cy="80" r="2.5" fill="#44403c" opacity="0.55" />
                        <circle cx="228" cy="115" r="2.5" fill="#44403c" opacity="0.55" />
                        <circle cx="212" cy="136" r="2.2" fill="#78716c" opacity="0.5" />
                        <circle cx="204" cy="156" r="2.5" fill="#44403c" opacity="0.55" />
                        <circle cx="194" cy="138" r="2" fill="#78716c" opacity="0.45" />
                        <circle cx="155" cy="155" r="2" fill="#78716c" opacity="0.45" />
                        <circle cx="192" cy="16" r="4" fill="#1c1917" opacity="0.08" />
                        <circle cx="222" cy="35" r="5" fill="#1c1917" opacity="0.06" />
                        <circle cx="215" cy="98" r="4" fill="#1c1917" opacity="0.06" />
                        <circle cx="175" cy="162" r="4.5" fill="#1c1917" opacity="0.07" />
                      </g>
                      <path d="M222 34 C230 26, 240 24, 250 22" stroke="#44403c" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
                      <circle cx="250" cy="22" r="2.5" fill="#44403c" opacity="0.4" />
                      <path d="M228 50 C236 48, 244 50, 250 48" stroke="#78716c" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
                      <circle cx="250" cy="48" r="1.8" fill="#78716c" opacity="0.3" />
                      <path d="M230 86 C238 84, 246 86, 254 84" stroke="#44403c" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                      <circle cx="254" cy="84" r="2" fill="#44403c" opacity="0.35" />
                      <path d="M228 115 C236 120, 242 118, 248 120" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                      <path d="M204 156 C210 160, 218 158, 224 160" stroke="#78716c" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
                      <circle cx="224" cy="160" r="1.8" fill="#78716c" opacity="0.3" />
                      <line x1="150" y1="26" x2="150" y2="174" stroke="#a3a3a3" strokeWidth="0.8" strokeDasharray="3 4" />
                    </svg>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold mb-2 text-neutral-900 tracking-tight group-hover:text-black transition-colors">
                      Neurons as Concepts
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-500 mb-4">
                      Interactive breakdown of how neural networks form abstractions, building up from raw pixels to recognizable thoughts.
                    </p>
                    <div className="flex items-center text-[10px] font-mono font-medium uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors mt-auto">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1.5 -translate-x-1 group-hover:translate-x-0 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.33333 8H12.6667" />
                        <path d="M8 3.33333L12.6667 8L8 12.6667" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Card: Why Compartmentalization */}
              <Link href="/compartmentalization" className="group block h-full">
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col">
                  <div className="w-full bg-neutral-50 border-b border-neutral-100 px-5 py-5 flex items-center justify-center h-[160px]">
                    <svg viewBox="0 0 300 170" className="w-full h-auto" fill="none">
                      <defs>
                        <marker id="cm-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#44403c" />
                        </marker>
                      </defs>
                      <rect x="20" y="30" width="110" height="110" rx="8" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="4 3" />
                      <rect x="38" y="50" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <rect x="38" y="85" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <rect x="82" y="67" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <line x1="74" y1="60" x2="82" y2="72" stroke="#44403c" strokeWidth="1.2" markerEnd="url(#cm-arrow)" />
                      <line x1="74" y1="95" x2="82" y2="82" stroke="#44403c" strokeWidth="1.2" markerEnd="url(#cm-arrow)" />
                      <text x="75" y="148" textAnchor="middle" fontSize="8" fill="#a3a3a3" fontFamily="system-ui" fontWeight="500">MODULE A</text>
                      <rect x="170" y="30" width="110" height="110" rx="8" fill="none" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="4 3" />
                      <rect x="188" y="50" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <rect x="188" y="85" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <rect x="232" y="67" width="36" height="20" rx="4" fill="#e7e5e4" stroke="#44403c" strokeWidth="1.2" />
                      <line x1="224" y1="60" x2="232" y2="72" stroke="#44403c" strokeWidth="1.2" markerEnd="url(#cm-arrow)" />
                      <line x1="224" y1="95" x2="232" y2="82" stroke="#44403c" strokeWidth="1.2" markerEnd="url(#cm-arrow)" />
                      <text x="225" y="148" textAnchor="middle" fontSize="8" fill="#a3a3a3" fontFamily="system-ui" fontWeight="500">MODULE B</text>
                      <path d="M118 77 Q150 60 170 72" stroke="#44403c" strokeWidth="1" opacity="0.35" strokeDasharray="3 3" markerEnd="url(#cm-arrow)" />
                    </svg>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold mb-2 text-neutral-900 tracking-tight group-hover:text-black transition-colors">
                      Why Compartmentalization
                    </h3>
                    <p className="text-xs leading-relaxed text-neutral-500 mb-4">
                      Why the brain splits itself into modules, and how we have learned to do the same thing inside neural networks.
                    </p>
                    <div className="flex items-center text-[10px] font-mono font-medium uppercase tracking-widest text-neutral-400 group-hover:text-neutral-900 transition-colors mt-auto">
                      <span>Explore</span>
                      <svg className="w-3 h-3 ml-1.5 -translate-x-1 group-hover:translate-x-0 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.33333 8H12.6667" />
                        <path d="M8 3.33333L12.6667 8L8 12.6667" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* ——— Section: Whats Happening ——— */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-400">Whats Happening</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            </div>
          </div>

          {/* ——— Section: Research ——— */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-400">Research</span>
              <span className="h-px flex-1 bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
