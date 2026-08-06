# Portfolio — Zakaria ELORCHE

Portfolio personnel de Zakaria ELORCHE, Web Designer & Développeur Web à Casablanca.
En ligne sur **https://ezakariaa.github.io/**

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · export statique.

## Modifier le contenu

Tout le contenu du site — textes, projets, expériences, compétences, formations,
langues, coordonnées — vit dans un seul fichier :

```
src/data/content.ts
```

Aucun texte n'est codé en dur dans les composants. Modifie ce fichier, pousse,
le site se redéploie tout seul.

## Développement

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # export statique dans out/
```

## Déploiement

Le site est déployé par GitHub Actions à chaque push sur `master`
(voir `.github/workflows/deploy.yml`).

**Prérequis, une seule fois :** dans *Settings → Pages*, régler
*Build and deployment → Source* sur **GitHub Actions**.

## Structure

```
src/
  app/
    layout.tsx      polices, métadonnées
    page.tsx        assemblage des sections
    globals.css     palette et effets visuels
  components/
    Navbar.tsx      navigation flottante
    Hero.tsx        en-tête + bandeau de technos
    Projets.tsx     grille de projets
    Experience.tsx  timeline + formation
    Competences.tsx compétences + langues
    APropos.tsx     biographie
    Contact.tsx     coordonnées + CV
    Footer.tsx
    Reveal.tsx      animation d'apparition au scroll
    SectionTitle.tsx
  data/
    content.ts      ← tout le contenu
public/
  cv-zakaria-elorche.pdf
```

## Historique

Ce dépôt contenait auparavant un portfolio HTML statique. Il reste accessible
dans l'historique Git :

```bash
git show a58e0e3          # dernier état de l'ancien site
git checkout a58e0e3 -- . # le restaurer si besoin
```
