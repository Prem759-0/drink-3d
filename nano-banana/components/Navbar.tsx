"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsAtTop(latest < 60);

    if (latest > 60) {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 250); // wait 250ms after scroll stops
    } else {
      setIsScrolling(false);
    }
  });

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: isScrolling ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      style={{
        pointerEvents: isScrolling ? "none" : "auto",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: isAtTop
          ? "rgba(10,10,10,0.2)"
          : "rgba(10,10,10,0.85)",
        borderBottom: isAtTop
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          {/* SVG Logo */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0"
          >
            <defs>
              <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {/* Banana-lightning hybrid */}
            <path
              d="M18 3C10 3 4 9 4 18C4 24 7 29 12 31.5C14 25 15 20 14 15C13.5 12 15 9 18 8C21 7 24 8.5 25 11C26.5 14 25 18 22 20C20 21.5 17 22 15 23.5L20 33C25 31 32 26 32 18C32 9 26 3 18 3Z"
              fill="url(#logoGrad)"
            />
            <path
              d="M20 11L15 20H19L14 29L24 16H20L25 11Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
          <span
            className="text-xl font-black tracking-tight"
            style={{
              background: "linear-gradient(90deg, #f97316, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nano Banana
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Products", "Story", "Science"].map((link) => (
            <button
              key={link}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f97316, #ec4899)",
          }}
        >
          <span className="relative z-10">Order Now</span>
          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #f97316, #ec4899)",
              filter: "blur(12px)",
              opacity: 0,
            }}
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </motion.nav>
  );
}
