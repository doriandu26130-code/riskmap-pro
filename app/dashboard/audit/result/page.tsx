const getRecommendations = (score: number) => {
  if (score >= 75) {
    return [
      "Niveau de risque élevé : mettez en place une couverture multirisque renforcée immédiatement.",
      "Ajoutez une assurance spécifique pour les véhicules à risque (moto/bateau).",
      "Revoyez vos plafonds de garanties santé et assistance voyage premium.",
    ];
  }

  if (score >= 45) {
    return [
      "Niveau de risque modéré : ajustez vos garanties sur l'immobilier et les déplacements.",
      "Vérifiez la cohérence entre la valeur de vos biens et les montants assurés.",
      "Programmez une revue annuelle avec votre courtier pour optimiser les contrats.",
    ];
  }

  return [
    "Niveau de risque faible : votre profil est globalement bien maîtrisé.",
    "Conservez un suivi annuel pour maintenir un niveau de couverture adapté.",
    "Anticipez l'évolution de votre patrimoine afin d'éviter les sous-assurances futures.",
  ];
};

export default function AuditResultPage({
  searchParams,
}: {
  searchParams?: {
    score?: string;
  };
}) {
  const parsedScore = Number(searchParams?.score ?? 0);
  const score = Number.isFinite(parsedScore) ? Math.max(0, Math.min(100, parsedScore)) : 0;

  const recommendations = getRecommendations(score);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Résultat d'audit</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Score de risque : {score}/100</h1>
        <p className="mt-3 text-slate-300">
          Ce score est calculé à partir des informations fournies dans votre formulaire d'audit.
        </p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-white">Recommandations</h2>
          <ul className="mt-4 space-y-3">
            {recommendations.map((item) => (
              <li key={item} className="rounded-lg border border-slate-700 bg-slate-800/70 p-3 text-slate-200">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <a
          href="/dashboard/audit/new"
          className="mt-8 inline-block rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Faire un nouvel audit
        </a>
      </div>
    </main>
  );
}
