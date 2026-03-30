"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/actions/create-client";
import { updateClient } from "@/actions/update-client";
import type { Client } from "@/components/client-card";

const statuses = [
  { label: "Lead", value: "lead" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

export function ClientForm({ client }: { client?: Client }) {
  const action = client
    ? updateClient.bind(null, client.id)
    : createClient;

  const [state, formAction, pending] = useActionState(action, null);

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

        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-xs text-stone-500">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={client?.status ?? "lead"}
            className="h-9 w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 text-sm text-stone-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            {statuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
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

      {state?.error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2"
        >
          <p className="text-sm text-red-700">{state.error}</p>
        </div>
      )}

      {state?.success && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2"
        >
          <p className="text-sm text-green-800">{state.success}</p>
        </div>
      )}

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
