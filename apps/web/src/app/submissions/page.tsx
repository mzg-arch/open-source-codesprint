"use client";

import { History, RefreshCw, Terminal } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { SubmissionResult } from "@/components/submission/SubmissionResult";
import { SubmissionRow } from "@/components/submission/SubmissionRow";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useSubmissions } from "@/hooks/useSubmission";
import { apiRequest } from "@/lib/api";
import type { Submission } from "@/types/submission";

export default function SubmissionsPage() {
  const { token } = useAuth();
  const { submissions, isLoading, error, refresh } = useSubmissions();
  const [selected, setSelected] = useState<Submission | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const handleSelect = useCallback(
    async (submission: Submission) => {
      setSelected(submission);
      setDetailError("");

      if (!token) {
        return;
      }

      setDetailLoading(true);
      try {
        const detail = await apiRequest<Submission>(
          `/submissions/${submission.id}`,
          { token },
        );
        setSelected(detail);
      } catch (caughtError) {
        setDetailError(
          caughtError instanceof Error
            ? caughtError.message
            : "Unable to load submission details.",
        );
      } finally {
        setDetailLoading(false);
      }
    },
    [token],
  );

  return (
    <AppShell
      eyebrow="Judge history"
      title="Submissions"
      description="Every solution you have sent to the CodeSprint judge, with its real status, runtime, and output."
      actions={
        <Button variant="secondary" size="sm" onClick={refresh}>
          <RefreshCw className="size-3.5" /> Refresh
        </Button>
      }
    >
      {error ? (
        <ErrorState description={error} onRetry={refresh} />
      ) : isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-lg" />
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <EmptyState
          title="No submissions yet"
          description="Choose a problem and submit a solution. Your complete judge history will appear here."
          action={
            <Link
              href="/problems"
              className="inline-flex h-10 items-center rounded-md bg-[var(--primary)] px-4 text-sm font-semibold text-[#171318] transition hover:-translate-y-px hover:bg-[var(--primary-hover)]"
            >
              Browse problems
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[rgba(42,36,43,0.92)]">
          <div className="hidden grid-cols-[minmax(0,1fr)_120px_150px_90px_170px_24px] border-b border-[var(--border)] bg-white/[0.02] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:grid">
            <span>Problem</span>
            <span>Language</span>
            <span>Status</span>
            <span>Runtime</span>
            <span>Submitted</span>
            <span />
          </div>
          {submissions.map((submission) => (
            <SubmissionRow
              key={submission.id}
              submission={submission}
              onSelect={(item) => void handleSelect(item)}
            />
          ))}
        </div>
      )}

      <Modal
        open={Boolean(selected)}
        title="Submission details"
        onClose={() => setSelected(null)}
      >
        {detailLoading ? (
          <div className="flex items-center gap-3 py-10 text-sm text-[var(--muted)]">
            <Spinner /> Loading submission...
          </div>
        ) : detailError ? (
          <ErrorState description={detailError} />
        ) : selected ? (
          <div className="space-y-6">
            <SubmissionResult submission={selected} />
            {selected.sourceCode && (
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  <Terminal className="size-3.5" /> Submitted source
                </p>
                <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-md border border-[var(--border)] bg-[var(--input)] p-4 font-mono text-xs leading-6 text-[#cbc7d3]">
                  {selected.sourceCode}
                </pre>
              </div>
            )}
            <p className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <History className="size-3.5" />
              Submission ID: {selected.id}
            </p>
          </div>
        ) : null}
      </Modal>
    </AppShell>
  );
}
