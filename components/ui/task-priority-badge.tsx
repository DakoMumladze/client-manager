import { cn } from "@/lib/utils";
import type { TaskPriority } from "@/lib/types";

const priorityStyles: Record<TaskPriority, string> = {
  low: "border-border bg-muted text-muted-foreground",
  medium:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  high: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400",
};

const priorityLabels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        priorityStyles[priority],
      )}
    >
      {priorityLabels[priority]}
    </span>
  );
}
