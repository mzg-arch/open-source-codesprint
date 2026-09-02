import { Award, CheckCircle2, ListChecks } from "lucide-react";

import { StatCard } from "@/components/dashboard/StatCard";

export function ProfileStats({
  solved,
  submissions,
  accepted,
}: {
  solved: number;
  submissions: number;
  accepted: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard
        label="Unique solved"
        value={solved}
        detail="Problems with an accepted submission"
        icon={Award}
        accent="secondary"
      />
      <StatCard
        label="Submissions"
        value={submissions}
        detail="All judge attempts"
        icon={ListChecks}
        accent="primary"
      />
      <StatCard
        label="Accepted attempts"
        value={accepted}
        detail="Successful judge results"
        icon={CheckCircle2}
        accent="cyan"
      />
    </div>
  );
}
