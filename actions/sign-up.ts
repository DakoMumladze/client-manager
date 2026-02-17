"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type State = { error?: string; success?: string } | null;

export async function signUp(_prevState: State, formData: FormData): Promise<State> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success:
      "Check your email for a confirmation link to complete your registration.",
  };
}
