"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isPastCanvas, setIsPastCanvas] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // 500vh is the height of the ProductBottleScroll container.
    // The canvas ends when scroll reaches approx 5 * window.innerHeight.
    const canvasHeight = typeof window !== "undefined" ? window.innerHeight * 5 : 5000;
    setIsPastCanvas(latest > canvasHeight - 100);
  });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
      style={{
        backdropFilter: isPastCanvas ? "blur(20px)" : "none",
        WebkitBackdropFilter: isPastCanvas ? "blur(20px)" : "none",
        background: isPastCanvas ? "rgba(10,10,10,0.85)" : "transparent",
        borderBottom: isPastCanvas ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* Minimalist Lightning Logo */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 text-orange-500"
          >
            <path
              d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none text-white/50 mb-0.5">
              The Future
            </span>
            <span className="text-xl font-black uppercase tracking-tight leading-none text-white">
              RAW.
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-10">
          {["Juices", "Our Story", "Health Benefits", "Shop"].map((link) => (
            <button
              key={link}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          className="px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          Order Now
        </button>
      </div>
    </motion.nav>
  );
}
