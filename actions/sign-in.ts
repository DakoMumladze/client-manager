"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

type State = { error?: string } | null;

export async function signIn(_prevState: State, formData: FormData): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}
