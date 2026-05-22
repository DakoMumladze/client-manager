"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import type { ProjectStatus } from "@/lib/types";

const VALID_STATUSES: ProjectStatus[] = ["in_progress", "completed", "on_hold"];

type State = { error?: string; success?: string } | null;

export async function createProject(
  clientId: string,
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`create-project:${ip}`, {
    maxRequests: 10,
    windowMs: 60_000,
  });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const name = formData.get("name");
  const description = formData.get("description");
  const status = formData.get("status");
  const deadline = formData.get("deadline");
  const budget = formData.get("budget");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "Project name is required." };
  }

  if (name.trim().length > 100) {
    return { error: "Project name must be 100 characters or fewer." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  // Verify the client belongs to this user
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("id", clientId)
    .eq("user_id", user.id)
    .single();

  if (!client) {
    return { error: "Client not found." };
  }

  const statusValue: ProjectStatus =
    typeof status === "string" &&
    VALID_STATUSES.includes(status as ProjectStatus)
      ? (status as ProjectStatus)
      : "in_progress";

  const budgetValue =
    typeof budget === "string" && budget.trim()
      ? parseFloat(budget.trim())
      : null;

  const { error } = await supabase.from("projects").insert({
    client_id: clientId,
    user_id: user.id,
    name: name.trim(),
    description:
      typeof description === "string" ? description.trim() || null : null,
    status: statusValue,
    deadline:
      typeof deadline === "string" && deadline.trim() ? deadline.trim() : null,
    budget: budgetValue !== null && !isNaN(budgetValue) ? budgetValue : null,
  });

  if (error) {
    return { error: "Failed to create project. Please try again." };
  }

  revalidatePath(`/clients/${clientId}`);
  return { success: "Project created." };
}
