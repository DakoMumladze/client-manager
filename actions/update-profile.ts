"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

type State = { error?: string; success?: string } | null;

export async function updateProfile(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`update-profile:${ip}`, {
    maxRequests: 5,
    windowMs: 60_000,
  });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const displayName = formData.get("displayName");

  if (typeof displayName !== "string" || !displayName.trim()) {
    return { error: "Display name is required." };
  }

  if (displayName.trim().length > 100) {
    return { error: "Display name must be 100 characters or fewer." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ name: displayName.trim() })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: "Profile updated successfully." };
}
