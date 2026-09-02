"use client";

import { ArrowRight, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/providers/ToastProvider";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Spinner } from "../ui/Spinner";

export function LoginForm() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const user = await login({ email, password });
      showToast(`Welcome back, ${user.username}.`, "success");
      router.push("/dashboard");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Sign in failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--secondary)]">
        Welcome back
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Sign in to your workspace
      </h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Pick up where you left off and keep your submission history moving.
      </p>

      <div className="mt-8 space-y-5">
        <div className="relative">
          <Mail className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="pl-11"
            required
          />
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="pl-11"
            minLength={8}
            required
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-5 rounded-md border border-[rgba(255,122,144,0.22)] bg-[rgba(255,122,144,0.08)] px-4 py-3 text-sm text-[var(--danger)]"
        >
          {error}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={isSubmitting || authLoading}
      >
        {isSubmitting ? (
          <>
            <Spinner /> Signing in...
          </>
        ) : (
          <>
            Sign in <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        New to CodeSprint?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--primary-strong)] hover:text-white"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
