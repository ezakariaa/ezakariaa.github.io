"use client";

import { motion } from "framer-motion";
import { experiences, formations } from "@/data/content";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle
        eyebrow="Parcours"
        titre="Mon expérience"
        sousTitre="Du support technique à la supervision d'équipe, puis au design et au développement web en freelance."
      />

      <div className="relative border-l border-line pl-6 sm:pl-8">
        {experiences.map((exp, i) => (
          <motion.article
            key={`${exp.entreprise}-${exp.periode}`}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative pb-12 last:pb-0"
          >
            <span
              className={`absolute -left-[calc(1.5rem+5px)] top-2 size-2.5 rounded-full sm:-left-[calc(2rem+5px)] ${
                exp.actuel
                  ? "bg-violet-glow shadow-[0_0_0_4px_rgba(139,92,246,0.18)]"
                  : "bg-line"
              }`}
            />

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs tracking-wide text-violet-soft uppercase">
                {exp.periode}
              </span>
              {exp.actuel && (
                <span className="rounded-full border border-violet-deep bg-violet-glow/10 px-2 py-0.5 text-[11px] text-violet-soft">
                  En cours
                </span>
              )}
            </div>

            <h3 className="mt-2 font-display text-xl font-semibold text-white">
              {exp.poste}
            </h3>
            <p className="mt-1 text-sm text-faint">{exp.entreprise}</p>

            <ul className="mt-4 space-y-2">
              {exp.taches.map((tache) => (
                <li
                  key={tache}
                  className="flex gap-3 text-sm leading-relaxed text-muted"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-violet-deep" />
                  {tache}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="font-display text-lg font-semibold text-white">
          Formation
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {formations.map((f) => (
            <div
              key={f.intitule}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <span className="text-xs text-violet-soft">{f.annee}</span>
              <p className="mt-2 text-sm font-medium text-white">{f.intitule}</p>
              <p className="mt-1 text-sm text-faint">{f.ecole}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
