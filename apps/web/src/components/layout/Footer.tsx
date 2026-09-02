import { GitFork } from "lucide-react";
import Link from "next/link";

import { CodeSprintLogo } from "@/components/brand/CodeSprintLogo";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[rgba(42,36,43,0.92)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-[var(--muted-strong)]">
          <CodeSprintLogo showWordmark={false} markClassName="size-7" />
          <span>© 2026 Open-Source CodeSprint</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/problems" className="transition hover:text-white">
            Problems
          </Link>
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="size-4" /> Open source
          </span>
        </div>
      </div>
    </footer>
  );
}
