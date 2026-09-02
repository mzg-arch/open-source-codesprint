import { Braces, CheckCircle2, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CodeSprintLogo } from "@/components/brand/CodeSprintLogo";

export function AuthPanel({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "login" | "register";
}) {
  return (
    <main className="app-grid relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(139,109,255,0.1),transparent_28rem)]" />
      <div className="panel-glow relative grid w-full max-w-6xl overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] lg:min-h-[690px] lg:grid-cols-[0.95fr_1.05fr]">
        <section className="relative min-h-64 overflow-hidden border-b border-[var(--border)] lg:min-h-full lg:border-b-0 lg:border-r">
          <Image
            src="/images/auth-code-streams.png"
            alt="Abstract violet, cyan, and mint code streams"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,5,9,0.1),rgba(5,6,10,0.35)_55%,rgba(5,6,10,0.92))]" />
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <Link
              href="/"
              className="w-fit rounded-md"
            >
              <CodeSprintLogo markClassName="size-9 bg-black/25 backdrop-blur" />
            </Link>

            <div className="max-w-md">
              <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--secondary)]">
                <Terminal className="size-4" /> Build. Test. Improve.
              </div>
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Your next accepted solution starts here.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[#c4c0cc]">
                Practice real problems, submit to a secure judge, and build
                fluency one challenge at a time.
              </p>
              <div className="mt-6 hidden flex-wrap gap-3 text-xs text-[#c9c4d2] sm:flex">
                {["Interview practice", "Instant feedback", "Open source"].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-black/20 px-3 py-1.5 backdrop-blur"
                    >
                      <CheckCircle2 className="size-3.5 text-[var(--secondary)]" />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[linear-gradient(145deg,rgba(48,42,50,0.94),rgba(42,36,43,0.98))] p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--input)] px-3 py-1.5">
                <Braces className="size-3.5 text-[var(--secondary)]" />
                Developer access
              </span>
              <Link
                href={mode === "login" ? "/register" : "/login"}
                className="font-medium text-[var(--muted-strong)] transition hover:text-white"
              >
                {mode === "login" ? "Create account" : "Sign in"}
              </Link>
            </div>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
