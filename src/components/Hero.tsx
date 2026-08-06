"use client";

import { motion } from "framer-motion";
import { profile, liens, competences } from "@/data/content";

const badges = competences.flatMap((g) => g.items);

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] aurora" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/70 px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-glow opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-glow" />
          </span>
          Disponible pour de nouveaux projets
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-7 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {profile.salutation}
          <span className="mt-2 block bg-gradient-to-b from-violet-soft to-violet-deep bg-clip-text text-transparent">
            {profile.role}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.accroche}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="rounded-xl bg-violet-glow px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-transform hover:-translate-y-0.5 hover:bg-violet-deep"
          >
            Me contacter
          </a>
          <a
            href="#projets"
            className="rounded-xl border border-line bg-elevated px-6 py-3 text-sm font-medium text-white transition-colors hover:border-violet-deep hover:bg-surface"
          >
            Voir mes projets
          </a>
          <a
            href={liens.github}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-muted transition-colors hover:text-white"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      {/* Bandeau défilant des technologies */}
      <div className="marquee-mask relative mt-20 flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-3 pr-3">
          {[...badges, ...badges].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="rounded-full border border-line bg-elevated/60 px-4 py-2 text-sm whitespace-nowrap text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
