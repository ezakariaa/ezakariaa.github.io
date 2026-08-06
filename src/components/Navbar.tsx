"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, profile } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-3xl rounded-2xl border transition-all duration-300 ${
          scrolled
            ? "border-line bg-surface/80 shadow-[0_8px_40px_-12px_rgba(139,92,246,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <a
            href="#top"
            className="font-display text-sm font-semibold tracking-tight text-white"
          >
            {profile.prenom}
            <span className="text-violet-soft">.</span>
          </a>

          <ul className="hidden items-center gap-1 sm:flex">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-xl bg-violet-glow px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-deep sm:inline-block"
            >
              Me contacter
            </a>
            <button
              type="button"
              onClick={() => setOuvert((v) => !v)}
              aria-label="Ouvrir le menu"
              aria-expanded={ouvert}
              className="rounded-lg border border-line p-2 text-white sm:hidden"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {ouvert ? (
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {ouvert && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-line px-4 sm:hidden"
            >
              {[...navigation, { label: "Me contacter", href: "#contact" }].map(
                (item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOuvert(false)}
                      className="block py-3 text-sm text-muted transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
