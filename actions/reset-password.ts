"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

type State = { error?: string } | null;

export async function resetPassword(_prevState: State, formData: FormData): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`reset-password:${ip}`, { maxRequests: 3, windowMs: 60_000 });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (typeof password !== "string" || typeof confirmPassword !== "string") {
    return { error: "Password and confirmation are required." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Password update error:", error.message);
    return { error: "Unable to reset password. The link may have expired." };
  }

  redirect("/auth/sign-in?message=password-updated");
}
