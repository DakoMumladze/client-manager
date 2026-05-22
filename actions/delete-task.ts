"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

export async function deleteTask(
  taskId: string,
  projectId: string,
  clientId: string,
): Promise<{ error?: string } | null> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`delete-task:${ip}`, {
    maxRequests: 30,
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
    .delete()
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to delete task. Please try again." };
  }

  revalidatePath(`/clients/${clientId}/projects/${projectId}`);
  return null;
}
