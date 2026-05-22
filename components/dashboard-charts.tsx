"use client";

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProjectStatus, TaskPriority } from "@/lib/types";

const projectStatusMeta: Record<
  ProjectStatus,
  { label: string; color: string }
> = {
  in_progress: { label: "In Progress", color: "#3b82f6" },
  completed: { label: "Completed", color: "#22c55e" },
  on_hold: { label: "On Hold", color: "#eab308" },
};

const taskPriorityMeta: Record<TaskPriority, { label: string; color: string }> =
  {
    low: { label: "Low", color: "#a8a29e" },
    medium: { label: "Medium", color: "#f59e0b" },
    high: { label: "High", color: "#ef4444" },
  };

export function DashboardCharts({
  projectsByStatus,
  tasksByPriority,
}: {
  projectsByStatus: Record<ProjectStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
}) {
  const projectData = (Object.keys(projectStatusMeta) as ProjectStatus[]).map(
    (status) => ({
      name: projectStatusMeta[status].label,
      value: projectsByStatus[status],
      color: projectStatusMeta[status].color,
    }),
  );

  const taskData = (Object.keys(taskPriorityMeta) as TaskPriority[]).map(
    (priority) => ({
      name: taskPriorityMeta[priority].label,
      value: tasksByPriority[priority],
      color: taskPriorityMeta[priority].color,
    }),
  );

  const hasProjects = projectData.some((d) => d.value > 0);
  const hasTasks = taskData.some((d) => d.value > 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Projects by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {hasProjects ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#78716c" }}
                    axisLine={{ stroke: "#e7e5e4" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#78716c" }}
                    axisLine={{ stroke: "#e7e5e4" }}
                    tickLine={false}
                  />
                  <Tooltip cursor={{ fill: "#f5f5f4" }} />
                  <Bar dataKey="value" name="Projects" radius={[4, 4, 0, 0]}>
                    {projectData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No projects to chart yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tasks by Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {hasTasks ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {taskData.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    height={32}
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No tasks to chart yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
