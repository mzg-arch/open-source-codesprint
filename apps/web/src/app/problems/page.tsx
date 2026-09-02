import Link from 'next/link';

type Problem = {
  id: string;
  title: string;
  slug: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  createdAt: string;
};

async function getProblems(): Promise<Problem[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/problems`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error('Failed to load problems');
  }

  return response.json();
}

function difficultyLabel(
  difficulty: Problem['difficulty'],
) {
  switch (difficulty) {
    case 'EASY':
      return 'Easy';
    case 'MEDIUM':
      return 'Medium';
    case 'HARD':
      return 'Hard';
  }
}

export default async function ProblemsPage() {
  const problems = await getProblems();

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            CodeSprint
          </Link>

          <div className="flex items-center gap-6 text-sm text-zinc-300">
            <Link
              href="/problems"
              className="text-white"
            >
              Problems
            </Link>

            <Link
              href="/login"
              className="transition hover:text-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Practice
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Problems
          </h1>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Practice coding challenges and submit
            solutions to the CodeSprint judge.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1fr_160px] border-b border-white/10 bg-zinc-950 px-6 py-4 text-sm text-zinc-500">
            <span>Problem</span>
            <span>Difficulty</span>
          </div>

          {problems.length === 0 ? (
            <div className="px-6 py-12 text-center text-zinc-500">
              No problems available yet.
            </div>
          ) : (
            problems.map((problem) => (
              <Link
                key={problem.id}
                href={`/problems/${problem.slug}`}
                className="grid grid-cols-[1fr_160px] items-center border-b border-white/10 px-6 py-5 transition last:border-b-0 hover:bg-white/[0.03]"
              >
                <div>
                  <p className="font-medium">
                    {problem.title}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {problem.slug}
                  </p>
                </div>

                <span className="text-sm">
                  {difficultyLabel(problem.difficulty)}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}