import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ClientCard } from "@/components/client-card";
import { ClientsFilter } from "@/components/clients-filter";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getClients } from "@/actions/get-clients";
import { createClient } from "@/lib/supabase/server";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { search, status } = await searchParams;
  const { data: clients } = await getClients({ search, status });

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-stone-800">Clients</h1>
          <Link href="/clients/new">
            <Button className="w-auto px-4 inline-flex items-center gap-1.5">
              <Plus className="size-4" />
              Add Client
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <ClientsFilter />
        </div>

        {clients && clients.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Users className="size-10" />}
            title="No clients found."
            description={
              search || status
                ? "Try adjusting your filters."
                : "Get started by adding your first client."
            }
            action={
              !search && !status ? (
                <Link
                  href="/clients/new"
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  <Plus className="size-3.5" />
                  Add your first client
                </Link>
              ) : undefined
            }
          />
        )}
      </div>
    </AppShell>
  );
}
