"use server";

import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/lib/types";

export async function getClient(
  id: string,
): Promise<{ data: Client | null; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be signed in." };
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return { data: null, error: "Failed to load client." };
  }

  return { data: data as Client };
}
