import { profile, liens, navigation } from "@/data/content";

const reseaux = [
  { label: "GitHub", href: liens.github },
  { label: "Site", href: liens.site },
  { label: "Email", href: liens.email },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-semibold text-white">
            {profile.prenom} {profile.nom}
          </p>
          <p className="mt-1 text-sm text-faint">{profile.role}</p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          {reseaux.map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-muted transition-colors hover:text-white"
            >
              {r.label} ↗
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs text-faint">
          © {new Date().getFullYear()} {profile.prenom} {profile.nom}. Tous
          droits réservés.
        </p>
      </div>
    </footer>
  );
}
