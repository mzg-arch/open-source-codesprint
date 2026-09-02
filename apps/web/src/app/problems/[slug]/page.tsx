import Link from "next/link";
import { ProblemWorkspace } from "@/components/problem-workspace";

type ProblemExample = {
  id: string;
  input: string;
  output: string;
  explanation?: string | null;
};

type StarterCode = {
  id: string;
  language: string;
  code: string;
};

type TestCase = {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
};

type Problem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  constraints?: string | null;
  timeLimit: number;
  memoryLimit: number;
  examples: ProblemExample[];
  starterCode: StarterCode[];
  testCases: TestCase[];
};

async function getProblem(slug: string): Promise<Problem> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  const response = await fetch(`${apiUrl}/problems/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load problem");
  }

  return response.json();
}

function difficultyLabel(difficulty: Problem["difficulty"]) {
  switch (difficulty) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
  }
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            CodeSprint
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-300">
            <Link href="/problems" className="transition hover:text-white">
              Problems
            </Link>

            <Link href="/login" className="transition hover:text-white">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/problems"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              ← Back to problems
            </Link>

            <h1 className="mt-4 text-4xl font-bold">{problem.title}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
                {difficultyLabel(problem.difficulty)}
              </span>

              <span className="text-sm text-zinc-500">
                {problem.timeLimit} ms
              </span>

              <span className="text-sm text-zinc-500">
                {problem.memoryLimit} MB
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold">Description</h2>

              <p className="mt-4 whitespace-pre-wrap leading-8 text-zinc-300">
                {problem.description}
              </p>
            </div>

            {problem.examples.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold">Examples</h2>

                <div className="mt-5 space-y-5">
                  {problem.examples.map((example, index) => (
                    <div
                      key={example.id}
                      className="rounded-xl border border-white/10 bg-zinc-950 p-5"
                    >
                      <p className="font-medium">Example {index + 1}</p>

                      <div className="mt-4 space-y-3 text-sm">
                        <div>
                          <p className="text-zinc-500">Input</p>

                          <pre className="mt-1 overflow-x-auto rounded-lg bg-black p-3 text-zinc-200">
                            {example.input}
                          </pre>
                        </div>

                        <div>
                          <p className="text-zinc-500">Output</p>

                          <pre className="mt-1 overflow-x-auto rounded-lg bg-black p-3 text-zinc-200">
                            {example.output}
                          </pre>
                        </div>

                        {example.explanation && (
                          <div>
                            <p className="text-zinc-500">Explanation</p>

                            <p className="mt-1 leading-6 text-zinc-300">
                              {example.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {problem.constraints && (
              <div>
                <h2 className="text-xl font-semibold">Constraints</h2>

                <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-zinc-950 p-5 text-sm leading-7 text-zinc-300">
                  {problem.constraints}
                </pre>
              </div>
            )}
          </section>

          <aside className="lg:sticky lg:top-6">
            <ProblemWorkspace
              problemSlug={problem.slug}
              starterCode={problem.starterCode}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
