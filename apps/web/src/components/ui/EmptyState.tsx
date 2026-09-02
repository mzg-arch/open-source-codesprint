import { Inbox } from "lucide-react";

import { Card } from "./Card";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--input)] text-[var(--muted)]">
        <Inbox className="size-5" />
      </span>
      <h3 className="mt-5 font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </Card>
  );
}
