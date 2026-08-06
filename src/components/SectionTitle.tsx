import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  titre: string;
  sousTitre?: string;
};

export default function SectionTitle({ eyebrow, titre, sousTitre }: Props) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1 text-xs font-medium tracking-wide text-violet-soft uppercase">
        <span className="size-1.5 rounded-full bg-violet-glow" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
        {titre}
      </h2>
      {sousTitre && (
        <p className="mt-4 text-base leading-relaxed text-muted">{sousTitre}</p>
      )}
    </Reveal>
  );
}
