import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth/AuthPanel";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create your CodeSprint account and start practicing.",
};

export default function RegisterPage() {
  return (
    <AuthPanel mode="register">
      <RegisterForm />
    </AuthPanel>
  );
}
