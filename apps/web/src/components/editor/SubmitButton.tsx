import { Send } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

export function SubmitButton({
  isSubmitting,
  onSubmit,
}: {
  isSubmitting: boolean;
  onSubmit: () => void;
}) {
  return (
    <Button
      size="sm"
      onClick={onSubmit}
      disabled={isSubmitting}
      aria-label="Submit solution to judge"
    >
      {isSubmitting ? <Spinner /> : <Send className="size-3.5" />}
      {isSubmitting ? "Submitting" : "Submit"}
    </Button>
  );
}
