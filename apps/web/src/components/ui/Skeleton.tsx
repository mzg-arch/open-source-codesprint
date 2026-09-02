import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.035),rgba(255,255,255,0.075),rgba(255,255,255,0.035))] bg-[length:200%_100%]",
        className,
      )}
    />
  );
}
