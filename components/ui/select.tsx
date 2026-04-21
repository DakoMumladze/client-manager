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
          "h-9 w-full rounded-md border border-stone-200 bg-stone-100 px-2.5 text-sm text-stone-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors",
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
        <label htmlFor={id} className="text-xs text-stone-500">
          {label}
        </label>
        {select}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
