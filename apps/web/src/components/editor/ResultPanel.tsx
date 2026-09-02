import { Activity, Info } from "lucide-react";
import Link from "next/link";

import { SubmissionResult } from "@/components/submission/SubmissionResult";
import type { Submission } from "@/types/submission";

export function ResultPanel({
  submission,
  error,
}: {
  submission: Submission | null;
  error: string;
}) {
  return (
    <div className="min-h-32 border-t border-[var(--border)] bg-[var(--surface-raised)] p-4">
      <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        <Activity className="size-3.5" />
        Judge result
      </p>
      {error ? (
        <div className="rounded-md border border-[rgba(255,122,144,0.18)] bg-[rgba(255,122,144,0.06)] p-3 text-sm text-[var(--danger)]">
          {error}{" "}
          {error.includes("signed in") && (
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          )}
        </div>
      ) : submission ? (
        <SubmissionResult submission={submission} />
      ) : (
        <div className="flex items-start gap-2 text-sm leading-6 text-[var(--muted)]">
          <Info className="mt-1 size-3.5 shrink-0 text-[var(--cyan)]" />
          Submit your solution to see live judge progress and the final result.
        </div>
      )}
    </div>
  );
}
