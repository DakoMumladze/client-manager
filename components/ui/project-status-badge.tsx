import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/types";

const statusStyles: Record<ProjectStatus, string> = {
  in_progress:
    "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  completed:
    "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
  on_hold:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

const statusLabels: Record<ProjectStatus, string> = {
  in_progress: "In Progress",
  completed: "Completed",
  on_hold: "On Hold",
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
