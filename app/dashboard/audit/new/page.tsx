"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  propertiesCount: number;
  propertiesValueEur: number;
  vehiclesCount: number;
  vehicleTypes: {
    car: boolean;
    boat: boolean;
    motorcycle: boolean;
  };
  tripsPerYear: number;
  privateHealthInsurance: "oui" | "non";
};

const INITIAL_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  propertiesCount: 0,
  propertiesValueEur: 0,
  vehiclesCount: 0,
  vehicleTypes: {
    car: false,
    boat: false,
    motorcycle: false,
  },
  tripsPerYear: 0,
  privateHealthInsurance: "non",
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const calculateRiskScore = (data: FormData) => {
  let score = 10;

  score += clamp(data.propertiesCount * 5, 0, 20);
  score += clamp(Math.floor(data.propertiesValueEur / 100000), 0, 20);
  score += clamp(data.vehiclesCount * 4, 0, 16);
  if (data.vehicleTypes.boat) score += 8;
  if (data.vehicleTypes.motorcycle) score += 6;
  score += clamp(data.tripsPerYear * 2, 0, 20);
  if (data.privateHealthInsurance === "non") score += 10;

  return clamp(Math.round(score), 0, 100);
};

const fieldBaseClass =
  "mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40";

export default function NewAuditPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => Math.round((step / 4) * 100), [step]);

  const saveAudit = async (payload: Record<string, unknown>) => {
    const attempts = [
      { answers: payload },
      { response_json: payload },
      { data: payload },
      { payload },
    ];

    for (const row of attempts) {
      const { error: insertError } = await supabase.from("audits").insert(row);
      if (!insertError) return;
    }

    throw new Error("Impossible d'enregistrer l'audit dans la base de données.");
  };

  const nextStep = () => {
    setError(null);
    setStep((current) => clamp(current + 1, 1, 4));
  };

  const previousStep = () => {
    setError(null);
    setStep((current) => clamp(current - 1, 1, 4));
  };

  const submitAudit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const score = calculateRiskScore(form);
      const answers = {
        client: {
          nomComplet: form.fullName,
          email: form.email,
          telephone: form.phone,
        },
        immobilier: {
          nombreBiens: form.propertiesCount,
          valeurTotaleEstimeeEur: form.propertiesValueEur,
        },
        vehicules: {
          nombreVehicules: form.vehiclesCount,
          types: form.vehicleTypes,
        },
        santeVoyage: {
          voyagesParAn: form.tripsPerYear,
          assuranceSantePrivee: form.privateHealthInsurance,
        },
      };

      await saveAudit({ answers, riskScore: score, createdAt: new Date().toISOString() });
      router.push(`/dashboard/audit/result?score=${score}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Une erreur est survenue lors de la soumission."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl sm:p-8">
        <h1 className="text-2xl font-semibold text-white sm:text-3xl">Nouvel audit de risque</h1>
        <p className="mt-2 text-sm text-slate-400">Formulaire en 4 étapes</p>

        <div className="mt-6">
          <div className="h-2 w-full rounded-full bg-slate-800">
            <div className="h-2 rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Étape {step} sur 4</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={submitAudit}>
          {step === 1 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-white">1. Informations client</h2>
              <label className="block text-sm text-slate-300">
                Nom complet
                <input
                  required
                  value={form.fullName}
                  onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                  className={fieldBaseClass}
                  placeholder="Jean Dupont"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Email
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className={fieldBaseClass}
                  placeholder="client@exemple.fr"
                />
              </label>

              <label className="block text-sm text-slate-300">
                Numéro de téléphone
                <input
                  required
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className={fieldBaseClass}
                  placeholder="+33 6 00 00 00 00"
                />
              </label>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-white">2. Immobilier</h2>
              <label className="block text-sm text-slate-300">
                Nombre de biens immobiliers détenus
                <input
                  required
                  min={0}
                  type="number"
                  value={form.propertiesCount}
                  onChange={(event) =>
                    setForm({ ...form, propertiesCount: Number(event.target.value) || 0 })
                  }
                  className={fieldBaseClass}
                />
              </label>

              <label className="block text-sm text-slate-300">
                Valeur totale estimée (en €)
                <input
                  required
                  min={0}
                  type="number"
                  value={form.propertiesValueEur}
                  onChange={(event) =>
                    setForm({ ...form, propertiesValueEur: Number(event.target.value) || 0 })
                  }
                  className={fieldBaseClass}
                />
              </label>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-white">3. Véhicules</h2>
              <label className="block text-sm text-slate-300">
                Nombre de véhicules
                <input
                  required
                  min={0}
                  type="number"
                  value={form.vehiclesCount}
                  onChange={(event) => setForm({ ...form, vehiclesCount: Number(event.target.value) || 0 })}
                  className={fieldBaseClass}
                />
              </label>

              <fieldset>
                <legend className="text-sm text-slate-300">Types de véhicules</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {[
                    { key: "car", label: "Voiture" },
                    { key: "boat", label: "Bateau" },
                    { key: "motorcycle", label: "Moto" },
                  ].map((vehicle) => (
                    <label
                      key={vehicle.key}
                      className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={form.vehicleTypes[vehicle.key as keyof FormData["vehicleTypes"]]}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            vehicleTypes: {
                              ...form.vehicleTypes,
                              [vehicle.key]: event.target.checked,
                            },
                          })
                        }
                      />
                      {vehicle.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold text-white">4. Santé et voyages</h2>
              <label className="block text-sm text-slate-300">
                Nombre de voyages par an
                <input
                  required
                  min={0}
                  type="number"
                  value={form.tripsPerYear}
                  onChange={(event) => setForm({ ...form, tripsPerYear: Number(event.target.value) || 0 })}
                  className={fieldBaseClass}
                />
              </label>

              <fieldset>
                <legend className="text-sm text-slate-300">Assurance santé privée</legend>
                <div className="mt-3 flex gap-4">
                  {[
                    { value: "oui", label: "Oui" },
                    { value: "non", label: "Non" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-2 text-sm text-slate-200">
                      <input
                        type="radio"
                        name="health"
                        checked={form.privateHealthInsurance === option.value}
                        onChange={() =>
                          setForm({ ...form, privateHealthInsurance: option.value as "oui" | "non" })
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </section>
          )}

          {error && <p className="rounded-lg border border-rose-700 bg-rose-900/30 p-3 text-sm text-rose-200">{error}</p>}

          <div className="flex items-center justify-between border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1 || loading}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Précédent
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Suivant
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Envoi..." : "Valider l'audit"}
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
