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
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40">
      <input
        type="checkbox"
        checked={optimisticCompleted}
        onChange={handleToggle}
        disabled={isPending}
        aria-label={
          optimisticCompleted ? "Mark task incomplete" : "Mark task complete"
        }
        className="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-border text-primary transition-colors focus:ring-1 focus:ring-ring disabled:cursor-not-allowed"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "truncate text-sm font-medium text-foreground transition-colors",
              optimisticCompleted && "text-muted-foreground line-through",
            )}
          >
            {task.title}
          </p>
          <TaskPriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {task.description}
          </p>
        )}

        {task.due_date && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 text-muted-foreground" />
            {new Date(task.due_date + "T00:00:00").toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Link
          href={`/clients/${clientId}/projects/${projectId}/tasks/${task.id}/edit`}
          aria-label="Edit task"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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
