import Link from "next/link";
import { Plus, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { ClientCard } from "@/components/client-card";
import { ClientsFilter } from "@/components/clients-filter";
import { Button } from "@/components/ui/button";

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

  let query = supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data: clients } = await query;

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
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
          <div className="flex flex-col items-center rounded-xl border bg-white py-16">
            <Users className="size-10 text-stone-300" />
            <p className="mt-3 text-sm text-stone-500">No clients found.</p>
            <Link
              href="/clients/new"
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              <Plus className="size-3.5" />
              Add your first client
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
