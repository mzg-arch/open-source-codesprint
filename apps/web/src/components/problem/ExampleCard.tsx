import { ArrowDown, ArrowUp, Lightbulb } from "lucide-react";

import type { ProblemExample } from "@/types/problem";

export function ExampleCard({
  example,
  index,
}: {
  example: ProblemExample;
  index: number;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] px-5 py-3 text-xs font-semibold text-[var(--muted-strong)]">
        Example {index + 1}
      </div>
      <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2">
        <div className="bg-[var(--surface)] p-5">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            <ArrowDown className="size-3.5 text-[var(--cyan)]" /> Input
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-[#dad5e2]">
            {example.input}
          </pre>
        </div>
        <div className="bg-[var(--surface)] p-5">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            <ArrowUp className="size-3.5 text-[var(--secondary)]" /> Output
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-[#dad5e2]">
            {example.output}
          </pre>
        </div>
      </div>
      {example.explanation && (
        <div className="flex gap-3 border-t border-[var(--border)] bg-[rgba(139,108,255,0.035)] px-5 py-4 text-sm leading-6 text-[var(--muted-strong)]">
          <Lightbulb className="mt-1 size-4 shrink-0 text-[var(--warning)]" />
          <p>{example.explanation}</p>
        </div>
      )}
    </article>
  );
}
