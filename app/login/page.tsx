"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { loginBroker } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await loginBroker(email, password);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Échec de connexion. Veuillez réessayer."
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
            Espace courtier
          </p>
          <h1 className="text-3xl font-semibold text-white">Connexion</h1>
          <p className="mt-3 text-sm text-slate-400">
            Connectez-vous à votre espace sécurisé RiskMap Pro.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="email">
                Email
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-400"
                placeholder="••••••••"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-md border border-red-400/40 bg-red-950/60 px-3 py-2 text-sm text-red-200">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <Link href="/register" className="font-medium text-slate-100 hover:text-white">
              Créer un compte courtier
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
