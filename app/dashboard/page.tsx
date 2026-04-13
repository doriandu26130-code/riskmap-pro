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

export default function DashboardPage() {
  const [brokerName, setBrokerName] = useState("Courtier");
  const [clients, setClients] = useState<ClientRow[]>([]);
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
        .select("id, montant, amount, revenue", { count: "exact" });

      if (brokerId) {
        clientsQuery = clientsQuery.eq("broker_id", brokerId);
        auditsQuery = auditsQuery.eq("broker_id", brokerId);
      }

      const [{ data: clientsData, count: cCount }, { data: auditsData, count: aCount }] =
        await Promise.all([clientsQuery, auditsQuery]);

      const mappedClients: ClientRow[] = (clientsData || []).slice(0, 8).map((client: any) => ({
        id: String(client.id),
        nom: client.nom || client.name || "Client sans nom",
        email: client.email || "—",
        dernierAudit: formatDate(client.dernier_audit || client.last_audit_date || client.updated_at),
        scoreRisque: String(client.score_risque ?? client.risk_score ?? "—"),
      }));

      const now = new Date();
      const monthlyRevenue = (auditsData || []).reduce((total: number, audit: any) => {
        const raw = audit.montant ?? audit.amount ?? audit.revenue ?? 0;
        const value = typeof raw === "number" ? raw : Number(raw);
        if (!Number.isFinite(value)) return total;

        const date = new Date(audit.created_at || audit.date || now.toISOString());
        const isCurrentMonth =
          date.getUTCFullYear() === now.getUTCFullYear() &&
          date.getUTCMonth() === now.getUTCMonth();

        return isCurrentMonth ? total + value : total;
      }, 0);

      setClients(mappedClients);
      setClientsCount(cCount || mappedClients.length || 0);
      setAuditsCount(aCount || (auditsData?.length ?? 0));
      setRevenuMensuel(monthlyRevenue);
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const statCards = useMemo(
    () => [
      { label: "Nombre de clients", value: clientsCount },
      { label: "Nombre d'audits", value: auditsCount },
      { label: "Revenu mensuel", value: formatEuros(revenuMensuel) },
    ],
    [clientsCount, auditsCount, revenuMensuel]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-800 bg-slate-900/60 p-6 lg:border-b-0 lg:border-r">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-slate-400">RiskMap Pro</p>
          <nav className="space-y-2">
            {["Tableau de bord", "Clients", "Audits", "Paramètres"].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`block rounded-lg px-4 py-3 text-sm transition ${
                  index === 0
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 border-b border-slate-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Espace courtier</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Bienvenue, <span className="text-slate-200">{brokerName}</span>
              </h1>
            </div>
            <button className="rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-white">
              Nouveau client
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {statCards.map((card) => (
              <article key={card.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{loading ? "…" : card.value}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-900/90 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Nom</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Dernier audit</th>
                    <th className="px-4 py-3 font-medium">Score de risque</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {clients.length > 0 ? (
                    clients.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-800/40">
                        <td className="px-4 py-3">{client.nom}</td>
                        <td className="px-4 py-3 text-slate-300">{client.email}</td>
                        <td className="px-4 py-3">{client.dernierAudit}</td>
                        <td className="px-4 py-3">{client.scoreRisque}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-slate-400">
                        {loading ? "Chargement des clients..." : "Aucun client pour le moment."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
