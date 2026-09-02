"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";

import { Spinner } from "../ui/Spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <main className="app-grid flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <Spinner className="size-5 text-[var(--primary-strong)]" />
          Restoring your workspace...
        </div>
      </main>
    );
  }

  return children;
}
