import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <main className="app-grid min-h-screen">
      <Navbar />
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center">
        <span className="flex size-14 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)]">
          <FileQuestion className="size-6" />
        </span>
        <p className="mt-6 font-mono text-xs text-[var(--secondary)]">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          This route did not compile.
        </h1>
        <p className="mt-4 max-w-lg leading-7 text-[var(--muted)]">
          The page may have moved, or the problem slug does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-[var(--primary)] px-5 text-sm font-semibold text-[#171318] transition hover:-translate-y-px hover:bg-[var(--primary-hover)]"
        >
          <ArrowLeft className="size-4" /> Return home
        </Link>
      </section>
    </main>
  );
}
