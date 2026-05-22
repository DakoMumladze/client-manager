"use client";

import { useMemo, useState } from "react";
import { Select } from "@/components/ui/select";
import { TaskItem } from "@/components/task-item";
import type { Task, TaskPriority } from "@/lib/types";

type SortKey = "priority" | "due_date";

const priorityRank: Record<TaskPriority, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function TaskList({
  tasks,
  clientId,
  projectId,
}: {
  tasks: Task[];
  clientId: string;
  projectId: string;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("priority");

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (sortKey === "priority") {
        return priorityRank[b.priority] - priorityRank[a.priority];
      }
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return a.due_date.localeCompare(b.due_date);
    });
  }, [tasks, sortKey]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <Select
          id="task-sort"
          aria-label="Sort tasks"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="w-auto"
        >
          <option value="priority">Sort: Priority</option>
          <option value="due_date">Sort: Due date</option>
        </Select>
      </div>

      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          clientId={clientId}
          projectId={projectId}
        />
      ))}
    </div>
  );
}
