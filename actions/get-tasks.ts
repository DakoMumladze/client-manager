"use server";

import { createClient } from "@/lib/supabase/server";
import type { Task } from "@/lib/types";

export async function getTasks(
  projectId: string,
): Promise<{ data: Task[] | null; error?: string }> {
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
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: "Failed to load tasks." };
  }

  return { data: data as Task[] };
}
