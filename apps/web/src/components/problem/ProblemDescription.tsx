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
