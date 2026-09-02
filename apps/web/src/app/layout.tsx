import type { Metadata } from "next";

import { AppProviders } from "@/providers/AppProviders";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CodeSprint — Practice smarter. Interview stronger.",
    template: "%s | CodeSprint",
  },
  description:
    "Practice coding interview questions, get instant feedback, and track your progress with CodeSprint.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
