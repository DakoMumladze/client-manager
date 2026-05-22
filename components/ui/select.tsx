import * as React from "react";
import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, className, id, children, ...props }, ref) => {
    const select = (
      <select
        id={id}
        ref={ref}
        className={cn(
          "h-9 w-full rounded-md border border-border bg-muted px-2.5 text-sm text-foreground transition-colors focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );

    if (!label) return select;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-xs text-muted-foreground">
          {label}
        </label>
        {select}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
