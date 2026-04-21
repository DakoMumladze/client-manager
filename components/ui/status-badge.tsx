import { cn } from "@/lib/utils";
import type { ClientStatus } from "@/lib/types";

const statusStyles: Record<ClientStatus, string> = {
  lead: "bg-stone-100 text-stone-700 border-stone-200",
  active: "bg-green-50 text-green-700 border-green-200",
  archived: "bg-yellow-50 text-yellow-700 border-yellow-200",
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
