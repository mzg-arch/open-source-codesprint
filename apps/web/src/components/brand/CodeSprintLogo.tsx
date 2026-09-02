import { cn } from "@/lib/utils";

export function CodeSprintLogo({
  className,
  markClassName,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]",
          markClassName,
        )}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="size-full" fill="none">
          <path
            d="M23.5 7.5H13L7.5 12.8l5.2 5.1h7.1l-4.6 4.6H7.8"
            stroke="#72E2B6"
            strokeWidth="3.1"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="m20.8 10.6 3.7 3.6-3.4 3.3"
            stroke="#8B6DFF"
            strokeWidth="2.2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <rect x="21.7" y="21.2" width="3.6" height="3.6" fill="#8B6DFF" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-semibold tracking-[-0.02em] text-[var(--foreground)]">
          CodeSprint
        </span>
      )}
    </span>
  );
}
