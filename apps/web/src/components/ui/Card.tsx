import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[rgba(42,36,43,0.9)] shadow-[0_12px_32px_rgba(12,8,13,0.1)] transition duration-200 hover:border-[var(--border-strong)] hover:shadow-[0_16px_36px_rgba(12,8,13,0.15)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
