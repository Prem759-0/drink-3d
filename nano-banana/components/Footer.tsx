"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 3C10 3 4 9 4 18C4 24 7 29 12 31.5C14 25 15 20 14 15C13.5 12 15 9 18 8C21 7 24 8.5 25 11C26.5 14 25 18 22 20C20 21.5 17 22 15 23.5L20 33C25 31 32 26 32 18C32 9 26 3 18 3Z"
                  fill="url(#footerLogoGrad)"
                />
                <path d="M20 11L15 20H19L14 29L24 16H20L25 11Z" fill="white" fillOpacity="0.9" />
              </svg>
              <span
                className="text-lg font-black"
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
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              The future of freshness. Cold-pressed, never heated. Pure fruit, pure life.
            </p>
            <div className="flex gap-4">
              {["instagram", "twitter", "youtube"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, color: "#f97316" }}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-orange-500/50 transition-colors duration-300"
                >
                  <span className="text-xs uppercase font-bold">{social[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Shop</h4>
            <ul className="space-y-3">
              {["Cream Mango", "Dutch Chocolate", "Ruby Pomegranate", "Bundle Packs", "Subscriptions"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3">
              {["Track Your Order", "FAQs", "Shipping Policy", "Return Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <motion.a
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white/80 uppercase tracking-widest mb-5">Stay Fresh</h4>
            <p className="text-sm text-white/50 mb-4">
              Get exclusive drops and wellness tips delivered weekly.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 transition-colors duration-200"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #f97316, #ec4899)" }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} Nano Banana. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">Made with</span>
            <span className="text-orange-500">♥</span>
            <span className="text-xs text-white/30">in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
