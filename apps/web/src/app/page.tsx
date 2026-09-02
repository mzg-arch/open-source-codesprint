import Link from 'next/link';

const features = [
  {
    title: 'Open Source',
    description:
      'Explore how the platform works, contribute challenges, and help improve the ecosystem.',
  },
  {
    title: 'Secure Code Execution',
    description:
      'Run submissions inside isolated judge containers with time and memory limits.',
  },
  {
    title: 'AI-Guided Learning',
    description:
      'Get hints, explanations, and code feedback designed to help you learn instead of just giving answers.',
  },
  {
    title: 'Community Driven',
    description:
      'Practice problems, contribute new challenges, and learn alongside other developers.',
  },
];

export default function HomePage() {
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

          <div className="hidden items-center gap-8 text-sm text-zinc-300 md:flex">
            <Link
              href="/problems"
              className="transition hover:text-white"
            >
              Problems
            </Link>

            <a
              href="#features"
              className="transition hover:text-white"
            >
              Features
            </a>

            <Link
              href="/login"
              className="transition hover:text-white"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-zinc-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-28 pt-28 text-center md:pt-36">
        <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
          Open-source coding interview platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Master coding interviews by actually understanding your code.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
          Practice real programming problems, run solutions in
          a secure judge, track your progress, and learn with
          AI-guided feedback.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/register"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Start Practicing
          </Link>

          <Link
            href="/problems"
            className="rounded-xl border border-white/15 px-6 py-3 font-semibold transition hover:bg-white/5"
          >
            View Problems
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-white/10 bg-zinc-950"
      >
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Why CodeSprint
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              More than another coding challenge website.
            </h2>

            <p className="mt-4 leading-7 text-zinc-400">
              CodeSprint is built around learning, transparency,
              secure execution, and community contributions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="text-center text-4xl font-bold">
            How it works
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              ['01', 'Choose a problem'],
              ['02', 'Write your solution'],
              ['03', 'Submit to the judge'],
              ['04', 'Learn from the result'],
            ].map(([number, label]) => (
              <div
                key={number}
                className="rounded-2xl border border-white/10 p-6"
              >
                <span className="text-sm text-zinc-500">
                  {number}
                </span>

                <p className="mt-4 font-semibold">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold">
            Ready to start solving?
          </h2>

          <p className="mt-4 text-zinc-400">
            Create an account and start practicing with
            CodeSprint.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Create Account
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Open-Source CodeSprint</p>

          <p>Built for developers, by developers.</p>
        </div>
      </footer>
    </main>
  );
}