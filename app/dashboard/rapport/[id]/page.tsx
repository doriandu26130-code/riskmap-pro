"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Actif = {
  nom: string;
  categorie: string;
  valeur: number;
  details: string;
};

type CategorieRisque = {
  nom: string;
  score: number;
};

const formatMontant = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const getRiskColor = (score: number) => {
  if (score > 70) return "#22C55E";
  if (score >= 40) return "#F59E0B";
  return "#EF4444";
};

const getRiskLabel = (score: number) => {
  if (score > 70) return "Faible";
  if (score >= 40) return "Modéré";
  return "Élevé";
};

export default function RapportPage() {
  const params = useParams<{ id: string }>();
  const reportId = params?.id || "N/A";

  const scoreGlobal = 68;
  const scoreColor = getRiskColor(scoreGlobal);
  const scoreLabel = getRiskLabel(scoreGlobal);

  const actifs: Actif[] = [
    { nom: "Résidence principale", categorie: "Immobilier", valeur: 450000, details: "Maison · Lyon" },
    { nom: "Appartement locatif", categorie: "Immobilier", valeur: 220000, details: "T2 · Bordeaux" },
    { nom: "SUV familial", categorie: "Véhicule", valeur: 38000, details: "Hybride" },
    { nom: "Berline", categorie: "Véhicule", valeur: 26000, details: "Électrique" },
    { nom: "Contrat assurance-vie", categorie: "Placement", valeur: 90000, details: "Profil équilibré" },
  ];

  const categoriesRisque: CategorieRisque[] = [
    { nom: "Immobilier", score: 75 },
    { nom: "Véhicules", score: 56 },
    { nom: "Santé", score: 49 },
    { nom: "Voyages", score: 34 },
  ];

  const recommandations = [
    {
      icon: "🛡️",
      titre: "Renforcer la couverture habitation",
      description:
        "Mettre à jour les garanties contre les dégâts des eaux et les événements climatiques pour les deux biens immobiliers.",
    },
    {
      icon: "🚗",
      titre: "Optimiser les franchises auto",
      description:
        "Réduire la franchise du SUV pour limiter le reste à charge en cas de sinistre responsable.",
    },
    {
      icon: "🩺",
      titre: "Compléter la protection santé",
      description:
        "Ajouter une option hospitalisation premium et téléconsultation illimitée pour le foyer.",
    },
    {
      icon: "✈️",
      titre: "Sécuriser les déplacements",
      description:
        "Souscrire une assurance voyage annuelle multi-destinations avec assistance médicale renforcée.",
    },
  ];

  const nbBiens = actifs.filter((actif) => actif.categorie === "Immobilier").length;
  const valeurBiens = actifs
    .filter((actif) => actif.categorie === "Immobilier")
    .reduce((total, actif) => total + actif.valeur, 0);
  const vehicules = actifs.filter((actif) => actif.categorie === "Véhicule");

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900 print:bg-white print:p-0">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none">
        <div className="no-print flex justify-end border-b border-slate-200 p-4">
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Télécharger en PDF
          </button>
        </div>

        <section className="space-y-8 p-8 print:space-y-6 print:p-6">
          <header className="grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-2">
            <div>
              <p className="text-3xl font-bold text-[#2563EB]">RiskMap Pro</p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Courtier</p>
              <p className="text-sm text-slate-700">Sophie Bernard</p>
              <p className="text-sm text-slate-700">+33 6 45 87 12 90 · sophie.bernard@cabinet-risque.fr</p>
            </div>
            <div className="space-y-2 text-sm text-slate-700 md:text-right">
              <p>
                <span className="font-semibold text-slate-500">Client :</span> Jean Dupont
              </p>
              <p>
                <span className="font-semibold text-slate-500">Date :</span>{" "}
                {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date())}
              </p>
              <p>
                <span className="font-semibold text-slate-500">N° de rapport :</span> RP-{reportId}
              </p>
              <p>
                <span className="font-semibold text-slate-500">Référence :</span>{" "}
                <Link href="/dashboard" className="text-[#2563EB] underline">
                  Tableau de bord
                </Link>
              </p>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <article className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Score de risque global</h2>
              <div className="mt-5 flex justify-center">
                <div
                  className="flex h-40 w-40 items-center justify-center rounded-full border-[10px]"
                  style={{ borderColor: scoreColor }}
                >
                  <div className="text-center">
                    <p className="text-4xl font-bold" style={{ color: scoreColor }}>
                      {scoreGlobal}
                    </p>
                    <p className="text-xs font-semibold uppercase text-slate-500">/ 100</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-lg font-semibold" style={{ color: scoreColor }}>
                {scoreLabel}
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold">Résumé du patrimoine</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Biens immobiliers</p>
                  <p className="mt-1 text-2xl font-bold">{nbBiens}</p>
                  <p className="text-sm text-slate-600">Valeur estimée: {formatMontant(valeurBiens)}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">Véhicules</p>
                  <p className="mt-1 text-2xl font-bold">{vehicules.length}</p>
                  <p className="text-sm text-slate-600">Types: {vehicules.map((v) => v.details).join(", ")}</p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600">
                    <tr>
                      <th className="px-4 py-2 font-medium">Actif</th>
                      <th className="px-4 py-2 font-medium">Catégorie</th>
                      <th className="px-4 py-2 font-medium">Détails</th>
                      <th className="px-4 py-2 text-right font-medium">Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actifs.map((actif) => (
                      <tr key={actif.nom} className="border-t border-slate-200">
                        <td className="px-4 py-2">{actif.nom}</td>
                        <td className="px-4 py-2">{actif.categorie}</td>
                        <td className="px-4 py-2 text-slate-600">{actif.details}</td>
                        <td className="px-4 py-2 text-right font-semibold">{formatMontant(actif.valeur)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </section>

          <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold">Analyse des risques par catégorie</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-2 font-medium">Catégorie</th>
                    <th className="px-4 py-2 font-medium">Score</th>
                    <th className="px-4 py-2 font-medium">Niveau</th>
                  </tr>
                </thead>
                <tbody>
                  {categoriesRisque.map((categorie) => {
                    const color = getRiskColor(categorie.score);
                    return (
                      <tr key={categorie.nom} className="border-t border-slate-200">
                        <td className="px-4 py-3 font-medium">{categorie.nom}</td>
                        <td className="px-4 py-3">
                          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                            <span>{categorie.score}/100</span>
                          </div>
                          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${categorie.score}%`, backgroundColor: color }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ color }}>
                          {getRiskLabel(categorie.score)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold">Recommandations personnalisées</h2>
            <div className="mt-4 grid gap-3">
              {recommandations.map((recommendation) => (
                <article key={recommendation.titre} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="mr-2" aria-hidden>
                      {recommendation.icon}
                    </span>
                    {recommendation.titre}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{recommendation.description}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="border-t border-slate-200 pt-5 text-xs text-slate-500">
            <p>
              Ce rapport est fourni à titre informatif et ne constitue pas un engagement contractuel. Les estimations
              peuvent évoluer selon les déclarations du client et les conditions du marché.
            </p>
            <p className="mt-2">Cabinet Sophie Bernard · +33 6 45 87 12 90 · sophie.bernard@cabinet-risque.fr</p>
            <p className="mt-1 font-semibold text-[#2563EB]">RiskMap Pro · Plateforme professionnelle d&apos;analyse des risques</p>
          </footer>
        </section>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          @page {
            size: A4;
            margin: 14mm;
          }

          body {
            background: #fff;
          }
        }
      `}</style>
    </main>
  );
}
