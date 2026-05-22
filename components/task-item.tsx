"use client";

import Link from "next/link";
import { useOptimistic, useTransition } from "react";
import { CalendarDays, Pencil } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { TaskPriorityBadge } from "@/components/ui/task-priority-badge";
import { DeleteTaskButton } from "@/components/delete-task-button";
import { toggleTask } from "@/actions/toggle-task";
import type { Task } from "@/lib/types";

export function TaskItem({
  task,
  clientId,
  projectId,
}: {
  task: Task;
  clientId: string;
  projectId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    task.completed,
  );

  function handleToggle() {
    const next = !task.completed;
    startTransition(async () => {
      setOptimisticCompleted(next);
      const result = await toggleTask(task.id, next, projectId, clientId);
      if (result?.error) {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-3">
      <input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleToggle}
        disabled={isPending}
        aria-label={
          optimisticCompleted ? "Mark task incomplete" : "Mark task complete"
        }
        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-stone-300 text-blue-500 focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm font-medium text-stone-800",
              optimisticCompleted && "text-stone-400 line-through",
            )}
          >
            {task.title}
          </p>
          <TaskPriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-stone-500">
            {task.description}
          </p>
        )}

        {task.due_date && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
            <CalendarDays className="size-3.5 text-stone-400" />
            {new Date(task.due_date + "T00:00:00").toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link
          href={`/clients/${clientId}/projects/${projectId}/tasks/${task.id}/edit`}
          aria-label="Edit task"
          className="rounded-md p-1.5 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
        >
          <Pencil className="size-3.5" />
        </Link>
        <DeleteTaskButton
          taskId={task.id}
          projectId={projectId}
          clientId={clientId}
        />
      </div>
    </div>
  );
}
