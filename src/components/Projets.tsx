"use client";

import { motion } from "framer-motion";
import { projets, liens } from "@/data/content";
import SectionTitle from "./SectionTitle";

export default function Projets() {
  return (
    <section id="projets" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle
        eyebrow="Projets"
        titre="Une sélection de ce que je construis"
        sousTitre="Des applications web et outils que je conçois, développe et déploie de bout en bout."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {projets.map((projet, i) => (
          <motion.a
            key={projet.nom}
            href={projet.demo ?? projet.lien}
            target="_blank"
            rel="noreferrer noopener"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet-deep"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-violet-glow/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-white">
                {projet.nom}
              </h3>
              <span className="shrink-0 text-xs text-faint">{projet.annee}</span>
            </div>

            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
              {projet.description}
            </p>

            <div className="relative mt-6 flex flex-wrap items-center gap-2">
              {projet.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-violet-soft"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
              Voir le projet
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={liens.github}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-block rounded-xl border border-line bg-elevated px-6 py-3 text-sm font-medium text-white transition-colors hover:border-violet-deep"
        >
          Tous mes dépôts sur GitHub ↗
        </a>
      </div>
    </section>
  );
}
