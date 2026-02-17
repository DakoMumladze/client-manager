import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border border-stone-200 bg-white text-stone-800 hover:bg-stone-50",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantStyles;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "h-9 w-full rounded-md text-sm font-medium disabled:opacity-50 transition-colors",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

export { Button };
