"use server";

import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export async function getProjects(
  clientId: string,
): Promise<{ data: Project[] | null; error?: string }> {
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
    .eq("client_id", clientId)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { data: null, error: "Failed to load projects." };
  }

  return { data: data as Project[] };
}
