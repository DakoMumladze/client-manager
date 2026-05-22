"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export async function toggleTask(
  taskId: string,
  completed: boolean,
  projectId: string,
  clientId: string,
): Promise<{ error?: string } | null> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`toggle-task:${ip}`, {
    maxRequests: 60,
    windowMs: 60_000,
  });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("tasks")
    .update({ completed: completed === true })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to update task. Please try again." };
  }

  revalidatePath(`/clients/${clientId}/projects/${projectId}`);
  return null;
}
