import Link from "next/link";
import { ArrowLeft, Mail, Phone, StickyNote, CalendarDays, Pencil } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/header";
import { StatusBadge } from "@/components/ui/status-badge";
import { DeleteClientButton } from "@/components/delete-client-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
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
                <Mail className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Email</dt>
                  <dd className="text-sm text-stone-800">
                    {client.email || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Phone</dt>
                  <dd className="text-sm text-stone-800">
                    {client.phone || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <StickyNote className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Notes</dt>
                  <dd className="whitespace-pre-wrap text-sm text-stone-800">
                    {client.notes || "—"}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-stone-400" />
                <div>
                  <dt className="text-xs text-stone-500">Created</dt>
                  <dd className="text-sm text-stone-800">
                    {new Date(client.created_at).toLocaleDateString()}
                  </dd>
                </div>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-between">
          <Link href={`/clients/${client.id}/edit`}>
            <Button variant="secondary" className="w-auto px-4 inline-flex items-center gap-1.5">
              <Pencil className="size-3.5" />
              Edit Client
            </Button>
          </Link>
          <DeleteClientButton clientId={client.id} />
        </div>
      </main>
    </div>
  );
}
