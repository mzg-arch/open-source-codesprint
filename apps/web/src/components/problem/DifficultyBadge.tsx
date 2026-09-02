import { Badge } from "@/components/ui/Badge";
import type { Difficulty } from "@/types/problem";

const difficultyConfig = {
  EASY: { label: "Easy", tone: "success" as const },
  MEDIUM: { label: "Medium", tone: "warning" as const },
  HARD: { label: "Hard", tone: "danger" as const },
};

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  const config = difficultyConfig[difficulty];
  return <Badge tone={config.tone}>{config.label}</Badge>;
}
