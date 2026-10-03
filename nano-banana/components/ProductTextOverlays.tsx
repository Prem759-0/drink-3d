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
  heroDetails?: { price: string; features: string[] };
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
      heroDetails: { price: product.price, features: product.features },
    },
    {
      ...product.section2,
      rangeIn: [0.22, 0.3],
      rangeOut: [0.42, 0.5],
      align: "left",
    },
    {
      ...product.section3,
      rangeIn: [0.44, 0.52],
      rangeOut: [0.64, 0.72],
      align: "right",
    },
    {
      ...product.section4,
      rangeIn: [0.66, 0.74],
      rangeOut: [0.9, 0.98],
      align: "left",
    },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 h-full pointer-events-none">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
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
    index === 0 
      ? [0, section.rangeOut[0], section.rangeOut[1]]
      : [section.rangeIn[0], section.rangeIn[1], section.rangeOut[0], section.rangeOut[1]],
    index === 0 
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, section.rangeOut[0], section.rangeOut[1]]
      : [section.rangeIn[0], section.rangeIn[1], section.rangeOut[0], section.rangeOut[1]],
    index === 0
      ? [0, 0, -40]
      : [40, 0, 0, -40]
  );

  const alignClass =
    section.align === "left"
      ? "items-start text-left pl-8 md:pl-20"
      : section.align === "right"
        ? "items-end text-right pr-8 md:pr-20"
        : "items-center text-center";

  const verticalPositions = [
    "justify-center",
    "justify-center",
    "justify-center",
    "justify-center",
  ];

  return (
    <div
      className={`absolute inset-0 flex flex-col ${verticalPositions[index]} ${alignClass}`}
      style={{ pointerEvents: "none" }}
    >
      <motion.div style={{ opacity, y }} className={index !== 0 ? "max-w-lg lg:max-w-xl" : ""}>
        <h2
          className={`font-black leading-tight tracking-tight mb-3 ${index === 0 ? "text-5xl md:text-6xl" : "text-4xl md:text-5xl"}`}
          style={{
            color: "#fff",
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          {section.title}
        </h2>
        {section.subtitle && (
          <p
            className={`${index === 0 ? "text-lg md:text-xl font-normal" : "text-sm md:text-base font-medium"} ${index === 0 ? "max-w-md mx-auto" : "max-w-sm"}`}
            style={{
              color: index === 0 ? "#fff" : "rgba(255,255,255,0.9)",
              textShadow: "0 2px 10px rgba(0,0,0,0.4)",
            }}
          >
            {section.subtitle}
          </p>
        )}

        {/* Hero Details (Price & Features) - Matches Image 1 */}
        {section.heroDetails && (
          <div className="mt-6 flex items-center justify-center gap-5">
            <span className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              {section.heroDetails.price}
            </span>
            <div className="w-[1px] h-12 bg-white/40" />
            <div className="flex flex-col gap-0.5 text-left">
              {section.heroDetails.features.map((feat, idx) => (
                <span key={idx} className="text-xs md:text-sm font-medium text-white/90">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
