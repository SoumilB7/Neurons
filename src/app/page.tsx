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
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 h-full hover:shadow-lg hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col">
                <div className="mb-8 flex-grow">
                  <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 rounded-xl flex items-center justify-center mb-6 text-neutral-900 group-hover:scale-105 transition-transform duration-300">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="8" strokeDasharray="2 4" />
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                      <path d="M4 12 L9 12 M15 12 L20 12 M12 4 L12 9 M12 15 L12 20" opacity="0.5" />
                    </svg>
                  </div>
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
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
