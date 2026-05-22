"use server";

import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export async function getTask(
  id: string,
): Promise<{ data: Task | null; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be signed in." };
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { data: null, error: "Failed to load task." };
  }

  return { data: data as Task };
}
