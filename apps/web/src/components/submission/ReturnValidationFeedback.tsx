import { BookOpen, CheckCircle2, Lightbulb, XCircle } from "lucide-react";

export type ReturnValidationFeedbackData = {
  codeSprintFeedback: "return-validation";
  title: string;
  description: string;
  expected: string;
  received: string;
  howToFix: string;
  example: string;
};

export function parseReturnValidationFeedback(
  output: string | null,
): ReturnValidationFeedbackData | null {
  if (!output) return null;

  try {
    const feedback = JSON.parse(
      output,
    ) as Partial<ReturnValidationFeedbackData>;

    if (
      feedback.codeSprintFeedback === "return-validation" &&
      typeof feedback.title === "string" &&
      typeof feedback.description === "string" &&
      typeof feedback.expected === "string" &&
      typeof feedback.received === "string" &&
      typeof feedback.howToFix === "string" &&
      typeof feedback.example === "string"
    ) {
      return feedback as ReturnValidationFeedbackData;
    }
  } catch {
    return null;
  }

  return null;
}

export function ReturnValidationFeedback({
  feedback,
}: {
  feedback: ReturnValidationFeedbackData;
}) {
  return (
    <div className="rounded-md border border-[rgba(242,191,103,0.22)] bg-[rgba(242,191,103,0.055)] p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-[rgba(242,191,103,0.12)] text-[var(--warning)]">
          <Lightbulb className="size-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)]">
            {feedback.title}
          </h3>
          <p className="mt-1.5 text-xs leading-5 text-[var(--muted-strong)]">
            {feedback.description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-[rgba(114,226,182,0.16)] bg-[rgba(114,226,182,0.05)] p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
            <CheckCircle2 className="size-3.5" /> Expected
          </p>
          <p className="mt-2 text-xs text-[var(--foreground)]">
            {feedback.expected}
          </p>
        </div>
        <div className="rounded-md border border-[rgba(255,122,144,0.16)] bg-[rgba(255,122,144,0.05)] p-3">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--danger)]">
            <XCircle className="size-3.5" /> Received
          </p>
          <p className="mt-2 font-mono text-xs text-[var(--foreground)]">
            {feedback.received}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-[var(--border)] bg-[var(--input)] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--secondary-strong)]">
          How to fix it
        </p>
        <p className="mt-2 text-xs leading-5 text-[var(--muted-strong)]">
          {feedback.howToFix}
        </p>
      </div>

      <div className="mt-3">
        <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          <BookOpen className="size-3.5" /> Example
        </p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-[#18151a] p-3 font-mono text-xs leading-5 text-[var(--primary)]">
          {feedback.example}
        </pre>
      </div>
    </div>
  );
}
