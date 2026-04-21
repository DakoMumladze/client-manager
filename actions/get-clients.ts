"use server";

import { createClient } from "@/lib/supabase/server";
import type { Client } from "@/lib/types";

type GetClientsOptions = {
  search?: string;
  status?: string;
};

export async function getClients(
  options: GetClientsOptions = {},
): Promise<{ data: Client[] | null; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be signed in." };
  }

  let query = supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (options.search) {
    query = query.ilike("name", `%${options.search}%`);
  }

  if (options.status) {
    query = query.eq("status", options.status);
  }

  const { data, error } = await query;

  if (error) {
    return { data: null, error: "Failed to load clients." };
  }

  return { data: data as Client[] };
}
