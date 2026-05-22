import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  StickyNote,
  CalendarDays,
  Pencil,
  FolderOpen,
  Plus,
} from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { DeleteClientButton } from "@/components/delete-client-button";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/types";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const [{ data: client }, { data: projects }] = await Promise.all([
    supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("projects")
      .select("*")
      .eq("client_id", id)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!client) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to clients
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{client.name}</CardTitle>
              <StatusBadge status={client.status} />
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Email</dt>
                  <dd className="text-sm text-foreground">
                    {client.email || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Phone</dt>
                  <dd className="text-sm text-foreground">
                    {client.phone || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <StickyNote className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Notes</dt>
                  <dd className="whitespace-pre-wrap text-sm text-foreground">
                    {client.notes || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                <div>
                  <dt className="text-xs text-muted-foreground">Created</dt>
                  <dd className="text-sm text-foreground">
                    {new Date(client.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Link href={`/clients/${client.id}/edit`}>
            <Button
              variant="secondary"
              className="w-auto px-4 inline-flex items-center gap-1.5"
            >
              <Pencil className="size-3.5" />
              Edit Client
            </Button>
          </Link>
          <DeleteClientButton clientId={client.id} />
        </div>

        {/* Projects section */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Projects
            </h2>
            <Link href={`/clients/${client.id}/projects/new`}>
              <Button
                variant="primary"
                className="w-auto px-4 inline-flex items-center gap-1.5"
              >
                <Plus className="size-3.5" />
                Add Project
              </Button>
            </Link>
          </div>

          {projects && projects.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project as Project}
                  clientId={client.id}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<FolderOpen className="size-8" />}
              title="No projects yet"
              description="Add a project to start tracking work for this client."
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}
