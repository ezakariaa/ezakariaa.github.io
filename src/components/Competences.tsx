"use client";

import { motion } from "framer-motion";
import { competences, langues } from "@/data/content";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Competences() {
  return (
    <section id="competences" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle
        eyebrow="Compétences"
        titre="Les outils que j'utilise au quotidien"
        sousTitre="Du maquettage sous Adobe jusqu'au déploiement en production."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {competences.map((groupe, i) => (
          <motion.div
            key={groupe.titre}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <h3 className="font-display text-lg font-semibold text-white">
              {groupe.titre}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {groupe.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-line bg-elevated px-3 py-1.5 text-sm text-muted transition-colors hover:border-violet-deep hover:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="font-display text-lg font-semibold text-white">Langues</h3>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {langues.map((langue, i) => (
            <div key={langue.nom}>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-white">
                  {langue.nom}
                </span>
                <span className="text-xs text-faint">{langue.niveau}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${langue.pourcentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-deep to-violet-soft"
                />
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
