import { Navbar } from "./Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { Sidebar } from "./Sidebar";

export function AppShell({
  title,
  description,
  eyebrow,
  actions,
  children,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="app-grid min-h-screen">
        <Navbar compact />
        <div className="flex min-h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
              <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  {eyebrow && (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                      {eyebrow}
                    </p>
                  )}
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {title}
                  </h1>
                  {description && (
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                      {description}
                    </p>
                  )}
                </div>
                {actions && <div>{actions}</div>}
              </header>
              <div className="mt-8">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
