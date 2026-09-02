import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  GitFork,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const benefits = [
  {
    icon: ListChecks,
    title: "Practice real interview questions",
    description:
      "Build confidence with focused programming challenges that strengthen the patterns technical interviews test.",
  },
  {
    icon: MessageSquareText,
    title: "Get feedback right away",
    description:
      "Submit your solution and quickly see whether it passes, so every attempt becomes a useful learning loop.",
  },
  {
    icon: BarChart3,
    title: "See your progress clearly",
    description:
      "Keep your solved problems, submission history, acceptance rate, and difficulty progress in one place.",
  },
  {
    icon: Lightbulb,
    title: "Learn by solving",
    description:
      "Move beyond memorized answers by writing, testing, and improving real code one challenge at a time.",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose a challenge",
    description:
      "Search the problem library and start at the difficulty that fits your goals.",
  },
  {
    number: "02",
    title: "Build your solution",
    description:
      "Work in a focused coding workspace with the prompt, examples, and editor side by side.",
  },
  {
    number: "03",
    title: "Learn from the result",
    description:
      "Review the verdict, refine your approach, and build a visible record of progress.",
  },
];

export default function HomePage() {
  return (
    <main className="app-grid min-h-screen overflow-hidden text-[var(--foreground)]">
      <Navbar />

      <section className="relative border-b border-[var(--border)]">
        <div className="grid-background absolute inset-0" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(114,226,182,0.08),transparent_26rem)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28 lg:pb-32 lg:pt-32">
          <div className="mb-7 inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[rgba(42,36,43,0.78)] px-3.5 py-2 text-xs font-medium text-[var(--muted-strong)] backdrop-blur">
            <Sparkles className="size-3.5 text-[var(--primary)]" />
            Open-source coding interview practice
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Turn practice into{" "}
            <span className="text-gradient">interview confidence.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            Solve real programming challenges, get instant feedback on every
            submission, and track the progress that prepares you for technical
            interviews.
          </p>
          <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-6 text-sm font-semibold text-[#171318] shadow-[0_10px_28px_rgba(114,226,182,0.12)] transition duration-200 hover:-translate-y-px hover:bg-[var(--primary-hover)]"
            >
              Start practicing <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/problems"
              className="inline-flex h-12 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-6 text-sm font-semibold text-[var(--muted-strong)] transition duration-200 hover:-translate-y-px hover:border-[var(--border-strong)] hover:bg-[var(--surface-raised)] hover:text-white"
            >
              Browse problems
            </Link>
          </div>

          <div className="panel-glow mt-14 grid w-full max-w-5xl overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[rgba(42,36,43,0.94)] text-left backdrop-blur lg:grid-cols-[1.35fr_0.65fr]">
            <div className="border-b border-[var(--border)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Practice session
                  </p>
                  <h2 className="mt-1.5 font-semibold">Valid Parentheses</h2>
                </div>
                <span className="rounded-md border border-[rgba(114,226,182,0.24)] bg-[rgba(114,226,182,0.08)] px-2.5 py-1 text-[10px] font-semibold text-[var(--primary)]">
                  Easy
                </span>
              </div>
              <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--input)] p-4 font-mono text-xs leading-6 text-[var(--muted-strong)] sm:p-5">
                <p className="text-[var(--muted)]">
                  {"// Return true when every bracket closes correctly"}
                </p>
                <p className="mt-3">
                  <span className="text-[var(--secondary)]">function</span>{" "}
                  <span className="text-[var(--primary)]">isValid</span>
                  (input) {"{"}
                </p>
                <p className="pl-5 text-[var(--muted)]">
                  {"// build your solution here"}
                </p>
                <p>{"}"}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between p-5 sm:p-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Latest result
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-[rgba(114,226,182,0.24)] bg-[rgba(114,226,182,0.08)] px-3 py-2 text-sm font-semibold text-[var(--primary)]">
                  <CheckCircle2 className="size-4" /> Accepted
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  Clear verdicts help you understand what worked and where to
                  improve next.
                </p>
              </div>
              <div className="mt-8 border-t border-[var(--border)] pt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--muted)]">Practice loop</span>
                  <span className="text-[var(--primary)]">Complete</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {["Choose", "Solve", "Improve"].map((label) => (
                    <div key={label}>
                      <div className="h-1 bg-[var(--primary)]" />
                      <p className="mt-2 text-[10px] text-[var(--muted)]">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              Built around your progress
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A focused way to become a stronger problem solver.
            </h2>
            <p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">
              CodeSprint keeps practice clear and purposeful, from the first
              problem you open to the patterns you learn over time.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-lg border border-[var(--border)] bg-[rgba(42,36,43,0.88)] p-6 transition duration-200 hover:-translate-y-px hover:border-[rgba(114,226,182,0.32)] hover:shadow-[0_14px_32px_rgba(12,8,13,0.14)]"
              >
                <span className="flex size-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--input)] text-[var(--primary)]">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[rgba(42,36,43,0.72)]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
              How CodeSprint works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A simple loop that makes every session count.
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="bg-[var(--surface)] p-6 sm:p-8">
                <span className="font-mono text-xs text-[var(--primary)]">
                  {step.number}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:py-28">
        <div>
          <span className="flex size-11 items-center justify-center rounded-md border border-[rgba(114,226,182,0.24)] bg-[rgba(114,226,182,0.08)] text-[var(--primary)]">
            <Target className="size-5" />
          </span>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Prepare with the habits interviews actually reward.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-[var(--muted)]">
            Practice breaking down prompts, handling edge cases, writing clear
            code, and improving after feedback—not just memorizing answers.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "Recognize common problem patterns",
              "Build speed without losing clarity",
              "Learn from unsuccessful attempts",
              "Keep a visible record of growth",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-sm text-[var(--muted-strong)]"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
          <GitFork className="size-5 text-[var(--secondary)]" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Open source by design
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            Learn on a platform the community can improve.
          </h3>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            CodeSprint is an open-source project built for learners,
            contributors, and developers who believe better practice tools
            should be transparent and accessible.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[rgba(42,36,43,0.78)]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Make your next practice session count.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-[var(--muted)]">
            Create your account, choose a challenge, and start building the
            problem-solving confidence your next interview needs.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-[var(--primary)] px-6 text-sm font-semibold text-[#171318] transition duration-200 hover:-translate-y-px hover:bg-[var(--primary-hover)]"
          >
            Create your account <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
