import type { ComponentType } from "react";

import { Card } from "@/components/ui/Card";

export function StatCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ComponentType<{ className?: string }>;
  accent?: "primary" | "secondary" | "cyan" | "warning";
}) {
  const color = {
    primary: "text-[var(--primary)] bg-[rgba(114,226,182,0.08)]",
    secondary: "text-[var(--secondary)] bg-[rgba(139,109,255,0.1)]",
    cyan: "text-[var(--primary)] bg-[rgba(114,226,182,0.08)]",
    warning: "text-[var(--warning)] bg-[rgba(242,191,103,0.08)]",
  }[accent];

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--muted)]">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <span
          className={`flex size-10 items-center justify-center rounded-md ${color}`}
        >
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-xs leading-5 text-[var(--muted)]">{detail}</p>
    </Card>
  );
}
