import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "border-stone-200 bg-stone-100",
  secondary: "border-stone-300 bg-white",
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  variant?: keyof typeof variantStyles;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, variant = "primary", className, id, ...props }, ref) => {
    const input = (
      <input
        id={id}
        ref={ref}
        className={cn(
          "h-9 w-full rounded-md border px-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-xs text-stone-500">
          {label}
        </label>
        {input}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
