"use client";

import { useState } from "react";

import { useSubmission } from "@/hooks/useSubmission";
import type { StarterCode } from "@/types/problem";

import { CodeEditor } from "./CodeEditor";
import { EditorToolbar } from "./EditorToolbar";
import { LanguageSelector } from "./LanguageSelector";
import { ResultPanel } from "./ResultPanel";
import { RunButton } from "./RunButton";
import { SubmitButton } from "./SubmitButton";

export function ProblemWorkspace({
  problemSlug,
  starterCode,
}: {
  problemSlug: string;
  starterCode: StarterCode[];
}) {
  const firstStarter = starterCode[0];
  const [language, setLanguage] = useState(
    firstStarter?.language ?? "javascript",
  );
  const [code, setCode] = useState(firstStarter?.code ?? "");
  const { submission, isSubmitting, error, submit } =
    useSubmission(problemSlug);

  function handleLanguageChange(newLanguage: string) {
    setLanguage(newLanguage);
    const starter = starterCode.find(
      (item) => item.language === newLanguage,
    );
    setCode(starter?.code ?? "");
  }

  return (
    <div className="panel-glow overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)]">
      <EditorToolbar
        languageSelector={
          <LanguageSelector
            value={language}
            options={starterCode}
            onChange={handleLanguageChange}
          />
        }
        actions={
          <>
            <RunButton />
            <SubmitButton
              isSubmitting={isSubmitting}
              onSubmit={() => void submit(language, code)}
            />
          </>
        }
      />
      <CodeEditor language={language} value={code} onChange={setCode} />
      <ResultPanel submission={submission} error={error} />
    </div>
  );
}
