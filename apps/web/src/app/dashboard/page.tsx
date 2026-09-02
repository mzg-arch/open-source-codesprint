"use client";

import {
  Award,
  CheckCircle2,
  Flame,
  Gauge,
  ListChecks,
  Plus,
} from "lucide-react";
import Link from "next/link";

import { AppShell } from "@/components/layout/AppShell";
import { DifficultyBadge } from "@/components/problem/DifficultyBadge";
import { Card } from "@/components/ui/Card";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  ProgressCard,
} from "@/components/dashboard/ProgressCard";
import { RecentSubmissionCard } from "@/components/dashboard/RecentSubmissionCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAuth } from "@/hooks/useAuth";
import { useProblems } from "@/hooks/useProblems";
import { useSubmissions } from "@/hooks/useSubmission";
import { formatDate, formatPercent } from "@/lib/utils";
import type { Difficulty } from "@/types/problem";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    problems,
    isLoading: problemsLoading,
    error: problemsError,
    refresh: refreshProblems,
  } = useProblems();
  const {
    submissions,
    isLoading: submissionsLoading,
    error: submissionsError,
    refresh: refreshSubmissions,
  } = useSubmissions();

  const accepted = submissions.filter(
    (submission) => submission.status === "ACCEPTED",
  );
  const solvedSlugs = new Set(
    accepted
      .map((submission) => submission.problem?.slug)
      .filter((slug): slug is string => Boolean(slug)),
  );
  const acceptanceRate =
    submissions.length === 0 ? 0 : (accepted.length / submissions.length) * 100;
  const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"];
  const progress = difficulties.map((difficulty) => ({
    difficulty,
    total: problems.filter((problem) => problem.difficulty === difficulty)
      .length,
    solved: new Set(
      accepted
        .filter((submission) => submission.problem?.difficulty === difficulty)
        .map((submission) => submission.problem?.slug)
        .filter((slug): slug is string => Boolean(slug)),
    ).size,
  }));
  const isLoading = problemsLoading || submissionsLoading;
  const error = problemsError || submissionsError;

  return (
    <AppShell
      eyebrow="Your progress"
      title={user ? `Welcome back, ${user.username}` : "Dashboard"}
      description="A real-time view of your practice history and the problems waiting for your next solution."
      actions={
        <Link
          href="/problems"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-3 text-xs font-semibold text-[#171318] transition duration-200 hover:-translate-y-px hover:bg-[var(--primary-hover)]"
        >
          <Plus className="size-3.5" /> Solve a problem
        </Link>
      }
    >
      {error ? (
        <ErrorState
          description={error}
          onRetry={() => {
            refreshProblems();
            refreshSubmissions();
          }}
        />
      ) : isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-40 rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Problems solved"
              value={solvedSlugs.size}
              detail={`Across ${problems.length} published problems`}
              icon={Award}
              accent="secondary"
            />
            <StatCard
              label="Total submissions"
              value={submissions.length}
              detail="All attempts sent to the judge"
              icon={ListChecks}
              accent="primary"
            />
            <StatCard
              label="Accepted"
              value={accepted.length}
              detail="Accepted submission attempts"
              icon={CheckCircle2}
              accent="cyan"
            />
            <StatCard
              label="Acceptance rate"
              value={formatPercent(acceptanceRate)}
              detail="Accepted attempts divided by all attempts"
              icon={Gauge}
              accent="warning"
            />
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.55fr)]">
            <RecentSubmissionCard submissions={submissions} />
            <ProgressCard progress={progress} />
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <Card className="overflow-hidden">
              <div className="border-b border-[var(--border)] px-5 py-4 sm:px-6">
                <h2 className="font-semibold">Recently added problems</h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Latest published practice material
                </p>
              </div>
              {problems.slice(0, 4).map((problem) => (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.slug}`}
                  className="flex items-center justify-between gap-4 border-b border-[var(--border)] px-5 py-4 transition last:border-b-0 hover:bg-white/[0.025] sm:px-6"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {problem.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {formatDate(problem.createdAt)}
                    </p>
                  </div>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </Link>
              ))}
            </Card>

            {/* TODO: Replace this placeholder when daily activity data is exposed by the API. */}
            <Card className="p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-[rgba(242,191,103,0.08)] text-[var(--warning)]">
                <Flame className="size-5" />
              </span>
              <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                Current streak
              </p>
              <p className="mt-2 text-3xl font-semibold">—</p>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Streaks are not tracked by the current API. A future daily
                activity endpoint is required before this can show real data.
              </p>
            </Card>
          </section>
        </>
      )}
    </AppShell>
  );
}
