import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import type { ProblemSummary } from "@/types/problem";

import { DifficultyBadge } from "./DifficultyBadge";

export function ProblemRow({
  problem,
  index,
}: {
  problem: ProblemSummary;
  index: number;
}) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group grid gap-4 border-b border-[var(--border)] px-5 py-5 transition duration-200 last:border-b-0 hover:bg-[rgba(114,226,182,0.035)] sm:grid-cols-[48px_minmax(0,1fr)_130px_170px_32px] sm:items-center sm:px-6"
    >
      <span className="hidden font-mono text-xs text-[var(--muted)] sm:block">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p className="truncate font-medium transition group-hover:text-[var(--primary)]">
          {problem.title}
        </p>
        <p className="mt-1 truncate font-mono text-xs text-[var(--muted)]">
          {problem.slug}
        </p>
      </div>
      <div>
        <DifficultyBadge difficulty={problem.difficulty} />
      </div>
      <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
        <CalendarDays className="size-3.5" />
        {formatDate(problem.createdAt)}
      </span>
      <ArrowUpRight className="hidden size-4 text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white sm:block" />
    </Link>
  );
}
