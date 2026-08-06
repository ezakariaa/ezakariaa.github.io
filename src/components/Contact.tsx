import { profile, liens } from "@/data/content";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:px-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 aurora" />

          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Un projet en tête&nbsp;?
            </h2>
            <p className="mx-auto mt-5 max-w-lg leading-relaxed text-muted">
              Site vitrine, application web, refonte ou identité visuelle —
              écris-moi, je réponds vite.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href={liens.email}
                className="rounded-xl bg-violet-glow px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.8)] transition-transform hover:-translate-y-0.5 hover:bg-violet-deep"
              >
                {profile.email}
              </a>
              <a
                href={`tel:${profile.telephone.replace(/\s/g, "")}`}
                className="rounded-xl border border-line bg-elevated px-6 py-3 text-sm font-medium text-white transition-colors hover:border-violet-deep"
              >
                {profile.telephone}
              </a>
              <a
                href={profile.cv}
                download
                className="rounded-xl border border-line bg-elevated px-6 py-3 text-sm font-medium text-white transition-colors hover:border-violet-deep"
              >
                Télécharger mon CV
              </a>
            </div>

            <p className="mt-8 text-sm text-faint">
              Basé à {profile.ville} · Disponible en freelance et à distance
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
