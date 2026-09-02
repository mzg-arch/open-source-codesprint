import { ShieldCheck } from "lucide-react";

export function ConstraintCard({ constraints }: { constraints: string }) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="flex items-center gap-2 text-xs font-semibold text-[var(--muted-strong)]">
        <ShieldCheck className="size-4 text-[var(--primary-strong)]" />
        Constraints
      </p>
      <pre className="mt-4 overflow-x-auto whitespace-pre-wrap font-mono text-xs leading-7 text-[#bbb6c5]">
        {constraints}
      </pre>
    </div>
  );
}
