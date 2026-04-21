import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/app-shell";
import { ClientForm } from "@/components/client-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EditClientPage({
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
    <AppShell>
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-6">
          <Link
            href={`/clients/${client.id}`}
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to client
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Client</CardTitle>
            <CardDescription>
              Update the details for {client.name}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ClientForm client={client} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
