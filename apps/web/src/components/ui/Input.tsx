import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, id, ...props },
  ref,
) {
  return (
    <label className="block" htmlFor={id}>
      {label && (
        <span className="mb-2 block text-xs font-medium tracking-wide text-[var(--muted-strong)]">
          {label}
        </span>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          "h-12 w-full rounded-md border border-[var(--border)] bg-[var(--input)] px-4 text-sm text-[var(--foreground)] placeholder:text-[#77717b] transition duration-200 hover:border-[var(--border-strong)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(114,226,182,0.12)] disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[var(--danger)]",
          className,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error && id ? `${id}-error` : undefined}
        {...props}
      />
      {error && id && (
        <span
          id={`${id}-error`}
          className="mt-1.5 block text-xs text-[var(--danger)]"
        >
          {error}
        </span>
      )}
    </label>
  );
});
