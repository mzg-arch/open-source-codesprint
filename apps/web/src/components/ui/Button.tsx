import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--primary)] text-[#171318] shadow-[0_8px_24px_rgba(114,226,182,0.12)] hover:-translate-y-px hover:bg-[var(--primary-hover)] hover:shadow-[0_12px_28px_rgba(114,226,182,0.16)]",
  secondary:
    "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:-translate-y-px hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)]",
  ghost:
    "text-[var(--muted-strong)] hover:bg-[var(--surface-raised)] hover:text-white",
  danger:
    "border border-[rgba(255,122,144,0.25)] bg-[rgba(255,122,144,0.1)] text-[var(--danger)] hover:bg-[rgba(255,122,144,0.16)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", type = "button", ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
