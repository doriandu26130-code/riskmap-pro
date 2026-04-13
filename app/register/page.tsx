"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registerBroker } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { session } = await registerBroker(email, password, fullName, company);

      if (session) {
        router.push("/dashboard");
        return;
      }

      setSuccessMessage(
        "Compte créé avec succès. Vérifiez votre email pour confirmer votre inscription."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de créer votre compte pour le moment."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
        <section className="w-full rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-lg shadow-slate-950/50">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
            Onboarding courtier
          </p>
          <h1 className="text-3xl font-semibold text-white">Créer un compte</h1>
          <p className="mt-3 text-sm text-slate-400">
            Rejoignez RiskMap Pro et démarrez vos audits patrimoniaux premium.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="fullName">
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-400"
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="company">
                Cabinet
              </label>
              <input
                id="company"
                type="text"
                required
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-400"
                placeholder="Cabinet Patrimoine Conseil"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
                Email professionnel
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-400"
                placeholder="vous@cabinet.fr"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-400"
                placeholder="8 caractères minimum"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-md border border-red-400/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="rounded-md border border-emerald-400/40 bg-emerald-950/60 px-3 py-2 text-sm text-emerald-200">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-medium text-slate-100 hover:text-white">
              Se connecter
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
