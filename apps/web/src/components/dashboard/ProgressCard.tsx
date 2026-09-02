import { Target } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { Difficulty } from "@/types/problem";

import { DifficultyProgress } from "./DifficultyProgress";

export function ProgressCard({
  progress,
}: {
  progress: Array<{
    difficulty: Difficulty;
    solved: number;
    total: number;
  }>;
}) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-[rgba(139,108,255,0.1)] text-[var(--secondary)]">
          <Target className="size-4" />
        </span>
        <div>
          <h2 className="font-semibold">Difficulty progress</h2>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            Unique accepted problems
          </p>
        </div>
      </div>
      <div className="mt-7 space-y-6">
        {progress.map((item) => (
          <DifficultyProgress key={item.difficulty} {...item} />
        ))}
      </div>
    </Card>
  );
}
