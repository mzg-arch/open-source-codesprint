import { cn } from "@/lib/utils";

type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-white/10 bg-white/[0.045] text-[var(--muted-strong)]",
  primary:
    "border-[rgba(139,108,255,0.25)] bg-[rgba(139,108,255,0.11)] text-[#b9a8ff]",
  success:
    "border-[rgba(114,226,182,0.24)] bg-[rgba(114,226,182,0.1)] text-[var(--success)]",
  warning:
    "border-[rgba(242,191,103,0.24)] bg-[rgba(242,191,103,0.1)] text-[var(--warning)]",
  danger:
    "border-[rgba(255,122,144,0.24)] bg-[rgba(255,122,144,0.1)] text-[var(--danger)]",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
