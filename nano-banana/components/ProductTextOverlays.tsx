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
      align: "center",
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
      </motion.div>
    </div>
  );
}
