import type { LanguageRunner } from "../types/execution";
import { javascriptRunner } from "./javascript/javascript-runner";

const runners: Record<string, LanguageRunner> = {
  javascript: javascriptRunner,
};

export function getRunner(language: string): LanguageRunner | null {
  return runners[language.toLowerCase()] ?? null;
}
