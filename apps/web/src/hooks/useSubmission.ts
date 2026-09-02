"use client";

import { useCallback, useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api";
import { useToast } from "@/providers/ToastProvider";
import {
  isSubmissionActive,
  type Submission,
} from "@/types/submission";

export function useSubmissions() {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);

  const refresh = useCallback(() => {
    setIsLoading(true);
    setError("");
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    let isActive = true;

    if (!token) {
      void Promise.resolve().then(() => {
        if (isActive) {
          setSubmissions([]);
          setIsLoading(false);
        }
      });
      return () => {
        isActive = false;
      };
    }

    void apiRequest<Submission[]>("/submissions/me", { token })
      .then((data) => {
        if (isActive) {
          setSubmissions(data);
          setError("");
        }
      })
      .catch((caughtError) => {
        if (isActive) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to load submissions.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [requestVersion, token]);

  return { submissions, isLoading, error, refresh };
}

export function useSubmission(problemSlug: string) {
  const { token } = useAuth();
  const { showToast } = useToast();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = useCallback(
    async (language: string, sourceCode: string) => {
      if (!token) {
        setError("You must be signed in to submit.");
        return;
      }

      setError("");
      setIsSubmitting(true);

      try {
        const created = await apiRequest<Submission>("/submissions", {
          method: "POST",
          token,
          body: JSON.stringify({ problemSlug, language, sourceCode }),
        });
        setSubmission(created);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Submission failed.";
        setError(message);
        showToast(message, "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [problemSlug, showToast, token],
  );

  useEffect(() => {
    if (!submission || !token || !isSubmissionActive(submission.status)) {
      return;
    }

    const interval = window.setInterval(() => {
      void apiRequest<Submission>(`/submissions/${submission.id}`, { token })
        .then((updated) => {
          setSubmission(updated);
          if (!isSubmissionActive(updated.status)) {
            window.clearInterval(interval);
          }
        })
        .catch(() => {
          window.clearInterval(interval);
          setError("Live result updates stopped. Refresh the page to retry.");
        });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [submission, token]);

  return { submission, isSubmitting, error, submit };
}
