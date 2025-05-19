"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
import { UserAvatarProvider } from "@/contexts/user-avatar-context"
import { LanguageProvider } from "@/contexts/language-context"
import { AutoTranslationProvider } from "@/contexts/auto-translation-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <AutoTranslationProvider>
          <UserAvatarProvider>
            {children}
            <Toaster />
          </UserAvatarProvider>
        </AutoTranslationProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
