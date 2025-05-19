import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import { Toaster } from "@/components/ui/toaster"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { NotificationToast } from "@/components/notifications/notification-toast"
import { UserAvatarProvider } from "@/contexts/user-avatar-context"
import { LanguageProvider } from "@/contexts/language-context"
import { AutoTranslationProvider } from "@/contexts/auto-translation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "YanYu MediNexus³-Admin",
  description: "医疗AI管理系统",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <AutoTranslationProvider>
              <NotificationProvider>
                <UserAvatarProvider>
                  <AppShell>{children}</AppShell>
                  <NotificationToast />
                  <Toaster />
                </UserAvatarProvider>
              </NotificationProvider>
            </AutoTranslationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
