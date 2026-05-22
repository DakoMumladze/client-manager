import { AppShell } from "@/components/app-shell";

export default function DashboardLoading() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-muted" />
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl border border-border bg-muted"
              />
            ))}
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-xl border border-border bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
