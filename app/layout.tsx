import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { GlobalErrorBoundary } from "@/components/error-boundary/global-error-boundary"
import { OfflineNotification } from "@/components/offline-notification"
import { LoadingProvider } from "@/contexts/loading-context"
import { LanguageProvider } from "@/contexts/language-context"
import { UserAvatarProvider } from "@/contexts/user-avatar-context"
import { NotificationProvider } from "@/components/providers/notification-provider"
import { NotificationToast } from "@/components/notifications/notification-toast"
import { GlobalNavigation } from "@/components/global-navigation"
import { AppHeader } from "@/components/layout/app-header"
import { AutoTranslationProvider } from "@/contexts/auto-translation-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YanYu MediNexus³-Admin",
  description: "先进的医疗AI管理系统",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalErrorBoundary>
            <LoadingProvider>
              <LanguageProvider>
                <AutoTranslationProvider>
                  <UserAvatarProvider>
                    <NotificationProvider>
                      <div className="flex min-h-screen flex-col">
                        <AppHeader />
                        <div className="flex flex-1">
                          <aside className="hidden w-64 border-r md:block">
                            <GlobalNavigation />
                          </aside>
                          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
                        </div>
                        <OfflineNotification />
                        <NotificationToast />
                        <Toaster />
                      </div>
                    </NotificationProvider>
                  </UserAvatarProvider>
                </AutoTranslationProvider>
              </LanguageProvider>
            </LoadingProvider>
          </GlobalErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}
