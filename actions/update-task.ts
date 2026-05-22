"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import type { TaskPriority } from "@/lib/types";

const VALID_PRIORITIES: TaskPriority[] = ["low", "medium", "high"];

type State = { error?: string; success?: string } | null;

export async function updateTask(
  taskId: string,
  projectId: string,
  clientId: string,
  _prevState: State,
  formData: FormData,
): Promise<State> {
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { limited } = rateLimit(`update-task:${ip}`, {
    maxRequests: 30,
    windowMs: 60_000,
  });

  if (limited) {
    return { error: "Too many attempts. Please try again later." };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const priority = formData.get("priority");
  const dueDate = formData.get("due_date");

  if (typeof title !== "string" || !title.trim()) {
    return { error: "Task title is required." };
  }

  if (title.trim().length > 200) {
    return { error: "Task title must be 200 characters or fewer." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in." };
  }

  const priorityValue: TaskPriority =
    typeof priority === "string" &&
    VALID_PRIORITIES.includes(priority as TaskPriority)
      ? (priority as TaskPriority)
      : "medium";

  const { error } = await supabase
    .from("tasks")
    .update({
      title: title.trim(),
      description:
        typeof description === "string" ? description.trim() || null : null,
      priority: priorityValue,
      due_date:
        typeof dueDate === "string" && dueDate.trim() ? dueDate.trim() : null,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return { error: "Failed to update task. Please try again." };
  }

  revalidatePath(`/clients/${clientId}/projects/${projectId}`);
  return { success: "Task updated." };
}
