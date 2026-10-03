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

  const product = products[currentIndex];

  // Reset scroll on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setQuantity(1);
    setAddedToCart(false);
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
              <ProductBottleScroll product={product} />
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

          {/* ===== PRODUCT DETAILS SECTION ===== */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left — Text */}
                <motion.div
                  variants={SLIDE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-[0.25em] mb-4 inline-block"
                    style={{ color: product.themeColor }}
                  >
                    The Story
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-white">
                    {product.detailsSection.title}
                  </h2>
                  <p className="text-white/60 text-lg leading-relaxed mb-10">
                    {product.detailsSection.description}
                  </p>
                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-3">
                    {product.features.map((f) => (
                      <span
                        key={f}
                        className="px-4 py-2 rounded-full text-sm font-semibold border"
                        style={{
                          borderColor: `${product.themeColor}50`,
                          color: product.themeColor,
                          background: `${product.themeColor}10`,
                        }}
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Right — Decorative visual card */}
                <motion.div
                  variants={SLIDE_UP}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="relative"
                >
                  <div
                    className="rounded-3xl p-10 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${product.themeColor}15 0%, transparent 60%)`,
                      border: `1px solid ${product.themeColor}20`,
                    }}
                  >
                    {/* Large title text as background element */}
                    <div
                      className="absolute -right-6 -bottom-6 text-[180px] font-black leading-none select-none pointer-events-none"
                      style={{ color: `${product.themeColor}08` }}
                    >
                      {product.id === "mango" ? "🥭" : product.id === "chocolate" ? "🍫" : "🍎"}
                    </div>
                    <div className="relative z-10">
                      <p
                        className="text-6xl font-black mb-4"
                        style={{ color: product.themeColor }}
                      >
                        {product.buyNowSection.price}
                      </p>
                      <p className="text-white/40 text-sm mb-8">{product.buyNowSection.unit}</p>
                      <div className="space-y-4">
                        {product.buyNowSection.processingParams.map((param) => (
                          <div key={param} className="flex items-center gap-3">
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background: product.themeColor }}
                            />
                            <span className="text-white/70 text-sm font-medium">{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ===== FRESHNESS SECTION ===== */}
          <section
            className="py-24 px-6"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${product.themeColor}08 50%, transparent 100%)`,
            }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                variants={SLIDE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-[0.25em] mb-4 inline-block"
                  style={{ color: product.themeColor }}
                >
                  Our Process
                </span>
                <h2 className="text-4xl md:text-6xl font-black leading-tight mb-6 text-white">
                  {product.freshnessSection.title}
                </h2>
                <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
                  {product.freshnessSection.description}
                </p>
              </motion.div>

              {/* Process steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    transition={{ delay: i * 0.1 }}
                    className="relative p-8 rounded-2xl text-left"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="text-5xl font-black mb-4 opacity-20"
                      style={{ color: product.themeColor }}
                    >
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== BUY NOW SECTION ===== */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                variants={SLIDE_UP}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.themeColor}20 0%, rgba(10,10,10,0.9) 60%)`,
                  border: `1px solid ${product.themeColor}25`,
                }}
              >
                {/* BG Blur blob */}
                <div
                  className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                  style={{ background: `${product.themeColor}15` }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  {/* Left */}
                  <div>
                    <span
                      className="text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-block"
                      style={{ color: product.themeColor }}
                    >
                      Order Now
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                      {product.name}
                    </h2>
                    <p className="text-white/50 mb-8">{product.subName}</p>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-8">
                      <span
                        className="text-6xl font-black"
                        style={{ color: product.themeColor }}
                      >
                        {product.buyNowSection.price}
                      </span>
                      <span className="text-white/40 text-sm">{product.buyNowSection.unit}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-white/60 text-sm font-medium">Quantity:</span>
                      <div
                        className="flex items-center gap-0 rounded-xl overflow-hidden border"
                        style={{ borderColor: "rgba(255,255,255,0.1)" }}
                      >
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 font-bold text-lg"
                        >
                          −
                        </button>
                        <span className="w-12 text-center text-white font-bold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-200 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleAddToCart}
                      className="w-full py-5 rounded-2xl text-base font-bold text-white relative overflow-hidden mb-4"
                      style={{
                        background: addedToCart
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : product.gradient,
                        boxShadow: addedToCart
                          ? "0 0 40px rgba(34,197,94,0.3)"
                          : `0 0 40px ${product.themeColor}40`,
                        transition: "background 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {addedToCart ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            ✓ Added to Cart!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            Add {quantity} to Cart — ₹{parseInt(product.buyNowSection.price.replace("₹", "")) * quantity}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <button className="w-full py-5 rounded-2xl text-base font-bold text-white border border-white/15 hover:border-white/30 transition-colors duration-200">
                      Subscribe & Save 20%
                    </button>
                  </div>

                  {/* Right — Delivery info */}
                  <div className="space-y-6">
                    {/* Processing tags */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/30 font-semibold mb-3">Processing</p>
                      <div className="flex flex-wrap gap-2">
                        {product.buyNowSection.processingParams.map((param) => (
                          <span
                            key={param}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold"
                            style={{
                              background: `${product.themeColor}15`,
                              color: product.themeColor,
                              border: `1px solid ${product.themeColor}30`,
                            }}
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Delivery */}
                    <div
                      className="p-5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🚚</span>
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">Delivery</p>
                          <p className="text-sm text-white/50 leading-relaxed">
                            {product.buyNowSection.deliveryPromise}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Returns */}
                    <div
                      className="p-5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🛡️</span>
                        <div>
                          <p className="text-sm font-semibold text-white mb-1">Guarantee</p>
                          <p className="text-sm text-white/50 leading-relaxed">
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
