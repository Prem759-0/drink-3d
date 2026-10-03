"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
  product: Product;
}

interface TextSection {
  title: string;
  subtitle: string;
  rangeIn: [number, number];
  rangeOut: [number, number];
  align: "left" | "right" | "center";
  features?: string[];
  stats?: { label: string; val: string }[];
  buyNow?: Product["buyNowSection"];
}

export default function ProductTextOverlays({ product }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const sections: TextSection[] = [
    {
      ...product.section1,
      rangeIn: [0, 0.08],
      rangeOut: [0.2, 0.28],
      align: "center",
    },
    {
      ...product.section2,
      rangeIn: [0.22, 0.3],
      rangeOut: [0.42, 0.5],
      align: "left",
      features: product.features,
    },
    {
      ...product.section3,
      rangeIn: [0.44, 0.52],
      rangeOut: [0.64, 0.72],
      align: "right",
      stats: product.stats,
    },
    {
      ...product.section4,
      rangeIn: [0.66, 0.74],
      rangeOut: [0.9, 0.98],
      align: "center",
      buyNow: product.buyNowSection,
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 h-full pointer-events-none">
      {sections.map((section, i) => (
        <TextOverlay
          key={i}
          section={section}
          scrollYProgress={scrollYProgress}
          themeColor={product.themeColor}
          index={i}
        />
      ))}
    </div>
  );
}

function TextOverlay({
  section,
  scrollYProgress,
  themeColor,
  index,
}: {
  section: TextSection;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  themeColor: string;
  index: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [section.rangeIn[0], section.rangeIn[1], section.rangeOut[0], section.rangeOut[1]],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [section.rangeIn[0], section.rangeIn[1], section.rangeOut[0], section.rangeOut[1]],
    [40, 0, 0, -40]
  );

  const alignClass =
    section.align === "left"
      ? "items-start text-left pl-8 md:pl-20"
      : section.align === "right"
      ? "items-end text-right pr-8 md:pr-20"
      : "items-center text-center";

  const verticalPositions = [
    "justify-center",
    "justify-end pb-32",
    "justify-end pb-32",
    "justify-center",
  ];

  return (
    <div
      className={`absolute inset-0 flex flex-col ${verticalPositions[index]} ${alignClass}`}
      style={{ pointerEvents: "none" }}
    >
      <motion.div style={{ opacity, y }}>
        <h2
          className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-4"
          style={{
            color: "#fff",
            textShadow: `0 0 40px ${themeColor}80, 0 4px 30px rgba(0,0,0,0.5)`,
          }}
        >
          {section.title}
        </h2>
        {section.subtitle && (
          <p
            className="text-lg md:text-xl font-medium max-w-md"
            style={{
              color: "rgba(255,255,255,0.75)",
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {section.subtitle}
          </p>
        )}

        {/* Features List */}
        {section.features && (
          <div className="mt-8 flex flex-col gap-4">
            {section.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div 
                  className="w-3 h-3 rounded-full shadow-lg" 
                  style={{ backgroundColor: themeColor, boxShadow: `0 0 15px ${themeColor}` }} 
                />
                <span className="text-xl md:text-2xl text-white font-semibold tracking-wide drop-shadow-md">
                  {feat}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        {section.stats && (
          <div className="mt-10 flex flex-wrap gap-4">
            {section.stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center py-4 px-6 rounded-2xl" 
                style={{ 
                  background: "rgba(0,0,0,0.5)", 
                  backdropFilter: "blur(12px)", 
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
                }}
              >
                <span className="text-4xl md:text-5xl font-black mb-1" style={{ color: themeColor }}>
                  {stat.val}
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-white/70 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Buy Now Section */}
        {section.buyNow && (
          <div className="mt-12 flex flex-col items-center">
            <div className="text-4xl font-black mb-2">{section.buyNow.price} <span className="text-xl text-white/60 font-medium">{section.buyNow.unit}</span></div>
            <div className="flex gap-3 mb-6">
              {section.buyNow.processingParams.map((param, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide" style={{ border: `1px solid ${themeColor}80`, color: themeColor }}>
                  {param}
                </span>
              ))}
            </div>
            <button 
              className="px-10 py-4 rounded-full text-xl font-bold transition-transform hover:scale-105 active:scale-95"
              style={{ background: themeColor, color: "#fff", boxShadow: `0 10px 30px ${themeColor}80` }}
            >
              Add to Cart
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
