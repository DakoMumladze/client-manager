import { redirect } from "next/navigation";
import { Users, FolderKanban, CalendarClock, CircleCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getDashboardStats } from "@/actions/get-dashboard-stats";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { DashboardCharts } from "@/components/dashboard-charts";
import { EmptyState } from "@/components/ui/empty-state";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const { data: stats } = await getDashboardStats();

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            An overview of your clients, projects, and tasks.
          </p>
        </div>

        {!stats ? (
          <EmptyState
            title="Couldn't load your dashboard"
            description="Something went wrong while loading your stats. Please try again."
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Total Clients"
                value={stats.totalClients}
                icon={<Users className="size-5" />}
              />
              <StatCard
                label="Active Projects"
                value={stats.activeProjects}
                icon={<FolderKanban className="size-5" />}
              />
              <StatCard
                label="Tasks Due Today"
                value={stats.tasksDueToday}
                icon={<CalendarClock className="size-5" />}
              />
              <StatCard
                label="Completed Tasks"
                value={`${stats.completedPercentage}%`}
                icon={<CircleCheck className="size-5" />}
              />
            </div>

            <DashboardCharts
              projectsByStatus={stats.projectsByStatus}
              tasksByPriority={stats.tasksByPriority}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
}
