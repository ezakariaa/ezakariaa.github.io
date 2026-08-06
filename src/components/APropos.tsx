import { profile } from "@/data/content";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

const chiffres = [
  { valeur: "20+", label: "années dans le numérique" },
  { valeur: "20+", label: "projets personnels publiés" },
  { valeur: "3", label: "langues parlées" },
];

export default function APropos() {
  return (
    <section id="apropos" className="relative mx-auto max-w-5xl px-6 py-24">
      <SectionTitle eyebrow="À propos" titre="Un peu plus sur moi" />

      <div className="grid gap-10 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <p className="text-lg leading-relaxed text-muted">{profile.bio}</p>
          <p className="mt-5 leading-relaxed text-muted">
            Basé à {profile.ville}, je travaille aussi bien sur des identités
            visuelles et des maquettes que sur du développement front-end et
            back-end. Support technique, qualité, supervision d&apos;équipe :
            mon parcours m&apos;a appris à écouter un besoin avant de proposer
            une solution.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="grid gap-4">
            {chiffres.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <span className="font-display text-3xl font-semibold text-white">
                  {c.valeur}
                </span>
                <p className="mt-1 text-sm text-muted">{c.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
