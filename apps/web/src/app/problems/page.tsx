import type { Metadata } from "next";
import { ListChecks, Sparkles } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ProblemList } from "@/components/problem/ProblemList";
import { getApiUrl } from "@/lib/api";
import type { ProblemSummary } from "@/types/problem";

export const metadata: Metadata = {
  title: "Problems",
  description: "Browse coding challenges and submit solutions to CodeSprint.",
};

async function getProblems(): Promise<ProblemSummary[]> {
  const response = await fetch(`${getApiUrl()}/problems`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load problems.");
  }

  return response.json();
}

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <main className="app-grid min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <div className="grid-background absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-18">
          <div className="flex size-10 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[rgba(114,226,182,0.08)] text-[var(--primary)]">
            <ListChecks className="size-5" />
          </div>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                Practice library
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Choose your next challenge.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--muted)]">
                Work through published problems and send your solution through
                the secure CodeSprint judge.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs text-[var(--muted)]">
              <Sparkles className="size-4 text-[var(--secondary)]" />
              {problems.length} published
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-12">
        <ProblemList initialProblems={problems} />
      </section>
      <Footer />
    </main>
  );
}
