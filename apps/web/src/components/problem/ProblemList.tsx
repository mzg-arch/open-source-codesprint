"use client";

import { ArrowUpDown, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "@/components/ui/EmptyState";
import type { Difficulty, ProblemSummary } from "@/types/problem";

import { ProblemRow } from "./ProblemRow";

type DifficultyFilter = "ALL" | Difficulty;
type SortOption = "newest" | "title" | "difficulty";

const difficultyOrder: Record<Difficulty, number> = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
};

export function ProblemList({
  initialProblems,
}: {
  initialProblems: ProblemSummary[];
}) {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("ALL");
  const [sort, setSort] = useState<SortOption>("newest");

  const problems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = initialProblems.filter((problem) => {
      const matchesSearch =
        !normalizedQuery ||
        problem.title.toLowerCase().includes(normalizedQuery) ||
        problem.slug.toLowerCase().includes(normalizedQuery);
      const matchesDifficulty =
        difficulty === "ALL" || problem.difficulty === difficulty;
      return matchesSearch && matchesDifficulty;
    });

    return [...filtered].sort((first, second) => {
      if (sort === "title") {
        return first.title.localeCompare(second.title);
      }
      if (sort === "difficulty") {
        return (
          difficultyOrder[first.difficulty] -
          difficultyOrder[second.difficulty]
        );
      }
      return (
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime()
      );
    });
  }, [difficulty, initialProblems, query, sort]);

  return (
    <div>
      <div className="mb-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
        <label className="relative">
          <span className="sr-only">Search problems</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or slug..."
            className="h-11 w-full rounded-md border border-[var(--border)] bg-[var(--input)] pl-11 pr-4 text-sm placeholder:text-[#77717b] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(114,226,182,0.12)]"
          />
        </label>
        <label className="relative">
          <span className="sr-only">Filter by difficulty</span>
          <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <select
            value={difficulty}
            onChange={(event) =>
              setDifficulty(event.target.value as DifficultyFilter)
            }
            className="h-11 w-full appearance-none rounded-md border border-[var(--border)] bg-[var(--input)] pl-11 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(114,226,182,0.12)]"
          >
            <option value="ALL">All difficulties</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </label>
        <label className="relative">
          <span className="sr-only">Sort problems</span>
          <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--muted)]" />
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="h-11 w-full appearance-none rounded-md border border-[var(--border)] bg-[var(--input)] pl-11 pr-4 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(114,226,182,0.12)]"
          >
            <option value="newest">Newest first</option>
            <option value="title">Title A–Z</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </label>
      </div>

      {problems.length === 0 ? (
        <EmptyState
          title="No matching problems"
          description="Try another search term or clear the difficulty filter."
        />
      ) : (
        <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-[rgba(42,36,43,0.92)]">
          <div className="hidden grid-cols-[48px_minmax(0,1fr)_130px_170px_32px] border-b border-[var(--border)] bg-white/[0.02] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)] sm:grid">
            <span>#</span>
            <span>Problem</span>
            <span>Difficulty</span>
            <span>Added</span>
            <span />
          </div>
          {problems.map((problem, index) => (
            <ProblemRow key={problem.id} problem={problem} index={index} />
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-[var(--muted)]">
        Showing {problems.length} of {initialProblems.length} published problems
      </p>
    </div>
  );
}
