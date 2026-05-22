import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-muted",
  secondary: "bg-card",
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
          "h-9 w-full rounded-md border border-border px-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );

    if (!label) return input;

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-xs text-muted-foreground">
          {label}
        </label>
        {input}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
