'use client';

import { useEffect, useState } from 'react';

import { apiRequest } from '@/app/lib/api';
import { CodeEditor } from './code-editor';

type StarterCode = {
  id: string;
  language: string;
  code: string;
};

type Submission = {
  id: string;
  status:
    | 'PENDING'
    | 'RUNNING'
    | 'ACCEPTED'
    | 'WRONG_ANSWER'
    | 'RUNTIME_ERROR'
    | 'TIME_LIMIT_EXCEEDED'
    | 'COMPILE_ERROR';
  runtimeMs: number | null;
  output: string | null;
};

type ProblemWorkspaceProps = {
  problemSlug: string;
  starterCode: StarterCode[];
};

export function ProblemWorkspace({
  problemSlug,
  starterCode,
}: ProblemWorkspaceProps) {
  const firstStarter = starterCode[0];

  const [language, setLanguage] = useState(
    firstStarter?.language ?? 'javascript',
  );

  const [code, setCode] = useState(
    firstStarter?.code ?? '',
  );

  const [submission, setSubmission] =
    useState<Submission | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  function handleLanguageChange(
    newLanguage: string,
  ) {
    setLanguage(newLanguage);

    const starter = starterCode.find(
      (item) => item.language === newLanguage,
    );

    setCode(starter?.code ?? '');
  }

  async function handleSubmit() {
    const token = localStorage.getItem(
      'codesprint_access_token',
    );

    if (!token) {
      setError('You must be signed in to submit.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const created =
        await apiRequest<Submission>(
          '/submissions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              problemSlug,
              language,
              sourceCode: code,
            }),
          },
        );

      setSubmission(created);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Submission failed',
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (
      !submission ||
      !['PENDING', 'RUNNING'].includes(
        submission.status,
      )
    ) {
      return;
    }

    const token = localStorage.getItem(
      'codesprint_access_token',
    );

    if (!token) {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const updated =
          await apiRequest<Submission>(
            `/submissions/${submission.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

        setSubmission(updated);

        if (
          !['PENDING', 'RUNNING'].includes(
            updated.status,
          )
        ) {
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [submission]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <select
          value={language}
          onChange={(event) =>
            handleLanguageChange(event.target.value)
          }
          className="rounded-lg border border-white/10 bg-black px-3 py-2 text-sm"
        >
          {starterCode.map((starter) => (
            <option
              key={starter.id}
              value={starter.language}
            >
              {starter.language}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm"
          >
            Run
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      <CodeEditor
        language={language}
        value={code}
        onChange={setCode}
      />

      <div className="border-t border-white/10 p-4">
        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {!submission && !error && (
          <p className="text-sm text-zinc-500">
            Results will appear here.
          </p>
        )}

        {submission && (
          <div className="space-y-2 text-sm">
            <p>
              Status:{' '}
              <span className="font-semibold">
                {submission.status}
              </span>
            </p>

            {submission.runtimeMs !== null && (
              <p>
                Runtime: {submission.runtimeMs} ms
              </p>
            )}

            {submission.output && (
              <pre className="overflow-x-auto rounded-lg bg-black p-3 text-zinc-300">
                {submission.output}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}