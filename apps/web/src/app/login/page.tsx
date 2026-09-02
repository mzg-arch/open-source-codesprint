import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth/AuthPanel";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your CodeSprint developer workspace.",
};

export default function LoginPage() {
  return (
    <AuthPanel mode="login">
      <LoginForm />
    </AuthPanel>
  );
}
