"use client";

import { KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <AppShell
      eyebrow="Account controls"
      title="Settings"
      description="Review the account information available through the current authentication API."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-[rgba(139,108,255,0.1)] text-[var(--secondary)]">
              <UserRound className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">Account information</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Read-only until profile update APIs are available
              </p>
            </div>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="relative">
              <UserRound className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
              <Input
                id="settings-username"
                label="Username"
                value={user?.username ?? ""}
                className="pl-11"
                disabled
                readOnly
              />
            </div>
            <div className="relative">
              <Mail className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
              <Input
                id="settings-email"
                label="Email"
                value={user?.email ?? ""}
                className="pl-11"
                disabled
                readOnly
              />
            </div>
          </div>
          <Button className="mt-6" disabled>
            Save changes
          </Button>
          <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
            Editing account details requires a future authenticated profile
            update endpoint.
          </p>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <ShieldCheck className="size-5 text-[var(--secondary)]" />
            <h2 className="mt-4 font-semibold">Session security</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              CodeSprint restores your session by validating the stored JWT
              with /auth/me. Invalid tokens are removed automatically.
            </p>
          </Card>
          <Card className="p-5">
            <KeyRound className="size-5 text-[var(--warning)]" />
            <h2 className="mt-4 font-semibold">Password management</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Password changes are unavailable because the backend does not
              currently expose a password reset or update route.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
