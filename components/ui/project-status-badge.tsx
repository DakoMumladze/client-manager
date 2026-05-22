import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/types";

const statusStyles: Record<ProjectStatus, string> = {
  in_progress: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  on_hold: "bg-yellow-50 text-yellow-700 border-yellow-200",
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
