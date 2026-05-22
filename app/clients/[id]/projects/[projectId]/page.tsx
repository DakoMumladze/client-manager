import Link from "next/link";
import {
  ArrowLeft,
  StickyNote,
  CalendarDays,
  DollarSign,
  Pencil,
} from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app-shell";
import { ProjectStatusBadge } from "@/components/ui/project-status-badge";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProjectDetailPage({
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
    .select("*")
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
            href={`/clients/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to client
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <ProjectStatusBadge status={project.status} />
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2 sm:col-span-2">
                <StickyNote className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Description</dt>
                  <dd className="whitespace-pre-wrap text-sm text-stone-800">
                    {project.description || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Deadline</dt>
                  <dd className="text-sm text-stone-800">
                    {project.deadline
                      ? new Date(
                          project.deadline + "T00:00:00",
                        ).toLocaleDateString()
                      : "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <DollarSign className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Budget</dt>
                  <dd className="text-sm text-stone-800">
                    {project.budget !== null
                      ? project.budget.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                      : "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Created</dt>
                  <dd className="text-sm text-stone-800">
                    {new Date(project.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Link href={`/clients/${id}/projects/${project.id}/edit`}>
            <Button
              variant="secondary"
              className="w-auto px-4 inline-flex items-center gap-1.5"
            >
              <Pencil className="size-3.5" />
              Edit Project
            </Button>
          </Link>
          <DeleteProjectButton projectId={project.id} clientId={id} />
        </div>
      </div>
    </AppShell>
  );
}
