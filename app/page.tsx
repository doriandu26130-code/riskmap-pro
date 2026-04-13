export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="border-b border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-xl font-bold tracking-tight text-slate-100">
            RiskMap Pro
          </span>
          <button className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-slate-400 hover:bg-slate-800">
            Se connecter
          </button>
        </div>
      </nav>

      <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-20">
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-slate-400">
          Plateforme premium
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
          L&apos;outil d&apos;audit patrimonial pour courtiers d&apos;élite
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Analysez les vulnérabilités patrimoniales, générez des recommandations
          précises et valorisez votre expertise avec une expérience haut de
          gamme.
        </p>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-semibold text-white">
          Fonctionnalités clés
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Audit de risques patrimoniaux",
            "Rapport PDF automatique",
            "Espace client sécurisé",
          ].map((feature) => (
            <article
              key={feature}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm shadow-slate-900"
            >
              <h3 className="text-lg font-medium text-slate-100">{feature}</h3>
              <p className="mt-3 text-sm text-slate-400">
                Une fonctionnalité conçue pour accélérer vos audits et renforcer
                la confiance de vos clients.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Tarification
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">299€/mois</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Un plan unique pour équiper votre cabinet avec un environnement
            d&apos;audit patrimonial complet, sécurisé et orienté performance.
          </p>
          <button className="mt-8 rounded-md bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
            Démarrer gratuitement
          </button>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto w-full max-w-6xl px-6 text-sm text-slate-400">
          © RiskMap Pro 2024
        </div>
      </footer>
    </main>
  );
}
