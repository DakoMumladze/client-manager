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

export default async function NewTaskPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id, name")
    .eq("id", projectId)
    .eq("client_id", id)
    .eq("user_id", user.id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <Link
            href={`/clients/${id}/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to project
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Task</CardTitle>
            <CardDescription>Add a new task to {project.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskForm clientId={id} projectId={project.id} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
