"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center px-6">
        <Link href="/" className="flex items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.9}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="8" x2="16" y2="6" />
              <line x1="16" y1="6" x2="24" y2="10" />
              <line x1="8" y1="8" x2="9" y2="22" />
              <line x1="8" y1="8" x2="18" y2="16" />
              <line x1="16" y1="6" x2="18" y2="16" />
              <line x1="24" y1="10" x2="18" y2="16" />
              <line x1="18" y1="16" x2="25" y2="24" />
              <line x1="9" y1="22" x2="14" y2="26" />
              <line x1="14" y1="26" x2="25" y2="24" />
              <circle cx="8" cy="8" r="1.6" fill="currentColor" />
              <circle cx="16" cy="6" r="1.6" fill="currentColor" />
              <circle cx="24" cy="10" r="1.6" fill="currentColor" />
              <circle cx="9" cy="22" r="1.6" fill="currentColor" />
              <circle cx="18" cy="16" r="1.9" fill="currentColor" />
              <circle cx="25" cy="24" r="1.6" fill="currentColor" />
              <circle cx="14" cy="26" r="1.6" fill="currentColor" />
            </svg>
          </div>
        </Link>
      </div>
    </motion.header>
  );
}
