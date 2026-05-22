"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProjectStatus, TaskPriority } from "@/lib/types";

export type DashboardStats = {
  totalClients: number;
  totalProjects: number;
  totalTasks: number;
  activeProjects: number;
  tasksDueToday: number;
  completedPercentage: number;
  projectsByStatus: Record<ProjectStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
};

export async function getDashboardStats(): Promise<{
  data: DashboardStats | null;
  error?: string;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: "You must be signed in." };
  }

  const [clientsResult, projectsResult, tasksResult] = await Promise.all([
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase.from("projects").select("status").eq("user_id", user.id),
    supabase
      .from("tasks")
      .select("priority, completed, due_date")
      .eq("user_id", user.id),
  ]);

  if (clientsResult.error || projectsResult.error || tasksResult.error) {
    return { data: null, error: "Failed to load dashboard stats." };
  }

  const projects = projectsResult.data ?? [];
  const tasks = tasksResult.data ?? [];

  const projectsByStatus: Record<ProjectStatus, number> = {
    in_progress: 0,
    completed: 0,
    on_hold: 0,
  };
  for (const project of projects) {
    const status = project.status as ProjectStatus;
    if (status in projectsByStatus) {
      projectsByStatus[status] += 1;
    }
  }

  const tasksByPriority: Record<TaskPriority, number> = {
    low: 0,
    medium: 0,
    high: 0,
  };
  const today = new Date().toISOString().slice(0, 10);
  let completedTasks = 0;
  let tasksDueToday = 0;
  for (const task of tasks) {
    const priority = task.priority as TaskPriority;
    if (priority in tasksByPriority) {
      tasksByPriority[priority] += 1;
    }
    if (task.completed) {
      completedTasks += 1;
    } else if (task.due_date === today) {
      tasksDueToday += 1;
    }
  }

  const totalTasks = tasks.length;
  const completedPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    data: {
      totalClients: clientsResult.count ?? 0,
      totalProjects: projects.length,
      totalTasks,
      activeProjects: projectsByStatus.in_progress,
      tasksDueToday,
      completedPercentage,
      projectsByStatus,
      tasksByPriority,
    },
  };
}
