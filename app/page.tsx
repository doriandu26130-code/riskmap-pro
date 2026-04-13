import Link from "next/link";

const navigationLinks = [
  { label: "Fonctionnalités", href: "#" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "#" },
  { label: "Contact", href: "#" },
];

const stats = [
  { value: "+500", label: "courtiers" },
  { value: "98%", label: "satisfaction" },
  { value: "2x", label: "plus de clients" },
];

const features = [
  { title: "Audit patrimonial complet", icon: "🧭" },
  { title: "Score de risque automatique", icon: "📊" },
  { title: "Rapport PDF professionnel", icon: "📄" },
  { title: "Espace client sécurisé", icon: "🔒" },
  { title: "Alertes et rappels", icon: "🔔" },
  { title: "Signature électronique", icon: "✍️" },
];

const steps = [
  "Créez le profil client",
  "Réalisez l'audit en 10 minutes",
  "Envoyez le rapport PDF",
];

const testimonials = [
  {
    quote:
      "RiskMap Pro a professionnalisé notre approche en rendez-vous. Nos clients comprennent immédiatement la valeur de notre conseil.",
    author: "Sophie M.",
    role: "Courtière en gestion de patrimoine",
  },
  {
    quote:
      "La génération automatique du rapport PDF nous fait gagner un temps précieux tout en améliorant notre image de marque.",
    author: "Karim D.",
    role: "Fondateur, Cabinet Horizon Conseil",
  },
  {
    quote:
      "L'outil est clair, fiable et rassurant. Nous avons doublé le nombre d'audits réalisés chaque mois.",
    author: "Élodie R.",
    role: "Courtière indépendante",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-[#2563EB]">
            RiskMap Pro
          </span>
          <div className="hidden items-center gap-8 md:flex">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-[#2563EB]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <button className="rounded-md bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Démarrer gratuitement
          </button>
        </div>
      </nav>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Plateforme patrimoniale moderne
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Gérez vos clients patrimoniaux avec précision
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-600">
            Centralisez les informations clients, automatisez l&apos;analyse de
            risque et remettez des rapports professionnels en quelques clics.
            Une solution pensée pour les courtiers exigeants.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-md bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Démarrer gratuitement
            </button>
            <button className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2563EB] hover:text-[#2563EB]">
              Voir la démo
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.35)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              Aperçu du tableau de bord
            </h2>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
              En ligne
            </span>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500">Portefeuille actif</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">128 clients</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-700">Risque moyen</p>
                <p className="mt-2 text-xl font-bold text-blue-900">42 / 100</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">Rapports ce mois</p>
                <p className="mt-2 text-xl font-bold text-slate-900">64</p>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-slate-300 p-4">
              <p className="text-xs font-medium text-slate-500">
                Prochaine action recommandée
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">
                Mettre à jour le profil de 12 clients avant vendredi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/80">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-10 sm:grid-cols-3">
          {stats.map((stat) => (
            <article key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-[#2563EB]">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900">Fonctionnalités clés</h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Tout ce dont vous avez besoin pour standardiser vos audits et offrir
          une expérience premium à chaque client.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Optimisez votre productivité avec un parcours simple, fiable et
                sécurisé.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-blue-50/70">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold text-slate-900">Comment ça marche</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <article
                key={step}
                className="rounded-xl border border-blue-100 bg-white p-6"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-base font-semibold text-slate-800">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-900">Ils nous font confiance</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm leading-relaxed text-slate-600">
                “{testimonial.quote}”
              </p>
              <p className="mt-6 text-sm font-semibold text-slate-900">
                {testimonial.author}
              </p>
              <p className="mt-1 text-xs text-slate-500">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <div className="rounded-2xl bg-[#2563EB] px-8 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">Prêt à développer votre cabinet ?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Adoptez RiskMap Pro pour structurer vos audits patrimoniaux,
            fidéliser vos clients et accélérer votre croissance.
          </p>
          <button className="mt-8 rounded-md bg-white px-8 py-3 text-sm font-semibold text-[#2563EB] transition hover:bg-blue-100">
            Démarrer gratuitement
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 RiskMap Pro. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:text-[#2563EB]">
              Mentions légales
            </a>
            <a href="#" className="hover:text-[#2563EB]">
              Politique de confidentialité
            </a>
            <a href="#" className="hover:text-[#2563EB]">
              Conditions d&apos;utilisation
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
