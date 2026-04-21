"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createClient } from "@/actions/create-client";
import { updateClient } from "@/actions/update-client";
import type { Client } from "@/lib/types";

const statuses = [
  { label: "Lead", value: "lead" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

export function ClientForm({ client }: { client?: Client }) {
  const router = useRouter();
  const action = client
    ? updateClient.bind(null, client.id)
    : createClient;

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
    if (state?.success) {
      toast.success(state.success);
      router.push(client ? `/clients/${client.id}` : "/clients");
    }
  }, [state, client, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          id="name"
          name="name"
          type="text"
          required
          defaultValue={client?.name ?? ""}
          placeholder="Client name..."
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          defaultValue={client?.email ?? ""}
          placeholder="client@example.com"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          id="phone"
          name="phone"
          type="tel"
          defaultValue={client?.phone ?? ""}
          placeholder="+1 (555) 000-0000"
        />

        <Select
          label="Status"
          id="status"
          name="status"
          defaultValue={client?.status ?? "lead"}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-xs text-stone-500">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={client?.notes ?? ""}
          placeholder="Any notes about this client..."
          className="w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 py-2 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <Button type="submit" disabled={pending} className="w-auto px-6">
          {pending
            ? "Saving..."
            : client
              ? "Save changes"
              : "Create client"}
        </Button>
      </div>
    </form>
  );
}
