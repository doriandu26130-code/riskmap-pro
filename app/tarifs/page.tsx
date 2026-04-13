import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "199€",
    period: "/mois",
    description: "Idéal pour démarrer votre activité patrimoniale.",
    popular: false,
    features: [
      "Jusqu'à 20 clients",
      "Audits illimités",
      "Rapports PDF basiques",
      "Support email",
    ],
  },
  {
    name: "Professionnel",
    price: "299€",
    period: "/mois",
    description: "Le meilleur choix pour les cabinets en croissance.",
    popular: true,
    features: [
      "Clients illimités",
      "Audits illimités",
      "Rapports PDF personnalisés",
      "Dashboard analytics",
      "Support prioritaire",
      "Signature électronique",
    ],
  },
  {
    name: "Cabinet",
    price: "499€",
    period: "/mois",
    description: "Pour les structures établies et multi-courtiers.",
    popular: false,
    features: [
      "Tout dans Professionnel",
      "Multi-utilisateurs 5 courtiers",
      "API access",
      "Account manager dédié",
      "Formation incluse",
    ],
  },
];

const comparisonRows = [
  {
    feature: "Nombre de clients",
    starter: "Jusqu'à 20",
    pro: "Illimité",
    cabinet: "Illimité",
  },
  {
    feature: "Audits",
    starter: "Illimités",
    pro: "Illimités",
    cabinet: "Illimités",
  },
  {
    feature: "Rapports PDF",
    starter: "Basiques",
    pro: "Personnalisés",
    cabinet: "Personnalisés",
  },
  {
    feature: "Dashboard analytics",
    starter: "—",
    pro: "Inclus",
    cabinet: "Inclus",
  },
  {
    feature: "Support",
    starter: "Email",
    pro: "Prioritaire",
    cabinet: "Prioritaire + manager dédié",
  },
  {
    feature: "Signature électronique",
    starter: "—",
    pro: "Incluse",
    cabinet: "Incluse",
  },
  {
    feature: "Multi-utilisateurs",
    starter: "—",
    pro: "—",
    cabinet: "5 courtiers",
  },
  {
    feature: "API access",
    starter: "—",
    pro: "—",
    cabinet: "Incluse",
  },
  {
    feature: "Formation",
    starter: "—",
    pro: "—",
    cabinet: "Incluse",
  },
];

const faq = [
  {
    question: "Puis-je changer d'offre à tout moment ?",
    answer:
      "Oui, vous pouvez passer à une offre supérieure ou inférieure à tout moment depuis votre espace administrateur.",
  },
  {
    question: "Y a-t-il un engagement de durée ?",
    answer:
      "Non, toutes nos offres sont sans engagement. Vous pouvez résilier quand vous le souhaitez.",
  },
  {
    question: "Proposez-vous une période d'essai ?",
    answer:
      "Oui, un essai gratuit de 14 jours est disponible sur les offres Starter et Professionnel.",
  },
  {
    question: "Comment fonctionne l'accompagnement Cabinet ?",
    answer:
      "L'offre Cabinet inclut un account manager dédié, des points mensuels et une formation de prise en main pour vos équipes.",
  },
  {
    question: "La signature électronique est-elle conforme ?",
    answer:
      "Oui, notre module de signature électronique respecte les standards de conformité en vigueur en Europe.",
  },
];

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 text-center">
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            Tarification claire et évolutive
          </p>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Choisissez l'offre adaptée à votre cabinet</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Des plans conçus pour les courtiers en assurance, du lancement à la structuration complète d'un cabinet.
          </p>
          <div className="mt-8">
            <Link
              href="/register"
              className="rounded-md bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Démarrer gratuitement
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl border p-8 shadow-sm ${
                plan.popular
                  ? "border-[#2563EB] bg-blue-50/50 shadow-[0_20px_40px_-24px_rgba(37,99,235,0.45)]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.popular ? (
                <p className="mb-4 inline-flex rounded-full bg-[#2563EB] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Le plus populaire
                </p>
              ) : null}
              <h2 className="text-2xl font-bold text-slate-900 uppercase">{plan.name}</h2>
              <p className="mt-2 text-slate-600">{plan.description}</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                <span className="pb-1 text-sm font-medium text-slate-500">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-[#2563EB]">
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-md px-4 py-2.5 text-sm font-semibold transition ${
                  plan.popular
                    ? "bg-[#2563EB] text-white hover:bg-blue-700"
                    : "border border-slate-300 text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                Choisir {plan.name}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/60">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">Tableau comparatif des fonctionnalités</h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-blue-50 text-slate-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Fonctionnalité</th>
                  <th className="px-5 py-4 font-semibold">Starter</th>
                  <th className="px-5 py-4 font-semibold text-[#2563EB]">Professionnel</th>
                  <th className="px-5 py-4 font-semibold">Cabinet</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-200">
                    <td className="px-5 py-4 font-medium text-slate-800">{row.feature}</td>
                    <td className="px-5 py-4 text-slate-600">{row.starter}</td>
                    <td className="px-5 py-4 text-slate-700">{row.pro}</td>
                    <td className="px-5 py-4 text-slate-600">{row.cabinet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">Questions fréquentes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <article key={item.question} className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
