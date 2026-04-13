"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type ClientRow = {
  id: string;
  nom: string;
  email: string;
  dernierAudit: string;
  scoreRisque: string;
};

type AuditRow = {
  montant?: number | string | null;
  amount?: number | string | null;
  revenue?: number | string | null;
  created_at?: string | null;
  date?: string | null;
};

const navItems: Array<{ label: string; icon: string; active?: boolean }> = [
  { label: "Tableau de bord", icon: "dashboard", active: true },
  { label: "Clients", icon: "users" },
  { label: "Audits", icon: "shield" },
  { label: "Rapports", icon: "report" },
  { label: "Paramètres", icon: "settings" },
];

const formatEuros = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getRiskBadge = (score: number) => {
  if (score < 40) return "bg-emerald-100 text-emerald-700";
  if (score < 70) return "bg-orange-100 text-orange-700";
  return "bg-red-100 text-red-700";
};

const Icon = ({ name, className = "h-5 w-5" }: { name: string; className?: string }) => {
  const common = "none";

  if (name === "dashboard") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <path d="M3 13h8V3H3zM13 21h8V11h-8zM13 3h8v6h-8zM3 21h8v-6H3z" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20 8v6M23 11h-6" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />
      </svg>
    );
  }

  if (name === "report") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <path d="M14 3v6h6M8 13h8M8 17h8" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h.1a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
      </svg>
    );
  }

  if (name === "search") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    );
  }

  if (name === "bell") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
        <path d="M13.7 20a2 2 0 0 1-3.4 0" />
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill={common} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
};

export default function DashboardPage() {
  const [brokerName, setBrokerName] = useState("Courtier");
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [audits, setAudits] = useState<AuditRow[]>([]);
  const [clientsCount, setClientsCount] = useState(0);
  const [auditsCount, setAuditsCount] = useState(0);
  const [revenuMensuel, setRevenuMensuel] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      const user = authData.user;

      const fullName = user?.user_metadata?.full_name as string | undefined;
      const fallbackFromEmail = user?.email?.split("@")[0];
      setBrokerName(fullName || fallbackFromEmail || "Courtier");

      const brokerId = user?.id;

      let clientsQuery = supabase
        .from("clients")
        .select(
          "id, nom, email, dernier_audit, score_risque, last_audit_date, risk_score, updated_at",
          { count: "exact" }
        );

      let auditsQuery = supabase
        .from("audits")
        .select("id, montant, amount, revenue, created_at, date", { count: "exact" });

      if (brokerId) {
        clientsQuery = clientsQuery.eq("broker_id", brokerId);
        auditsQuery = auditsQuery.eq("broker_id", brokerId);
      }

      const [{ data: clientsData, count: cCount }, { data: auditsData, count: aCount }] =
        await Promise.all([clientsQuery, auditsQuery]);

      const mappedClients: ClientRow[] = (clientsData || []).map((client: any) => ({
        id: String(client.id),
        nom: client.nom || client.name || "Client sans nom",
        email: client.email || "—",
        dernierAudit: formatDate(client.dernier_audit || client.last_audit_date || client.updated_at),
        scoreRisque: String(client.score_risque ?? client.risk_score ?? "—"),
      }));

      const now = new Date();
      const monthlyRevenue = (auditsData || []).reduce((total: number, audit: AuditRow) => {
        const raw = audit.montant ?? audit.amount ?? audit.revenue ?? 0;
        const value = typeof raw === "number" ? raw : Number(raw);
        if (!Number.isFinite(value)) return total;

        const date = new Date(audit.created_at || audit.date || now.toISOString());
        const isCurrentMonth =
          date.getUTCFullYear() === now.getUTCFullYear() && date.getUTCMonth() === now.getUTCMonth();

        return isCurrentMonth ? total + value : total;
      }, 0);

      setClients(mappedClients);
      setAudits(auditsData || []);
      setClientsCount(cCount || mappedClients.length || 0);
      setAuditsCount(aCount || (auditsData?.length ?? 0));
      setRevenuMensuel(monthlyRevenue);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const scoreMoyen = useMemo(() => {
    if (clients.length === 0) return 0;
    const values = clients
      .map((client) => Number(client.scoreRisque))
      .filter((value) => Number.isFinite(value));
    if (values.length === 0) return 0;
    return Math.round(values.reduce((acc, value) => acc + value, 0) / values.length);
  }, [clients]);

  const lineChartData = useMemo(() => {
    const now = new Date();
    const monthNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

    const months = Array.from({ length: 6 }).map((_, index) => {
      const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - index), 1));
      return {
        key: `${d.getUTCFullYear()}-${d.getUTCMonth()}`,
        mois: `${monthNames[d.getUTCMonth()]} ${String(d.getUTCFullYear()).slice(-2)}`,
        audits: 0,
      };
    });

    const map = new Map(months.map((m) => [m.key, m]));

    audits.forEach((audit) => {
      const date = new Date(audit.created_at || audit.date || "");
      if (Number.isNaN(date.getTime())) return;
      const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      const target = map.get(key);
      if (target) target.audits += 1;
    });

    return months;
  }, [audits]);

  const riskPieData = useMemo(() => {
    let faible = 0;
    let moyen = 0;
    let eleve = 0;

    clients.forEach((client) => {
      const score = Number(client.scoreRisque);
      if (!Number.isFinite(score)) return;
      if (score < 40) faible += 1;
      else if (score < 70) moyen += 1;
      else eleve += 1;
    });

    return [
      { name: "Faible", value: faible, color: "#22C55E" },
      { name: "Moyen", value: moyen, color: "#F59E0B" },
      { name: "Élevé", value: eleve, color: "#EF4444" },
    ];
  }, [clients]);

  const maxAudits = useMemo(() => Math.max(...lineChartData.map((item) => item.audits), 1), [lineChartData]);
  const totalRiskClients = useMemo(() => riskPieData.reduce((acc, item) => acc + item.value, 0), [riskPieData]);

  const statCards = [
    { label: "Total clients", value: clientsCount, hint: "+12,4% ce mois", trend: "↗", icon: "users" },
    { label: "Audits ce mois", value: auditsCount, hint: "Objectif: 40", trend: "•", icon: "shield" },
    { label: "Revenu mensuel", value: formatEuros(revenuMensuel), hint: "Facturation en cours", trend: "€", icon: "report" },
    { label: "Score de risque moyen", value: `${scoreMoyen}/100`, hint: "Portefeuille actif", trend: "⚑", icon: "dashboard" },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 flex w-[272px] flex-col border-r border-slate-200 bg-white px-6 py-7 shadow-sm">
        <div>
          <p className="text-2xl font-bold text-[#2563EB]">RiskMap Pro</p>
          <p className="mt-1 text-sm text-slate-500">Plateforme de gestion des risques</p>
        </div>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                item.active
                  ? "bg-[#2563EB] text-white"
                  : "text-slate-600 hover:bg-blue-50 hover:text-[#2563EB]"
              }`}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white">
              {brokerName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{brokerName}</p>
              <p className="text-xs text-slate-500">Compte Premium</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Déconnexion
          </button>
        </div>
      </aside>

      <section className="ml-[272px] p-8">
        <header className="mb-8 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
            <Icon name="search" className="h-4 w-4 text-slate-400" />
            <input
              placeholder="Rechercher un client, un audit, un rapport..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </label>
          <div className="flex items-center gap-3">
            <button className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50">
              <Icon name="bell" className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DBEAFE] font-semibold text-[#2563EB]">
                {brokerName.slice(0, 2).toUpperCase()}
              </div>
              <p className="text-sm font-medium text-slate-700">{brokerName}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card, index) => (
            <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.label}</p>
                <div className="rounded-lg bg-blue-50 p-2 text-[#2563EB]">
                  <Icon name={card.icon} className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-800">{loading ? "…" : card.value}</p>
              <p className={`mt-2 text-xs ${index === 0 ? "text-emerald-600" : "text-slate-500"}`}>
                {card.trend} {card.hint}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Audits sur les 6 derniers mois</h2>
            <p className="mt-1 text-sm text-slate-500">Évolution du volume d&apos;audits réalisés.</p>
            <div className="mt-6 h-72 rounded-xl bg-slate-50 p-4">
              <div className="flex h-full items-end gap-3">
                {lineChartData.map((item) => {
                  const heightPercent = Math.max((item.audits / maxAudits) * 100, item.audits > 0 ? 10 : 4);
                  return (
                    <div key={item.key} className="flex h-full flex-1 flex-col justify-end">
                      <div className="relative h-full rounded-lg bg-slate-200/80">
                        <div
                          className="absolute inset-x-0 bottom-0 rounded-lg bg-[#2563EB] transition-all"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-center text-xs font-medium text-slate-500">{item.mois}</p>
                      <p className="text-center text-xs text-slate-400">{item.audits} audits</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Répartition des niveaux de risque</h2>
            <p className="mt-1 text-sm text-slate-500">Faible, moyen et élevé sur vos clients actifs.</p>
            <div className="mt-6 space-y-4">
              {riskPieData.map((item) => {
                const percentage = totalRiskClients === 0 ? 0 : Math.round((item.value / totalRiskClients) * 100);
                return (
                  <div key={item.name}>
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                      <span>{item.name}</span>
                      <span>{item.value} clients</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100">
                      <div className="h-3 rounded-full" style={{ width: `${percentage}%`, backgroundColor: item.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
              {riskPieData.map((item) => (
                <div key={item.name} className="rounded-lg bg-slate-50 p-2 text-center text-slate-600">
                  <p className="font-semibold" style={{ color: item.color }}>
                    {item.name}
                  </p>
                  <p>{item.value} clients</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.8fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-slate-800">Clients récents</h2>
              <p className="text-sm text-slate-500">Vos 5 derniers clients suivis.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-500">
                    <th className="px-5 py-3 font-medium">Nom</th>
                    <th className="px-5 py-3 font-medium">Email</th>
                    <th className="px-5 py-3 font-medium">Score de risque</th>
                    <th className="px-5 py-3 font-medium">Dernier audit</th>
                    <th className="px-5 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.slice(0, 5).length > 0 ? (
                    clients.slice(0, 5).map((client) => {
                      const scoreValue = Number(client.scoreRisque);
                      return (
                        <tr key={client.id} className="border-t border-slate-100 text-slate-700">
                          <td className="px-5 py-4 font-medium">{client.nom}</td>
                          <td className="px-5 py-4 text-slate-500">{client.email}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                Number.isFinite(scoreValue) ? getRiskBadge(scoreValue) : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {Number.isFinite(scoreValue) ? `${scoreValue}/100` : "Non défini"}
                            </span>
                          </td>
                          <td className="px-5 py-4">{client.dernierAudit}</td>
                          <td className="px-5 py-4">
                            <div className="flex gap-2">
                              <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                                Voir
                              </button>
                              <button className="rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                                Nouvel audit
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                        {loading ? "Chargement des clients..." : "Aucun client disponible pour le moment."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Actions rapides</h2>
            <p className="mt-1 text-sm text-slate-500">Accédez instantanément aux opérations principales.</p>
            <div className="mt-5 space-y-3">
              {[
                "Nouveau client",
                "Nouvel audit",
                "Générer rapport",
                "Envoyer rappels",
              ].map((action) => (
                <button
                  key={action}
                  className="w-full rounded-xl bg-[#2563EB] px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  {action}
                </button>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
