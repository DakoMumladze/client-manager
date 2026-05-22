import { cn } from "@/lib/utils";
import type { ClientStatus } from "@/lib/types";

const statusStyles: Record<ClientStatus, string> = {
  lead: "border-border bg-muted text-muted-foreground",
  active:
    "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400",
  archived:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
};

export function StatusBadge({ status }: { status: ClientStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
