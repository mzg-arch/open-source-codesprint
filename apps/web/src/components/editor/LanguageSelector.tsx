import type { StarterCode } from "@/types/problem";

export function LanguageSelector({
  value,
  options,
  onChange,
}: {
  value: string;
  options: StarterCode[];
  onChange: (language: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">Programming language</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={options.length === 0}
        className="h-9 rounded-md border border-[var(--border)] bg-[var(--input)] px-3 text-xs font-medium capitalize text-[var(--muted-strong)] focus:border-[var(--primary)] focus:outline-none disabled:opacity-50"
      >
        {options.map((starter) => (
          <option key={starter.id} value={starter.language}>
            {starter.language}
          </option>
        ))}
      </select>
    </label>
  );
}
