import { AtSign, Mail } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { AuthUser } from "@/types/auth";

export function ProfileHeader({ user }: { user: AuthUser }) {
  return (
    <Card className="relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--primary),var(--secondary),transparent)]" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[linear-gradient(145deg,var(--secondary),var(--primary))] text-2xl font-bold text-[#171318] shadow-[0_12px_28px_rgba(12,8,13,0.15)]">
          {user.username.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[var(--muted)] sm:flex-row sm:gap-5">
            <span className="flex items-center gap-2">
              <AtSign className="size-4 text-[var(--primary-strong)]" />
              {user.username}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 text-[var(--secondary)]" />
              {user.email}
            </span>
          </div>
          <p className="mt-4 text-xs text-[var(--muted)]">
            Join date is not exposed by the current /auth/me response.
          </p>
        </div>
      </div>
    </Card>
  );
}
