import { ChevronRight, Clock3 } from "lucide-react";

import { DifficultyBadge } from "@/components/problem/DifficultyBadge";
import { formatDate } from "@/lib/utils";
import type { Submission } from "@/types/submission";

import { SubmissionStatus } from "./SubmissionStatus";

export function SubmissionRow({
  submission,
  onSelect,
}: {
  submission: Submission;
  onSelect: (submission: Submission) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(submission)}
      className="group grid w-full gap-3 border-b border-[var(--border)] px-5 py-5 text-left transition duration-200 last:border-b-0 hover:bg-[rgba(114,226,182,0.035)] sm:grid-cols-[minmax(0,1fr)_120px_150px_90px_170px_24px] sm:items-center sm:px-6"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium group-hover:text-[var(--primary)]">
          {submission.problem?.title ?? "Problem"}
        </p>
        {submission.problem && (
          <div className="mt-1">
            <DifficultyBadge difficulty={submission.problem.difficulty} />
          </div>
        )}
      </div>
      <span className="font-mono text-xs capitalize text-[var(--muted-strong)]">
        {submission.language}
      </span>
      <SubmissionStatus status={submission.status} />
      <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Clock3 className="size-3.5" />
        {submission.runtimeMs === null ? "—" : `${submission.runtimeMs} ms`}
      </span>
      <span className="text-xs text-[var(--muted)]">
        {formatDate(submission.createdAt)}
      </span>
      <ChevronRight className="hidden size-4 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-white sm:block" />
    </button>
  );
}
