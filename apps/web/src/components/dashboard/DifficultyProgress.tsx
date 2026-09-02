import type { Difficulty } from "@/types/problem";

import { DifficultyBadge } from "../problem/DifficultyBadge";

export function DifficultyProgress({
  difficulty,
  solved,
  total,
}: {
  difficulty: Difficulty;
  solved: number;
  total: number;
}) {
  const percentage = total === 0 ? 0 : (solved / total) * 100;
  const gradient = {
    EASY: "from-[#72e2b6] to-[#9af0ce]",
    MEDIUM: "from-[#df9d43] to-[#f4cc78]",
    HARD: "from-[#ef657e] to-[#ff93a5]",
  }[difficulty];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <DifficultyBadge difficulty={difficulty} />
        <span className="text-xs text-[var(--muted)]">
          {solved} / {total}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.055]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
