import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Les variables NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY doivent être définies."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ACCESS_TOKEN_COOKIE = "sb-access-token";
const REFRESH_TOKEN_COOKIE = "sb-refresh-token";

const setCookie = (name: string, value: string, maxAge: number) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
};

const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

export const loginBroker = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  if (data.session?.access_token) {
    setCookie(ACCESS_TOKEN_COOKIE, data.session.access_token, data.session.expires_in);
  }

  if (data.session?.refresh_token) {
    setCookie(REFRESH_TOKEN_COOKIE, data.session.refresh_token, 60 * 60 * 24 * 30);
  }

  return data;
};

export const registerBroker = async (
  email: string,
  password: string,
  fullName: string,
  company: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company,
        role: "broker",
      },
    },
  });

  if (error) {
    throw new Error("Impossible de créer votre compte. Vérifiez vos informations.");
  }

  if (data.session?.access_token) {
    setCookie(ACCESS_TOKEN_COOKIE, data.session.access_token, data.session.expires_in);
  }

  if (data.session?.refresh_token) {
    setCookie(REFRESH_TOKEN_COOKIE, data.session.refresh_token, 60 * 60 * 24 * 30);
  }

  return data;
};

export const logoutBroker = async () => {
  await supabase.auth.signOut();
  removeCookie(ACCESS_TOKEN_COOKIE);
  removeCookie(REFRESH_TOKEN_COOKIE);
};

export const isAuthenticated = () => {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${ACCESS_TOKEN_COOKIE}=`);
};
