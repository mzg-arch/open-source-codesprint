"use client";

import {
  Gauge,
  History,
  ListChecks,
  Settings,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/problems", label: "Problems", icon: ListChecks },
  { href: "/submissions", label: "Submissions", icon: History },
  { href: "/profile", label: "Profile", icon: UserRound },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-[var(--border)] bg-[rgba(42,36,43,0.8)] backdrop-blur lg:block">
      <nav className="sticky top-0 space-y-1 p-4" aria-label="Workspace">
        <p className="mb-3 px-3 pt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Workspace
        </p>
        {links.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href === "/problems" && pathname.startsWith("/problems/"));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition",
                isActive
                  ? "border border-[rgba(114,226,182,0.26)] bg-[rgba(114,226,182,0.08)] text-white"
                  : "text-[var(--muted)] hover:bg-[var(--surface-raised)] hover:text-white",
              )}
            >
              <Icon
                className={cn(
                  "size-4",
                  isActive && "text-[var(--primary)]",
                )}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
