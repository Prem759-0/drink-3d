"use client";

import { useEffect, useRef, useCallback } from "react";
import { useScroll } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
  product: Product;
  onLoadComplete?: () => void;
}

function padNum(n: number, pad: number): string {
  return String(n).padStart(pad, "0");
}

export default function ProductBottleScroll({ product, onLoadComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Build frame URL
  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = index + 1;
      const padded = padNum(frameNum, product.framePad);
      return `${product.folderPath}/${product.framePrefix}${padded}.${product.frameExtension}`;
    },
    [product]
  );

  // Draw a specific frame to canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cW = canvas.width;
    const cH = canvas.height;
    const iW = img.naturalWidth;
    const iH = img.naturalHeight;

    // "cover" fit (fills entire screen)
    const scale = Math.max(cW / iW, cH / iH);
    const dW = iW * scale;
    const dH = iH * scale;
    const dx = (cW - dW) / 2;
    const dy = (cH - dH) / 2;

    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(img, dx, dy, dW, dH);
  }, []);

  // Resize canvas to fill its parent
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    imagesRef.current = [];
    loadedCountRef.current = 0;
    const total = product.totalFrames;

    for (let i = 0; i < total; i++) {
      const img = new window.Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loadedCountRef.current++;
        // Draw first frame as soon as it's ready
        if (i === 0) drawFrame(0);
        
        if (loadedCountRef.current === total) {
          onLoadComplete?.();
        }
      };
      img.onerror = () => {
        // Even if an image fails, we count it so we don't hang forever
        loadedCountRef.current++;
        if (loadedCountRef.current === total) {
          onLoadComplete?.();
        }
      };
      imagesRef.current[i] = img;
    }
  }, [product, getFrameUrl, drawFrame, onLoadComplete]);

  // Canvas resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Scroll to frame mapping
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const total = product.totalFrames;
      const rawFrame = Math.round(progress * (total - 1));
      const frameIndex = Math.max(0, Math.min(rawFrame, total - 1));

      if (frameIndex === currentFrameRef.current && isDrawingRef.current) return;
      currentFrameRef.current = frameIndex;

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      isDrawingRef.current = true;
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
        isDrawingRef.current = false;
      });
    });

    return () => {
      unsubscribe();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, product.totalFrames, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Sticky canvas viewport */}
      <div className="sticky top-0 w-full h-screen flex items-center justify-center canvas-container">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
