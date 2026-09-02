"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileStats } from "@/components/profile/ProfileStats";
import { ErrorState } from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useSubmissions } from "@/hooks/useSubmission";

export default function ProfilePage() {
  const { user } = useAuth();
  const { submissions, isLoading, error, refresh } = useSubmissions();
  const accepted = submissions.filter(
    (submission) => submission.status === "ACCEPTED",
  );
  const solved = new Set(
    accepted
      .map((submission) => submission.problem?.slug)
      .filter((slug): slug is string => Boolean(slug)),
  ).size;

  return (
    <AppShell
      eyebrow="Developer identity"
      title="Profile"
      description="Your real account details and practice totals from the current CodeSprint APIs."
    >
      {!user ? (
        <Skeleton className="h-48 rounded-lg" />
      ) : (
        <ProfileHeader user={user} />
      )}

      <div className="mt-6">
        {error ? (
          <ErrorState description={error} onRetry={refresh} />
        ) : isLoading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : (
          <ProfileStats
            solved={solved}
            submissions={submissions.length}
            accepted={accepted.length}
          />
        )}
      </div>
    </AppShell>
  );
}
