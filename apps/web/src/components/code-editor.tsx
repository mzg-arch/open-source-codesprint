'use client';

import Editor from '@monaco-editor/react';

type CodeEditorProps = {
  language: string;
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({
  language,
  value,
  onChange,
}: CodeEditorProps) {
  return (
    <Editor
      height="500px"
      theme="vs-dark"
      language={language}
      value={value}
      onChange={(newValue) => {
        onChange(newValue ?? '');
      }}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
      }}
    />
  );
}