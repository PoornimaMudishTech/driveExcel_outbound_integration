import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "db-flex db-h-10 db-w-full db-rounded-md db-border db-border-input db-bg-background db-px-3 db-py-2 db-text-sm db-ring-offset-background file:db-border-0 file:db-bg-transparent file:db-text-sm file:db-font-medium placeholder:db-text-muted-foreground focus-visible:db-outline-none focus-visible:db-ring-2 focus-visible:db-ring-ring focus-visible:db-ring-offset-2 disabled:db-cursor-not-allowed disabled:db-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
);
Input.displayName = "Input";

export { Input };