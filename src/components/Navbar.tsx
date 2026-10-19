"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation, profile } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function basculerTheme() {
    const suivant = theme === "dark" ? "light" : "dark";
    setTheme(suivant);
    document.documentElement.dataset.theme = suivant;
    try {
      window.localStorage.setItem("portfolio-theme", suivant);
    } catch {
      // Le thème reste actif pour la session même si le stockage est indisponible.
    }
  }

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
                  className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-elevated/60 hover:text-white"
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
              onClick={basculerTheme}
              aria-label={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
              aria-pressed={theme === "light"}
              title={`Activer le thème ${theme === "dark" ? "clair" : "sombre"}`}
              className="flex size-10 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:bg-elevated hover:text-white focus-visible:ring-2 focus-visible:ring-violet-glow focus-visible:outline-none"
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
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
