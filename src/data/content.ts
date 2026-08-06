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
  linkedin: "https://www.linkedin.com/in/",
  email: `mailto:${profile.email}`,
};

export const navigation = [
  { label: "Projets", href: "#projets" },
  { label: "Parcours", href: "#experience" },
  { label: "Compétences", href: "#competences" },
  { label: "Contact", href: "#contact" },
];

export type Projet = {
  nom: string;
  description: string;
  stack: string[];
  lien: string;
  demo?: string;
  annee: string;
};

export const projets: Projet[] = [
  {
    nom: "ZRadio",
    description:
      "Webradio personnelle : diffusion en continu de ma bibliothèque musicale hébergée sur mon PC, servie via localhost et Caddy. Interface responsive pensée pour l'écoute au long cours.",
    stack: ["HTML", "CSS", "JavaScript", "Caddy", "Auto-hébergé"],
    lien: "https://github.com/ezakariaa/ZRadio",
    demo: "https://ezakariaa.github.io/ZRadio/",
    annee: "2026",
  },
  {
    nom: "ToonsFlix",
    description:
      "Plateforme de streaming dédiée à l'animation : catalogue, fiches détaillées et navigation fluide dans une UI sombre.",
    stack: ["React", "TypeScript", "API REST"],
    lien: "https://github.com/ezakariaa/ToonsFlix",
    annee: "2026",
  },
  {
    nom: "PAKU",
    description:
      "Lecteur de manga multi-format (PDF, CBZ, RAR, ZIP) avec gestion de bibliothèque locale et reprise de lecture.",
    stack: ["Python", "Desktop"],
    lien: "https://github.com/ezakariaa/PAKU",
    annee: "2026",
  },
  {
    nom: "Internet Archive Downloader",
    description:
      "Outil de téléchargement par lots depuis Internet Archive : file d'attente, reprise et suivi de progression en temps réel.",
    stack: ["TypeScript", "Node.js"],
    lien: "https://github.com/ezakariaa/Internet-Archive-Downloader",
    demo: "https://ezakariaa.github.io/Internet-Archive-Downloader/",
    annee: "2026",
  },
  {
    nom: "MegaMix",
    description:
      "Organisation de bibliothèque musicale locale : tri automatique, métadonnées et création de playlists.",
    stack: ["TypeScript", "Node.js"],
    lien: "https://github.com/ezakariaa/MegaMix",
    demo: "https://ezakariaa.github.io/MegaMix/",
    annee: "2025",
  },
  {
    nom: "KoraMeet",
    description:
      "« Meet players. Play anywhere. » — application de mise en relation entre joueurs de foot pour organiser des matchs.",
    stack: ["React", "Firebase"],
    lien: "https://github.com/ezakariaa/KoraMeet",
    annee: "2025",
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
      "Création de visuels, d'animations et d'interfaces modernes.",
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
];

export const langues = [
  { nom: "Arabe", niveau: "Langue maternelle", pourcentage: 100 },
  { nom: "Français", niveau: "Courant", pourcentage: 90 },
  { nom: "Anglais", niveau: "Intermédiaire", pourcentage: 60 },
];
