"use client";

import { ArrowRight, AtSign, LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/providers/ToastProvider";

import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Spinner } from "../ui/Spinner";

export function RegisterForm() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ username, email, password });
      showToast("Account created. You can sign in now.", "success");
      router.push("/login");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Registration failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-up">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--secondary)]">
        Join the sprint
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Create your account
      </h1>
      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
        Build a real practice record with secure judging and live results.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div className="relative sm:col-span-2">
          <AtSign className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
          <Input
            id="username"
            label="Username"
            autoComplete="username"
            placeholder="dev_sprinter"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="pl-11"
            minLength={3}
            required
          />
        </div>
        <div className="relative sm:col-span-2">
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
            autoComplete="new-password"
            placeholder="8+ characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="pl-11"
            minLength={8}
            required
          />
        </div>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute bottom-4 left-4 z-10 size-4 text-[var(--muted)]" />
          <Input
            id="confirm-password"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
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
            <Spinner /> Creating account...
          </>
        ) : (
          <>
            Create account <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <p className="mt-5 text-center text-sm text-[var(--muted)]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--primary-strong)] hover:text-white"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
