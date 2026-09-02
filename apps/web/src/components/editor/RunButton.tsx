import { Play } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function RunButton() {
  return (
    <Button
      variant="secondary"
      size="sm"
      disabled
      title="A dedicated run endpoint is not available yet"
      aria-label="Run code unavailable: dedicated API endpoint required"
    >
      <Play className="size-3.5" />
      Run
    </Button>
  );
}
