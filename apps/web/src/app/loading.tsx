import { Code2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="app-grid flex min-h-screen items-center justify-center">
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[rgba(114,226,182,0.08)] text-[var(--primary)]">
          <Code2 className="size-5 animate-pulse" />
        </span>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Loading CodeSprint...
        </p>
      </div>
    </main>
  );
}
