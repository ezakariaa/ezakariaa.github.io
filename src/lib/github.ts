/**
 * Récupération en direct des dépôts publics GitHub.
 *
 * Le site est exporté en statique (GitHub Pages) : l'appel est donc fait côté
 * navigateur, ce qui garantit que la liste est à jour dès qu'un dépôt est créé,
 * sans avoir à redéployer le portfolio.
 */

import { github, projets, type Projet } from "@/data/content";

export type DepotAffiche = {
  repo: string;
  nom: string;
  description: string;
  stack: string[];
  lien: string;
  demo?: string;
  stars: number;
  /** Timestamps en millisecondes, pour un tri sans reparsing. */
  creeLe: number;
  majLe: number;
  annee: string;
  /** Projet listé manuellement dans content.ts : toujours affiché. */
  misEnAvant: boolean;
};

export type Tri = "maj" | "recent" | "stars";

export const optionsTri: { valeur: Tri; label: string }[] = [
  { valeur: "maj", label: "Mis à jour récemment" },
  { valeur: "recent", label: "Créés récemment" },
  { valeur: "stars", label: "Plus d'étoiles" },
];

type DepotApi = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  size: number;
};

const CLE_CACHE = "portfolio:depots:v2";
const DUREE_CACHE = 30 * 60 * 1000; // 30 min : évite de taper l'API à chaque visite.

const misEnAvantParRepo = new Map<string, Projet>(
  projets.map((p) => [p.repo.toLowerCase(), p]),
);

function urlDepot(repo: string) {
  return `https://github.com/${github.utilisateur}/${repo}`;
}

/** Un dépôt non listé manuellement n'apparaît que s'il ressemble à un vrai projet. */
function estPertinent(depot: DepotApi) {
  if (depot.fork || depot.archived || depot.size === 0) return false;
  if (github.exclureNoms.includes(depot.name)) return false;
  const nomMinuscule = depot.name.toLowerCase();
  return !github.exclurePrefixes.some((prefixe) => nomMinuscule.startsWith(prefixe));
}

function fusionner(depot: DepotApi): DepotAffiche {
  const manuel = misEnAvantParRepo.get(depot.name.toLowerCase());
  const stack =
    manuel?.stack ??
    [depot.language, ...(depot.topics ?? [])].filter((valeur): valeur is string => Boolean(valeur));
  const demo = manuel?.demo ?? (depot.homepage ? depot.homepage : undefined);

  return {
    repo: depot.name,
    nom: manuel?.nom ?? depot.name,
    description:
      manuel?.description ?? depot.description ?? "Code source disponible sur GitHub.",
    stack,
    lien: depot.html_url,
    demo,
    stars: depot.stargazers_count,
    creeLe: Date.parse(depot.created_at),
    majLe: Date.parse(depot.updated_at),
    annee: String(new Date(depot.created_at).getFullYear()),
    misEnAvant: manuel !== undefined,
  };
}

/** Liste de repli si l'API GitHub est injoignable ou le quota épuisé. */
export function depotsDeSecours(): DepotAffiche[] {
  return projets.map((projet, index) => {
    const annee = projet.annee ?? "";
    // Ordre du fichier conservé comme approximation de fraîcheur.
    const rang = projets.length - index;
    return {
      repo: projet.repo,
      nom: projet.nom ?? projet.repo,
      description: projet.description ?? "Code source disponible sur GitHub.",
      stack: projet.stack ?? [],
      lien: urlDepot(projet.repo),
      demo: projet.demo,
      stars: 0,
      creeLe: rang,
      majLe: rang,
      annee,
      misEnAvant: true,
    };
  });
}

export function trierDepots(depots: DepotAffiche[], tri: Tri): DepotAffiche[] {
  const copie = [...depots];
  copie.sort((a, b) => {
    if (tri === "stars" && b.stars !== a.stars) return b.stars - a.stars;
    if (tri === "recent") return b.creeLe - a.creeLe;
    // Défaut et départage des égalités d'étoiles : le plus récemment mis à jour.
    return b.majLe - a.majLe;
  });
  return copie;
}

function lireCache(): DepotAffiche[] | null {
  if (typeof window === "undefined") return null;

  try {
    const brut = window.localStorage.getItem(CLE_CACHE);
    if (!brut || brut.trim() === "") return null;

    const parsed = JSON.parse(brut) as {
      horodatage?: number;
      depots?: DepotAffiche[];
    };

    if (!parsed?.horodatage || !parsed?.depots) return null;
    if (Date.now() - parsed.horodatage > DUREE_CACHE) return null;
    return parsed.depots;
  } catch {
    return null;
  }
}

function ecrireCache(depots: DepotAffiche[]) {
  try {
    window.localStorage.setItem(
      CLE_CACHE,
      JSON.stringify({ horodatage: Date.now(), depots }),
    );
  } catch {
    // Stockage indisponible (navigation privée) : on ignore, le cache est optionnel.
  }
}

export async function chargerDepots(signal?: AbortSignal): Promise<DepotAffiche[]> {
  const cache = lireCache();
  if (cache) return cache;

  const reponse = await fetch(
    `https://api.github.com/users/${github.utilisateur}/repos?per_page=100&sort=updated`,
    { headers: { Accept: "application/vnd.github+json" }, signal },
  );
  if (!reponse.ok) throw new Error(`GitHub a répondu ${reponse.status}`);

  const bruts = (await reponse.json()) as DepotApi[];
  const depots = bruts
    .filter((depot) => misEnAvantParRepo.has(depot.name) || estPertinent(depot))
    .map(fusionner);

  ecrireCache(depots);
  return depots;
}
