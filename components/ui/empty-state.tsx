import * as React from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-stone-200 bg-white px-6 py-16 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-3 text-stone-300">{icon}</div>
      )}
      <p className="text-sm font-medium text-stone-700">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-stone-400">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
