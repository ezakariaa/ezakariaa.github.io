"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { liens, sitesProjets } from "@/data/content";
import {
  chargerDepots,
  chargerTelechargementDerniereRelease,
  depotsDeSecours,
  optionsTri,
  trierDepots,
  type DepotAffiche,
  type Tri,
} from "@/lib/github";
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

function IconeFiltre() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

function IconeEtoile() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="m12 3.6 2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.87l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L12 3.6Z" />
    </svg>
  );
}

const formateurDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** « il y a 3 j », « il y a 2 mois »… à partir d'un timestamp. */
function formatRelatif(horodatage: number) {
  const jours = Math.round((Date.now() - horodatage) / 86_400_000);
  if (jours <= 0) return "aujourd'hui";
  if (jours === 1) return "hier";
  if (jours < 30) return `il y a ${jours} j`;
  const mois = Math.round(jours / 30);
  if (mois < 12) return `il y a ${mois} mois`;
  const annees = Math.round(mois / 12);
  return `il y a ${annees} an${annees > 1 ? "s" : ""}`;
}

export default function Projets() {
  const [depots, setDepots] = useState<DepotAffiche[]>(depotsDeSecours);
  const [enDirect, setEnDirect] = useState(false);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [telechargements, setTelechargements] = useState<Record<string, string>>({});
  const [tri, setTri] = useState<Tri>("maj");
  const [menuOuvert, setMenuOuvert] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Récupération côté navigateur : la liste suit GitHub sans redéploiement du site.
  useEffect(() => {
    const controleur = new AbortController();

    chargerDepots(controleur.signal)
      .then((resultat) => {
        setDepots(resultat);
        setEnDirect(true);
      })
      .catch((cause: unknown) => {
        if (controleur.signal.aborted) return;
        setErreur(
          cause instanceof Error && cause.message.includes("403")
            ? "Quota de l'API GitHub atteint — voici ma sélection."
            : "GitHub est injoignable — voici ma sélection.",
        );
      })
      .finally(() => {
        if (!controleur.signal.aborted) setChargement(false);
      });

    return () => controleur.abort();
  }, []);

  useEffect(() => {
    if (!menuOuvert) return;

    function surClic(evenement: MouseEvent) {
      if (!menuRef.current?.contains(evenement.target as Node)) setMenuOuvert(false);
    }
    function surTouche(evenement: KeyboardEvent) {
      if (evenement.key === "Escape") setMenuOuvert(false);
    }

    document.addEventListener("mousedown", surClic);
    document.addEventListener("keydown", surTouche);
    return () => {
      document.removeEventListener("mousedown", surClic);
      document.removeEventListener("keydown", surTouche);
    };
  }, [menuOuvert]);

  const depotsTries = useMemo(() => trierDepots(depots, tri), [depots, tri]);
  const depotsVisibles = useMemo(() => depotsTries.slice(0, 6), [depotsTries]);
  const labelTri = optionsTri.find((option) => option.valeur === tri)?.label ?? "";

  useEffect(() => {
    const controleur = new AbortController();

    Promise.all(
      depotsVisibles.map(async (depot) => {
        try {
          const url = await chargerTelechargementDerniereRelease(depot.repo, controleur.signal);
          return url ? ([depot.repo, url] as const) : null;
        } catch (cause) {
          if (!controleur.signal.aborted) {
            console.error(`Impossible de vérifier la dernière release de ${depot.repo}.`, cause);
          }
          return null;
        }
      }),
    ).then((resultats) => {
      if (controleur.signal.aborted) return;
      setTelechargements((existants) => ({
        ...existants,
        ...Object.fromEntries(resultats.filter((resultat) => resultat !== null)),
      }));
    });

    return () => controleur.abort();
  }, [depotsVisibles]);

  return (
    <section id="projets" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionTitle
        eyebrow="Projets & Dépôts GitHub"
        titre="Une sélection de ce que je construis"
        sousTitre="Des applications web et outils que je conçois, développe et déploie de bout en bout."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-faint" aria-live="polite">
          {erreur ??
            (chargement
              ? "Synchronisation avec GitHub…"
              : `${depotsVisibles.length} projet${depotsVisibles.length > 1 ? "s" : ""} affiché${
                  depotsVisibles.length > 1 ? "s" : ""
                } depuis GitHub`)}
        </p>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOuvert((ouvert) => !ouvert)}
            aria-haspopup="menu"
            aria-expanded={menuOuvert}
            aria-label={`Trier les projets — ${labelTri}`}
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-elevated px-3.5 py-2 text-sm text-muted transition-colors hover:border-violet-deep hover:text-white focus-visible:ring-2 focus-visible:ring-violet-glow focus-visible:outline-none"
          >
            <IconeFiltre />
            <span className="hidden sm:inline">{labelTri}</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
              className={`transition-transform ${menuOuvert ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {menuOuvert && (
            <div
              role="menu"
              className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-2xl shadow-black/50"
            >
              {optionsTri.map((option) => (
                <button
                  key={option.valeur}
                  type="button"
                  role="menuitemradio"
                  aria-checked={tri === option.valeur}
                  onClick={() => {
                    setTri(option.valeur);
                    setMenuOuvert(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-elevated ${
                    tri === option.valeur ? "text-violet-soft" : "text-muted"
                  }`}
                >
                  {option.label}
                  {tri === option.valeur && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {depotsVisibles.map((depot, i) => {
          return (
            <motion.article
              key={depot.repo}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-violet-deep"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-violet-glow/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Carte entièrement cliquable, sous les icônes */}
              <a
                href={depot.demo ?? depot.lien}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Ouvrir le projet ${depot.nom}`}
                className="absolute inset-0 z-10 rounded-2xl focus-visible:ring-2 focus-visible:ring-violet-glow focus-visible:outline-none"
              />

              <div className="relative flex items-start justify-between gap-4">
                <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
                  {depot.icone && <span aria-hidden="true">{depot.icone}</span>}
                  {depot.nom}
                </h3>
                <span className="shrink-0 text-xs text-faint">{depot.annee}</span>
              </div>

              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">
                {depot.description}
              </p>

              {depot.stack.length > 0 && (
                <div className="relative mt-6 flex flex-wrap items-center gap-2">
                  {depot.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-violet-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {enDirect && (
                <div className="relative mt-4 flex items-center gap-4 text-xs text-faint">
                  <span className="inline-flex items-center gap-1" title={`${depot.stars} étoile(s)`}>
                    <IconeEtoile />
                    {depot.stars}
                  </span>
                  <span title={`Mis à jour le ${formateurDate.format(depot.majLe)}`}>
                    Mis à jour {formatRelatif(depot.majLe)}
                  </span>
                </div>
              )}

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
                  {depot.demo && (
                    <a
                      href={depot.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={`Voir ${depot.nom} en ligne`}
                      aria-label={`Voir ${depot.nom} en ligne`}
                      className="flex size-9 items-center justify-center rounded-lg border border-line bg-elevated text-muted transition-colors hover:border-violet-deep hover:bg-violet-glow/10 hover:text-violet-soft"
                    >
                      <IconeGlobe />
                    </a>
                  )}
                  {telechargements[depot.repo] && (
                    <a
                      href={telechargements[depot.repo]}
                      target="_blank"
                      rel="noreferrer noopener"
                      title={`Télécharger la dernière version de ${depot.nom}`}
                      aria-label={`Télécharger la dernière version de ${depot.nom}`}
                      className="flex size-9 items-center justify-center rounded-lg border border-line bg-elevated text-muted transition-colors hover:border-violet-deep hover:bg-violet-glow/10 hover:text-violet-soft"
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <path d="m7 10 5 5 5-5M12 15V3" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={depot.lien}
                    target="_blank"
                    rel="noreferrer noopener"
                    title={`Code source de ${depot.nom} sur GitHub`}
                    aria-label={`Code source de ${depot.nom} sur GitHub`}
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

      <div className="mt-24">
        <SectionTitle
          eyebrow="Sites web"
          titre="Des projets en ligne"
          sousTitre="Quelques sites que j'ai conçus et développés."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {sitesProjets.map((site, index) => (
            <motion.article
              key={site.url}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
              className="group overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-violet-deep"
            >
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visiter le site ${site.nom}`}
                className="grid grid-cols-[minmax(100px,0.85fr)_minmax(0,1.15fr)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-glow"
              >
                <div className="relative min-h-40 overflow-hidden bg-elevated">
                  <Image
                    src={site.capture}
                    alt={`Capture d'écran du site ${site.nom}`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="min-w-0 self-center p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-white">{site.nom}</h3>
                    <span aria-hidden="true" className="text-violet-soft transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{site.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2" aria-label="Technologies utilisées">
                    {site.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-line bg-elevated px-2.5 py-1 text-xs text-violet-soft"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
