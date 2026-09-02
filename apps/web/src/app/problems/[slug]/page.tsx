import { ChevronLeft, Clock3, Cpu, Eye } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProblemWorkspace } from "@/components/editor/ProblemWorkspace";
import { Navbar } from "@/components/layout/Navbar";
import { DifficultyBadge } from "@/components/problem/DifficultyBadge";
import { ProblemDescription } from "@/components/problem/ProblemDescription";
import { getApiUrl } from "@/lib/api";
import type { Problem } from "@/types/problem";

async function getProblem(slug: string): Promise<Problem | null> {
  const response = await fetch(`${getApiUrl()}/problems/${slug}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to load problem.");
  }

  return response.json();
}

export default async function ProblemPage({
  params,
}: PageProps<"/problems/[slug]">) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    notFound();
  }

  return (
    <main className="app-grid min-h-screen">
      <Navbar compact />
      <div className="border-b border-[var(--border)] bg-[rgba(42,36,43,0.9)] backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] transition hover:text-white"
          >
            <ChevronLeft className="size-3.5" /> Back to problems
          </Link>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {problem.title}
                </h1>
                <DifficultyBadge difficulty={problem.difficulty} />
              </div>
              <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                /problems/{problem.slug}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <Clock3 className="size-3.5 text-[var(--cyan)]" />
                {problem.timeLimit} ms
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="size-3.5 text-[var(--primary-strong)]" />
                {problem.memoryLimit} MB
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5 text-[var(--secondary)]" />
                {problem.testCases.length} visible tests
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:items-start">
        <section className="min-w-0 rounded-lg border border-[var(--border)] bg-[rgba(42,36,43,0.92)] p-5 sm:p-7">
          <ProblemDescription problem={problem} />
        </section>
        <aside className="min-w-0 lg:sticky lg:top-4">
          <ProblemWorkspace
            problemSlug={problem.slug}
            starterCode={problem.starterCode}
          />
        </aside>
      </div>
    </main>
  );
}
