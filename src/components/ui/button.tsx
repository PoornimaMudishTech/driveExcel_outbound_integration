import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "db-inline-flex db-items-center db-justify-center db-rounded-md db-text-sm db-font-medium db-transition-colors focus-visible:db-outline-none disabled:db-pointer-events-none disabled:db-opacity-50";
    
    const variants: Record<ButtonVariant, string> = {
      default: "db-bg-blue-500 db-text-white hover:db-bg-blue-600",
      destructive: "db-bg-red-500 db-text-white hover:db-bg-red-600",
      outline: "db-border db-border-gray-300 db-bg-transparent hover:db-bg-gray-100",
      secondary: "db-bg-gray-200 db-text-gray-900 hover:db-bg-gray-300",
      ghost: "hover:db-bg-gray-100",
      link: "db-text-blue-500 db-underline-offset-4 hover:db-underline",
    };

    const sizes: Record<ButtonSize, string> = {
      default: "db-h-10 db-px-4 db-py-2",
      sm: "db-h-9 db-rounded-md db-px-3",
      lg: "db-h-11 db-rounded-md db-px-8",
      icon: "db-h-10 db-w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };