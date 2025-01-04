"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { PostHogProvider } from "./analytics/posthog-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}
