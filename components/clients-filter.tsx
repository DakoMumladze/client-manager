"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const statuses = [
  { label: "All Statuses", value: "" },
  { label: "Lead", value: "lead" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
];

export function ClientsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/clients?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
        <Input
          placeholder="Search clients..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="pl-8"
        />
      </div>
      <select
        value={currentStatus}
        onChange={(e) => updateParams("status", e.target.value)}
        className="h-9 rounded-md border border-stone-200 bg-stone-100 px-2.5 text-sm text-stone-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
