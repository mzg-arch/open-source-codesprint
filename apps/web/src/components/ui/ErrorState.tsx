import { AlertTriangle } from "lucide-react";

import { Button } from "./Button";
import { Card } from "./Card";

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <Card className="flex flex-col items-center px-6 py-14 text-center">
      <span className="flex size-12 items-center justify-center rounded-lg border border-[rgba(255,122,144,0.2)] bg-[rgba(255,122,144,0.08)] text-[var(--danger)]">
        <AlertTriangle className="size-5" />
      </span>
      <h3 className="mt-5 font-semibold">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
        {description}
      </p>
      {onRetry && (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  );
}
