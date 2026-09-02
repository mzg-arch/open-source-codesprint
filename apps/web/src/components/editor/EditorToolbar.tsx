import { Braces } from "lucide-react";

export function EditorToolbar({
  languageSelector,
  actions,
}: {
  languageSelector: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-white/[0.015] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-md bg-[rgba(139,108,255,0.1)] text-[var(--secondary)]">
          <Braces className="size-4" />
        </span>
        {languageSelector}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}
