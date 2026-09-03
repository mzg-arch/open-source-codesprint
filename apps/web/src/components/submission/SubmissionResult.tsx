import { Clock3, Terminal } from "lucide-react";

import type { Submission } from "@/types/submission";

import {
  parseReturnValidationFeedback,
  ReturnValidationFeedback,
} from "./ReturnValidationFeedback";
import { SubmissionStatus } from "./SubmissionStatus";

export function SubmissionResult({ submission }: { submission: Submission }) {
  const returnValidationFeedback = parseReturnValidationFeedback(
    submission.output,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SubmissionStatus status={submission.status} />
        {submission.runtimeMs !== null && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
            <Clock3 className="size-3.5" />
            {submission.runtimeMs} ms
          </span>
        )}
      </div>
      {returnValidationFeedback ? (
        <ReturnValidationFeedback feedback={returnValidationFeedback} />
      ) : submission.output ? (
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            <Terminal className="size-3.5" />
            Judge output
          </p>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--input)] p-4 font-mono text-xs leading-6 text-[#cbc7d3]">
            {submission.output}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
