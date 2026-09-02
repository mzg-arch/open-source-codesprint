import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  Clock3,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { titleCase } from "@/lib/utils";
import type { SubmissionStatus as SubmissionStatusType } from "@/types/submission";

const config = {
  PENDING: { tone: "neutral" as const, icon: Clock3 },
  RUNNING: { tone: "primary" as const, icon: CircleDashed },
  ACCEPTED: { tone: "success" as const, icon: CheckCircle2 },
  WRONG_ANSWER: { tone: "danger" as const, icon: XCircle },
  RUNTIME_ERROR: { tone: "danger" as const, icon: AlertTriangle },
  TIME_LIMIT_EXCEEDED: { tone: "warning" as const, icon: Clock3 },
  COMPILE_ERROR: { tone: "warning" as const, icon: AlertTriangle },
};

export function SubmissionStatus({
  status,
}: {
  status: SubmissionStatusType;
}) {
  const { tone, icon: Icon } = config[status];
  const isActive = status === "PENDING" || status === "RUNNING";

  return (
    <Badge tone={tone} className="gap-1.5">
      <Icon className={`size-3 ${isActive ? "animate-spin" : ""}`} />
      {titleCase(status)}
    </Badge>
  );
}
