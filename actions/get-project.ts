"use server";

import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export async function getProject(
  id: string,
): Promise<{ data: Project | null; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be signed in." };
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { data: null, error: "Failed to load project." };
  }

  return { data: data as Project };
}
