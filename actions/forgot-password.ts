"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

type State = { error?: string; success?: string } | null;

export async function forgotPassword(_prevState: State, formData: FormData): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`forgot-password:${ip}`, { maxRequests: 5, windowMs: 60_000 });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const email = formData.get("email");

  if (typeof email !== "string") {
    return { error: "Email is required." };
  }

  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/confirm?next=/auth/reset-password`,
  });

  if (error) {
    console.error("Password reset error:", error.message);
    return { error: "Something went wrong. Please try again." };
  }

  return {
    success: "Check your email for a password reset link.",
  };
}
