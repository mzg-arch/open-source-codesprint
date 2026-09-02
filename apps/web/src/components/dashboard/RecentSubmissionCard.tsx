import { ArrowRight, History } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";
import type { Submission } from "@/types/submission";

import { SubmissionStatus } from "../submission/SubmissionStatus";

export function RecentSubmissionCard({
  submissions,
}: {
  submissions: Submission[];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-md bg-[rgba(114,226,182,0.08)] text-[var(--primary)]">
            <History className="size-4" />
          </span>
          <div>
            <h2 className="font-semibold">Recent submissions</h2>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              Latest judge activity
            </p>
          </div>
        </div>
        <Link
          href="/submissions"
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--primary-strong)] hover:text-white"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>
      {submissions.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-[var(--muted)]">
          Your submissions will appear here.
        </div>
      ) : (
        <div>
          {submissions.slice(0, 5).map((submission) => (
            <div
              key={submission.id}
              className="flex flex-col gap-3 border-b border-[var(--border)] px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="min-w-0">
                <Link
                  href={
                    submission.problem
                      ? `/problems/${submission.problem.slug}`
                      : "/submissions"
                  }
                  className="truncate text-sm font-medium hover:text-[var(--secondary)]"
                >
                  {submission.problem?.title ?? "Problem"}
                </Link>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {submission.language} · {formatDate(submission.createdAt)}
                </p>
              </div>
              <SubmissionStatus status={submission.status} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
