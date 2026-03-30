"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";

type State = { error?: string; success?: string } | null;

export async function updateClient(
  clientId: string,
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`update-client:${ip}`, {
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const { error } = await supabase
    .from("clients")
    .update({
      name: (name as string).trim(),
      email: (email as string) || null,
      phone: (phone as string) || null,
      status: (status as string) || "lead",
      notes: (notes as string) || null,
    })
    .eq("id", clientId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/clients/${clientId}`);
  redirect(`/clients/${clientId}`);
}
