import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/task-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Task } from "@/lib/types";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string; taskId: string }>;
}) {
  const { id, projectId, taskId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("project_id", projectId)
    .eq("user_id", user.id)
    .single();

  if (!task) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <Link
            href={`/clients/${id}/projects/${projectId}`}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to project
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
            <CardDescription>
              Update the details for {task.title}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskForm clientId={id} projectId={projectId} task={task as Task} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
