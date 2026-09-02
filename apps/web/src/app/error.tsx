"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="app-grid flex min-h-screen items-center justify-center px-6">
      <div className="panel-glow w-full max-w-lg rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-lg border border-[rgba(255,122,144,0.2)] bg-[rgba(255,122,144,0.08)] text-[var(--danger)]">
          <AlertTriangle className="size-5" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold">Unable to load this view</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          {error.message || "An unexpected application error occurred."}
        </p>
        <Button className="mt-6" onClick={reset}>
          <RefreshCw className="size-4" /> Try again
        </Button>
      </div>
    </main>
  );
}
