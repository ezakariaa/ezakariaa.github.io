"use client";

import { motion } from "framer-motion";
import { projets, liens } from "@/data/content";
import SectionTitle from "./SectionTitle";

function IconeGlobe() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}

function IconeGithub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.35 9.35 0 0 1 5.01 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export default function Projets() {
  return (
    <section id="projets" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle
        eyebrow="Projets"
        titre="Une sélection de ce que je construis"
        sousTitre="Des applications web et outils que je conçois, développe et déploie de bout en bout."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {projets.map((projet, i) => {
          const lienPrincipal = projet.demo ?? projet.lien;

          return (
            <motion.article
              key={projet.nom}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet-deep"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-violet-glow/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Carte entièrement cliquable, sous les icônes */}
              <a
                href={lienPrincipal}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Ouvrir le projet ${projet.nom}`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-violet-glow focus-visible:outline-none"
              />

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

              <div className="relative mt-5 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
                  Voir le projet
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                {/* Icônes au-dessus de l'overlay pour rester cliquables séparément */}
                <div className="z-20 flex items-center gap-2">
                  {projet.demo && (
                    <a
                      href={projet.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={`Voir ${projet.nom} en ligne`}
                      aria-label={`Voir ${projet.nom} en ligne`}
                      className="flex size-9 items-center justify-center rounded-lg border border-line bg-elevated text-muted transition-colors hover:border-violet-deep hover:bg-violet-glow/10 hover:text-violet-soft"
                    >
                      <IconeGlobe />
                    </a>
                  )}
                  <a
                    href={projet.lien}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`Code source de ${projet.nom} sur GitHub`}
                    aria-label={`Code source de ${projet.nom} sur GitHub`}
                    className="flex size-9 items-center justify-center rounded-lg border border-line bg-elevated text-muted transition-colors hover:border-violet-deep hover:bg-violet-glow/10 hover:text-violet-soft"
                  >
                    <IconeGithub />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
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
