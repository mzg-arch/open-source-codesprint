"use client";

import Editor from "@monaco-editor/react";

export function CodeEditor({
  language,
  value,
  onChange,
}: {
  language: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Editor
      height="520px"
      theme="vs-dark"
      language={language.toLowerCase()}
      value={value}
      loading={
        <div className="flex h-[520px] items-center justify-center bg-[var(--input)] text-sm text-[var(--muted)]">
          Loading editor...
        </div>
      }
      onChange={(newValue) => onChange(newValue ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
        lineHeight: 22,
        padding: { top: 18 },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: "on",
        smoothScrolling: true,
        renderLineHighlight: "gutter",
        overviewRulerBorder: false,
      }}
    />
  );
}
