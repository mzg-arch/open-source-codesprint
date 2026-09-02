import type { Problem } from "@/types/problem";

import { ConstraintCard } from "./ConstraintCard";
import { ExampleCard } from "./ExampleCard";

export function ProblemDescription({ problem }: { problem: Problem }) {
  return (
    <div className="space-y-9">
      <section>
        <h2 className="text-lg font-semibold">Problem statement</h2>
        <p className="mt-4 whitespace-pre-wrap text-[15px] leading-8 text-[#c5c0ce]">
          {problem.description}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Your function</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Implement this function and return the result. CodeSprint supplies
          each test case automatically.
        </p>
        <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--input)] p-4">
          <code className="font-mono text-sm text-[var(--primary)]">
            {problem.functionName}(
            {problem.parameters.map((parameter) => parameter.name).join(", ")})
            → {problem.returnType}
          </code>
          <div className="mt-3 flex flex-wrap gap-2">
            {problem.parameters.map((parameter) => (
              <span
                key={parameter.name}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--muted-strong)]"
              >
                {parameter.name}: {parameter.type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {problem.examples.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">Examples</h2>
          <div className="mt-4 space-y-4">
            {problem.examples.map((example, index) => (
              <ExampleCard key={example.id} example={example} index={index} />
            ))}
          </div>
        </section>
      )}

      {problem.constraints && (
        <section>
          <ConstraintCard constraints={problem.constraints} />
        </section>
      )}
    </div>
  );
}
