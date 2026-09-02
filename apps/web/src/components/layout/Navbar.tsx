"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useToast } from "@/providers/ToastProvider";

import { CodeSprintLogo } from "../brand/CodeSprintLogo";

const guestLinks = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
];

const authenticatedLinks = [
  { href: "/problems", label: "Problems" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/submissions", label: "Submissions" },
];

export function Navbar({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { showToast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const links = isAuthenticated ? authenticatedLinks : guestLinks;

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    showToast("You have been signed out.", "success");
    router.push("/");
  }

  return (
    <header className="relative z-50 border-b border-[var(--border)] bg-[rgba(42,36,43,0.88)] backdrop-blur-xl">
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between px-4 sm:px-6",
          compact ? "max-w-none" : "max-w-7xl",
        )}
      >
        <Link
          href="/"
          className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <CodeSprintLogo />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition",
                pathname === link.href
                  ? "bg-white/[0.055] text-white"
                  : "text-[var(--muted)] hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {isLoading ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-white/[0.05]" />
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-raised)] py-1.5 pl-1.5 pr-3 text-sm transition hover:-translate-y-px hover:border-[var(--border-strong)] focus-visible:outline-2"
                aria-expanded={profileOpen}
              >
                <span className="flex size-7 items-center justify-center rounded-sm bg-[var(--primary)] text-xs font-bold text-[#171318]">
                  {user.username.slice(0, 1).toUpperCase()}
                </span>
                <span className="max-w-28 truncate">{user.username}</span>
                <ChevronDown className="size-3.5 text-[var(--muted)]" />
              </button>
              {profileOpen && (
                <div className="panel-glow absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1.5">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] hover:bg-white/[0.05] hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-[var(--muted-strong)] hover:bg-white/[0.05] hover:text-white"
                  >
                    Settings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[rgba(255,122,144,0.08)]"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm text-[var(--muted-strong)] hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="inline-flex h-9 items-center rounded-md bg-[var(--primary)] px-3 text-xs font-semibold text-[#171318] transition hover:-translate-y-px hover:bg-[var(--primary-hover)]"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg border border-[var(--border)] p-2 text-[var(--muted-strong)] md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 border-b border-[var(--border)] bg-[rgba(42,36,43,0.98)] p-4 shadow-2xl md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-white/[0.05]"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-[var(--muted-strong)] hover:bg-white/[0.05]"
                >
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2.5 text-left text-sm text-[var(--danger)]"
                >
                  Log out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md border border-[var(--border)] px-4 py-2.5 text-center text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md bg-[var(--primary)] px-4 py-2.5 text-center text-sm font-semibold text-[#171318] transition hover:bg-[var(--primary-hover)]"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
