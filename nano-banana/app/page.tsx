"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PAGE_VARIANTS = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_CURVE } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.35, ease: EASE_CURVE } },
};

const SLIDE_UP = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_CURVE },
  },
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const product = products[currentIndex];

  // Reset scroll and loading state on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setQuantity(1);
    setAddedToCart(false);
    setIsLoaded(false);
  }, [currentIndex]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, products.length - 1)));
  }, []);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <main
      className="relative min-h-screen"
      style={{ background: "#0a0a0a" }}
    >
      {/* Global Loader Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="global-loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_CURVE }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-orange-500 mb-6"
              >
                <path
                  d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-2">
                Loading
              </span>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                The Future Raw.
              </span>
            </div>
            
            {/* Progress Bar Track */}
            <div className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-white/50 rounded-full"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glow that changes with product */}
      <AnimatePresence>
        <motion.div
          key={product.id + "-bg"}
          className="fixed inset-0 pointer-events-none z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 20%, ${product.themeColor}18 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          variants={PAGE_VARIANTS}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative z-10"
        >
          {/* ===== HERO SCROLL SECTION ===== */}
          <section className="relative">
            {/* Scroll container with canvas */}
            <div className="relative">
              <ProductBottleScroll 
                product={product} 
                onLoadComplete={() => setIsLoaded(true)}
              />
              {/* Text overlays absolutely positioned over the scroll area */}
              <div className="absolute inset-0 h-full">
                <ProductTextOverlays product={product} />
              </div>
            </div>

            {/* Stats strip at the bottom of the scroll section */}
            <motion.div
              variants={SLIDE_UP}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative z-20 -mt-1 py-12 border-t border-white/5"
              style={{
                background: "rgba(10,10,10,0.95)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="max-w-4xl mx-auto px-6">
                <div className="grid grid-cols-3 gap-8">
                  {product.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div
                        className="text-5xl font-black mb-1"
                        style={{ color: product.themeColor }}
                      >
                        {stat.val}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ===== PREMIUM STORY SECTION ===== */}
          <section className="py-20 lg:py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                {/* Left — Text */}
                <motion.div
                  variants={SLIDE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="lg:col-span-7"
                >
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="h-[1px] w-8 md:w-12" style={{ background: product.themeColor }} />
                    <span
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em]"
                      style={{ color: product.themeColor }}
                    >
                      The Story
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 md:mb-8 text-white tracking-tight">
                    {product.detailsSection.title}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 font-medium max-w-2xl">
                    {product.detailsSection.description}
                  </p>
                  
                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-3 md:gap-4">
                    {product.features.map((f) => (
                      <div
                        key={f}
                        className="px-5 py-2.5 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold flex items-center gap-2 md:gap-3 transition-transform hover:scale-105"
                        style={{
                          border: "1px solid rgba(255,255,255,0.08)",
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <span style={{ color: product.themeColor }}>✦</span>
                        <span className="text-white/90">{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right — Glassmorphic Visual Card */}
                <motion.div
                  variants={SLIDE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-5 relative mt-8 lg:mt-0"
                >
                  <div
                    className="absolute inset-0 blur-[80px] lg:blur-[100px] opacity-40 rounded-full"
                    style={{ background: product.themeColor }}
                  />
                  <div
                    className="rounded-[2rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-14 relative overflow-hidden backdrop-blur-xl"
                    style={{
                      background: "rgba(20,20,20,0.4)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div
                      className="absolute -right-10 -bottom-10 text-[150px] lg:text-[200px] font-black leading-none select-none pointer-events-none opacity-20 rotate-[-15deg]"
                    >
                      {product.id === "mango" ? "🥭" : product.id === "chocolate" ? "🍫" : "🍎"}
                    </div>
                    <div className="relative z-10">
                      <p className="text-xs lg:text-sm uppercase tracking-widest text-white/50 mb-2 font-bold">Premium Quality</p>
                      <p
                        className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 lg:mb-4 tracking-tighter"
                        style={{ color: "#fff" }}
                      >
                        {product.buyNowSection.price}
                      </p>
                      <p className="text-white/60 text-sm lg:text-base mb-8 lg:mb-10 font-medium">{product.buyNowSection.unit}</p>
                      
                      <div className="space-y-4 lg:space-y-5">
                        {product.buyNowSection.processingParams.map((param) => (
                          <div key={param} className="flex items-center gap-3 lg:gap-4">
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: product.themeColor, boxShadow: `0 0 10px ${product.themeColor}` }}
                            />
                            <span className="text-white/80 text-xs lg:text-sm font-semibold tracking-wide uppercase">{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ===== PREMIUM FRESHNESS SECTION ===== */}
          <section className="py-20 lg:py-32 px-6 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                variants={SLIDE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-16 lg:mb-20"
              >
                <span
                  className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4 inline-block"
                  style={{ color: product.themeColor }}
                >
                  Our Process
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight mb-4 md:mb-6 text-white tracking-tight">
                  {product.freshnessSection.title}
                </h2>
                <p className="text-white/60 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                  {product.freshnessSection.description}
                </p>
              </motion.div>

              {/* Process steps - Premium Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                {[
                  { step: "01", title: "Harvest", desc: "Sourced at peak ripeness from certified farms" },
                  { step: "02", title: "Press", desc: "Cold-pressed within hours to lock in nutrients" },
                  { step: "03", title: "Bottle", desc: "HPP treated and sealed for maximum freshness" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    variants={SLIDE_UP}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative p-8 lg:p-12 rounded-[1.5rem] lg:rounded-[2rem] text-left overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
                    style={{
                      background: "rgba(25,25,25,0.4)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    {/* Hover Glow */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at top right, ${product.themeColor}, transparent 70%)` }}
                    />
                    
                    <div
                      className="text-6xl md:text-7xl lg:text-8xl font-black mb-4 lg:mb-6 transition-colors duration-500"
                      style={{ 
                        color: "transparent", 
                        WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                      }}
                    >
                      {item.step}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 lg:mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-white/50 text-sm lg:text-base font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== PREMIUM BUY NOW SECTION ===== */}
          <section className="py-20 lg:py-32 px-6 relative">
            <div className="max-w-6xl mx-auto">
              <motion.div
                variants={SLIDE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-[2rem] lg:rounded-[3rem] p-6 md:p-12 lg:p-20 relative overflow-hidden"
                style={{
                  background: "rgba(15,15,15,0.8)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 80px rgba(0,0,0,0.8)",
                  backdropFilter: "blur(40px)",
                }}
              >
                {/* BG Ambient Glow */}
                <div
                  className="absolute top-0 right-0 w-[400px] lg:w-[800px] h-[400px] lg:h-[800px] rounded-full blur-[80px] lg:blur-[120px] pointer-events-none opacity-20 translate-x-1/3 -translate-y-1/3"
                  style={{ background: product.themeColor }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Left: Purchase Interface */}
                  <div className="lg:col-span-7">
                    <span
                      className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-4 inline-block"
                      style={{ color: product.themeColor }}
                    >
                      Order Now
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 lg:mb-4 tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-white/60 text-lg lg:text-xl font-medium mb-8 lg:mb-10">{product.subName}</p>

                    {/* Price */}
                    <div className="flex items-end gap-3 lg:gap-4 mb-8 lg:mb-10">
                      <span className="text-5xl md:text-6xl lg:text-7xl font-black leading-none text-white tracking-tighter">
                        {product.buyNowSection.price}
                      </span>
                      <span className="text-white/40 text-sm lg:text-base font-medium mb-1 lg:mb-2">{product.buyNowSection.unit}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 lg:gap-6 mb-8 lg:mb-10">
                      <span className="text-white/50 text-xs lg:text-sm font-bold uppercase tracking-widest">Quantity</span>
                      <div
                        className="flex items-center rounded-full overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)" }}
                      >
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors font-bold text-lg lg:text-xl"
                        >
                          −
                        </button>
                        <span className="w-10 lg:w-12 text-center text-white font-bold text-base lg:text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors font-bold text-lg lg:text-xl"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3 lg:space-y-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddToCart}
                        className="w-full py-4 lg:py-5 rounded-full text-xs lg:text-sm font-bold uppercase tracking-[0.1em] text-white relative overflow-hidden"
                        style={{
                          background: addedToCart
                            ? "linear-gradient(135deg, #22c55e, #16a34a)"
                            : product.gradient,
                          boxShadow: addedToCart
                            ? "0 10px 30px rgba(34,197,94,0.3)"
                            : `0 10px 30px ${product.themeColor}40`,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {addedToCart ? (
                            <motion.span key="added" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                              ✓ Added to Cart
                            </motion.span>
                          ) : (
                            <motion.span key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                              Add {quantity} to Cart — ₹{parseInt(product.buyNowSection.price.replace("₹", "")) * quantity}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                      <button 
                        className="w-full py-4 lg:py-5 rounded-full text-xs lg:text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-white/5"
                        style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        Subscribe & Save 20%
                      </button>
                    </div>
                  </div>

                  {/* Right: Info Panels */}
                  <div className="lg:col-span-5 space-y-3 lg:space-y-4">
                    {/* Processing */}
                    <div className="p-6 lg:p-8 rounded-[1.5rem] lg:rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-3 lg:mb-4">Processing</p>
                      <div className="flex flex-wrap gap-2">
                        {product.buyNowSection.processingParams.map((param) => (
                          <span
                            key={param}
                            className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold uppercase tracking-wider text-white"
                            style={{ background: "rgba(255,255,255,0.08)" }}
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="p-6 lg:p-8 rounded-[1.5rem] lg:rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-start gap-3 lg:gap-4">
                        <span className="text-xl lg:text-2xl grayscale opacity-70">🚚</span>
                        <div>
                          <p className="text-xs lg:text-sm font-bold text-white mb-1 lg:mb-2 uppercase tracking-wide">Delivery</p>
                          <p className="text-xs lg:text-sm text-white/50 leading-relaxed font-medium">
                            {product.buyNowSection.deliveryPromise}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Guarantee */}
                    <div className="p-6 lg:p-8 rounded-[1.5rem] lg:rounded-3xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-start gap-3 lg:gap-4">
                        <span className="text-xl lg:text-2xl grayscale opacity-70">🛡️</span>
                        <div>
                          <p className="text-xs lg:text-sm font-bold text-white mb-1 lg:mb-2 uppercase tracking-wide">Guarantee</p>
                          <p className="text-xs lg:text-sm text-white/50 leading-relaxed font-medium">
                            {product.buyNowSection.returnPolicy}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ===== NEXT FLAVOR CTA ===== */}
          {currentIndex < products.length - 1 && (
            <section className="py-12 px-6 mb-4">
              <div className="max-w-5xl mx-auto">
                <motion.button
                  onClick={() => goTo(currentIndex + 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  variants={SLIDE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative w-full py-10 overflow-hidden group"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 97% 100%, 3% 100%)",
                    background: products[currentIndex + 1].gradient,
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                  <div className="relative z-10 flex items-center justify-between px-12">
                    <div className="text-left">
                      <p className="text-white/60 text-sm font-medium mb-1 uppercase tracking-widest">
                        Next Flavor
                      </p>
                      <p className="text-3xl md:text-5xl font-black text-white">
                        {products[currentIndex + 1].name}
                      </p>
                    </div>
                    <div className="text-white">
                      <svg
                        className="w-10 h-10 group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>

      <Footer />

      {/* ===== FIXED LEFT/RIGHT ARROWS ===== */}
      {currentIndex > 0 && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo(currentIndex - 1)}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
          }}
          aria-label="Previous flavor"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
      )}

      {currentIndex < products.length - 1 && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goTo(currentIndex + 1)}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `${product.themeColor}20`,
            border: `1px solid ${product.themeColor}30`,
            backdropFilter: "blur(12px)",
          }}
          aria-label="Next flavor"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      )}

      {/* ===== FIXED BOTTOM PILL MENU ===== */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-full"
          style={{
            background: "rgba(10,10,10,0.85)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          {products.map((p, i) => (
            <button
              key={p.id}
              id={`flavor-btn-${p.id}`}
              onClick={() => goTo(i)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
              style={{
                background: i === currentIndex ? `${p.themeColor}25` : "transparent",
                border: i === currentIndex ? `1px solid ${p.themeColor}40` : "1px solid transparent",
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-300"
                style={{
                  background: p.themeColor,
                  boxShadow: i === currentIndex ? `0 0 8px ${p.themeColor}` : "none",
                  transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
              <span
                className="text-xs font-semibold transition-colors duration-300 hidden sm:block"
                style={{ color: i === currentIndex ? p.themeColor : "rgba(255,255,255,0.4)" }}
              >
                {p.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
