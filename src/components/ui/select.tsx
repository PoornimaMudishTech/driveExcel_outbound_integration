import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "db-flex db-h-10 db-w-full db-rounded-md db-border db-border-input db-bg-background db-px-3 db-py-2 db-text-sm db-ring-offset-background focus-visible:db-outline-none focus-visible:db-ring-2 focus-visible:db-ring-ring focus-visible:db-ring-offset-2 disabled:db-cursor-not-allowed disabled:db-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
);
Select.displayName = "Select";

export { Select };