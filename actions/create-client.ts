"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient as createSupabaseClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import type { ClientStatus } from "@/lib/types";

const VALID_STATUSES: ClientStatus[] = ["lead", "active", "archived"];

type State = { error?: string; success?: string } | null;

export async function createClient(
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`create-client:${ip}`, {
    maxRequests: 10,
    windowMs: 60_000,
  });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const status = formData.get("status");
  const notes = formData.get("notes");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Client name is required." };
  }

  if (name.trim().length > 100) {
    return { error: "Client name must be 100 characters or fewer." };
  }

  const supabase = await createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const statusValue: ClientStatus =
    typeof status === "string" && VALID_STATUSES.includes(status as ClientStatus)
      ? (status as ClientStatus)
      : "lead";

  const { error } = await supabase.from("clients").insert({
    user_id: user.id,
    name: name.trim(),
    email: typeof email === "string" ? email.trim() || null : null,
    phone: typeof phone === "string" ? phone.trim() || null : null,
    status: statusValue,
    notes: typeof notes === "string" ? notes.trim() || null : null,
  });

  if (error) {
    return { error: "Failed to create client. Please try again." };
  }

  revalidatePath("/clients");
  return { success: "Client created." };
}
