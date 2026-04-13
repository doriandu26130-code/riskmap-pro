import Link from "next/link";

const values = [
  {
    title: "Confiance",
    icon: "🤝",
    description:
      "Nous construisons des relations durables avec les courtiers et leurs clients grâce à la transparence.",
  },
  {
    title: "Excellence",
    icon: "⭐",
    description:
      "Chaque fonctionnalité est pensée pour offrir une qualité de service irréprochable et mesurable.",
  },
  {
    title: "Innovation",
    icon: "💡",
    description:
      "Nous intégrons les meilleures technologies pour simplifier le conseil en assurance patrimoniale.",
  },
  {
    title: "Proximité",
    icon: "📍",
    description:
      "Notre équipe accompagne les professionnels du terrain avec écoute, réactivité et pragmatisme.",
  },
];

const team = [
  {
    name: "Thomas Dubois",
    role: "CEO et Co-fondateur",
    initials: "TD",
  },
  {
    name: "Sarah Martin",
    role: "CTO et Co-fondatrice",
    initials: "SM",
  },
  {
    name: "Marc Leroy",
    role: "Responsable Client",
    initials: "ML",
  },
];

const numbers = [
  { value: "500+", label: "courtiers" },
  { value: "50 000+", label: "audits réalisés" },
  { value: "4.9/5", label: "satisfaction client" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 text-center">
          <p className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563EB]">
            À propos de RiskMap Pro
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
            Notre mission: transformer le conseil en assurance patrimoniale
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-2xl font-bold text-slate-900">Notre histoire</h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Fondée par des experts du conseil patrimonial et de la technologie,
            RiskMap Pro aide les courtiers à structurer leurs audits, valoriser
            leur expertise et offrir une expérience client moderne. Notre
            ambition est simple : donner à chaque professionnel les moyens de
            développer son activité avec confiance.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50/70">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-bold text-slate-900">Nos valeurs</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-xl border border-blue-100 bg-white p-6"
              >
                <span className="text-2xl" aria-hidden>
                  {value.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold text-slate-900">L&apos;équipe</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article
              key={member.name}
              className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-[#2563EB]">
                {member.initials}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-blue-50/60">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-14 sm:grid-cols-3">
          {numbers.map((item) => (
            <article key={item.label} className="text-center">
              <p className="text-3xl font-bold text-[#2563EB]">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-[#2563EB] px-8 py-14 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold">Rejoignez les meilleurs courtiers</h2>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Lancez votre essai et découvrez comment RiskMap Pro accélère vos
            audits patrimoniaux au quotidien.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex rounded-md bg-white px-8 py-3 text-sm font-semibold text-[#2563EB] transition hover:bg-blue-100"
          >
            Créer mon compte
          </Link>
        </div>
      </section>
    </main>
  );
}
