/**
 * Source unique de vérité du portfolio.
 * Modifie ce fichier pour mettre le site à jour — aucun texte n'est codé en dur ailleurs.
 */

export const profile = {
  prenom: "Zakaria",
  nom: "ELORCHE",
  role: "Web Designer & Développeur Web",
  salutation: "Salut, moi c'est Zakaria 👋",
  accroche:
    "Web designer et développeur basé à Casablanca. Je conçois et développe des sites et applications web modernes, de la maquette au déploiement.",
  bio: "Créatif et polyvalent, je maîtrise les outils Adobe pour la création de visuels et d'interfaces modernes. J'ai une solide expérience dans la conception d'identités visuelles, de maquettes et de contenus graphiques adaptés aux supports web et print. Passionné par le développement web, j'interviens sur toute la chaîne de production d'un site ou d'une application.",
  ville: "Casablanca, Maroc",
  email: "elo.zakaria@gmail.com",
  telephone: "+212 664 170 000",
  cv: "/cv-zakaria-elorche.pdf",
};

export const liens = {
  github: "https://github.com/ezakariaa",
  site: "https://ezakariaa.github.io",
  linkedin: "https://www.linkedin.com/in/elozakaria",
  email: `mailto:${profile.email}`,
};

export const navigation = [
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#experience" },
  { label: "Compétences", href: "#competences" },
  { label: "Contact", href: "#contact" },
];

/** Configuration de la vitrine GitHub (dépôts récupérés en direct côté navigateur). */
export const github = {
  utilisateur: "ezakariaa",
  /** Dépôts ignorés dans la vitrine (exercices, tutoriels, profil, site du portfolio). */
  exclureNoms: [
    "ezakariaa",
    "ezakariaa.github.io",
    "OpenclassroomsProject",
    "FreeCodeCamp",
    "mlearn",
    "Exercices-Solutions",
    "AirBnB_clone_v2",
    "Fix_My_Code_Challenge",
    "binary_trees",
    "hello-world",
    "sorting_algorithms",
    "RSA-Factoring-Challenge",
    "simple_shell",
    "printf",
    "HackerRank",
    "zero_day",
    "Little-Projects",
    "Little-Games",
    "The-Maze-Project",
    "Git-ACP",
  ],
  /** Préfixes ignorés : toute la série d'exercices ALX et les tutoriels GitHub Skills. */
  exclurePrefixes: ["alx-", "skills-"],
};

export type Projet = {
  /** Nom exact du dépôt GitHub — sert de clé pour enrichir les données de l'API. */
  repo: string;
  /** Titre affiché si différent du nom du dépôt. */
  nom?: string;
  /** Description en français, prioritaire sur celle de GitHub. */
  description?: string;
  /** Icône affichée à côté du titre du projet. */
  icone?: string;
  /** Stack affichée ; à défaut le langage principal détecté par GitHub est utilisé. */
  stack?: string[];
  demo?: string;
  /** Année de repli si l'API GitHub est indisponible. */
  annee?: string;
};

/**
 * Projets mis en avant : toujours affichés, même si l'API GitHub est injoignable.
 * Les autres dépôts publics apparaissent automatiquement dès leur création.
 */
export const projets: Projet[] = [
  {
    repo: "sublimaroc",
    nom: "Sublimaroc",
    description:
      "Site vitrine de la marque Sublimaroc : présentation des services, identité visuelle et expérience de navigation moderne pour renforcer la présence en ligne.",
    stack: ["React", "TypeScript", "Firebase", "Design", "Web vitrine"],
    demo: "https://sublimaroc-580d3.firebaseapp.com/",
    annee: "2025",
  },
  {
    repo: "ZRadio",
    description:
      "Webradio personnelle : diffusion en continu de ma bibliothèque musicale hébergée sur mon PC, servie via localhost et Caddy. Interface responsive pensée pour l'écoute au long cours.",
    stack: ["HTML", "CSS", "JavaScript", "Caddy", "Auto-hébergé"],
    demo: "https://ezakariaa.github.io/ZRadio/",
    annee: "2026",
  },
  {
    repo: "AnimeBase",
    description:
      "Catalogue d'animés alimenté par l'API AniList : recherche, filtres par genre et format, et fiches détaillées dans une interface sombre.",
    stack: ["React", "TypeScript", "Express", "API AniList"],
    demo: "https://ezakariaa.github.io/AnimeBase/",
    annee: "2026",
  },
  {
    repo: "PAKU",
    description:
      "Lecteur de manga multi-format (PDF, CBZ, RAR, ZIP) avec gestion de bibliothèque locale et reprise de lecture.",
    stack: ["Python", "Desktop"],
    annee: "2026",
  },
  {
    repo: "Internet-Archive-Downloader",
    nom: "Internet Archive Downloader",
    description:
      "Outil de téléchargement par lots depuis Internet Archive : file d'attente, reprise et suivi de progression en temps réel.",
    stack: ["TypeScript", "Node.js"],
    demo: "https://ezakariaa.github.io/Internet-Archive-Downloader/",
    annee: "2026",
  },
  {
    repo: "MegaMix",
    description:
      "Organisation de bibliothèque musicale locale : tri automatique, métadonnées et création de playlists.",
    stack: ["TypeScript", "Node.js"],
    demo: "https://ezakariaa.github.io/MegaMix/",
    annee: "2025",
  },
  {
    repo: "KoraMeet",
    description:
      "« Meet players. Play anywhere. » — application de mise en relation entre joueurs de foot pour organiser des matchs.",
    stack: ["React", "Firebase"],
    annee: "2025",
  },
  {
    repo: "ToonsFlix",
    description:
      "Catalogue ToonTales pour parcourir les séries et épisodes par catégorie, consulter leurs fiches et retrouver rapidement un contenu grâce à la recherche. Interface responsive disponible en français et en anglais.",
    icone: "🎬",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    demo: "https://ezakariaa.github.io/ToonsFlix/",
    annee: "2026",
  },
];

export type SiteProjet = {
  nom: string;
  url: string;
  capture: string;
  description: string;
  technologies: string[];
};

export const sitesProjets: SiteProjet[] = [
  {
    nom: "RegExport Conseil",
    url: "https://regexport-conseil.fr/",
    capture: "/sites/regexport-conseil.jpg",
    description: "Conseil réglementaire pour l'export agroalimentaire hors UE.",
    technologies: ["Next.js", "React"],
  },
  {
    nom: "REC-CRM",
    url: "https://crm.regexport-conseil.fr/",
    capture: "/sites/rec-crm.jpg",
    description: "Espace de gestion et de suivi pour les équipes RegExport.",
    technologies: ["React", "JavaScript", "CSS"],
  },
  {
    nom: "HubExport",
    url: "https://hubexport.fr/",
    capture: "/sites/hubexport.jpg",
    description: "Plateforme de mise en relation des prestataires de l'export.",
    technologies: ["React", "JavaScript", "CSS"],
  },
  {
    nom: "Marwa Hajj Omra",
    url: "https://www.marwahajjomra.com/",
    capture: "/sites/marwa-hajj-omra.jpg",
    description: "Site de présentation de voyages Hajj et Omra.",
    technologies: ["Bootstrap", "jQuery", "JavaScript"],
  },
  {
    nom: "Sublimaroc",
    url: "http://sublimaroc.net",
    capture: "/sites/sublimaroc.jpg",
    description: "Site vitrine de Sublimaroc.",
    technologies: ["WordPress", "SeedProd"],
  },
];

export type Experience = {
  poste: string;
  entreprise: string;
  periode: string;
  actuel?: boolean;
  taches: string[];
};

export const experiences: Experience[] = [
  {
    poste: "Web Designer & Développeur Web — Freelance",
    entreprise: "SubliMaroc & OptiCode",
    periode: "2020 — Aujourd'hui",
    actuel: true,
    taches: [
      "Conception et développement de sites web : WordPress, HTML, CSS, React, Node.js, TypeScript, Firebase, PHP.",
      "Création de visuels et d'interfaces modernes.",
      "Déploiement et hébergement de projets.",
      "Installation, réparation et maintenance de systèmes informatiques.",
      "Formations en ligne et à distance.",
      "Impression de produits personnalisés.",
    ],
  },
  {
    poste: "Superviseur — Support technique N1/N2",
    entreprise: "MCall (compte Carrefour France)",
    periode: "Jan 2023 — Déc 2023",
    taches: [
      "Encadrer, motiver et développer une équipe de collaborateurs.",
      "Définir les objectifs individuels et collectifs et suivre leur réalisation.",
      "Assurer la formation continue et le coaching des collaborateurs.",
      "Assistance et soutien technique des conseillers.",
    ],
  },
  {
    poste: "Qualiticien",
    entreprise: "Umanis & CGI",
    periode: "Août 2016 — Oct 2022",
    taches: [
      "Suivi et analyse des conversations chat.",
      "Reprise des échanges conflictuels et complexes.",
      "Supervision et missions d'accompagnement individuel.",
      "Assistance et apport d'aide aux conseillers.",
    ],
  },
  {
    poste: "Chargé technique de clientèle — Bouygues Telecom",
    entreprise: "Groupe ActiCall",
    periode: "Mars 2015 — Oct 2015",
    taches: [
      "Analyser et formuler la demande du client.",
      "Conseil et assistance technique.",
      "Proposition et recherche de solutions.",
    ],
  },
];

export type GroupeCompetences = {
  titre: string;
  items: string[];
};

export const competences: GroupeCompetences[] = [
  {
    titre: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind", "Bootstrap"],
  },
  {
    titre: "Backend",
    items: ["Node.js", "Express", "PHP", "Python", "Firebase", "API REST"],
  },
  {
    titre: "Données & Outils",
    items: ["MySQL", "NoSQL", "Firestore", "Git", "GitHub", "Docker"],
  },
  {
    titre: "Design & Web",
    items: ["Suite Adobe", "Identité visuelle", "Maquettage", "Responsive", "SEO", "WordPress"],
  },
];

export type Formation = {
  intitule: string;
  ecole: string;
  annee: string;
};

export const formations: Formation[] = [
  {
    intitule: "Backend & Frontend — Software Engineering",
    ecole: "ALX",
    annee: "2024",
  },
  {
    intitule: "QHSE",
    ecole: "ENSEM — Casablanca",
    annee: "2014",
  },
  {
    intitule: "Informatique de Gestion",
    ecole: "INCIA — Khouribga",
    annee: "2004",
  },
  {
    intitule: "Automatisation & Instrumentation Industrielle",
    ecole: "ISTA-Khouribga",
    annee: "1999",
  },
  {
    intitule: "BAC Sciences Expérimentales",
    ecole: "Lycée Ibn Yassine — Khouribga",
    annee: "1996",
  },
];

export const langues = [
  { nom: "Arabe", niveau: "Langue maternelle", pourcentage: 100 },
  { nom: "Français", niveau: "Courant", pourcentage: 90 },
  { nom: "Anglais", niveau: "Intermédiaire", pourcentage: 60 },
];
